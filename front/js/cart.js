// *** Connextion API
async function fetchProducts() {
    fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((data) => injectHtmlCart(data))
        .catch(error => {throw new Error(error)})
}


// Récupérer le panier depuis localStorage
let getBasket = function (){
	let basket = localStorage.getItem("basket")
    if(basket !== "undefined"){
        return JSON.parse(basket)
    }
}

fetchProducts()