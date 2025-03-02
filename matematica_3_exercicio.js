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
    const conteudoControle = document.getElementById('conteudoControle').value;
    const recursoDidatico = document.getElementById('recursoDidatico').value;


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
        document.getElementById('infoTema').innerHTML = `Tema: <strong>Exercícios   de aplicação sobre "${tema}".</strong>.`;
        document.getElementById('infoObjetivoEspecifico').innerHTML = `Objectivos Específicos: <strong>${objetivosText}</strong>.`;
        document.getElementById('infoTempo').innerText = `Tempo: ${tempo}; Duração: ${duracao}; Tipo de Aula: ${tipoDeAula}. `;
        document.getElementById('infoRecurso').innerText = ` Recursos Didácticos: ${recursoDidatico}.`;


        document.querySelector('.table-container').style.display = 'block';
        document.getElementById('lessonPlanForm').style.display = 'none';
        document.getElementById('infoContainer').style.display = 'flex';


        document.getElementById('generatePDF').style.display = 'block'; // Mostrar o botão PDF

        const table = document.getElementById('lessonPlanTable');
        const rows = table.getElementsByTagName('tbody')[0].rows;

        // Introdução e Motivação
        rows[0].cells[2].innerHTML = `<div class="left-align">- Saudação; - Marcaçãode presenças; -Recapitulação da aula passada;- Apresentação do novo tema..</div>`;
        rows[0].cells[3].innerHTML = `<div class="left-align">- Responde saudação; -Faz a correcção do TPC; -Faz a recapitulação; -Presta atenção.</div>`;

        // Mediação e Assimilação
        const conteudoMediacao = document.getElementById('conteudoMediacao').value.trim(); // Obtém o valor e remove espaços em branco extras

        // Verifica se conteudoMediacao está preenchido
        if (conteudoMediacao.trim() !== ''){
            rows[1].cells[2].innerHTML = `<div class="left-align"> Resumo sobre o tema: "${tema}"</strong> <br>Veja o resumo na pagina ${conteudoMediacao} do livro do aluno.</div>`;
        } else {
            rows[1].cells[2].innerHTML = `<div class="left-align"> Resumo sobre o tema: "${tema}"</strong> <br>Veja o resumo na pagina ${conteudoMediacao} do livro do aluno .</div>`;
        }
        rows[1].cells[3].innerHTML = `<div class="left-align">- Faz o resumo</div>`;

        // Domínio e Consolidação
        rows[2].cells[2].innerHTML = `<div class="left-align">Exercícios de aplicação. <br> ${conteudoDominio}.</div>`;
        rows[2].cells[3].innerHTML = `<div class="left-align">Resolve o exercício no caderno.</div>`;

        // Controle e Avaliação
        // Verifica se conteudoControle está preenchido
        if (conteudoControle.trim() !== '') {
            // Se preenchido, exibe "Marcação do TPC" seguido pelo conteúdo
            rows[3].cells[2].innerHTML = `<div class="left-align">Correção dos exercícios (Em anexo); <br> <br> <br>Marcação do TPC <br>${conteudoControle}</div>`;
        } else {
            // Se não preenchido, exibe apenas "Correção dos exercícios;"
            rows[3].cells[2].innerHTML = `<div class="left-align">Correção dos exercícios (Em anexo); <br>-Resumo da aula</div>`;
        }
        // Verifica se conteudoControle está preenchido
        if (conteudoControle.trim() !== '') {
            // Se preenchido, exibe o conteúdo com "Marca o TPC"
            rows[3].cells[3].innerHTML = `<div class="left-align">- Apresenta  o exercício; <br>- Anota o TPC;</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo com "Orienta o resumo"
            rows[3].cells[3].innerHTML = `<div class="left-align">- Apresenta  o exercício; <br>- Faz o resumo;</div>`;
        }
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

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