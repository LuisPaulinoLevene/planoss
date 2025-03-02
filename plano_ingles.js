function adicionarObjetivo() {
    const container = document.getElementById('objetivosContainer');

    // Cria um novo input
    const novoInput = document.createElement('input');
    novoInput.type = 'text';
    novoInput.name = 'objetivoEspecifico';
    novoInput.required = true;
    novoInput.placeholder = 'Type a new specific objective';

    // Adiciona o novo input ao container
    container.appendChild(novoInput);
}

function removerObjetivo() {
    const container = document.getElementById("objetivosContainer");
    const inputs = container.getElementsByTagName("input");
    if (inputs.length > 1) {
        container.removeChild(inputs[inputs.length - 1]);
    } else {
        alert("Sorry, you should only remove the fields you have added.");
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
    const materialIntroducao = document.getElementById('materialIntroducao').value;
    const materialMediacao = document.getElementById('materialMediacao').value;
    const materialDominio = document.getElementById('materialDominio').value;
    const materialControlo = document.getElementById('materialControlo').value;

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
        document.getElementById('infoData').innerText = `Date: ${data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}`;
        document.getElementById('infoNome').innerText = `Name: ${nome}, ${classe}, ${turma}`;
        document.getElementById('infoDisciplina').innerText = `Subject: ${disciplina}.`;
        document.getElementById('infoUnidadeTematica').innerText = `Unit: ${unidadeTematica}.`;
        document.getElementById('infoTema').innerHTML = `Topic: <strong>${tema}</strong>.`;
        document.getElementById('infoObjetivoEspecifico').innerHTML = ` Específic Objectives: <strong>${objetivosText}</strong>.`;
        document.getElementById('infoTempo').innerText = `Time: ${tempo}; Duration: ${duracao}; Type of class: ${tipoDeAula}.`;

        document.querySelector('.table-container').style.display = 'block';
        document.getElementById('lessonPlanForm').style.display = 'none';
        document.getElementById('infoContainer').style.display = 'flex';


        document.getElementById('generatePDF').style.display = 'block'; // Mostrar o botão PDF

        const table = document.getElementById('lessonPlanTable');
        const rows = table.getElementsByTagName('tbody')[0].rows;

        // Introdução e Motivação
        rows[0].cells[1].innerHTML = `<div class="left-align">- Greating;<br>-Attendance control;<br>-Recap of previous class; <br>- Presention of the topic; <br>- Presentation of objectives.</div>`;
        rows[0].cells[2].innerHTML = `<div class="left-align">- Great's the student;<br>- Make the attendance control;<br>-Guide's the recapitulation;<br>-Write the topic on black board; <br>- Present's the class objectives</div>`;
        rows[0].cells[3].innerHTML = `<div class="left-align">- Great's the teacher;<br>- Answer the attendance control;<br>- Pay attention; <br>- Copy the topic; <br>-Pay attention</div>`;
        rows[0].cells[4].innerHTML = `<div class="left-align">-Joint preparation</div>`;
        if (materialIntroducao.trim() !== '') {
            // Se preenchido, exibe "Marcação do TPC" seguido pelo conteúdo
            rows[0].cells[5].innerHTML = `<div class="left-align">Board, Shalk, dusther, Theacher's guide, ${materialIntroducao}</div>`;
        } else {
            // Se não preenchido, exibe apenas "Correção dos exercícios;"
            rows[0].cells[5].innerHTML = `<div class="left-align">Board, Shalk, dusther, Theacher's guide</div>`;
        }

        // Mediação e Assimilação
        const conteudoMediacao = document.getElementById('conteudoMediacao').value.trim(); // Obtém o valor e remove espaços em branco extras

        // Verifica se conteudoMediacao está preenchido
        if (conteudoMediacao) {
            rows[1].cells[1].innerHTML = `<div class="left-align"><strong>${tema}</strong>. <br><br> See the notes on the page ${conteudoMediacao} on the student book.</div>`;
        } else {
            rows[1].cells[1].innerHTML = `<div class="left-align"><strong>${tema}</strong>. <br><br>Attached notes.</div>`;
        }
        rows[1].cells[2].innerHTML = `<div class="left-align">- Explain the topic and ask questions;<br>- Explore ideas;<br>- Synthesis student's ideas;<br>- Raise doubts; <br>- Clarify doubts; <br>- Write notes on the black board.</div>`;
        rows[1].cells[3].innerHTML = `<div class="left-align">- Listen and respond;<br>- Contribute whith ideas;<br>-Pay attention; The student presents doubts; <br>- Pay attention to doubts clarification of doubts; <br>-Copy the notes on exercises book.</div>`;
        rows[1].cells[4].innerHTML = `<div class="left-align">Joint preparation</div>`;
        if (materialMediacao.trim() !== '') {
            // Se preenchido, exibe "Marcação do TPC" seguido pelo conteúdo
            rows[1].cells[5].innerHTML = `<div class="left-align">Board, Shalk, dusther, Theacher's guide, ${materialMediacao}</div>`;
        } else {
            // Se não preenchido, exibe apenas "Correção dos exercícios;"
            rows[1].cells[5].innerHTML = `<div class="left-align">Board, Shalk, dusther, Theacher's guide</div>`;
        }

        // Domínio e Consolidação
        rows[2].cells[1].innerHTML = `<div class="left-align">Application exercises. <br> <br> ${conteudoDominio}.</div>`;
        rows[2].cells[2].innerHTML = `<div class="left-align">- Write exercises on the board.</div>`;
        rows[2].cells[3].innerHTML = `<div class="left-align">- Solve the exercises in the notebook.</div>`;
        rows[2].cells[4].innerHTML = `<div class="left-align">Joint preparation/Independent Work</div>`;

        if (materialDominio.trim() !== '') {
            // Se preenchido, exibe "Marcação do TPC" seguido pelo conteúdo
            rows[2].cells[5].innerHTML = `<div class="left-align">Board, Shalk, dusther, Theacher's guide, ${materialDominio}</div>`;
        } else {
            // Se não preenchido, exibe apenas "Correção dos exercícios;"
            rows[2].cells[5].innerHTML = `<div class="left-align">Board, Shalk, dusther, Theacher's guide</div>`;
        }

        // Controle e Avaliação
        // Verifica se conteudoControle está preenchido
        if (conteudoControle.trim() !== '') {
            // Se preenchido, exibe "Marcação do TPC" seguido pelo conteúdo
            rows[3].cells[1].innerHTML = `<div class="left-align">Correction of exercises; <br> <br> <br>Homework appointment <br>${conteudoControle}</div>`;
        } else {
            // Se não preenchido, exibe apenas "Correção dos exercícios;"
            rows[3].cells[1].innerHTML = `<div class="left-align">Correction of exercises; <br>-Resume</div>`;
        }
        // Verifica se conteudoControle está preenchido
        if (conteudoControle.trim() !== '') {
            // Se preenchido, exibe o conteúdo com "Marca o TPC"
            rows[3].cells[2].innerHTML = `<div class="left-align">- The teacher correct the exercises; <br>- The teacher schedules homework;</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo com "Orienta o resumo"
            rows[3].cells[2].innerHTML = `<div class="left-align">- The teacher correct the exercises; <br>- Guide the summary;</div>`;
        }

        // Verifica se conteudoControle está preenchido
        if (conteudoControle.trim() !== '') {
            // Se preenchido, exibe o conteúdo com "Marca o TPC"
            rows[3].cells[3].innerHTML = `<div class="left-align">- The student present the exercises;<br>- The student writes homework.</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo com "Orienta o resumo"
            rows[3].cells[3].innerHTML = `<div class="left-align">- The student present the exercises;<br>-The studente summarizes de class.</div>`;
        }



        if (conteudoControle.trim() !== '') {
            // Se preenchido, exibe o conteúdo com "Marca o TPC"
            rows[3].cells[4].innerHTML = `<div class="left-align">Independent Work</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo com "Orienta o resumo"
            rows[3].cells[4].innerHTML = `<div class="left-align">Joint preparation/Independent Work</div>`;
        }
        if (materialControlo.trim() !== '') {
            // Se preenchido, exibe "Marcação do TPC" seguido pelo conteúdo
            rows[3].cells[5].innerHTML = `<div class="left-align">Board, Shalk, dusther, Theacher's guide, ${materialControlo}</div>`;
        } else {
            // Se não preenchido, exibe apenas "Correção dos exercícios;"
            rows[3].cells[5].innerHTML = `<div class="left-align">Board, Shalk, dusther, Theacher's guide</div>`;
        }
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
        const pageHeight = 25; // Altura em mm para o PDF
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