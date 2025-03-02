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
document.addEventListener('DOMContentLoaded', function () {
    const textareas = document.querySelectorAll('textarea');

    textareas.forEach(textarea => {
        textarea.addEventListener('input', adjustHeight);
        textarea.addEventListener('focus', adjustHeight); // Ajusta a altura quando o textarea ganha foco
        textarea.addEventListener('blur', adjustHeight);  // Ajusta a altura quando o textarea perde foco
    });

    function adjustHeight(event) {
        const textarea = event.target;
        textarea.style.height = 'auto'; // Reseta a altura para calcular o novo valor
        textarea.style.height = `${textarea.scrollHeight}px`; // Define a altura para o scrollHeight
    }

    // Ajusta a altura de todos os textareas na carga inicial
    textareas.forEach(textarea => {
        adjustHeight({ target: textarea });
    });
});
function escaparHTML(texto) {
    return texto
        .replace(/&/g, '&amp;')  // Substitui & por &amp;
        .replace(/</g, '&lt;')   // Substitui < por &lt;
        .replace(/>/g, '&gt;')   // Substitui > por &gt;
        .replace(/"/g, '&quot;') // Substitui " por &quot;
        .replace(/'/g, '&#39;'); // Substitui ' por &#39;
}
// Função para converter quebras de linha em <br>
function converterQuebrasDeLinha(texto) {
    return texto.replace(/\n/g, '<br>');
}

function gerarPlano() {
    const escola = document.getElementById('escola').value;
    const data = document.getElementById('data').value;
    const nome = document.getElementById('nome').value;
    const disciplinaSelect = document.querySelector('select[name="disciplina"]');
    const classeSelect = document.querySelector('select[name="classe"]');
    const disciplina = disciplinaSelect.value;
    const classe = classeSelect.value;
    const turma = document.getElementById('turma').value;
    const unidadeTematica = document.getElementById('unidadeTematica').value;
    const tema = document.getElementById('tema').value;
    const tempo = document.getElementById('tempo').value;
    const duracao = document.getElementById('duracao').value;
    const tipoDeAula = document.getElementById('tipoDeAula').value;
    const conteudoMediacao = document.getElementById('conteudoMediacao').value;
    const conteudoDominio = document.getElementById('conteudoDominio').value;
    const conteudoControle = document.getElementById('conteudoControle').value;
    const materialIntroducao = document.getElementById('materialIntroducao').value;
    const materialMediacao = document.getElementById('materialMediacao').value;
    const materialDominio = document.getElementById('materialDominio').value;
    const materialControlo = document.getElementById('materialControlo').value;
    const Obs1 = document.getElementById('Obs1').value;
    const Obs2 = document.getElementById('Obs2').value;
    const Obs3 = document.getElementById('Obs3').value;
    const Obs4 = document.getElementById('Obs4').value;
    const duracao1 = document.getElementById('duracao1').value;
    const duracao2 = document.getElementById('duracao2').value;
    const duracao3 = document.getElementById('duracao3').value;
    const duracao4 = document.getElementById('duracao4').value;
    const transversal = document.getElementById('transversal').value;
    const subtemas = document.getElementById('subtemas').value;


    // Coleta todos os objetivos específicos
    const objetivosInputs = document.querySelectorAll('input[name="objetivoEspecifico"]');
    let objetivosText = '';
    objetivosInputs.forEach(input => {
        if (input.value) {
            objetivosText += `<br> - ${input.value}`;
        }
    });

    if (escola && data && nome && disciplina && classe && turma && unidadeTematica && tema && objetivosText && tempo && duracao && tipoDeAula && duracao1 && duracao2 && duracao3 && duracao4) {
        document.getElementById('infoEscola').innerText = `${escola}`;
        document.getElementById('infoData').innerText = `Data: ${data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}`;
        document.getElementById('infoNome').innerText = `Nome: ${nome}, ${classe}, Turma: ${turma}`;
        document.getElementById('infoDisciplina').innerText = `Disciplina: ${disciplina}.`;
        document.getElementById('infoUnidadeTematica').innerText = `Unidade Temática: ${unidadeTematica}.`;
        document.getElementById('infoTema').innerHTML = `Tema: <strong>${tema}</strong>.`;
        document.getElementById('infoTransversal').innerHTML = `Tema transversal: <strong>${transversal}</strong>`;
        document.getElementById('infoObjetivoEspecifico').innerHTML = `Objectivos Específicos: <strong>${objetivosText}</strong>.`;
        document.getElementById('infoTempo').innerText = `Tempo: ${tempo}; Duração: ${duracao} minutos; Tipo de Aula: ${tipoDeAula}.`;

        document.querySelector('.table-container').style.display = 'block';
        document.getElementById('lessonPlanForm').style.display = 'none';
        document.getElementById('infoContainer').style.display = 'flex';
        document.getElementById('generatePDF').style.display = 'block'; // Mostrar o botão PDF

        const table = document.getElementById('lessonPlanTable');
        const rows = table.getElementsByTagName('tbody')[0].rows;

        // Introdução e Motivação
        rows[0].cells[1].innerHTML = `<div class="left-align">${duracao1}'</div>`;
        rows[0].cells[2].innerHTML = `<div class="left-align">• Saudação;<br>• Controle de presenças;<br>• Recapitulação da aula anterior; <br>• Correção do TPC; <br>• Apresentação do tema; <br>• Apresentação dos objetivos da aula.</div>`;
        rows[0].cells[3].innerHTML = `<div class="left-align">• Responde a saudação; <br>• Faz o controle de presenças;<br>• Orienta a recapitulação da aula anterior; <br>• Corrige o TPC;<br>• Apresenta o tema; <br>• Apresenta os objetivos da aula.</div>`;
        rows[0].cells[4].innerHTML = `<div class="left-align">• Saudam; <br>• Respondem as presenças;<br>• Recapitulam a aula anterior; <br>• Apresentam o TPC; <br>• Ficam atentos <br>• Prestam atenção na apresentação dos objetivos da aula.</div>`;
        rows[0].cells[5].innerHTML = `<div class="left-align">Elaboração Conjunta e Expositivo</div>`;

        if (materialIntroducao.trim() !== '') {
            rows[0].cells[6].innerHTML = `<div class="left-align">Quadro, giz, apagador, livro do aluno, ${materialIntroducao}</div>`;
        } else {
            rows[0].cells[6].innerHTML = `<div class="left-align">Quadro, giz, apagador e livro do aluno</div>`;
        }

        if (Obs1.trim() !== '') {
            rows[0].cells[7].innerHTML = `<div class="left-align">${Obs1}</div>`;
        } else {
            rows[0].cells[7].innerHTML = `<div class="left-align"></div>`;
        }

        // Mediação e Assimilação
        rows[1].cells[1].innerHTML = `<div class="left-align">${duracao2}'</div>`;

        if (conteudoMediacao.trim() !== '') {
            rows[1].cells[2].innerHTML = `<div class="left-align"><strong>${tema}</strong>. <br><br>${converterQuebrasDeLinha(subtemas)};<br><br> Veja os apontamentos na página ${conteudoMediacao} do livro do aluno.</div>`;
        } else {
            rows[1].cells[2].innerHTML = `<div class="left-align"><strong>${tema}</strong>. <br><br>${converterQuebrasDeLinha(subtemas)};<br><br> Apontamentos em anexo.</div>`;
        }
        // Função para converter quebras de linha em <br>
        function converterQuebrasDeLinha(texto) {
            return texto.replace(/\n/g, '<br>');
        }

        rows[1].cells[3].innerHTML = `<div class="left-align">• Explora os conhecimentos sobre ${tema};<br>• Sistematiza as ideias dos alunos sequencilmente; <br>• Esclarece as dúvidas caso existam; <br>• Dita os apontamentos.</div>`;
        rows[1].cells[4].innerHTML = `<div class="left-align">• Contribuem com os seus pontos de vista;<br>• Prestam atenção na sistematização das ideias;<br>• Prestam atenção no esclarecimento das dúvidas; <br>• Tomam notas dos apontamentos no caderno.</div>`;
        rows[1].cells[5].innerHTML = `<div class="left-align">Elaboração Conjunta</div>`;

        if (materialMediacao.trim() !== '') {
            rows[1].cells[6].innerHTML = `<div class="left-align">Quadro, giz, apagador, livro do aluno, ${materialMediacao}</div>`;
        } else {
            rows[1].cells[6].innerHTML = `<div class="left-align">Quadro, giz, apagador e livro do aluno</div>`;
        }

        if (Obs2.trim() !== '') {
            rows[1].cells[7].innerHTML = `<div class="left-align">${Obs2}</div>`;
        } else {
            rows[1].cells[7].innerHTML = `<div class="left-align"></div>`;
        }

        // Domínio e Consolidação
        rows[2].cells[1].innerHTML = `<div class="left-align">${duracao3}'</div>`;
        if (conteudoDominio.trim() !== '') {
            rows[2].cells[2].innerHTML = `<div class="left-align">• Exercícios  de aplicação. <br> ${conteudoDominio}.</div>`;
        } else {
            rows[2].cells[2].innerHTML = `<div class="left-align">• Síntese da aula; <br><br> •Perguntas orais.</div>`;
        }

        if (conteudoDominio.trim() !== '') {
            rows[2].cells[3].innerHTML = `<div class="left-align">• Apresenta os exercícios; <br>• Orienta a resolução dos exercícios.</div>`;
        } else {
            rows[2].cells[3].innerHTML = `<div class="left-align">• Sintetiza a aula; <br><br> •Dirige perguntas orais aos alunos.</div>`;
        }

        if (conteudoDominio.trim() !== '') {
            rows[2].cells[4].innerHTML = `<div class="left-align">• Anota os exercícios no caderno; <br>• Resolve os exercícios no caderno.</div>`;
        } else {
            rows[2].cells[4].innerHTML = `<div class="left-align">• Prestam atenção; <br><br> •Respondem as questões.</div>`;
        }

        rows[2].cells[5].innerHTML = `<div class="left-align">Elaboração Conjunta e Trabalho Independente</div>`;

        if (materialDominio.trim() !== '') {
            rows[2].cells[6].innerHTML = `<div class="left-align">Quadro, giz, apagador, livro do aluno, ${materialDominio}</div>`;
        } else {
            rows[2].cells[6].innerHTML = `<div class="left-align">Quadro, giz, apagador e livro do aluno</div>`;
        }

        if (Obs2.trim() !== '') {
            rows[1].cells[7].innerHTML = `<div class="left-align">${Obs2}</div>`;
        } else {
            rows[1].cells[7].innerHTML = `<div class="left-align"></div>`;
        }

        if (Obs2.trim() !== '') {
            rows[1].cells[7].innerHTML = `<div class="left-align">${Obs2}</div>`;
        } else {
            rows[1].cells[7].innerHTML = `<div class="left-align"></div>`;
        }


        if (Obs3.trim() !== '') {
            rows[2].cells[7].innerHTML = `<div class="left-align">${Obs3}</div>`;
        } else {
            rows[2].cells[7].innerHTML = `<div class="left-align"></div>`;
        }

        // Controle e Avaliação
        rows[3].cells[1].innerHTML = `<div class="left-align">${duracao4}'</div>`;

        if (conteudoControle.trim() !== '') {
            rows[3].cells[2].innerHTML = `<div class="left-align">• Correção dos exercícios; <br>• Marcação do TPC <br>${conteudoControle}</div>`;
            rows[3].cells[3].innerHTML = `<div class="left-align">• Corrige os exercícios; <br>• Marca o TPC;</div>`;
            rows[3].cells[4].innerHTML = `<div class="left-align">• Apresentam os exercícios; <br>• Aponta o TPC.</div>`;
            rows[3].cells[5].innerHTML = `<div class="left-align">Elaboração Conjunta e Trabalho Independente</div>`;
        } else {
            rows[3].cells[2].innerHTML = `<div class="left-align">• Correção dos exercícios; <br>• Considerações finais da aula</div>`;
            rows[3].cells[3].innerHTML = `<div class="left-align">• Corrige dos exercícios; <br>• Dá as considerações finais;</div>`;
            rows[3].cells[4].innerHTML = `<div class="left-align">• Apresentam os exercícios; <br>• Prestam atenção.</div>`;
            rows[3].cells[5].innerHTML = `<div class="left-align">Elaboração Conjunta</div>`;
        }

        if (materialControlo.trim() !== '') {
            rows[3].cells[6].innerHTML = `<div class="left-align">Quadro, giz, apagador, livro do aluno, ${materialControlo}</div>`;
        } else {
            rows[3].cells[6].innerHTML = `<div class="left-align">Quadro, giz, apagador e livro do aluno</div>`;
        }

        if (Obs4.trim() !== '') {
            rows[3].cells[7].innerHTML = `<div class="left-align">${Obs4}</div>`;
        } else {
            rows[3].cells[7].innerHTML = `<div class="left-align"></div>`;
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