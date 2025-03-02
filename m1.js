function adicionarObjetivo() {
    const container = document.getElementById('objetivosContainer');

    // Cria um novo input
    const novoInput = document.createElement('input');
    novoInput.type = 'text';
    novoInput.name = 'objetivoEspecifico';
    novoInput.required = true;
    novoInput.placeholder = 'Digite um novo objetivo específico';

    // Adiciona o novo input ao container
    container.appendChild(novoInput);
}

function removerObjetivo() {
    const container = document.getElementById("objetivosContainer");
    const inputs = container.getElementsByTagName("input");
    if (inputs.length > 1) {
        container.removeChild(inputs[inputs.length - 1]);
    } else {
        alert("Desculpa, Você deve remover apenas os campos por si adicionados.");
    }
}

let imagemCarregada = null; // Variável global para manter a URL da imagem carregada

function carregarEExibirImagem(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageUrl = e.target.result;
        exibirImagem(imageUrl);
        imagemCarregada = imageUrl; // Armazena a URL da imagem carregada globalmente
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

function exibirImagem(imageUrl) {
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = ''; // Limpa qualquer imagem anterior

    const img = document.createElement('img');
    img.src = imageUrl;
    img.id = 'preview-image';
    imageContainer.appendChild(img);
}

let imagemCarregada2 = null; // Variável global para manter a URL da imagem carregada

function carregarEExibirImagem2(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageUrl = e.target.result;
        exibirImagem2(imageUrl); // Chama a função correta para exibir a imagem
        imagemCarregada2 = imageUrl; // Armazena a URL da imagem carregada globalmente
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}

function exibirImagem2(imageUrl) {
    const imageContainer = document.getElementById('image-container2');
    imageContainer.innerHTML = ''; // Limpa qualquer imagem anterior

    const img = document.createElement('img');
    img.src = imageUrl;
    img.id = 'preview-image2'; // Corrige o ID da imagem
    imageContainer.appendChild(img);
}

function gerarPlano() {
    const escola = document.getElementById('escola').value;
    const data = document.getElementById('data').value;
    const nome = document.getElementById('nome').value;
    const disciplinaSelect = document.querySelector('select[name="disciplina"]');
    const classeSelect = document.querySelector('select[name="classe"]');
    const turmaSelect = document.querySelector('select[name="turma"]');
    const disciplina = disciplinaSelect.value;
    const classe = classeSelect.value;
    const turma = turmaSelect.value;
    const unidadeTematica = document.getElementById('unidadeTematica').value;
    const tema = document.getElementById('tema').value;
    const tempo = document.getElementById('tempo').value;
    const duracao = document.getElementById('duracao').value;
    const tipoDeAula = document.getElementById('tipoDeAula').value;
    const conteudoMediacao = document.getElementById('conteudoMediacao').value || 'Em anexo';
    const conteudoDominio = document.getElementById('conteudoDominio').value || 'Em anexo';
    const conteudoControle = document.getElementById('conteudoControle').value;
    const recursoDidatico = document.getElementById('recursoDidatico').value;
    const problema = document.getElementById('problema').value;
    const problema1 = document.getElementById('problema1').value;


    // Coleta todos os objetivos específicos
    const objetivosInputs = document.querySelectorAll('input[name="objetivoEspecifico"]');
    let objetivosText = '';
    objetivosInputs.forEach(input => {
        if (input.value) {
            objetivosText += `<br> - ${input.value}`;
        }
    });

    if (escola && data && nome && disciplina && classe && turma && unidadeTematica && tema && objetivosText && tempo && duracao && tipoDeAula && recursoDidatico && problema1 && conteudoMediacao) {
        document.getElementById('infoEscola').innerText = `${escola}`;
        document.getElementById('infoData').innerText = `Data: ${data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}`;
        document.getElementById('infoNome').innerText = `Nome: ${nome}, ${classe}, ${turma}`;
        document.getElementById('infoDisciplina').innerText = `Disciplina: ${disciplina}.`;
        document.getElementById('infoUnidadeTematica').innerText = `Unidade Temática: ${unidadeTematica}.`;
        document.getElementById('infoTema').innerHTML = `Tema: <strong>${tema}</strong>.`;
        document.getElementById('infoObjetivoEspecifico').innerHTML = `Objectivos Específicos: Até ao final da aula, o aluno deve ser capaz de: <strong>${objetivosText}</strong>.`;
        document.getElementById('infoTempo').innerText = `Tempo: ${tempo}; Duração: ${duracao}; Tipo de Aula: ${tipoDeAula}. `;
        document.getElementById('infoRecurso').innerText = ` Recursos Didácticos: ${recursoDidatico}.`;


        document.querySelector('.table-container').style.display = 'block';
        document.getElementById('lessonPlanForm').style.display = 'none';
        document.getElementById('infoContainer').style.display = 'flex';

        document.getElementById('generatePDF').style.display = 'block'; // Mostrar o botão PDF

        const table = document.getElementById('lessonPlanTable');
        const rows = table.getElementsByTagName('tbody')[0].rows;

        // Introdução e Motivação
        rows[0].cells[2].innerHTML = `<div class="left-align">Saudação; - Marcação de presenças; -Correcção do TPC; -Recapitulação da aula passada;- Apresentação do novo tema;- Apresentação dos objectivos da aula; Apresentação do problema patente na Pág. ${problema1}</div>`;
        rows[0].cells[3].innerHTML = `<div class="left-align">- Responde saudação; -Faz a correcção do TPC; -Faz a recapitulação; -Presta atenção; Escuta e interpreta o problema.</div>`;

        // Mediação e Assimilação
        if (imagemCarregada !== null) {
            rows[1].cells[2].innerHTML = `
                <div>
                    <p style="font-weight: bold;">Explicação do Problema</p>
                    <img src="${imagemCarregada}" alt="Imagem carregada" style="max-width: 100%; max-height: 50%; width: 80%;">
                </div>`;
        } else {
            if (problema.trim() !== '') {
                // Substituir quebras de linha por <br> para manter formatação
                let problemaFormatado = problema.replace(/\n/g, '<br>');

                rows[1].cells[2].innerHTML = `
                    <div class="left-align">
                    <p style="font-weight: bold;">Explicação do Problema</p>
                    <br>${problemaFormatado}
                    </div>`;
            } else {
                rows[1].cells[2].innerHTML = `
                    <div class="left-align">
                    <p style="font-weight: bold;">Explicação do Problema</p>
                        Explica o problema da página ${conteudoMediacao} do livro do aluno.
                    </div>`;
            }
        }


        rows[1].cells[3].innerHTML = `<div class="left-align">- Resolve o problema.</div>`;

        // Domínio e Consolidação
        if (imagemCarregada2 !== null) {
            // Substituir quebras de linha por <br> para manter formatação
            let conteudoFormatado = conteudoDominio.replace(/\n/g, '<br>');

            rows[2].cells[2].innerHTML = `
                <div>
                    <p style="font-weight: bold;">Conclusão</p>
                    <img src="${imagemCarregada2}" alt="Imagem carregada" style="max-width: 100%; max-height: 50%; width: 80%;">
                    <br>
                    <p style="font-weight: bold;">Exercícios</p>
                    ${conteudoFormatado} <!-- Usando o conteúdo formatado -->
                </div>`;
        }


        rows[2].cells[3].innerHTML = `<div class="left-align">- Copia a conclusao para o caderno; Resolve o exercício no caderno.</div>`;

        // Controle e Avaliação
        if (conteudoControle.trim() !== '') {
            rows[3].cells[2].innerHTML = `<div class="left-align">Correção dos exercícios (Em anexo); <br> <br> <br>Marcação do TPC <br>${conteudoControle}</div>`;
        } else {
            rows[3].cells[2].innerHTML = `<div class="left-align">Correção dos exercícios (Em anexo); <br>-Resumo da aula</div>`;
        }

        if (conteudoControle.trim() !== '') {
            rows[3].cells[3].innerHTML = `<div class="left-align">- Apresenta  o exercício; <br>- Anota o TPC;</div>`;
        } else {
            rows[3].cells[3].innerHTML = `<div class="left-align">- Apresenta  o exercício; <br>- Faz o resumo;</div>`;
        }
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

const uploadImage = document.getElementById('upload-image');
uploadImage.addEventListener('change', carregarEExibirImagem);
const uploadImage2 = document.getElementById('upload-image2');
uploadImage2.addEventListener('change', carregarEExibirImagem2);



function gerarPDF() {
    const { jsPDF } = window.jspdf;

    html2canvas(document.body).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // Largura em mm para o PDF
        const pageHeight = 295; // Altura em mm para o PDF
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('plano_de_aula.pdf');
    });
}