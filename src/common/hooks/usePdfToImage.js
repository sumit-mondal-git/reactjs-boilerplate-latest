import React, { useEffect } from 'react';
const PDFJS = window.pdfjsLib;

export default function usePdfToImage(url) {
  const [pdf, setPdf] = React.useState('');
  const [width, setWidth] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const [height, setHeight] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pdfRendering, setPdfRendering] = React.useState('');
  const [pageRendering, setPageRendering] = React.useState('');

  async function showPdf(pdf_url) {
    try {
      setPdfRendering(true);
      const file = url;
      // const uri = URL.createObjectURL(file);
      var _PDF_DOC = await PDFJS.getDocument({ url: pdf_url });
      setPdf(_PDF_DOC);
      setPdfRendering(false);
      // document.getElementById('file-to-upload').value = '';
    } catch (error) {
      alert(error.message);
    }
  }

  function changePage() {
    setCurrentPage();
  }

  async function renderPage() {
    setPageRendering(true);
    const imagesList = [];
    const canvas = document.createElement('canvas');
    canvas.setAttribute('className', 'canv');
    let canv = document.querySelector('.canv');

    for (let i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var viewport = page.getViewport({ scale: 1 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var render_context = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport
      };
      console.log('page lenght', pdf.numPages);
      setWidth(viewport.width);
      setHeight(viewport.height);
      await page.render(render_context).promise;
      let img = canvas.toDataURL('image/png');
      imagesList.push(img);
    }
    setImages(imagesList);
    setPageRendering(false);
  }
  useEffect(() => {
    if (url && url?.includes('.pdf')) {
      showPdf(url);
    }
  }, [url]);
  useEffect(() => {
    pdf && renderPage();
  }, [pdf, currentPage]);

  return [pdfRendering, images];
}
