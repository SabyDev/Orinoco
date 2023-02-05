const jsonApi = 'http://localhost:3000/api/cameras'

// Fonction qui boucle sur la liste des caméras et les rajoute au dom
const renderAllCameras = (cameras) => {
  for (let camera of cameras) {
    document.querySelector('#camera-container').innerHTML += `<div class="card" style="width: 18rem;">
    <img src=" ${camera.imageUrl} " class="card-img-top" alt="...">
    <div class="card-title text-center h4">${camera.name}</div>
      <div class="card-body text-center">
        <p class="card-text">${camera.description}</p>             
        <h5 class="text-info">${camera.price/100} €</h5>
        <a class="btn btn-info text-white text-center" href=produit_page.html?id=${camera._id}>
        Voir
        </a>
      </div>
    </div>`;
  }
}

// Récupérer la liste de toutes les caméra via l'API
fetch(jsonApi)
.then((response) => response.json())
.then((response) => {
  // appel de la fonction renderAllCameras
  renderAllCameras(response)
})
.catch(() => console.log("erreur"))