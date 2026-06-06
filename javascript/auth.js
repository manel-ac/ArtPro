//affiche un message
function messageApp(text, color){
    const msg= document.getElementById("msg");
    msg.textContent=text;
    msg.style.color =color;
}
//recuperer la liste des utilisateurs enregistrés
function getUsers(){
    return JSON.parse(localStorage.getItem("users")) || [];
}
//sauvegarder les utilisateurs dans le navigateur.
function saveUsers(users){
    localStorage.setItem("users",JSON.stringify(users));
}

/* INSCRIPTION*/
function register() {
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim().toLowerCase();
    let password = document.getElementById("password").value;
    let msg = document.getElementById("msg");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if(!username || !email || !password){
        messageApp("tous les champs sont obligatoires","red");
        return;
    }

    if (!emailRegex.test(email)) {
        messageApp("email invalide","red");
        return;
    }

    if (!passwordRegex.test(password)){
         messageApp("Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre", "red");
        return;

    }

    //récupération des utilisateurs
    let users= getUsers();
    //vérifier si l'email existe déjà
    let exist =users.find( user => user.email ===email );
    if(exist) {
        messageApp("email déja utilisé","red");
        return;
    }

    users.push({username,email,password});
    saveUsers(users);
    messageApp("Inscription réussie ","green");

    document.getElementById("username").value="";
    document.getElementById("email").value="";
    document.getElementById("password").value="";
}

/* CONNEXION */
function login() {
    let email = document.getElementById("email").value.trim().toLowerCase();
    let password = document.getElementById("password").value;
    let users = getUsers();
    let user=users.find(u =>u.email === email &&u.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        messageApp("connexion reussie","green");

        setTimeout(() =>{ window.location.href = "products.html";}, 1500);
    } else {
        messageApp("Email ou mot de passe incorrect","red");
        
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document .getElementById("username").addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                document
                    .getElementById("email")
                    .focus();
            }
        });
    document .getElementById("email") .addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                document
                    .getElementById("password")
                    .focus();
            }
        });
});