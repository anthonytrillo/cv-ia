import React from 'react';
import { pdf } from '@react-pdf/renderer';
import type { CVFormData } from '../types/cv';

export const generatePDF = async (cvData: CVFormData): Promise<Blob> => {
  try {
    // Import the PDF document component dynamically to avoid SSR issues
    const { SimpleCVDocument } = await import('../components/pdf/SimpleCVDocument');

    // Create the PDF using JSX syntax
    const element = React.createElement(SimpleCVDocument, { cvData });
    const pdfDoc = pdf(element as any);
    const blob = await pdfDoc.toBlob();

    return blob;
  } catch (error) {
    console.error('Error generating PDF:', error);
    //console.error('Error details:', {
    //name: (error as Error).name,
    //message: (error as Error).message,
    //stack: (error as Error).stack
    //});
    throw new Error('Failed to generate PDF');
  }
};

export const downloadPDF = async (cvData: CVFormData, filename: string = 'cv.pdf'): Promise<void> => {
  try {
    const blob = await generatePDF(cvData);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    //console.error('Error downloading PDF:', error);
    throw new Error('Failed to download PDF');
  }
}; 