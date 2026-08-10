import { jsPDF } from 'jspdf';
import { Article, Section } from '../types';
import { MANUAL_METADATA } from '../data/legalManualData';

export function generateLegalManualPDF(
  articles: Article[],
  targetArticle?: Article
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  let cursorY = margin;

  const title = targetArticle
    ? `${targetArticle.articleNumber} — ${targetArticle.shortTitle}`
    : MANUAL_METADATA.documentTitle;

  // Header & Title
  doc.setFillColor(13, 14, 21); // #0d0e15
  doc.rect(0, 0, pageWidth, 32, 'F');

  doc.setTextColor(245, 158, 11); // Amber
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(MANUAL_METADATA.companyName.toUpperCase(), margin, 12);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text(title, margin, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text(
    `Effective Date: ${MANUAL_METADATA.effectiveDate} | Jurisdiction: ${MANUAL_METADATA.governingJurisdiction}`,
    margin,
    25
  );

  cursorY = 40;

  // Helper for adding page numbers
  const addFooter = (pageNumber: number) => {
    doc.setFontSize(7);
    doc.setTextColor(107, 114, 128);
    doc.text(
      `Fracture-Verse LLC Official Legal Document — ${MANUAL_METADATA.parentEntity} — Confidential & Proprietary`,
      margin,
      pageHeight - 8
    );
    doc.text(`Page ${pageNumber}`, pageWidth - margin - 10, pageHeight - 8);
  };

  let pageCount = 1;
  addFooter(pageCount);

  const checkPageBreak = (neededHeight: number) => {
    if (cursorY + neededHeight > pageHeight - 15) {
      doc.addPage();
      pageCount++;
      addFooter(pageCount);
      cursorY = margin;

      // Small page header
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text(
        `${MANUAL_METADATA.companyName} | Legal & Compliance Manual`,
        margin,
        10
      );
      doc.setDrawColor(229, 231, 235);
      doc.line(margin, 12, pageWidth - margin, 12);
      cursorY = 18;
    }
  };

  const articlesToPrint = targetArticle ? [targetArticle] : articles;

  articlesToPrint.forEach((art) => {
    checkPageBreak(15);

    // Article Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(17, 24, 39); // dark gray
    doc.text(art.title, margin, cursorY);
    cursorY += 6;

    // Summary
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(75, 85, 99);
    const splitSummary = doc.splitTextToSize(art.summary, pageWidth - margin * 2);
    doc.text(splitSummary, margin, cursorY);
    cursorY += splitSummary.length * 4.5 + 4;

    // Sections
    art.sections.forEach((sec: Section) => {
      checkPageBreak(12);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(31, 41, 55);
      doc.text(`${sec.sectionNumber} — ${sec.title}`, margin, cursorY);
      cursorY += 5;

      if (sec.content) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(55, 65, 81);
        const splitContent = doc.splitTextToSize(sec.content, pageWidth - margin * 2);
        checkPageBreak(splitContent.length * 4);
        doc.text(splitContent, margin, cursorY);
        cursorY += splitContent.length * 4 + 2;
      }

      if (sec.bullets) {
        sec.bullets.forEach((bullet) => {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(55, 65, 81);
          const splitBullet = doc.splitTextToSize(`• ${bullet}`, pageWidth - margin * 2 - 4);
          checkPageBreak(splitBullet.length * 4);
          doc.text(splitBullet, margin + 4, cursorY);
          cursorY += splitBullet.length * 4 + 1.5;
        });
        cursorY += 2;
      }

      if (sec.table) {
        checkPageBreak(25);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(17, 24, 39);
        doc.text('Cookie Tier Matrix:', margin, cursorY);
        cursorY += 4;

        sec.table.forEach((row) => {
          checkPageBreak(10);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.text(`${row.tier}:`, margin + 2, cursorY);
          cursorY += 3.5;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(75, 85, 99);
          const splitFunc = doc.splitTextToSize(row.function, pageWidth - margin * 2 - 4);
          doc.text(splitFunc, margin + 4, cursorY);
          cursorY += splitFunc.length * 3.5 + 1;
        });
      }

      if (sec.statutes) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(180, 83, 9); // Amber dark
        doc.text(`Statutory Authority: ${sec.statutes.join(' | ')}`, margin, cursorY);
        cursorY += 5;
      }

      cursorY += 3;
    });

    cursorY += 4;
  });

  const fileName = targetArticle
    ? `Fracture-Verse_${targetArticle.articleNumber.replace(/\s+/g, '_')}_Policy.pdf`
    : 'Fracture-Verse_Master_Legal_Compliance_Manual.pdf';

  doc.save(fileName);
}
