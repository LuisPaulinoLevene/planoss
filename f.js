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
        document.getElementById('infoData').innerText = `Date: ${data.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')}`;
        document.getElementById('infoNome').innerText = `Enseignant: ${nome}, ${classe}, Classe: ${turma}`;
        document.getElementById('infoDisciplina').innerText = `Matière: ${disciplina}.`;
        document.getElementById('infoUnidadeTematica').innerText = `Unité Thématique: ${unidadeTematica}.`;
        document.getElementById('infoTema').innerHTML = `Thème: <strong>${tema}</strong>.`;
        document.getElementById('infoTransversal').innerHTML = `Thème transversal: <strong>${transversal}</strong>`;
        document.getElementById('infoObjetivoEspecifico').innerHTML = `Objectifs spécifique: <strong>${objetivosText}</strong>.`;
        document.getElementById('infoTempo').innerText = `Temps: ${tempo}; Durée de la leçon: ${duracao}'; Type de cours: ${tipoDeAula}.`;

        document.querySelector('.table-container').style.display = 'block';
        document.getElementById('lessonPlanForm').style.display = 'none';
        document.getElementById('infoContainer').style.display = 'flex';
        document.getElementById('generatePDF').style.display = 'block'; // Mostrar o botão PDF

        const table = document.getElementById('lessonPlanTable');
        const rows = table.getElementsByTagName('tbody')[0].rows;

        // Introdução e Motivação
        rows[0].cells[1].innerHTML = `<div class="left-align">${duracao1}'</div>`;
        rows[0].cells[2].innerHTML = `<div class="left-align">• Salutation;<br>• Contrôle et l’hygiène dans la salle de cours;<br>• Marcation de présences; <br>• Annoncer le thème.</div>`;
        rows[0].cells[3].innerHTML = `<div class="left-align">• Salue ou répond; <br>• Marque les  présences;<br>• Propose le thème au tableau.</div>`;
        rows[0].cells[4].innerHTML = `<div class="left-align">• Répondent  ou saluent; <br>• Répondent les présences;<br>• Prend le note du thème.</div>`;
        rows[0].cells[5].innerHTML = `<div class="left-align">Magistral, Discussion, Expose séminaire</div>`;

        if (materialIntroducao.trim() !== '') {
            rows[0].cells[6].innerHTML = `<div class="left-align">Tableau, craie ou marqueur, livre de classe et cahier, stylo,  ${materialIntroducao}</div>`;
        } else {
            rows[0].cells[6].innerHTML = `<div class="left-align">Tableau, craie ou marqueur, livre de classe et cahier, stylo</div>`;
        }

        if (Obs1.trim() !== '') {
            rows[0].cells[7].innerHTML = `<div class="left-align">${Obs1}</div>`;
        } else {
            rows[0].cells[7].innerHTML = `<div class="left-align"></div>`;
        }

        // Mediação e Assimilação
        rows[1].cells[1].innerHTML = `<div class="left-align">${duracao2}'</div>`;

        if (conteudoMediacao.trim() !== '') {
            rows[1].cells[2].innerHTML = `<div class="left-align"><strong>${tema}</strong>. <br><br>${converterQuebrasDeLinha(subtemas)};<br><br> N.B.: Les notes sur la page ${conteudoMediacao}.</div>`;
        } else {
            rows[1].cells[2].innerHTML = `<div class="left-align"><strong>${tema}</strong>. <br><br>${converterQuebrasDeLinha(subtemas)};<br><br> Notes en pièce jointe.</div>`;
        }
        // Função para converter quebras de linha em <br>
        function converterQuebrasDeLinha(texto) {
            return texto.replace(/\n/g, '<br>');
        }

        rows[1].cells[3].innerHTML = `<div class="left-align">• Indique un élève à la fois pour exprimer ses points de vue sur le thème;<br>• Notez les points de vue des élèves;<br>• Systématisez les idées des élèves; <br>• Soulevez les doutes;<br>•  Demandez à un élève de clarifier les doutes s'il y en a, et intervenez si nécessaire; <br>• Écrivez les notes au tableau.</div>`;
        rows[1].cells[4].innerHTML = `<div class="left-align">• L'élève désigné se lève, exprime ses points de vue et les autres notent les points de vue;<br>• Faites attention à la systématisation des idées; <br>• Ils présentent les doutes;<br>• L'élève volontaire se lève, clarifie les doutes et les autres écoutent attentivement; <br>• Écris les notes dans le cahier.</div>`;
        rows[1].cells[5].innerHTML = `<div class="left-align">Magistral</div>`;

        if (materialMediacao.trim() !== '') {
            rows[1].cells[6].innerHTML = `<div class="left-align">Tableau, craie, effaceur, livre de l'élève, ${materialMediacao}</div>`;
        } else {
            rows[1].cells[6].innerHTML = `<div class="left-align">Tableau, craie, effaceur et livre de l'élève</div>`;
        }

        if (Obs2.trim() !== '') {
            rows[1].cells[7].innerHTML = `<div class="left-align">${Obs2}</div>`;
        } else {
            rows[1].cells[7].innerHTML = `<div class="left-align"></div>`;
        }

        // Domínio e Consolidação
        rows[2].cells[1].innerHTML = `<div class="left-align">${duracao3}'</div>`;
        if (conteudoDominio.trim() !== '') {
            rows[2].cells[2].innerHTML = `<div class="left-align">• Exercices. <br> ${conteudoDominio}.</div>`;
        } else {
            rows[2].cells[2].innerHTML = `<div class="left-align">• Synthèse de la leçon.</div>`;
        }

        if (conteudoDominio.trim() !== '') {
            rows[2].cells[3].innerHTML = `<div class="left-align">• Présentez les exercices; <br>• Orientez la résolution des exercices.</div>`;
        } else {
            rows[2].cells[3].innerHTML = `<div class="left-align">• Désignez un élève pour faire la synthèse et intervenez si nécessaire.</div>`;
        }

        if (conteudoDominio.trim() !== '') {
            rows[2].cells[4].innerHTML = `<div class="left-align">• Notez les exercices dans le cahier; <br>• Résolvez les exercices dans le cahier.</div>`;
        } else {
            rows[2].cells[4].innerHTML = `<div class="left-align">• L'élève désigné se lève, fait la synthèse et les autres écoutent attentivement.</div>`;
        }

        rows[2].cells[5].innerHTML = `<div class="left-align">Discussion, Travail individuel et Expose séminaire.</div>`;

        if (materialDominio.trim() !== '') {
            rows[2].cells[6].innerHTML = `<div class="left-align">Tableau, craie, effaceur, livre de l'élève, ${materialDominio}</div>`;
        } else {
            rows[2].cells[6].innerHTML = `<div class="left-align">Tableau, craie, effaceur et livre de l'élève.</div>`;
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
            rows[3].cells[2].innerHTML = `<div class="left-align">• Correction des exercices; <br>• Marquage des devoirs <br>${conteudoControle}</div>`;
            rows[3].cells[3].innerHTML = `<div class="left-align">• Indique un élève à la fois pour corriger une question des exercices; <br>• Marquez les devoirs.</div>`;
            rows[3].cells[4].innerHTML = `<div class="left-align">• L'élève désigné se lève et présente la correction de la question indiquée par le professeur pendant que les autres écoutent; <br>• Notez les devoirs.</div>`;
            rows[3].cells[5].innerHTML = `<div class="left-align">Discussion, Travail individuel; </div>`;
        } else {
            rows[3].cells[2].innerHTML = `<div class="left-align">• Correction des exercices; <br>• Considérations finales de la leçon.</div>`;
            rows[3].cells[3].innerHTML = `<div class="left-align">• Indique un élève à la fois pour corriger une question des exercices; <br>• Faites les considérations finales.</div>`;
            rows[3].cells[4].innerHTML = `<div class="left-align">• L'élève désigné se lève et présente la correction de la question indiquée par le professeur pendant que les autres suivent; <br>• Faites attention.</div>`;
            rows[3].cells[5].innerHTML = `<div class="left-align">Discussion et Travail individuel.</div>`;
        }

        if (materialControlo.trim() !== '') {
            rows[3].cells[6].innerHTML = `<div class="left-align">Tableau, craie, livre de classe, cahier, ${materialControlo}</div>`;
        } else {
            rows[3].cells[6].innerHTML = `<div class="left-align">Tableau, craie, livre de classe et cahier</div>`;
        }

        if (Obs4.trim() !== '') {
            rows[3].cells[7].innerHTML = `<div class="left-align">${Obs4}</div>`;
        } else {
            rows[3].cells[7].innerHTML = `<div class="left-align"></div>`;
        }
    } else {
        alert('Veuillez remplir tous les champs obligatoires.');
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