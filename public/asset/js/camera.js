// récupérer l'id de la caméra depuis l'url
const queryString = window.location.search;
const jsonApi = 'http://localhost:3000/api/cameras'
const urlParams = new URLSearchParams(queryString);
console.log(urlParams.get("id"));
const camId = urlParams.get("id");
const jsonApiproductonly = `http://localhost:3000/api/cameras/${camId}`;

// ajouter les options de lentilles
const addLensesOptions = (lenses) => {
    const selectContainer = document.getElementById('select-container')
    lenses.forEach(lens => {
        selectContainer.innerHTML += `<option id="choice">${lens}</option>`
    });
}

// créer la page produit avec les données reçues
const renderCamera = (camera) => {
    const container = document.getElementById("only-one-camera-container");
    container.innerHTML = `
    <div class="card-product-only" style="width: 40rem;">
        <img src=" ${camera.imageUrl} " class="card-img-left" alt="..."id="img-card">
        <div class="container-description">
            <div id="cameraname" class="card-title text-center h4">${camera.name}</div>
            <div class="card-body text-center">
            <p class="card-text-justify">${camera.description}</p>
            <select id="select-container" class="form-control"></select> 
            <input type="number" id="camera-quantity" class="form-control my-3" value=1 min=1 max=10 />       
                   
            <h5 id="price" class="text-dark">${camera.price/100} €</h5>
            <button  id="btn_panier" type="submit" class="btn btn-dark text-white text-center">Ajouter au panier</button> 
            </div>
        </div> 
    </div>`

    // ajouter les options de lentilles
    addLensesOptions(camera.lenses);

    // selection le bouton ajouter l'article au panier
    const btn_envoyerPanier = document.querySelector("#btn_panier");
    console.log(btn_envoyerPanier);


    // écouter le bouton et envoyer le panier
    btn_envoyerPanier.addEventListener("click", (event) => {
        event.preventDefault();
        // mettre le choix de l'option dans une variable     
        const lensOption = document.getElementById('select-container').value
        const quantityOption = document.getElementById('camera-quantity').value
        //   récuperation des valeurs du choix de l'utilisateur 
        const item = {
            id: camId,
            name: camera.name,
            lensoption: lensOption,
            quantity: parseInt(quantityOption),
            prix: camera.price / 100,
        };


        // .................................................enregistrer dans le localstorage............................
        const cart = localStorage.getItem("cart");
        //  ajouter et cumuler deux produit du meme id
        // // separer les options lentilles
         // convertir au format JSON
        let cartItems = localStorage.getItem("cart") !== null ? JSON.parse(cart) : []

        const savedCam = cartItems.find(elm => elm.id === item.id && elm.lensoption === item.lensoption)

        if (savedCam) {
            savedCam.quantity += item.quantity
        } else {
            cartItems.push(item)
        }      
        
        localStorage.setItem("cart", JSON.stringify(cartItems))
        alert("Ce produit a été ajouté au panier")
    });
}
// récupérer une caméra en fonction de son id
fetch(jsonApiproductonly)
    .then((response) => response.json())
    .then(response => {
        // appel de la fonction renderCamera
        renderCamera(response)
    })
    .catch(() => console.log("erreur"));