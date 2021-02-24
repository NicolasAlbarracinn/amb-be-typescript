import { ReadStream } from 'fs';
import pdf, { CreateOptions } from 'html-pdf';
import path from 'path';

const PDF_OPTIONS = <CreateOptions>{
  format: 'A4',
  base: 'file://' + path.join(__dirname, './templates/'),
};

async function generatePDF(htmlContent: string): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    pdf.create(htmlContent, PDF_OPTIONS).toBuffer((error: Error, buffer: Buffer) => {
      if (error) return reject(error);
      resolve(buffer);
    }),
  );
}
async function generatePDFStream(htmlContent: string): Promise<ReadStream> {
  return new Promise((resolve, reject) =>
    pdf.create(htmlContent, PDF_OPTIONS).toStream((error: Error, stream: ReadStream) => {
      if (error) return reject(error);
      resolve(stream);
    }),
  );
}

export { generatePDFStream, generatePDF };
