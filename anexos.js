import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
        import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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
        const auth = getAuth(app);
        console.log('Firebase inicializado', app);

        // Define a persistência da autenticação
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                // Verificação de autenticação ao carregar a página
                onAuthStateChanged(auth, (user) => {
                    if (!user) {
                        console.log('Usuário não autenticado, redirecionando para index.html.');
                        window.location.href = 'index.html'; // Redireciona para a página de login
                    }
                });
            })
            .catch((error) => {
                console.error('Erro ao definir a persistência:', error);
            });

        // Função de logout
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                signOut(auth).then(() => {
                    console.log('Usuário desconectado');
                    window.location.href = 'index.html'; // Redireciona para a página de login após logout
                }).catch((error) => {
                    console.error('Erro ao desconectar:', error);
                });
            });
        }