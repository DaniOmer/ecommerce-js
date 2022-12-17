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


// ************** Ajouter des produits dans le panier ********************** //

// Sauvegarder un panier dans localStorage
let saveBasket = function (basket){
	localStorage.setItem("basket", JSON.stringify(basket))
}

// Récupérer un panier depuis localStorage
let getBasket = function (){
	let basket = localStorage.getItem("basket")
	// Vérifions si un panier a déja été sauvegarder
	if(basket === null){
		return []
	}else{
		return JSON.parse(basket)
	}
}


// Ajouter un produit dans le panier
let addProductToBasket = function (){
	// searchParams
	let idProduct = new URL(window.location.href).searchParams.get('id')
	// Produit ajouté à un panier
	
	let cartProduct = {
		'_id': idProduct,
		'color': document.getElementById('colors').value,
		'qty': parseInt(document.querySelector("#quantity").value, 10)
	}

	// Récupération du panier depuis localstorage
	let basket = getBasket()
	// Vérifions si le produit existe dans le panier
	let foundProduct = basket.find(p => p._id == cartProduct._id && p.color == cartProduct.color)
	if (foundProduct !== undefined){
		if((foundProduct.qty + cartProduct.qty) <= 100){
			foundProduct.qty += cartProduct.qty
		}
	}else{
		if(cartProduct.qty > 0 && cartProduct.qty <= 100 && cartProduct.color != ""){
			basket.push(cartProduct)
		}
	}
	saveBasket(basket)
}



// Envoie des données au click de l'utilisateur
let sendCart = document.querySelector('#addToCart')
sendCart.addEventListener('click', (event) =>{
	event.preventDefault()
	addProductToBasket()
})

fetchProduct()