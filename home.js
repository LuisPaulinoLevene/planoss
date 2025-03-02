import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCjR7ByKvIFDoF61CL5u2SmYjZ2SOqGd4I",
    authDomain: "planoautomatico.firebaseapp.com",
    projectId: "planoautomatico",
    storageBucket: "planoautomatico.appspot.com",
    messagingSenderId: "474178177133",
    appId: "1:474178177133:web:452243accf7de0548b9764",
    measurementId: "G-7GZFKCREKH"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Ocultar a div do plano mensal inicialmente
const planoMensagem = document.querySelector(".form-group");
if (planoMensagem) {
    planoMensagem.style.display = 'none';
    console.log('Div oculta inicialmente.');
}

// Função para verificar o estado de autenticação e carregar o nome e a data de expiração
onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log("Usuário não logado. Redirecionando para index.html.");
        window.location.href = "./index.html";  // Redireciona se o usuário não estiver logado
    } else {
        console.log("Usuário logado:", user.email);
        loadUserName(user);  // Carrega o nome do usuário
        loadExpirationDate(user);  // Carrega a data de expiração
        loadAnnouncement();  // Carrega o anúncio para todos os usuários
    }
});

// Função para carregar e exibir o nome do usuário
async function loadUserName(user) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        const userData = docSnap.data();
        const userName = userData.name;

        // Exibe o nome do usuário na div com id 'name'
        const nameDiv = document.getElementById("name");
        if (nameDiv) {
            nameDiv.textContent = `Bem-vindo, ${userName}!`;
        }
    } else {
        console.error("Erro: Usuário não encontrado no Firestore.");
    }
}

// Função para carregar e exibir a data de expiração do usuário
async function loadExpirationDate(user) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        const userData = docSnap.data();
        const expirationDate = userData.date;

        // Exibe a data de expiração na div com id 'expira'
        const expiraDiv = document.getElementById("expira");
        if (expiraDiv) {
            expiraDiv.textContent = `Você voltará a pagar no dia: ${expirationDate}`;
        }

        // Verifica o ano de expiração
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const expirationYear = new Date(expirationDate).getFullYear();

        // Se a expiração for no ano atual, exibe a div de "mudar plano"
        if (expirationYear === currentYear) {
            if (planoMensagem) {
                planoMensagem.style.display = 'block';  // Reexibe a div
                console.log('Plano mensal visível: A expiração é dentro do ano atual.');
            }
        } else {
            console.log('Plano anual: A expiração é no próximo ano, div permanece oculta.');
        }
    } else {
        console.error("Erro: Usuário não encontrado no Firestore.");
    }
}

// Função para carregar o anúncio de um documento específico na coleção "users"
async function loadAnnouncement() {
    const anuncioRef = doc(db, "users", "gW1fMwZXuzgnk907ZlfVigYphDw1");  // Documento específico com ID fornecido
    const docSnap = await getDoc(anuncioRef);

    if (docSnap.exists()) {
        const userData = docSnap.data();
        const announcementMessage = userData.informacao;  // O campo 'informacao' contém a mensagem do anúncio

        if (announcementMessage) {
            checkAndDisplayAnnouncement(announcementMessage);  // Exibe a mensagem do anúncio
        }
    } else {
        console.error("Erro: Documento de anúncio não encontrado no Firestore.");
    }
}

// Função para verificar e exibir o anúncio uma vez por período do dia (manhã, tarde ou noite)
function checkAndDisplayAnnouncement(message) {
    const today = new Date().toDateString(); // Obtemos a data de hoje no formato YYYY-MM-DD
    const currentHour = new Date().getHours(); // Obtemos a hora atual

    // Divisão do dia: manhã (5h-11h), tarde (12h-17h), noite (18h-4h)
    const period = getPeriodOfDay(currentHour);

    // Verifica se o modal já foi exibido no período atual
    const viewedPeriods = JSON.parse(localStorage.getItem("viewedPeriods")) || {};
    const periods = viewedPeriods[today] || [];

    // Exibe o modal apenas se ainda não foi exibido naquele período
    if (!periods.includes(period)) {
        // Exibe a telinha de anúncio (modal)
        displayAnnouncement(message);

        // Armazena o período em que o modal foi exibido
        periods.push(period);
        viewedPeriods[today] = periods;

        // Salva os períodos no localStorage
        localStorage.setItem("viewedPeriods", JSON.stringify(viewedPeriods));
    }
}

// Função para determinar o período do dia
function getPeriodOfDay(hour) {
    if (hour >= 5 && hour < 12) {
        return 'morning'; // Manhã
    } else if (hour >= 12 && hour < 18) {
        return 'afternoon'; // Tarde
    } else {
        return 'night'; // Noite
    }
}

// Função para exibir o modal de anúncio (telinha de anúncio)
function displayAnnouncement(message) {
    const modal = document.createElement('div');
    modal.setAttribute('id', 'announcementModal');
    modal.style.position = 'fixed';
    modal.style.top = '10px';  // Fixa o modal no topo da página
    modal.style.left = '50%';  // Alinha o modal ao centro horizontalmente
    modal.style.transform = 'translateX(-50%)';  // Ajusta o modal para garantir que fique centralizado
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.color = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '5px';
    modal.style.fontSize = '18px';
    modal.style.zIndex = '1000';
    modal.style.textAlign = 'center';
    modal.innerHTML = `
        <h2 style="color: yellow; font-size: 22px; margin-bottom: 10px;">Atenção!</h2>
        <p>${message}</p>
        <button id="closeModal" style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer;">Fechar</button>
    `;

    document.body.appendChild(modal);

    // Fechar o modal quando clicar no botão
    document.getElementById('closeModal').onclick = function () {
        document.body.removeChild(modal);
    };
}
