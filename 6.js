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
        rows[0].cells[3].innerHTML = `<div class="left-align">• Responde a saudação; <br>• Faz o controle de presenças;<br>• Indica um aluno para fazer a recapitulação da aula anterior e intervê caso necessário; <br>• Indica um aluno para fazer a correcção do TPC e intervê caso necessário;<br>• Apresenta o tema; <br>• Apresenta os objetivos da aula.</div>`;
        rows[0].cells[4].innerHTML = `<div class="left-align">• Saudam; <br>• Respondem as presenças;<br>• Levanta-se o aluno indicado, faz a recapitulação e os outros prestam atenção; <br>• Levanta-se o aluno indicado, aprsenta o TPC e os outros ficam atentos; <br>• Prestam atenção na aprsentação do tema; <br>• Prestam atenção na apresentação dos objetivos da aula.</div>`;
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
            rows[1].cells[2].innerHTML = `<div class="left-align"><strong>${tema}</strong>. <br><br>${converterQuebrasDeLinha(subtemas)};<br><br> N.B.: Veja os apontamentos na página ${conteudoMediacao}, no livro do aluno.</div>`;
        } else {
            rows[1].cells[2].innerHTML = `<div class="left-align"><strong>${tema}</strong>. <br><br>${converterQuebrasDeLinha(subtemas)};<br><br> Apontamentos em anexo.</div>`;
        }
        // Função para converter quebras de linha em <br>
        function converterQuebrasDeLinha(texto) {
            return texto.replace(/\n/g, '<br>');
        }

        rows[1].cells[3].innerHTML = `<div class="left-align">• Indica um aluno a cada vez para dizer os seus pontos de vista sobre o tema;<br>• Anota os pontos de vista dos alunos;<br>• Sistematiza as ideias dos alunos; <br>• Levanta as dúvidas;<br>•  Pede um aluno para esclarecer as dúvidas caso existam e intervê caso necessário; <br>• Dita os apontamentos.</div>`;
        rows[1].cells[4].innerHTML = `<div class="left-align">• Levanta-se o aluno indicado, diz os seus pontos de vista e os outros anotam os pontos de vista;<br>• Prestam atenção na sistematização das ideias; <br>• Apresentam as dúvidas;<br>• Levanta-se o aluno voluntário, esclarece as dúvidas e os ourtos prestam atenção; <br>• Tomam notas dos apontamentos.</div>`;
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
            rows[2].cells[3].innerHTML = `<div class="left-align">• Indica um aluno para fazer a síntese e intervê caso necessário; <br> •Faz uma pergunta oral a cada vez aos alunos e indica um aluno para responder.</div>`;
        }

        if (conteudoDominio.trim() !== '') {
            rows[2].cells[4].innerHTML = `<div class="left-align">• Anota os exercícios no caderno; <br>• Resolve os exercícios no caderno.</div>`;
        } else {
            rows[2].cells[4].innerHTML = `<div class="left-align">• Levanta-se o aluno indicado, faz a síntese e os outros prestam atenção; <br>• Levanta-se o aluno indicado, responde as questão e os outros escutam.</div>`;
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
            rows[3].cells[3].innerHTML = `<div class="left-align">• Indica um aluno a cada vez para corrigir uma questão dos exercicios; <br>• Marca o TPC;</div>`;
            rows[3].cells[4].innerHTML = `<div class="left-align">• Levanta-se o aluno indicado e apresenta a correcção da questão indicada pelo professor enquantos outros acompanham; <br>• Anota o TPC.</div>`;
            rows[3].cells[5].innerHTML = `<div class="left-align">Elaboração Conjunta e Trabalho Independente</div>`;
        } else {
            rows[3].cells[2].innerHTML = `<div class="left-align">• Correção dos exercícios; <br>• Considerações finais da aula</div>`;
            rows[3].cells[3].innerHTML = `<div class="left-align">• Indica um aluno a cada vez para corrigir uma questão dos exercicios; <br>• Dá as considerações finais;</div>`;
            rows[3].cells[4].innerHTML = `<div class="left-align">• Levanta-se o aluno indicado e apresenta a correcção da questão indicada pelo professor enquantos outros acompanham; <br>• Prestam atenção.</div>`;
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
        alert('Por favor, preencha todos os campos obrigatorios.');
    }
}



function salvarPDF() {
    const element = document.getElementById('infoContainer'); // Elemento a ser convertido em PDF
    const opt = {
        margin: 1,
        filename: 'plano_de_aula.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
}