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

    if (escola && data && nome && disciplina && classe && turma && unidadeTematica && tema && objetivosText && tempo && duracao && tipoDeAula && recursoDidatico) {
        document.getElementById('infoEscola').innerText = `${escola}`;
        document.getElementById('infoData').innerText = `Data: ${data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}`;
        document.getElementById('infoNome').innerText = `Nome: ${nome}, ${classe}, ${turma}`;
        document.getElementById('infoDisciplina').innerText = `Disciplina: ${disciplina}.`;
        document.getElementById('infoUnidadeTematica').innerText = `Unidade Temática: ${unidadeTematica}.`;
        document.getElementById('infoTema').innerHTML = `Tema: <strong>${tema}</strong>.`;
        document.getElementById('infoObjetivoEspecifico').innerHTML = `Objectivos Específicos: <strong>${objetivosText}</strong>.`;
        document.getElementById('infoTempo').innerText = `Tempo: ${tempo}; Duração: ${duracao}; Tipo de Aula: ${tipoDeAula}. `;
        document.getElementById('infoRecurso').innerText = ` Recursos Didácticos: ${recursoDidatico}.`;

        // Exibir a tabela e as informações
        document.querySelector('.table-container').style.display = 'block';
        document.getElementById('lessonPlanForm').style.display = 'none';
        document.getElementById('infoContainer').style.display = 'flex';
        document.getElementById('generatePDF').style.display = 'block'; // Mostrar o botão PDF

        const table = document.getElementById('lessonPlanTable');
        const rows = table.getElementsByTagName('tbody')[0].rows;

        // Preenchendo a tabela com atividades
        rows[0].cells[2].innerHTML = `<div class="left-align"><strong>Saudação:</strong> <br>-Sauda aos alunos; <br>-<strong>Marcação de presenças:</strong> <br> -Marca as presenças;<br><strong>Correcção do TPC:</strong>  <br>-Orienta a correcção do TPC; <br>-<strong>Recapitulação da aula passada:</strong> <br>-Orienta a recapitulação da aula passada; <br><strong>Apresentação do novo tema:<br></strong> -Apresenta o novo tema; <br><strong>Apresentação dos objectivos da aula:</strong> <br> -Apresenta os objectivos da aula aos alunos;<br><strong>Apresentação do problema:</strong> <br>- Apresenta o problema em anexos.</div>`;
        rows[0].cells[3].innerHTML = `<div class="left-align">- Responde saudação; - Faz a correcção do TPC; - Faz a recapitulação; - Presta atenção; - Escuta e interpreta o problema.</div>`;

        rows[1].cells[2].innerHTML = `<div class="left-align"><strong>- Explicação do problema:</strong> <br> -Explica o problema em anexos</div>`;
        rows[1].cells[3].innerHTML = `<div class="left-align">- Resolve o problema</div>`;

        rows[2].cells[2].innerHTML = `<div class="left-align"><strong>Conclsão:</strong> <br> -Passa no quadro a conclusao em anexos; <br>- <strong>Resolução de exercícios</strong>; <br>-Orienta a resolucão dos exercícios.</div>`;
        rows[2].cells[3].innerHTML = `<div class="left-align">- Copia no caderno a conclusão; <br>- Resolve exercícios; <br>- Solicita ajuda se necessário.</div>`;

        // Controle e Avaliação
        if (conteudoControle.trim() !== '') {
            rows[3].cells[2].innerHTML = `<div class="left-align"><strong>Correção dos exercícios:</strong> <br> - Orienta a correcção dos exercícios em anexos; <br><strong>Marcação do TPC:</strong> <br>-Marca o TPC em anexos e explica como se resolve</div>`;
        } else {
            rows[3].cells[2].innerHTML = `<div class="left-align"><strong>Correção dos exercícios:</strong> <br> -Orienta a correcção dos exercícios em anexos; <br><strong>Resumo da aula:</strong> <br>-Orienta o resumo da aula.</div>`;
        }

        if (conteudoControle.trim() !== '') {
            rows[3].cells[3].innerHTML = `<div class="left-align">- Apresenta  os exercícios; <br>- Anota o TPC;</div>`;
        } else {
            rows[3].cells[3].innerHTML = `<div class="left-align">- Apresenta  os exercícios; <br>- Faz o resumo;</div>`;
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