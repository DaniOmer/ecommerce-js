// *** Connextion API
async function fetchProducts() {
    fetch('http://localhost:3000/api/products')
        .then((response) => response.json())
        .then((data) => injectHtmlCart(data))
        .catch(error => {throw new Error(error)})
}

fetchProducts()