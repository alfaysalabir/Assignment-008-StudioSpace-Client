// Optional feature: PDF booking invoice (jsPDF runs in the browser)
export async function downloadInvoice(booking) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();

  // header bar
  doc.setFillColor(13, 17, 16);
  doc.rect(0, 0, 210, 38, "F");
  doc.setTextColor(250, 176, 40);
  doc.setFontSize(22);
  doc.text("StudioSpace", 15, 20);
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("Booking Invoice / Receipt", 15, 29);

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(11);
  doc.text(`Invoice No: SS-${String(booking._id).slice(-8).toUpperCase()}`, 15, 52);
  doc.text(`Issued on: ${new Date().toLocaleDateString()}`, 15, 59);
  doc.text(`Status: ${booking.status}`, 15, 66);

  doc.setFontSize(13);
  doc.text("Studio", 15, 82);
  doc.setFontSize(11);
  doc.text(booking.studioTitle, 15, 90);
  doc.text(booking.studioLocation || "", 15, 97);

  doc.setFontSize(13);
  doc.text("Booked by", 120, 82);
  doc.setFontSize(11);
  doc.text(booking.userName, 120, 90);
  doc.text(booking.userEmail, 120, 97);

  doc.setFontSize(13);
  doc.text("Host", 15, 114);
  doc.setFontSize(11);
  doc.text(`${booking.hostName} (${booking.hostEmail})`, 15, 122);

  doc.setDrawColor(220, 220, 220);
  doc.line(15, 132, 195, 132);

  const rows = [
    ["Date", booking.date],
    ["Time", `${booking.startTime} - ${booking.endTime} (${booking.hours} hr)`],
    ["Guests", String(booking.guests)],
    ["Hourly rate", `$${booking.hourlyRate}`],
    ["Security deposit (refundable)", `$${booking.securityDeposit}`],
  ];
  let y = 144;
  rows.forEach(([label, value]) => {
    doc.text(label, 15, y);
    doc.text(value, 195, y, { align: "right" });
    y += 9;
  });

  doc.line(15, y, 195, y);
  doc.setFontSize(14);
  doc.text("Studio total", 15, y + 12);
  doc.text(`$${booking.totalPrice}`, 195, y + 12, { align: "right" });

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("Thank you for booking with StudioSpace. Create something great!", 105, 280, { align: "center" });

  doc.save(`StudioSpace-invoice-${String(booking._id).slice(-8)}.pdf`);
}
