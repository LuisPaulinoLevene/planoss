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
    const aquecimento = document.getElementById('aquecimento').value;
    const jogoAquecimento = document.getElementById('jogoAquecimento').value;
    const relaxamento = document.getElementById('relaxamento').value;
    const jogoRelaxamento = document.getElementById('jogoRelaxamento').value;
    const recursoAquecimento = document.getElementById('recursoAquecimento').value;
    const recursoPrincipal = document.getElementById('recursoPrincipal').value;
    const recursoRelaxamento = document.getElementById('recursoRelaxamento').value;
    const organizacao = document.getElementById('organizacao').value;

    // Coleta todos os objetivos específicos
    const objetivosInputs = document.querySelectorAll('input[name="objetivoEspecifico"]');
    let objetivosText = '';
    objetivosInputs.forEach(input => {
        if (input.value) {
            objetivosText += `<br> - ${input.value}`;
        }
    });

    if (escola && data && nome && disciplina && classe && turma && unidadeTematica && tema && objetivosText && tempo && duracao && tipoDeAula && aquecimento && relaxamento && recursoAquecimento && recursoPrincipal && recursoRelaxamento) {
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

        // Parte Inicial

        if (jogoAquecimento.trim() !== '') {
            // Se preenchido, exibe o conteúdo"
            rows[0].cells[1].innerHTML = `<div class="left-align">-Controlo de presenças; -Apresentação do jogo de aquecimento (${jogoAquecimento});-Explicação das regras do jogo; -Exemplificação do jogo; -Realização do jogo.</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo
            rows[0].cells[1].innerHTML = `<div class="left-align">-Controlo de presenças; -Apresentação das actividades de aquecimento (${aquecimento}); -Explicação; -Exemplificação; -Realização da actividade.</div>`;
        }

        //Verificacao
        if (jogoAquecimento.trim() !== '') {
            // Se preenchido, exibe o conteúdo"
            rows[0].cells[2].innerHTML = `<div class="left-align">-Faz o controlo de presenças; -Apresenta o jogo; -Explica as regras do jogo; -Exemplifica o jogo; Orienta a realização do jogo.</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo
            rows[0].cells[2].innerHTML = `<div class="left-align">-Faz o controlo de presenças; -Apresenta a actividade de aquecimento;  Explica a actividade; -Exemplifica a actividade; -Orienta a realização da actividade.</div>`;
        }

        //Verificacao
        if (jogoAquecimento.trim() !== '') {
            // Se preenchido, exibe o conteúdo"
            rows[0].cells[3].innerHTML = `<div class="left-align">-Responde a presença; - Presta atenção na apresentação do jogo; -Presta atenção na explicação das regras do jogo; -Observa a exemplificação do professor; ; Realiza o jogo.</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo
            rows[0].cells[3].innerHTML = `<div class="left-align">-Responde a presença; - Presta atenção na apresentação da actividade;  Presta atenção na explicação da actividade; -Observa a exemplificação do professor; -Realiza a actividade.</div>`;
        }

        rows[0].cells[4].innerHTML = `<div class="left-align">Elaboração Conjunta</div>`;
        rows[0].cells[5].innerHTML = `<div class="left-align">${recursoAquecimento}</div>`;

        // Parte Principal
        rows[1].cells[1].innerHTML = `<div class="left-align"> -Organização dos alunos ${organizacao}; -Apresentação do tema (${tema}); -Explicação das actividades a realizar; -Exemplifação da actividades a realizar; Realização das activadades.</div>`;
        rows[1].cells[2].innerHTML = `<div class="left-align"> -Organiza os alunos ${organizacao}; -Apresenta o tema; -Explica as actividades a realizar; -Exemplifaca as actividades; Orienta a realização das activadades.</div>`;
        rows[1].cells[3].innerHTML = `<div class="left-align"> -Fica organizado ${organizacao}; -Presta atenção na apresenta o tema; -Presta atenção na explicação das actividades a realizar; -Observa a exemplificação do professor; Realiza as activadades orientadas.</div>`;
        rows[1].cells[4].innerHTML = `<div class="left-align">Elaboração Conjunta</div>`;
        rows[1].cells[5].innerHTML = `<div class="left-align">${recursoPrincipal}</div>`;

        // Parte Final
        if (jogoRelaxamento.trim() !== '') {
            // Se preenchido, exibe o conteúdo"
            rows[2].cells[1].innerHTML = `<div class="left-align">-Apresentação do jogo (${jogoRelaxamento}); -Explicação das regras do jogo; -Exemplificação do jogo; -Realização do jogo; Breve convesa sobre a aula.</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo
            rows[2].cells[1].innerHTML = `<div class="left-align">-Apresentação da actividade de relaxamento (${relaxamento}); -Explicação; -Exemplificação; -Realização da actividade de relaxamento; Breve convesa sobre a aula.</div>`;
        }

        //Verificacao
        if (jogoRelaxamento.trim() !== '') {
            // Se preenchido, exibe o conteúdo"
            rows[2].cells[2].innerHTML = `<div class="left-align">- Apresenta o jogo; -Explica as regras do jogo; -Exemplifica o jogo; Orienta a realização do jogo; -Orienta uma breve convesa sobre a aula.</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo
            rows[2].cells[2].innerHTML = `<div class="left-align"> - Apresenta a actividade;  Explica a actividade; -Exemplifica a actividade; -Orienta a realização da actividade; -Orienta uma breve convesa sobre a aula.</div>`;
        }

        //Verificacao
        if (jogoRelaxamento.trim() !== '') {
            // Se preenchido, exibe o conteúdo"
            rows[2].cells[3].innerHTML = `<div class="left-align">- Presta atenção na apresentação do jogo; -Presta atenção na explicação das regras do jogo; -Observa a exemplificação do professor; -Realiza o jogo; Participa na breve convesa sobre a aula.</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo
            rows[2].cells[3].innerHTML = `<div class="left-align">- Presta atenção na apresentação da actividade;  Presta atenção na explicação da actividade; -Observa a exemplificação do professor; -Realiza a actividade; -Participa na breve convesa sobre a aula.</div>`;
        }
        rows[2].cells[4].innerHTML = `<div class="left-align">Elaboração Conjunta </div>`;
        rows[2].cells[5].innerHTML = `<div class="left-align">${recursoRelaxamento}</div>`;
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