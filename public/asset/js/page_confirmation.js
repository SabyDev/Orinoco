// Récuperation de l'id de la commande envoyé au server dans le localstorage
const responseId = localStorage.getItem("order");
console.log(`order : ${responseId}`);

// récupération du prix total de la commande
const prixTotal = localStorage.getItem("prixtotal");
console.log(prixTotal);

// la structure html de la page_confirmation

const structureCommandConfirm = `<div class="container-recapitulatif-commande">
<h2>Récapitulatif de votre commande.</h2>
<div class="recapitulatif">
    <p>
        Merci d'avoir commandé sur notre site. <br> Nous espérons vous apporter satisfaction.	
    </p>
    <p id="command-number">
        Votre commande numéro : <span id="command_number" class="command-recap"> ${responseId} a bien été prise en compte.</span>
    </p>
    <p>
        Le montant de votre commande est de : <span id="prix" class="command-recap">${prixTotal} €</span>
    </p>
</div>
</div>`
// injection des variable dans le HTML
const page_confirmation = document.querySelector("#confirm-container");
page_confirmation.innerHTML = structureCommandConfirm ;

// effacer le localstorage sauf le formulaire
function suppKey(key) {
    localStorage.removeItem(key);
};
suppKey("cart");
suppKey("prixTotal");
suppKey("order");