import { jsPDF } from 'jspdf';
import { resumeData } from './resumeData';

export function generateResumePdf(): Blob {
  // A4 dimensions: 210 x 297 mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const marginX = 14;
  const pageWidth = 210;
  const contentWidth = pageWidth - marginX * 2;
  let y = 14;

  const checkPage = (heightNeeded: number) => {
    if (y + heightNeeded > 288) {
      doc.addPage();
      y = 14;
    }
  };

  // Header - Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(17, 24, 39); // Slate-900
  doc.text(resumeData.name, marginX, y);
  y += 5.5;

  // Header - Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(31, 41, 55);
  doc.text(resumeData.title, marginX, y);
  y += 4.5;

  // Contact info line (Email, Location, Professional Links)
  doc.setFontSize(8.5);
  doc.setTextColor(75, 85, 99);
  const contactText = `${resumeData.email} | ${resumeData.location} | LinkedIn: linkedin.com/in/ygor-silva-developer`;
  doc.text(contactText, marginX, y);
  y += 5;

  const renderSectionHeader = (title: string) => {
    checkPage(8);
    y += 1;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(17, 24, 39);
    doc.text(title, marginX, y);
    y += 1.5;
    doc.setDrawColor(209, 213, 219); // light border
    doc.setLineWidth(0.3);
    doc.line(marginX, y, marginX + contentWidth, y);
    y += 3.5;
  };

  // PERFIL
  renderSectionHeader('PERFIL');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(31, 41, 55);
  const profileLines = doc.splitTextToSize(resumeData.profile, contentWidth);
  doc.text(profileLines, marginX, y);
  y += profileLines.length * 3.4 + 1.5;

  // RESULTADOS EM DESTAQUE
  renderSectionHeader('RESULTADOS EM DESTAQUE');
  resumeData.highlights.forEach((hl) => {
    checkPage(7);
    const bulletText = doc.splitTextToSize(hl, contentWidth - 4);
    doc.setFont('helvetica', 'bold');
    doc.text('•', marginX + 1, y);
    doc.setFont('helvetica', 'normal');
    doc.text(bulletText, marginX + 4.5, y);
    y += bulletText.length * 3.4 + 1;
  });

  // EXPERIÊNCIA PROFISSIONAL
  renderSectionHeader('EXPERIÊNCIA PROFISSIONAL');
  resumeData.experiences.forEach((exp) => {
    checkPage(10);
    // Role and Period
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(17, 24, 39);
    doc.text(exp.role, marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(75, 85, 99);
    doc.text(exp.period, marginX + contentWidth, y, { align: 'right' });
    y += 3.5;

    // Company
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(31, 41, 55);
    doc.text(exp.company, marginX, y);
    y += 3.5;

    // Bullets
    doc.setFont('helvetica', 'normal');
    exp.bullets.forEach((b) => {
      checkPage(7);
      const lines = doc.splitTextToSize(b, contentWidth - 4);
      doc.text('•', marginX + 1, y);
      doc.text(lines, marginX + 4.5, y);
      y += lines.length * 3.3 + 1;
    });
    y += 1;
  });

  // PROJETOS — PY AUTOMAÇÕES (CONSULTORIA PRÓPRIA)
  renderSectionHeader('PROJETOS — PY AUTOMAÇÕES (CONSULTORIA PRÓPRIA)');
  resumeData.consultingProjects.forEach((proj) => {
    checkPage(10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(17, 24, 39);
    doc.text(proj.title, marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(75, 85, 99);
    doc.text(`${proj.client} · ${proj.year}`, marginX + contentWidth, y, { align: 'right' });
    y += 3.5;

    proj.bullets.forEach((b) => {
      checkPage(7);
      const lines = doc.splitTextToSize(b, contentWidth - 4);
      doc.text('•', marginX + 1, y);
      doc.text(lines, marginX + 4.5, y);
      y += lines.length * 3.3 + 1;
    });
    y += 1;
  });

  // FORMAÇÃO
  renderSectionHeader('FORMAÇÃO');
  resumeData.education.forEach((edu) => {
    checkPage(6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(17, 24, 39);
    const label = `${edu.course}: `;
    doc.text(label, marginX, y);
    const labelWidth = doc.getTextWidth(label);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(31, 41, 55);
    doc.text(`${edu.institution} · ${edu.period}`, marginX + labelWidth, y);
    y += 3.8;
  });
  y += 1;

  // COMPETÊNCIAS
  renderSectionHeader('COMPETÊNCIAS');
  resumeData.skills.forEach((sk) => {
    checkPage(6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(17, 24, 39);
    const label = `${sk.category}: `;
    doc.text(label, marginX, y);
    const labelWidth = doc.getTextWidth(label);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(31, 41, 55);
    const itemsText = doc.splitTextToSize(sk.items, contentWidth - labelWidth);
    doc.text(itemsText, marginX + labelWidth, y);
    y += itemsText.length * 3.4 + 0.8;
  });

  return doc.output('blob');
}
