/**
 * Utility for uploading images to ImgBB or generating optimized compressed data previews.
 * If NEXT_PUBLIC_IMGBB_API_KEY is configured in .env, uploads to ImgBB CDN.
 * Otherwise, downscales and compresses high-resolution photos on an HTML5 canvas for fast loading.
 */

function compressImage(file: File, maxWidth = 1280, maxHeight = 1280, quality = 0.82): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = (e.target?.result as string) || "";
    };

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(img.src);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedDataUrl);
    };

    img.onerror = () => {
      // Fallback to simple uncompressed file reader if canvas fails
      const rawReader = new FileReader();
      rawReader.onload = () => resolve(rawReader.result as string);
      rawReader.readAsDataURL(file);
    };

    reader.readAsDataURL(file);
  });
}

export async function uploadImageToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (apiKey) {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.data?.url) {
          return data.data.url;
        }
      }
    } catch (err) {
      console.warn("Direct ImgBB upload network failed, falling back to local optimized preview:", err);
    }
  }

  // Fallback to high-performance client-side compressed data URL
  return compressImage(file);
}

