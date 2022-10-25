// fetch('https://cdk-kanap.herokuapp.com/api/products')

fetch('http://localhost:3000/api/products')
	.then((response) => response.json())
	.then((data) => {

		// Affichage des produits contenu dans l'API
		let showAllProduct = () => {
			let items = document.getElementById('items')

			for (let p in data) {
				items.innerHTML += `
					<a href="./product.html?id=${data[p]._id}">
						<article>
							<img src="${data[p].imageUrl}" alt="${data[p].altTxt}">
							<h3 class="productName">${data[p].name}</h3>
							<p class="productDescription">${data[p].description}</p>
						</article>
					</a>`
			}
		}

		showAllProduct()
	})
