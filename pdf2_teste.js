let additionalPdfData = null;
let imageData = null;
let thirdData = null;

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

document.getElementById('process-image').addEventListener('click', function() {
    const originalText = this.textContent;
    setButtonStatus('process-image', 'Aguarde...');

    const fileInput = document.getElementById('image-input');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecione uma imagem.');
        resetButton('process-image', originalText);
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            imageData = canvas.toDataURL('image/png');
            setButtonStatus('process-image', 'Concluído');
            resetButton('process-image', 'Carregar imagem');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

document.getElementById('process-third').addEventListener('click', async function() {
    const originalText = this.textContent;
    setButtonStatus('process-third', 'Aguarde...');

    const fileInput = document.getElementById('third-input');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecione um PDF ou imagem.');
        resetButton('process-third', originalText);
        return;
    }

    if (file.type === 'application/pdf') {
        try {
            const pdfDoc = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
            if (pdfDoc.numPages !== 1) {
                alert('O PDF deve ter exatamente uma página.');
                resetButton('process-third', originalText);
                return;
            }

            const page = await pdfDoc.getPage(1);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: context, viewport: viewport }).promise;
            thirdData = canvas.toDataURL('image/png');

            setButtonStatus('process-third', 'Concluído');
            resetButton('process-third', 'Carregar PDF ou imagem');
        } catch (error) {
            console.error('Erro ao processar o PDF:', error);
            alert('Ocorreu um erro ao processar o PDF.');
            resetButton('process-third', originalText);
        }
    } else {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                thirdData = canvas.toDataURL('image/png');
                setButtonStatus('process-third', 'Concluído');
                resetButton('process-third', 'Carregar PDF ou imagem');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('save-pdf').addEventListener('click', async function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let addedPageCount = 0;

    // Adicionar o PDF adicional como a primeira página
    if (additionalPdfData) {
        doc.addImage(additionalPdfData, 'PNG', 10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);
        addedPageCount++;
    }

    // Adicionar a imagem como a segunda página
    if (imageData) {
        doc.addPage();
        doc.addImage(imageData, 'PNG', 10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);
        addedPageCount++;
    }

    // Adicionar o PDF ou imagem como a terceira página
    if (thirdData) {
        doc.addPage();
        doc.addImage(thirdData, 'PNG', 10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);
        addedPageCount++;
    }

    if (addedPageCount > 1) {
        doc.setPage(2);
        doc.setFontSize(24);
        doc.text('Anexos', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
    }

    doc.save('plano_de_aula_com_apontamentos.pdf');
});