document.addEventListener("DOMContentLoaded", function() {
    const estrategias = {
        1: [
            { value: "vire_fale", text: "Vire e Fale", professor: "Apresenta a questão: {questao}; organiza os alunos em pares de 2 elementos; Diga aos alunos que virem e falem com o/a colega, sobre a questão; Circula na sala para escutar as discussões dos pares; Indica alguns voluntários para partilharem com a turma, o que o seu par falou; sistematiza, estabelecendo conexões com a lição com base nas ideias apresentadas", aluno: "Escuta a questão; Ficam organizados em pares de 2 elementos;  Viram e falam com o/a colega sobre a questão;  Leva-se o aluno voluntário para partilhar com a turma, o que o seu par falou; Escuta a sistematizacao feita pelo professo" },
            { value: "pensar_partilhar_apresentar", text: "Pensar-Partilhar-Apresentar", professor: "Explique o conceito e os passos", aluno: "Prepare uma pequena apresentação sobre o conceito" },
            { value: "conversa_giz", text: "Conversa de giz", professor: "Utilize o quadro para desenvolver um tópico", aluno: "Contribua com ideias no quadro durante a discussão", conteudo: "Luis"},
            { value: "grupo_peritos", text: "Grupo de peritos", professor: "Divida os alunos em grupos de peritos sobre tópicos específicos", aluno: "Prepare uma breve apresentação sobre o tópico do grupo" },
            { value: "mapa_conceito", text: "Mapa de conceito", professor: "Crie um mapa conceitual colaborativo", aluno: "Adicione ideias ao mapa conceitual" },
            { value: "simulacao_aulas", text: "Simulação de aulas", professor: "Organize uma simulação de aula com papel de professor", aluno: "Participe da simulação como aluno" }
        ],
        2: [
            { value: "vire_fale", text: "Vire e Fale", professor: "Apresenta a questão: {questao}; organiza os alunos em pares de 2 elementos; Diga aos alunos que virem e falem com o/a colega, sobre a questão {questao}; Circula na sala para escutar as discussões dos pares; Indica alguns voluntários para partilharem com a turma, o que o seu par falou; sistematiza, estabelecendo conexões com a lição com base nas ideias apresentadas", aluno: "Escuta a questão; Ficam organizados em pares de 2 elementos;  Viram e falam com o/a colega sobre a questão;  Leva-se o aluno voluntário para partilhar com a turma, o que o seu par falou; Escuta a sistematizacao feita pelo professo" },
            { value: "pensar_partilhar_apresentar", text: "Pensar-Partilhar-Apresentar", professor: "Explique o conceito e os passos", aluno: "Prepare uma pequena apresentação sobre o conceito" },
            { value: "conversa_giz", text: "Conversa de giz", professor: "Utilize o quadro para desenvolver um tópico", aluno: "Contribua com ideias no quadro durante a discussão" },
            { value: "grupo_peritos", text: "Grupo de peritos", professor: "Divida os alunos em grupos de peritos sobre tópicos específicos", aluno: "Prepare uma breve apresentação sobre o tópico do grupo" },
            { value: "mapa_conceito", text: "Mapa de conceito", professor: "Crie um mapa conceitual colaborativo", aluno: "Adicione ideias ao mapa conceitual" },
            { value: "simulacao_aulas", text: "Simulação de aulas", professor: "Organize uma simulação de aula com papel de professor", aluno: "Participe da simulação como aluno" }
        ],
        3: [
            { value: "vire_fale", text: "Vire e Fale", professor: "Apresenta a questão: {questao}; organiza os alunos em pares de 2 elementos; Diga aos alunos que virem e falem com o/a colega, sobre a questão {questao}; Circula na sala para escutar as discussões dos pares; Indica alguns voluntários para partilharem com a turma, o que o seu par falou; sistematiza, estabelecendo conexões com a lição com base nas ideias apresentadas", aluno: "Escuta a questão; Ficam organizados em pares de 2 elementos;  Viram e falam com o/a colega sobre a questão;  Leva-se o aluno voluntário para partilhar com a turma, o que o seu par falou; Escuta a sistematizacao feita pelo professo" },
            { value: "pensar_partilhar_apresentar", text: "Pensar-Partilhar-Apresentar", professor: "Explique o conceito e os passos", aluno: "Prepare uma pequena apresentação sobre o conceito" },
            { value: "conversa_giz", text: "Conversa de giz", professor: "Utilize o quadro para desenvolver um tópico", aluno: "Contribua com ideias no quadro durante a discussão" },
            { value: "grupo_peritos", text: "Grupo de peritos", professor: "Divida os alunos em grupos de peritos sobre tópicos específicos", aluno: "Prepare uma breve apresentação sobre o tópico do grupo" },
            { value: "mapa_conceito", text: "Mapa de conceito", professor: "Crie um mapa conceitual colaborativo", aluno: "Adicione ideias ao mapa conceitual" },
            { value: "simulacao_aulas", text: "Simulação de aulas", professor: "Organize uma simulação de aula com papel de professor", aluno: "Participe da simulação como aluno" }
        ],
        4: [
            { value: "vire_fale", text: "Vire e Fale", professor: "Apresenta a questão: {questao}; organiza os alunos em pares de 2 elementos; Diga aos alunos que virem e falem com o/a colega, sobre a questão {questao}; Circula na sala para escutar as discussões dos pares; Indica alguns voluntários para partilharem com a turma, o que o seu par falou; sistematiza, estabelecendo conexões com a lição com base nas ideias apresentadas", aluno: "Escuta a questão; Ficam organizados em pares de 2 elementos;  Viram e falam com o/a colega sobre a questão;  Leva-se o aluno voluntário para partilhar com a turma, o que o seu par falou; Escuta a sistematizacao feita pelo professo" },
            { value: "pensar_partilhar_apresentar", text: "Pensar-Partilhar-Apresentar", professor: "Explique o conceito e os passos", aluno: "Prepare uma pequena apresentação sobre o conceito" },
            { value: "conversa_giz", text: "Conversa de giz", professor: "Utilize o quadro para desenvolver um tópico", aluno: "Contribua com ideias no quadro durante a discussão" },
            { value: "grupo_peritos", text: "Grupo de peritos", professor: "Divida os alunos em grupos de peritos sobre tópicos específicos", aluno: "Prepare uma breve apresentação sobre o tópico do grupo" },
            { value: "mapa_conceito", text: "Mapa de conceito", professor: "Crie um mapa conceitual colaborativo", aluno: "Adicione ideias ao mapa conceitual" },
            { value: "simulacao_aulas", text: "Simulação de aulas", professor: "Organize uma simulação de aula com papel de professor", aluno: "Participe da simulação como aluno" }
        ]
    };

    function populateSelect(selectElement, estrategias) {
        selectElement.innerHTML = '<option value="">Selecione...</option>';
        estrategias.forEach(e => {
            const option = document.createElement("option");
            option.value = e.value;
            option.textContent = e.text;
            selectElement.appendChild(option);
        });
    }

    function updateActivities(selectElement, atividadesProfessor, atividadesAluno, estrategias) {
        const selectedValue = selectElement.value;
        const estrategiaSelecionada = estrategias.find(e => e.value === selectedValue);

        if (estrategiaSelecionada) {
            if (estrategiaSelecionada.value === "vire_fale") {
                let questao;
                let numeroElementos;

                while (!questao) {
                    questao = prompt("Digite a questão (não pode estar vazio):");
                }

                while (!numeroElementos) {
                    numeroElementos = prompt("Digite o número de elementos por grupo (não pode estar vazio):");
                }

                atividadesProfessor.value = estrategiaSelecionada.professor
                    .replace("{questao}", questao)
                    .replace("{numero-de-elemento}", numeroElementos);

                atividadesAluno.value = estrategiaSelecionada.aluno
                    .replace("{questao}", questao);
            } else {
                atividadesProfessor.value = estrategiaSelecionada.professor;
                atividadesAluno.value = estrategiaSelecionada.aluno;
            }
        } else {
            atividadesProfessor.value = '';
            atividadesAluno.value = '';
        }
    }

    function preencherTabela() {
        for (let i = 1; i <= 4; i++) {
            const estrategiaSelect = document.getElementById(`estrategias${i}`);
            const atividadesProfessor = document.getElementById(`atividades_professor${i}`);
            const atividadesAluno = document.getElementById(`atividades_aluno${i}`);

            populateSelect(estrategiaSelect, estrategias[i]);

            estrategiaSelect.addEventListener('change', function() {
                updateActivities(this, atividadesProfessor, atividadesAluno, estrategias[i]);
            });
        }
    }

    function exibirTabela() {
        document.getElementById('formulario').style.display = 'none';
        document.getElementById('enviar').style.display = 'none';
        document.getElementById('tabelaPlanoAula').style.display = 'table';
        document.getElementById('salvarPDF').style.display = 'block';

        for (let i = 1; i <= 4; i++) {
            const estrategiaSelect = document.getElementById(`estrategias${i}`);
            const selectedOption = estrategiaSelect.options[estrategiaSelect.selectedIndex];
            const atividadesProfessor = document.getElementById(`atividades_professor${i}`).value;
            const atividadesAluno = document.getElementById(`atividades_aluno${i}`).value;

            document.getElementById(`professor${i}`).innerText = atividadesProfessor;
            document.getElementById(`aluno${i}`).innerText = atividadesAluno;
            document.getElementById(`tecnica${i}`).innerText = selectedOption ? selectedOption.text : '';
        }
    }

    function salvarPDF() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'mm', 'a4'); // Página A4 em milímetros

      // Defina as margens em milímetros
      const margemEsquerda = 10;
      const margemDireita = 10;
      const margemSuperior = 20;
      const margemInferior = 50;

      html2canvas(document.getElementById('tabelaPlanoAula'), {
          scale: 2 // Aumenta a escala da captura para melhorar a qualidade da imagem
      }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = 210 - margemEsquerda - margemDireita; // Largura da página A4 menos as margens
          const imgHeight = canvas.height * imgWidth / canvas.width; // Calcula a altura da imagem proporcionalmente

          // Adiciona a imagem ao PDF
          let position = margemSuperior; // Início da imagem na página

          doc.addImage(imgData, 'PNG', margemEsquerda, position, imgWidth, imgHeight);
          let heightLeft = imgHeight - (doc.internal.pageSize.height - margemSuperior - margemInferior);

          // Adiciona páginas adicionais se a imagem for maior que a altura da página
          while (heightLeft > 0) {
              position = heightLeft - imgHeight;
              doc.addPage();
              doc.addImage(imgData, 'PNG', margemEsquerda, position, imgWidth, imgHeight);
              heightLeft -= doc.internal.pageSize.height;
          }

          // Salva o PDF
          doc.save('plano_de_aula.pdf');
      });
  }
    document.getElementById('enviar').addEventListener('click', exibirTabela);
    document.getElementById('salvarPDF').addEventListener('click', salvarPDF);

    preencherTabela();
});