
// TODO: Fetch data from an API Instead of using static data
const blogsData = [
  {
    id: 1,
    title: "The Future of Web Development",
    description:
      "Explore the latest trends and technologies shaping the future of modern web development.",
    author: "Tanim Rahman",
    date: "September 18, 2026",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    id: 2,
    title: "Getting Started with React",
    description:
      "A beginner-friendly guide to understanding React components, props, state, and hooks.",
    author: "Alex Johnson",
    date: "September 15, 2026",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  },
  {
    id: 3,
    title: "Why JavaScript Matters",
    description:
      "Learn why JavaScript remains one of the most important programming languages for web developers.",
    author: "Sarah Williams",
    date: "September 12, 2026",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
  },
  {
    id: 4,
    title: "Building Responsive Websites",
    description:
      "Discover practical techniques for creating websites that look great on phones, tablets, and desktops.",
    author: "David Miller",
    date: "September 10, 2026",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
  },
  {
    id: 5,
    title: "Introduction to Artificial Intelligence",
    description:
      "Understand the fundamentals of AI, machine learning, and how intelligent systems are built.",
    author: "Emma Smith",
    date: "September 8, 2026",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
];


const PostDetailPage =async ({params}) => {

    const {postid} = await params;

    // * Load Data from Database
    const post = blogsData.find(post => post.id === parseInt(postid));
    console.log(postid, post)

    return (
        <div>
            <h2>Post Detail Page {postid}</h2>
            {
                post && <div>
                    <h3>{post.title}</h3>
                    <p>By {post.author}</p>
                    <p>{post.description}</p>
                </div>
            }

        </div>
    );
};

export default PostDetailPage;