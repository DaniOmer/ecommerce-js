// *** Connextion API
async function fetchProduct() {
	// searchParams
	let idProduct = new URL(window.location.href).searchParams.get('id')

    fetch(`http://localhost:3000/api/products/${idProduct}`)
        .then((response) => response.json())
        .then((data) => injectHtml(data))
        .catch(error => {throw new Error(error)})
}

// *** Afficher les informations du produit sur la page produit
let injectHtml = (data) => {
    // Sélecteurs
    let productName = document.getElementsByTagName('title')
    let image = document.querySelector('.item__img')
    let title = document.getElementById('title')
    let price = document.getElementById('price')
    let description = document.getElementById('description')
    let colors = document.getElementById('colors')
    let img = document.createElement('img')

    // Affectations
    productName.textContent = data.name
    img.src = data.imageUrl
    img.alt = data.altTxt
    image.appendChild(img)
    title.textContent = data.name
    price.textContent = data.price
    description.textContent = data.description
    for (let i in data.colors) {
        const option = document.createElement('option')
        option.value = data.colors[i]
        option.text = data.colors[i]
        colors.add(option)
    }
}




fetchProduct()