const listeProduits = document.getElementById("liste-produits");
function afficherProduits(liste) {
    listeProduits.innerHTML = "";
    liste.forEach(produit => {
        listeProduits.innerHTML += `
            <div class="prod">
                <img src="../images/${produit.image}"
                     alt="${produit.nom}">
                <h3>${produit.nom}</h3>
                <p>${produit.prix} DA</p>
                <button onclick="ajouterAuPanier(${produit.id})"> Ajouter au panier</button>
            </div>
        `;
    });

}
if (listeProduits) { afficherProduits(produits);}

const produitsPopulaires = document.getElementById("produits-populaires");

if (produitsPopulaires) {
    produits.forEach(produit => {
        if (produit.populaire === true) {
            produitsPopulaires.innerHTML += `
                <div class="card">
                    <img src="images/${produit.image}" alt="${produit.nom}">
                    <h3>${produit.nom}</h3>
                    <p>${produit.prix} DA</p>
                </div>
            `;
        }
    });

}


const boutonsFiltres =
document.querySelectorAll(".filtres button");
boutonsFiltres.forEach(btn => {
    btn.addEventListener("click", () => {
        const categorie = btn.dataset.cat;
        if (categorie === "tous") {
            afficherProduits(produits);
        } else {
            const resultat =
            produits.filter(produit =>
                produit.categorie === categorie
            );
            afficherProduits(resultat);
        }
    });

});

const recherche =
document.getElementById("recherche");
recherche.addEventListener("input", () => {
    const texte = recherche.value.toLowerCase();
    const resultat = produits.filter(produit => produit.nom.toLowerCase().includes(texte)  );
    afficherProduits(resultat);
});



function ajouterAuPanier(id) {
    const produit = produits.find( p => p.id === id );

    let panier =  JSON.parse( localStorage.getItem("panier") ) || [];
    panier.push(produit);

    localStorage.setItem(
        "panier",
        JSON.stringify(panier)
    );

    const message = document.getElementById("message-panier");
    if(message){
        message.textContent = produit.nom + " ajouté au panier";

        setTimeout(() => {message.textContent = ""; }, 2000);
    }
}

function majPanier() {
    const panier = JSON.parse(localStorage.getItem("panier")) || [];
    const nb = document.getElementById("nb-panier");
    if(nb){
        nb.textContent = panier.length;
    }
}

const carousel = document.getElementById("produits-populaires");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

if(next){
    next.addEventListener("click", function(){

        console.log("droite");

        carousel.scrollLeft += 300;
    });
}

if(prev){
    prev.addEventListener("click", function(){

        console.log("gauche");

        carousel.scrollLeft -= 300;
    });
}


