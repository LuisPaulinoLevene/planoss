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
    const conteudoControle = document.getElementById('conteudoControle').value || 'Em anexo';


    // Coleta todos os objetivos específicos
    const objetivosInputs = document.querySelectorAll('input[name="objetivoEspecifico"]');
    let objetivosText = '';
    objetivosInputs.forEach(input => {
        if (input.value) {
            objetivosText += `<br> - ${input.value}`;
        }
    });

    if (escola && data && nome && disciplina && classe && turma && unidadeTematica && tema && objetivosText && tempo && duracao && tipoDeAula) {
        document.getElementById('infoEscola').innerText = `${escola}`;
        document.getElementById('infoData').innerText = `Data: ${data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}`;
        document.getElementById('infoNome').innerText = `Nome: ${nome}, ${classe}, ${turma}`;
        document.getElementById('infoDisciplina').innerText = `Disciplina: ${disciplina}.`;
        document.getElementById('infoUnidadeTematica').innerText = `Unidade Temática: ${unidadeTematica}.`;
        document.getElementById('infoTema').innerHTML = `Tema: <strong>${tema}</strong>.`;
        document.getElementById('infoObjetivoEspecifico').innerHTML = `Objectivos Específicos: <strong>${objetivosText}</strong>.`;
        document.getElementById('infoTempo').innerText = `Tempo: ${tempo}; Duração: ${duracao}; Tipo de Aula: ${tipoDeAula}.`;

        document.querySelector('.table-container').style.display = 'block';
        document.getElementById('lessonPlanForm').style.display = 'none';
        document.getElementById('infoContainer').style.display = 'flex';


        document.getElementById('generatePDF').style.display = 'block'; // Mostrar o botão PDF

        const table = document.getElementById('lessonPlanTable');
        const rows = table.getElementsByTagName('tbody')[0].rows;

        // Introdução e Motivação
        rows[0].cells[1].innerHTML = `<div class="left-align"> -Recapitulação da aula anterior; - Apresentação do tema.</div>`;
        rows[0].cells[2].innerHTML = `<div class="left-align"> Orienta a recapitulação da aula anterior; - Apresenta o tema no quadro.</div>`;
        rows[0].cells[3].innerHTML = `<div class="left-align"> -Recapitula da aula anterior; Anota o tema.</div>`;
        rows[0].cells[4].innerHTML = `<div class="left-align">Elaboração Conjunta</div>`;
        rows[0].cells[5].innerHTML = `<div class="left-align">Quadro, giz e apagador</div>`;


        // Mediação e Assimilação
        const conteudoMediacao = document.getElementById('conteudoMediacao').value.trim(); // Obtém o valor e remove espaços em branco extras

        // Verifica se conteudoMediacao está preenchido
        if (conteudoMediacao) {
            rows[1].cells[1].innerHTML = `<div class="left-align"><strong>${tema}</strong>. <br><br> Veja os conteudos na página ${conteudoMediacao} do livro do aluno.</div>`;
        } else {
            rows[1].cells[1].innerHTML = `<div class="left-align"><strong>${tema}</strong>. <br><br>Apontamentos em anexo.</div>`;
        }

        // Verifica se conteudoMediacao está preenchido
        if (conteudoMediacao.trim() !== '') {
            // Se preenchido, exibe o conteúdo"
            rows[1].cells[2].innerHTML = `<div class="left-align">- Mostra as frase na pag. ${conteudoMediacao} do livro do aluno; -Escreve-as no quadro; -Orienta a leitura; Explica as regras de escrita; - Orienta a copia no livro do aluno.</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo
            rows[1].cells[2].innerHTML = `<div class="left-align"> -Escreve as frases no quadro; -Orienta a leitura; Explica as regras de escrita; - Orienta a copia no caderno do aluno.</div>`;
        }

        // Verifica se conteudoMediacao está preenchido
        if (conteudoMediacao.trim() !== '') {
            // Se preenchido, exibe o conteúdo"
            rows[1].cells[3].innerHTML = `<div class="left-align">- Observa as frases da pag. ${conteudoMediacao} do livro do aluno; - Observa a escrita no quadro; -Lê as frases no quadro; -Presta atenção na explicação das regras de escrita; -Copia as palavras no livro do aluno.</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo
            rows[1].cells[3].innerHTML = `<div class="left-align">  -Observa a escrita das frases no quadro; -Lê as frases no quadro; -Presta atenção na explicação das regras de escrita; -Copia as frases no caderno do aluno.</div>`;
        }

        rows[1].cells[4].innerHTML = `<div class="left-align">Elaboração Conjunta</div>`;
        rows[1].cells[5].innerHTML = `<div class="left-align">Quadro, giz e apagador</div>`;

        // Domínio e Consolidação
        rows[2].cells[1].innerHTML = `<div class="left-align">Exercícios  de aplicação. <br> <br> ${conteudoDominio} </div>`;
        rows[2].cells[2].innerHTML = `<div class="left-align">- Apresenta os exercícios; <br> -Orienta a resolução dos exercícios no caderno;</div>`;
        rows[2].cells[3].innerHTML = `<div class="left-align">- Anota os exercícios; <br>- Resolve os exercícios no caderno.</div>`;
        rows[2].cells[4].innerHTML = `<div class="left-align">Elaboração Conjunta e Trabalho Independente</div>`;
        rows[2].cells[5].innerHTML = `<div class="left-align">Quadro, giz, apagador e livro do aluno</div>`;


        // Controle e Avaliacao
        if (conteudoControle.trim() !== '') {
            // Se preenchido, exibe "Marcação do TPC" seguido pelo conteúdo
            rows[3].cells[1].innerHTML = `<div class="left-align">Correção dos exercícios (Em anexo); <br> <br> <br>Marcação do TPC <br>${conteudoControle}</div>`;
        } else {
            // Se não preenchido, exibe apenas "Correção dos exercícios;"
            rows[3].cells[1].innerHTML = `<div class="left-align">Correção dos exercícios (Em anexo); <br>-Resumo da aula</div>`;
        }
        // Verifica se conteudoControle está preenchido
        if (conteudoControle.trim() !== '') {
            // Se preenchido, exibe o conteúdo com "Marca o TPC"
            rows[3].cells[2].innerHTML = `<div class="left-align">- Orienta a correção dos exercícios no quadro; <br>- Marca o TPC;</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo com "Orienta o resumo"
            rows[3].cells[2].innerHTML = `<div class="left-align">- Orienta a correção dos exercícios no quadro; <br>- Orienta o resumo;</div>`;
        }

        // Verifica se conteudoControle está preenchido
        if (conteudoControle.trim() !== '') {
            // Se preenchido, exibe o conteúdo com "Marca o TPC"
            rows[3].cells[3].innerHTML = `<div class="left-align">- Corrige os exercícios no quadro;<br>- Aponta o TPC.</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo com "Orienta o resumo"
            rows[3].cells[3].innerHTML = `<div class="left-align">- Corrige os exercícios no quadro;<br>-Resume a aula.</div>`;
        }

        rows[3].cells[4].innerHTML = `<div class="left-align">Elaboração Conjunta e Trabalho Independente</div>`;
        rows[3].cells[5].innerHTML = `<div class="left-align">Quadro, giz, apagador e livro do aluno</div>`;
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}
function gerarPDF() {
    const { jsPDF } = window.jspdf;

    html2canvas(document.body).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // Largura em mm para o PDF
        const pageHeight = 350; // Altura em mm para o PDF
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