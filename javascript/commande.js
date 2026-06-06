document
.getElementById("formCommande")
.addEventListener("submit", e => {
    e.preventDefault();

    const currentUser = JSON.parse(  localStorage.getItem("currentUser") );
    const message = document.getElementById("message");

    if (!currentUser) {
        message.textContent = "Vous n'êtes pas connecté. Veuillez vous connecter pour finaliser votre commande.";
        return;
    }
    message.textContent = "";
    const commande = {
        client: document.getElementById("nom") .value,
        email: document.getElementById("email") .value,
        telephone:document.getElementById("telephone").value,
        adresse:document.getElementById("adresse").value,
        produits: panier,
        total: total,
        date: new Date() .toLocaleString()

    };

    let commandes =
    JSON.parse(  localStorage.getItem("commandes") ) || [];
    commandes.push(commande);

    localStorage.setItem(
        "commandes",
        JSON.stringify(commandes)
    );

    localStorage.removeItem("panier");
    
    message.style.color = "green";
    message.textContent = "Commande enregistrée avec succès !";

});