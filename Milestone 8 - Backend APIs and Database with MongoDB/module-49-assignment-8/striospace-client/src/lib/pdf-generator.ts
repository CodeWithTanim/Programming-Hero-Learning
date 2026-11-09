import { jsPDF } from "jspdf";
import { Booking } from "@/types";

export function generateBookingInvoice(booking: Booking) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const primaryColor = "#F97316"; // StudioSpace Orange
  const darkColor = "#1E293B";
  const grayColor = "#64748B";

  // Header Banner
  doc.setFillColor(249, 115, 22); // Orange
  doc.rect(0, 0, 210, 24, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("STUDIOSPACE", 15, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Official Booking Receipt & Invoice", 140, 16);

  // Invoice Meta
  doc.setTextColor(darkColor);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("CONFIRMED STUDIO RESERVATION", 15, 38);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(grayColor);
  doc.text(`Invoice ID: INV-${booking._id ? booking._id.slice(-8).toUpperCase() : "SS-REC"}`, 15, 45);
  doc.text(`Issue Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 15, 50);
  doc.text(`Payment Status: ${booking.status.toUpperCase()}`, 15, 55);

  // Creator & Host Info Section
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 62, 180, 28, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(darkColor);
  doc.text("RESERVED BY", 20, 70);
  doc.text("PRODUCTION WORKSPACE", 110, 70);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(grayColor);
  doc.text(`Creator: ${booking.userName || "Verified Creator"}`, 20, 76);
  doc.text(`Email: ${booking.userEmail}`, 20, 82);

  doc.text(`Studio: ${booking.studioTitle}`, 110, 76);
  doc.text(`Category: ${booking.category || "Creative Workspace"}`, 110, 82);
  if (booking.studioLocation) {
    doc.text(`Location: ${booking.studioLocation.slice(0, 42)}`, 110, 87);
  }

  // Booking Schedule
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(darkColor);
  doc.text("Shoot Schedule & Hours", 15, 102);

  // Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(15, 107, 180, 8, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(darkColor);
  doc.text("SHOOT DATE", 20, 112);
  doc.text("TIME WINDOW", 65, 112);
  doc.text("HOURS", 115, 112);
  doc.text("RATE / HR", 145, 112);
  doc.text("SUBTOTAL", 175, 112);

  // Table Content
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(darkColor);
  doc.text(booking.date || "N/A", 20, 122);
  doc.text(`${booking.startTime} - ${booking.endTime}`, 65, 122);
  doc.text(`${booking.totalHours} hrs`, 115, 122);
  doc.text(`$${booking.hourlyRate}`, 145, 122);
  doc.text(`$${booking.totalHours * booking.hourlyRate}`, 175, 122);

  // Line separator
  doc.setDrawColor(226, 232, 240);
  doc.line(15, 128, 195, 128);

  // Breakdown
  const subtotal = booking.totalHours * booking.hourlyRate;
  const deposit = booking.securityDeposit || 0;
  const total = booking.totalPrice || (subtotal + deposit);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(grayColor);
  doc.text("Workspace Subtotal:", 130, 137);
  doc.text(`$${subtotal.toFixed(2)}`, 175, 137);

  doc.text("Security Deposit (Refundable):", 130, 143);
  doc.text(`$${deposit.toFixed(2)}`, 175, 143);

  doc.text("Platform Service Fee:", 130, 149);
  doc.text("$0.00", 175, 149);

  doc.setDrawColor(203, 213, 225);
  doc.line(130, 153, 195, 153);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(primaryColor);
  doc.text("Total Paid:", 130, 160);
  doc.text(`$${total.toFixed(2)}`, 175, 160);

  // Notes if any
  if (booking.notes) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(darkColor);
    doc.text("Production Notes:", 15, 175);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(grayColor);
    doc.text(booking.notes.slice(0, 90), 15, 181);
  }

  // Footer / Trust Notice
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 230, 180, 32, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(darkColor);
  doc.text("StudioSpace Guarantee & Host Protection Policy", 20, 238);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(grayColor);
  doc.text("Every confirmed reservation is backed by up to $1,000,000 in host property & liability protection.", 20, 244);
  doc.text("For 24/7 priority production support, contact dispatch@studiospace.com or call 1-800-STUDIOS.", 20, 250);
  doc.text("Thank you for producing extraordinary creative work on StudioSpace!", 20, 256);

  // Save the PDF
  doc.save(`StudioSpace_Invoice_${booking._id.slice(-6)}.pdf`);
}

