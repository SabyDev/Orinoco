let cartItems = []
const cart = localStorage.getItem("cart");

if (cart !== null) {
    cartItems = JSON.parse(cart);
}
// ................................................affichage des produits dans le panier
// selection de l'element pour id ou je vais injecter le code htlm
const positionElement = document.querySelector("#panier-vide");

// Si panier vide afficher panier vide
if (cartItems === null || cartItems == 0) {
    const panierVide = `
    <div class="container-panier-vide">
        <div>Panier vide</div>
    </div>`
    positionElement.innerHTML = panierVide;

} else {
    // position de l'element
    const commande = document.querySelector("#cart-tablebody");
    // si le panier n'est pas vide il faut l'afficher 
    let structureCartItems = [];
    for (i = 0; i < cartItems.length; i++) {
        console.log(cartItems.length);
        let price1 = cartItems[i].prix * cartItems[i].quantity;
        structureCartItems = structureCartItems + `                
        <tr id="ligne">
            <td>${cartItems[i].name} </td>
            <td>${cartItems[i].lensoption} </td>
            <td>${cartItems[i].prix} </td>
            <td>${cartItems[i].quantity} </td>
            <td  id="ss_Price"class="ss-total-price"> ${price1}</td>
            <td class="supression_btn"><button id="sup-button" class="btn_supp"> supprimer </button></td>
        </tr>        `
        commande.innerHTML = structureCartItems;
    }
}
// gestion prix total
// création variable pour y mettre les prix du panier
let prixTotalCalcul = [];
// aller chercher les prix dans le panier
for (let m = 0; m < cartItems.length; m++) {
    let price2 = cartItems[m].prix * cartItems[m].quantity;
    // mettre les prix du panier dans la variable prixTotalCalcul
    prixTotalCalcul.push(price2);
    console.log(prixTotalCalcul);
    // additionner les prix dans le tableau prixTotalCalcul avec methode .reduce
    const reducer = (accumulator, currencevalue) => accumulator + currencevalue;
    const prixTotal = prixTotalCalcul.reduce(reducer, 0);
    // injection dans code prix HTML
    const prixDansHtlm = document.querySelector("#sub_total");
    prixDansHtlm.innerHTML = prixTotal;
    const prixTl = localStorage.setItem("prixtotal", JSON.stringify(prixTotal))
}
// ......................................................gestion du bouton supprimer l'article
// // recupération de tous les btn supprimer
let btn_supprimer = document.querySelectorAll(".btn_supp");
// écouter le bouton supp
for (j = 0; j < btn_supprimer.length; j++) {
    // selectionner l'id qui va etre supprimer    
    let id_selectionner_suppression = cartItems[j].id;
    btn_supprimer[j].addEventListener("click", (event) => {
        event.preventDefault;
        // methode filter, je selectionne les produits à garder et je supprime l'article dont le btn supp a clické
        cartItems = cartItems.filter(el => el.id !== id_selectionner_suppression)
        console.log(id_selectionner_suppression);
        // on envoie les infos dans le localStorage           
        localStorage.setItem("cart", JSON.stringify(cartItems));
        alert("Ce produit a été retiré du panier.");
        window.location.href = "panier.html";
    });
}
// ......................................................création btn pour vider entierement le panier
// html pour le bouton
const btnSuppCart = `
<button  id="btn-supp-cart" class="btn btn-lg btn-block">Vider le Panier</button>
`
// insertion du btn dans le html du pannier
const supprimeCart = document.querySelector("#vider-le-panier");
supprimeCart.innerHTML = btnSuppCart;
//  selection du btn vider le panier
const viderPanier = document.querySelector(".btn");
// ecouter le btn vider le panier
viderPanier.addEventListener("click", (e) => {
    e.preventDefault;
    // .removeItems pour vider le panier on efface la key cart
    localStorage.removeItem("cart");
    // prevenir que le panier a été vidé
    alert("vous venez de vider le panier")
    // rechargement auto de la page
    window.location.href = "panier.html";
    console.log(viderPanier);
})
// ....................................................creation formulaire user
// écouter le bouton
bouton.addEventListener("click", (event) => {
    event.preventDefault();
    const user = {
        firstName: firstname.value,
        lastName: lastname.value,
        email: email.value,
        address: address.value,
        city: city.value,
    }
    localStorage.setItem("user", JSON.stringify(user))
    // creation d'une condition pour faire une alerte de validation personnalisée
    if (user !== null) {
        alert(`Merci ${user.lastName} pour votre commande. \n Vous allez recevoir un mail de confirmation à l'addresse suivante : \n ${user.email}`)
    } else {
        alert(`merci de remplir le formulaire`);
    }

})
// .................................................validation formulaire
// création variable pour récupérer le formulaire
let form = document.getElementById("userformulaire");

// Ecouter la modification du nom
form.firstname.addEventListener("change", function () {
    validFirstname(this);
});
const validFirstname = function (inputFirstname) {
    // création d'une regexp pour la validation du nom
    let firstnameRegExp = new RegExp(
        "^[a-zA-Z]+", 'g',
    );

    // pour attraper la balise en dessous dans le html donc la small
    let small = inputFirstname.nextElementSibling;

    // condition pour validation du nom
    // tester le nom saisi par l'utuilisateur
    if (testFirstname = firstnameRegExp.test(inputFirstname.value)) {
        small.innerHTML = "Nom valide";
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    } else {
        small.innerHTML = "Nom non valide";
        small.classList.remove('text-success');
        small.classList.add('text-danger');
    }
};


// Ecouter la modification du prenom
form.lastname.addEventListener("change", function () {
    validLastname(this);
});
const validLastname = function (inputLastname) {
    // création d'une regexp pour la validation de Lastname
    let lastnameRegExp = new RegExp(
        "^[a-zA-Z]+", 'g',
    );

    // pour attraper la balise en dessous dans le html donc la small
    let small = inputLastname.nextElementSibling;

    // condition pour validation de Lastname
    // tester Lastname saisi par l'utuilisateur
    if (testLastname = lastnameRegExp.test(inputLastname.value)) {
        small.innerHTML = "addresse valide";
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    } else {
        small.innerHTML = "addresse non valide";
        small.classList.remove('text-success');
        small.classList.add('text-danger');
    }
};

// Ecouter la modification de l'email
form.email.addEventListener("change", function () {
    validEmail(this);
});
const validEmail = function (inputEmail) {
    // création d'une regexp pour la validation de l'émail
    let emailRegExp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    // pour attraper la balise en dessous dans le html donc la small
    let small = inputEmail.nextElementSibling;

    // condition pour validation de l'email
    // tester l'email saisi par l'utuilisateur
    if (testEmail = emailRegExp.test(inputEmail.value)) {
        small.innerHTML = "addresse valide";
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    } else {
        small.innerHTML = "addresse non valide";
        small.classList.remove('text-success');
        small.classList.add('text-danger');
    }
};
// Ecouter la modification de l'addresse
form.address.addEventListener("change", function () {
    validaddress(this);
});
const validaddress = function (inputaddress) {
    // création d'une regexp pour la validation de addresse
    let addressRegExp = new RegExp(
        "^[a-zA-Z0-9  ]+", 'g',
    );

    // pour attraper la balise en dessous dans le html donc la small
    let small = inputaddress.nextElementSibling;

    // condition pour validation de addresse
    // tester addresse saisi par l'utuilisateur
    if (testaddress = addressRegExp.test(inputaddress.value)) {
        small.innerHTML = "addresse valide";
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    } else {
        small.innerHTML = "addresse non valide";
        small.classList.remove('text-success');
        small.classList.add('text-danger');
    }
};
// Ecouter la modification du code postal
form.cp.addEventListener("change", function () {
    validCp(this);
});
const validCp = function (inputCp) {
    // création d'une regexp pour la validation du code postal
    let cpRegExp = new RegExp(
        "^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$",
    );

    // pour attraper la balise en dessous dans le html donc la small
    let small = inputCp.nextElementSibling;

    // condition pour validation du cp
    // tester cp saisi par l'utuilisateur
    if (testCp = cpRegExp.test(inputCp.value)) {
        small.innerHTML = "Code posptal valide";
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    } else {
        small.innerHTML = "Code postal non valide";
        small.classList.remove('text-success');
        small.classList.add('text-danger');
    }
};
// Ecouter la modification du code postal
form.city.addEventListener("change", function () {
    validCity(this);
});
const validCity = function (inputCity) {
    // création d'une regexp pour la validation de ville
    let cityRegExp = new RegExp(
        /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
    );

    // pour attraper la balise en dessous dans le html donc la small
    let small = inputCity.nextElementSibling;

    // condition pour validation de ville
    // tester ville saisi par l'utuilisateur
    if (testCity = cityRegExp.test(inputCity.value)) {
        small.innerHTML = "ville valide";
        small.classList.remove('text-danger');
        small.classList.add('text-success');
    } else {
        small.innerHTML = "ville non valide";
        small.classList.remove('text-success');
        small.classList.add('text-danger');
    }
};
// .......................................envoie des infos et retour du server

bouton.addEventListener("click", (event) => {
    event.preventDefault();

    const contact = JSON.parse(localStorage.getItem("user"))
    const cart = JSON.parse(localStorage.getItem("cart"))
    const prixCart = JSON.parse(localStorage.getItem("prixtotal"))

    let products = [];
    cart.forEach(item => {
        products.push(item.id)
    })
    const jsonBody = {
        contact: contact,
        products: products,
        prix: prixCart
    }

    const option = {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: `cors`,
        body: JSON.stringify(jsonBody),
    };
    console.log(contact)
    console.log(products)
    console.log(jsonBody);

    fetch('http://localhost:3000/api/cameras/order', option)
        .then(res => res.json())
        .then(data => {
            console.log(data.orderId);
            localStorage.setItem("order", data.orderId);

            window.location.href = "page_confirmation.html"
        })
        .catch(error => console.log("Erreur : " + error));
})