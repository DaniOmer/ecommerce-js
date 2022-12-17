// Connexion API
async function fetchProducts() {
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => showAllProducts(data))
        .catch(error => {throw new Error(error)})
}


// Affichage des produits contenu dans l'API
let showAllProducts = (data) => {
    let items = document.getElementById('items')

    for (let product in data) {

        // Création des éléments
        let a = document.createElement('a')
        let img = document.createElement('img')
        let h3 = document.createElement('h3')
        let p = document.createElement('p')
        let article = document.createElement('article')

        // Insertion des éléments enfants
        a.appendChild(article)
        article.appendChild(img)
        article.appendChild(h3)
        article.appendChild(p)
        items.appendChild(a)


        // Affectation des valeurs
        a.href = "./product.html?id=" + data[product]._id
        
        img.src = data[product].imageUrl
        img.alt = data[product].altTxt

        h3.textContent = data[product].name
        h3.className = "productName"

        p.textContent = data[product].description
        p.className = "productDescription"
    }
}

fetchProducts()