// *** Connextion API
async function fetchProduct() {
	// searchParams
	let idProduct = new URL(window.location.href).searchParams.get('id')

    fetch(`http://localhost:3000/api/products/${idProduct}`)
        .then((response) => response.json())
        .then((data) => injectHtml(data))
        .catch(error => {throw new Error(error)})
}



fetchProduct()