tinymce.init({
    selector: '#editor-container',
    plugins: 'advlist autolink lists link image charmap preview anchor textcolor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
    toolbar: 'undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | removeformat | bullist numlist | table | image media | preview code | fullscreen | emoticons template',
    menubar: 'file edit view insert format tools table help',
    height: 300,
    images_upload_handler: function (blobInfo, success, failure) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload_image'); // Substitua pelo endpoint do seu servidor

        xhr.onload = function() {
            if (xhr.status != 200) {
                failure('HTTP Error: ' + xhr.status);
                return;
            }
            var json = JSON.parse(xhr.responseText);
            if (!json || typeof json.location != 'string') {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
            }
            success(json.location);
        };

        xhr.onerror = function() {
            failure('Image upload failed due to a XHR transport error.');
        };

        var formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
        xhr.send(formData);
    }
});

// Função para processar a imagem com Tesseract.js
document.getElementById('process-image').addEventListener('click', async function() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    const processButton = document.getElementById('process-image');

    if (!file) {
        alert('Por favor, selecione uma imagem.');
        return;
    }

    // Substitui o texto do botão por "Aguarde..."
    processButton.textContent = 'Aguarde...';
    processButton.disabled = true; // Desativa o botão enquanto processa

    try {
        // Processa a imagem usando Tesseract.js
        const result = await Tesseract.recognize(
            file,
            'por', // Usa o idioma português para melhor reconhecimento de caracteres acentuados
            {
                logger: info => console.log(info) // Log do progresso
            }
        );

        // Adiciona o texto extraído ao final do conteúdo do editor
        const currentContent = tinymce.get('editor-container').getContent();
        const newText = result.data.text;
        const updatedContent = currentContent + '<br><br>' + newText;
        tinymce.get('editor-container').setContent(updatedContent);
    } catch (error) {
        console.error('Erro ao processar a imagem:', error);
        alert('Ocorreu um erro ao processar a imagem.');
    } finally {
        // Restaura o texto do botão e reativa-o
        processButton.textContent = 'Extrair texto da imagem carregada';
        processButton.disabled = false;
    }
});

// Função para realizar a busca na Wikipedia
document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const query = document.getElementById('search').value;
    const fullTextContainer = document.getElementById('full-text');

    try {
        // Primeira chamada para buscar os títulos dos artigos
        const searchResponse = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`);
        const searchData = await searchResponse.json();

        const searchResults = searchData.query.search;

        if (searchResults.length > 0) {
            const firstResult = searchResults[0];
            const title = firstResult.title;

            // Chamada para obter o texto completo do artigo
            const pageResponse = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&titles=${encodeURIComponent(title)}&format=json&origin=*`);
            const pageData = await pageResponse.json();
            const pages = pageData.query.pages;
            const page = Object.values(pages)[0];
            const extract = page.extract || 'Nenhum conteúdo encontrado para esta página.';

            fullTextContainer.innerHTML = `
                <h2>${title}</h2>
                <p>${extract}</p>
            `;
        } else {
            fullTextContainer.innerHTML = 'Nenhum resultado encontrado.';
        }
    } catch (error) {
        fullTextContainer.innerHTML = 'Ocorreu um erro ao buscar os resultados.';
        console.error(error);
    }
});

// Função para anexar o conteúdo do editor
document.getElementById('attach-content').addEventListener('click', function() {
    const editorContent = tinymce.get('editor-container').getContent();

    // Exibe apenas o conteúdo do anexo em toda a página
    document.getElementById('full-page-content').innerHTML = editorContent;
    document.getElementById('full-page').style.display = 'block';
    document.getElementById('main-container').style.display = 'none';
});

// Função para preparar a página para impressão
function prepareForPrint() {
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('full-page').style.display = 'block';
}

// Função para restaurar a página após impressão
function restoreAfterPrint() {
    document.getElementById('full-page').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
}

// Configura o botão "Salvar em PDF" para preparar e iniciar a impressão
document.getElementById('save-pdf').addEventListener('click', function() {
    prepareForPrint();
    window.print();
    window.onafterprint = restoreAfterPrint;
});