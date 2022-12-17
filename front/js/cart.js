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


// Récupération des infos des produits pour affichage dans le DOM
let injectHtmlCart = (data) => {

    let basket = getBasket()
    for(product of basket){
        //************* Initialisation des variables
        let second = document.querySelector('#cart__items')

        let article = document.createElement('article')
        article.className = 'cart__item'

        let firstDiv = document.createElement('div')
        firstDiv.className = 'cart__item__img'

        let secondDiv = document.createElement('div')
        secondDiv.className = 'cart__item__content'

        let img = document.createElement('img')
        
        let secondDivFirstChild = document.createElement('div')
        secondDivFirstChild.className = 'cart__item__content__description'

        let h2 = document.createElement('h2')

        let p1 = document.createElement('p')

        let p2 = document.createElement('p')


        let secondDivSecondChild = document.createElement('div')
        secondDivSecondChild.className = 'cart__item__content__settings'

        let secondDivSecondChildFirstChild = document.createElement('div')
        secondDivSecondChildFirstChild.className = 'cart__item__content__settings__quantity'

        let p3 = document.createElement('p')

        let input = document.createElement('input')
        input.setAttribute('type', 'number')
        input.setAttribute('name', 'itemQuantity')
        input.setAttribute('min', '1')
        input.setAttribute('max', '100')
        input.className = 'itemQuantity'

        let secondDivSecondChildSecondChild = document.createElement('div')
        secondDivSecondChildSecondChild.className = 'art__item__content__settings__delete'

        let p4 = document.createElement('p')
        p4.className = 'deleteItem'
        p4.innerText = 'Supprimer'

        let quantity = document.querySelector('#totalQuantity')
        let total = document.querySelector('#totalPrice')


        ////**************  Affection des valeurs aux variables
        input.setAttribute('value', product.qty)
        p1.textContent = product.color
        article.setAttribute('data-id', product._id)
        article.setAttribute('id', product._id+product.color)
        article.setAttribute('data-color', product.color)


        // Recupérer les infos du produit depuis l'API
        let productFound = data.find(p => p._id == product._id)
        h2.textContent = productFound.name
        p2.textContent = productFound.price + ' €'
        img.src = productFound.imageUrl
        img.alt = productFound.altTxt

        second.appendChild(article)

        article.appendChild(firstDiv)
        article.appendChild(secondDiv)


        firstDiv.appendChild(img)
        
        secondDiv.appendChild(secondDivFirstChild)
        secondDiv.appendChild(secondDivSecondChild)

        secondDivFirstChild.appendChild(h2)
        secondDivFirstChild.appendChild(p1)
        secondDivFirstChild.appendChild(p2)

        secondDivSecondChild.appendChild(secondDivSecondChildFirstChild)
        secondDivSecondChild.appendChild(secondDivSecondChildSecondChild)

        secondDivSecondChildFirstChild.appendChild(p3)
        secondDivSecondChildFirstChild.appendChild(input)
        p3.textContent = "Qté :"

        secondDivSecondChildSecondChild.appendChild(p4)
    }

    quantityCount()
    setTotalQuantity(quantity)
    cartPrice(productFound, total)
    listenModify(input, quantity, productFound, total)
    listenRemove(quantity, productFound, total)
}

// Calculer la quantité des produits
let quantityCount = function (){
    let basket = getBasket()
    let totalQuantity = 0
    for(product of basket){
        totalQuantity += parseInt(product.qty, 10)
    }
    return totalQuantity
}


// Mettre à jour la quantité total
let setTotalQuantity = function (quantity){
    let basket = getBasket()
    let totalToUpdate = quantityCount()
    quantity.textContent = totalToUpdate
}


// Calculer le montant total du panier
let cartPrice = function (productFound, total){
    let basket = getBasket()
    let totalPrice = 0
    for(product of basket){
        let productPrice = product.qty * productFound.price
        totalPrice+= productPrice
    }
    total.textContent = totalPrice
}


// Modifier la quantité d'un produit
let updateProduct = function (updateId, updateColor, value){
    let basket = getBasket()
    let productToUpdate = basket.find(p => p._id == updateId  && p.color == updateColor)
    if(productToUpdate != null && value >0 && value <= 100){
        productToUpdate.qty = value
    }
    if(value == 0){
        let index = basket.indexOf(productToUpdate)
        if(index !== -1){
        basket.splice(index, 1)
        }
    }
    saveBasket(basket)
    quantityCount()
}


// Supprimer un article du panier
let removeProduct = function (id, color){
    let basket = getBasket()
    prodcutToRemove = basket.find(p => p._id == id && p.color == color)
    let index = basket.indexOf(prodcutToRemove)
    if(index !== -1){
        basket.splice(index, 1)
    }
    const element = document.getElementById(id+color);
    element.remove();
    saveBasket(basket)
}


// Mettre à jour la quantité d'un produit dans le DOM
let listenModify = function(input, quantity, productFound, total){
    let basket = getBasket()
    input.addEventListener('change', function(){
        let updateId = this.closest('.cart__item').dataset.id
        let updateColor = this.closest('.cart__item').dataset.color
        updateProduct(updateId, updateColor, this.value)
        setTotalQuantity(quantity)
        cartPrice(productFound, total)
    })
}


// Supprimer un produit du DOM
let listenRemove = function(quantity, productFound, total){
    let basket = getBasket()
    let button = document.querySelectorAll('.deleteItem')
    button.forEach((deleteButton) => {
        deleteButton.addEventListener('click', function(){
            let removeId = this.closest('.cart__item').dataset.id
            let removeColor = this.closest('.cart__item').dataset.color
            removeProduct(removeId, removeColor)
            setTotalQuantity(quantity)
            cartPrice(productFound, total)
        })
    })
}


// Sauvegarder le panier mis à jour dans localStorage
let saveBasket = function (basket){
	localStorage.setItem("basket", JSON.stringify(basket))
}

fetchProducts()