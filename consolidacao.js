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
        document.getElementById('infoData').innerText = `Data: ${data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}`;
        document.getElementById('infoNome').innerText = `Nome: ${nome}, ${classe}, ${turma}`;
        document.getElementById('infoDisciplina').innerText = `Disciplina: ${disciplina}.`;
        document.getElementById('infoUnidadeTematica').innerText = `Unidade Temática: ${unidadeTematica}.`;
        document.getElementById('infoTema').innerHTML = `Tema: <strong> Exercicios de consolidação  da unidade temática "${unidadeTematica}".</strong>.`;
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
        if (materialIntroducao.trim() !== '') {
            // Se preenchido, exibe "Marcação do TPC" seguido pelo conteúdo
            rows[0].cells[5].innerHTML = `<div class="left-align">Quadro, giz, apagador, livro do aluno, ${materialIntroducao}</div>`;
        } else {
            // Se não preenchido, exibe apenas "Correção dos exercícios;"
            rows[0].cells[5].innerHTML = `<div class="left-align">Quadro, giz, apagador e livro do aluno</div>`;
        }

        // Mediação e Assimilação
        const conteudoMediacao = document.getElementById('conteudoMediacao').value.trim(); // Obtém o valor e remove espaços em branco extras

        // Verifica se conteudoMediacao está preenchido
        if (conteudoMediacao) {
            rows[1].cells[1].innerHTML = `<div class="left-align"><strong>Resumo  da unidade temática: ${unidadeTematica}.</strong></div>`;
        } else {
            rows[1].cells[1].innerHTML = `<div class="left-align"><strong>Resumo  da unidade temática: ${unidadeTematica}.</strong></div>`;
        }
        rows[1].cells[2].innerHTML = `<div class="left-align">- Orienta o resumo do conteudos da unidade temática ${unidadeTematica}.</div>`;
        rows[1].cells[3].innerHTML = `<div class="left-align">- Resume os conteudos da unidade temática ${unidadeTematica}.</div>`;
        rows[1].cells[4].innerHTML = `<div class="left-align">Elaboração Conjunta</div>`;
        if (materialMediacao.trim() !== '') {
            // Se preenchido, exibe "Marcação do TPC" seguido pelo conteúdo
            rows[1].cells[5].innerHTML = `<div class="left-align">Quadro, giz, apagador, livro do aluno, ${materialMediacao}</div>`;
        } else {
            // Se não preenchido, exibe apenas "Correção dos exercícios;"
            rows[1].cells[5].innerHTML = `<div class="left-align">Quadro, giz, apagador e livro do aluno</div>`;
        }

        // Domínio e Consolidação
        rows[2].cells[1].innerHTML = `<div class="left-align">Exercícios de consolidação. <br> <br> ${conteudoDominio} </div>`;
        rows[2].cells[2].innerHTML = `<div class="left-align">- Apresenta os exercícios; <br> -Orienta a resolução dos exercícios no caderno;</div>`;
        rows[2].cells[3].innerHTML = `<div class="left-align">- Anota os exercícios; <br>- Resolve os exercícios no caderno.</div>`;
        rows[2].cells[4].innerHTML = `<div class="left-align">Elaboração Conjunta e Trabalho Independente</div>`;

        if (materialDominio.trim() !== '') {
            // Se preenchido, exibe "Marcação do TPC" seguido pelo conteúdo
            rows[2].cells[5].innerHTML = `<div class="left-align">Quadro, giz, apagador, livro do aluno, ${materialDominio}</div>`;
        } else {
            // Se não preenchido, exibe apenas "Correção dos exercícios;"
            rows[2].cells[5].innerHTML = `<div class="left-align">Quadro, giz, apagador e livro do aluno</div>`;
        }

        // Controle e Avaliação
        // Verifica se conteudoControle está preenchido
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



        if (conteudoControle.trim() !== '') {
            // Se preenchido, exibe o conteúdo com "Marca o TPC"
            rows[3].cells[4].innerHTML = `<div class="left-align">Elaboração Conjunta e Trabalho Independente</div>`;
        } else {
            // Se não preenchido, exibe o conteúdo com "Orienta o resumo"
            rows[3].cells[4].innerHTML = `<div class="left-align">Elaboração Conjunta</div>`;
        }

        if (materialControlo.trim() !== '') {
            // Se preenchido, exibe "Marcação do TPC" seguido pelo conteúdo
            rows[3].cells[5].innerHTML = `<div class="left-align">Quadro, giz, apagador, livro do aluno, ${materialControlo}</div>`;
        } else {
            // Se não preenchido, exibe apenas "Correção dos exercícios;"
            rows[3].cells[5].innerHTML = `<div class="left-align">Quadro, giz, apagador e livro do aluno</div>`;
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