let additionalPdfData = null;
let imagesData = [];
let selectedPages = [];  // Usar um array para armazenar os números das páginas selecionadas
let pdfPagesData = {}; // Armazena dados das páginas selecionadas

function setButtonStatus(buttonId, status) {
    const button = document.getElementById(buttonId);
    button.textContent = status;
}

function resetButton(buttonId, originalText) {
    setTimeout(() => {
        setButtonStatus(buttonId, originalText);
    }, 2000);
}

document.getElementById('process-additional-pdf').addEventListener('click', async function() {
    const originalText = this.textContent;
    setButtonStatus('process-additional-pdf', 'Aguarde...');

    const fileInput = document.getElementById('additional-pdf-input');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecione um PDF de seu plano de aula.');
        resetButton('process-additional-pdf', originalText);
        return;
    }

    try {
        const pdfDoc = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
        if (pdfDoc.numPages !== 1) {
            alert('O PDF do seu plano de aula deve ter exatamente uma página.');
            resetButton('process-additional-pdf', originalText);
            return;
        }

        const page = await pdfDoc.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport: viewport }).promise;
        additionalPdfData = canvas.toDataURL('image/png');

        setButtonStatus('process-additional-pdf', 'Concluído');
        resetButton('process-additional-pdf', 'Carregar o plano de aula');
    } catch (error) {
        console.error('Erro ao processar o PDF adicional:', error);
        alert('Ocorreu um erro ao processar o PDF adicional.');
        resetButton('process-additional-pdf', originalText);
    }
});

document.getElementById('process-pdf').addEventListener('click', async function() {
    const originalText = this.textContent;
    setButtonStatus('process-pdf', 'Aguarde...');

    const fileInput = document.getElementById('pdf-input');
    const file = fileInput.files[0];
    const pdfPagesContainer = document.getElementById('pdf-pages');

    if (!file) {
        alert('Por favor, selecione um PDF.');
        resetButton('process-pdf', originalText);
        return;
    }

    try {
        pdfPagesContainer.innerHTML = '';
        selectedPages = []; // Resetar as páginas selecionadas
        pdfPagesData = {}; // Resetar os dados das páginas
        const pdfDoc = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
        const totalPages = pdfDoc.numPages;

        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const page = await pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: context, viewport: viewport }).promise;

            const pdfPageDiv = document.createElement('div');
            pdfPageDiv.className = 'pdf-page';
            pdfPageDiv.innerHTML = `
                <img src="${canvas.toDataURL('image/png')}" alt="PDF Page ${pageNum}">
                <div class="checkbox-container">
                    <input type="checkbox" id="page-${pageNum}" value="${pageNum}">
                    <label for="page-${pageNum}">Página ${pageNum}</label>
                </div>
            `;
            pdfPagesData[pageNum] = canvas.toDataURL('image/png');
            pdfPagesContainer.appendChild(pdfPageDiv);
        }

        setButtonStatus('process-pdf', 'Concluído');
        resetButton('process-pdf', 'Visualizar as páginas');
    } catch (error) {
        console.error('Erro ao processar o PDF:', error);
        alert('Ocorreu um erro ao processar o PDF.');
        resetButton('process-pdf', originalText);
    }
});

document.getElementById('process-images').addEventListener('click', function() {
    const originalText = this.textContent;
    setButtonStatus('process-images', 'Aguarde...');

    const fileInput = document.getElementById('image-input');
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Por favor, selecione imagens ou PDFs.');
        resetButton('process-images', originalText);
        return;
    }

    const imagePromises = Array.from(files).map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (file.type === 'application/pdf') {
                    pdfjsLib.getDocument(e.target.result).promise.then(pdf => {
                        pdf.getPage(1).then(page => {
                            const viewport = page.getViewport({ scale: 1.5 });
                            const canvas = document.createElement('canvas');
                            const context = canvas.getContext('2d');
                            canvas.width = viewport.width;
                            canvas.height = viewport.height;
                            page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
                                resolve({ data: canvas.toDataURL('image/png'), width: canvas.width, height: canvas.height });
                            });
                        });
                    }).catch(reject);
                } else {
                    const img = new Image();
                    img.onload = function() {
                        resolve({ data: e.target.result, width: img.width, height: img.height });
                    };
                    img.src = e.target.result;
                }
            };
            reader.readAsDataURL(file);
        });
    });

    Promise.all(imagePromises).then(results => {
        imagesData = results;
        setButtonStatus('process-images', 'Concluído');
        resetButton('process-images', 'Carregar imagens');
    }).catch(error => {
        console.error('Erro ao processar as imagens:', error);
        alert('Ocorreu um erro ao processar as imagens.');
        resetButton('process-images', originalText);
    });
});

document.getElementById('save-pdf').addEventListener('click', async function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let addedPageCount = 0;

    // Adicionar o PDF adicional, se houver
    if (additionalPdfData) {
        doc.addImage(additionalPdfData, 'PNG', 10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);
        addedPageCount++;
    }

    // Adicionar as páginas selecionadas do PDF original
    for (const pageNum of selectedPages) {
        if (addedPageCount > 0) {
            doc.addPage();
        }
        const imageData = pdfPagesData[pageNum];
        if (imageData) {
            doc.addImage(imageData, 'PNG', 10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);
            addedPageCount++;
        }
    }

    // Adicionar as imagens carregadas
    imagesData.forEach((image, index) => {
        if (addedPageCount > 0) {
            doc.addPage();
        }
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const aspectRatio = image.width / image.height;

        let imgWidth = pdfWidth - 20;
        let imgHeight = imgWidth / aspectRatio;

        if (imgHeight > pdfHeight - 20) {
            imgHeight = pdfHeight - 20;
            imgWidth = imgHeight * aspectRatio;
        }

        const xOffset = (pdfWidth - imgWidth) / 2;
        const yOffset = (pdfHeight - imgHeight) / 2;

        doc.addImage(image.data, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
        addedPageCount++;
    });

    if (addedPageCount > 1) {
        doc.setPage(2);
        doc.setFontSize(24);
        doc.text('Anexos', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
    }

    doc.save('plano_de_aula_com_apontamentos.pdf');
});

// Adicionar evento para atualizar a lista de páginas selecionadas
document.getElementById('pdf-pages').addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        const pageNum = parseInt(event.target.value, 10);
        if (event.target.checked) {
            if (!selectedPages.includes(pageNum)) {
                selectedPages.push(pageNum);
            }
        } else {
            selectedPages = selectedPages.filter(num => num !== pageNum);
        }
    }
});