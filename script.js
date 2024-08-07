document.addEventListener('DOMContentLoaded', function () {

    let title = document.getElementById("title")
    let price = document.getElementById("price")
    let taxes = document.getElementById("taxes")
    let ads = document.getElementById("ads")
    let discount = document.getElementById("discount")
    let total = document.getElementById("total")
    let count = document.getElementById("count")
    let category = document.getElementById("category")
    let addProductBtn = document.getElementById("addProductBtn")
    let counter;
    let mode = "create"


    // get total
    function getTotal() {
        if (price.value !== '') {
            let result = (+price.value + +taxes.value + +ads.value) - +discount.value
            total.innerHTML = result
        }
    }

    window.getTotal = getTotal

    let products = []

    if (localStorage.getItem('products') !== null) {
        products = JSON.parse(localStorage.getItem('products'))
    }

    // Add product
    addProductBtn.onclick = function() {
        let newProduct = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase()
        }

        if(title.value != '' && category.value != '' && price.value != '' && taxes.value != '' && newProduct.count < 20){
            if(mode === "create"){
                if(newProduct.count > 1){
                    for(let i = 0 ; i < newProduct.count; i++){
                        products.push(newProduct)
                    }
                }else{
                    products.push(newProduct)
                }
            }else{
                products[counter] = newProduct
                mode = "create"
                addProductBtn.innerHTML = "create"
                count.style.display = "block"
            }
            clearData()
        }


        localStorage.setItem('products', JSON.stringify(products))
        showProducts()
    }

    // Clear input fields
    function clearData() {
        title.value = ''
        price.value = ''
        taxes.value = ''
        ads.value = ''
        discount.value = ''
        count.value = ''
        category.value = ''
        total.innerHTML = ''
    }

    // show products
    function showProducts() {
        let tbody = document.getElementById("tbody")
        let content = ''
        for (let i = 0; i < products.length; i++) {
            content +=
                `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].category}</td>
                        <td><button><img src="images/edit_16dp_F8EDE3_FILL0_wght400_GRAD0_opsz20.png" alt="Edit" onclick = "updateProduct(${i})"></button></td>
                        <td><button><img src="images/delete_16dp_F8EDE3_FILL0_wght400_GRAD0_opsz20.png" alt="Delete" onclick = "deleteProduct(${i})"></button></td>
                    </tr>
                `
        }
        tbody.innerHTML = content

        let deletBtn = document.getElementById("deleteAll")
        if(products.length > 0){
            deletBtn.innerHTML = `<button onclick = "deleteAll()">Delete All (${products.length})</button>`
        }else{
            deletBtn.innerHTML = ''
        }
        getTotal()
    }

    // delete
    function deleteProduct(i){
        products.splice(i , 1)
        localStorage.products = JSON.stringify(products)
        showProducts()
    }
    window.deleteProduct = deleteProduct

    function deleteAll(){
        localStorage.clear()
        products.splice(0)
        showProducts()
    }

    window.deleteAll = deleteAll

    function updateProduct(i){
        title.value = products[i].title
        price.value = products[i].price
        taxes.value = products[i].taxes
        ads.value = products[i].ads
        discount.value = products[i].discount
        category.value = products[i].category
        getTotal()
        count.style.display = "none"
        addProductBtn.innerHTML = "Update"
        mode = "update"
        counter = i
        scroll({
            top : 0,
            behavior: "smooth",
        })
    }

    window.updateProduct = updateProduct


    // search
    let searchMode = "title"
    function getSearchMode(id){
        let search = document.getElementById("search")
        if(id == "searchByTitle"){
            searchMode = "title"
            search.placeholder = 'Search by title'
        }else{
            searchMode = "category"
            search.placeholder = 'Search by category'

        }
        search.focus()
        search.value = ''
        showProducts()
    }

    window.getSearchMode = getSearchMode

    function SearchProduct(value){
        let content = ''
        if(searchMode == 'title'){
            for(let i = 0; i < products.length; i++){
                if(products[i].title.includes(value.toLowerCase())){
                    content +=
                        `
                            <tr>
                                <td>${i}</td>
                                <td>${products[i].title}</td>
                                <td>${products[i].price}</td>
                                <td>${products[i].taxes}</td>
                                <td>${products[i].ads}</td>
                                <td>${products[i].discount}</td>
                                <td>${products[i].total}</td>
                                <td>${products[i].category}</td>
                                <td><button><img src="images/edit_16dp_F8EDE3_FILL0_wght400_GRAD0_opsz20.png" alt="Edit" onclick = "updateProduct(${i})"></button></td>
                                <td><button><img src="images/delete_16dp_F8EDE3_FILL0_wght400_GRAD0_opsz20.png" alt="Delete" onclick = "deleteProduct(${i})"></button></td>
                            </tr>
                        `
                }
            }
        }else{
            for(let i = 0; i < products.length; i++){
                if(products[i].category.includes(value.toLowerCase())){
                    content +=
                        `
                            <tr>
                                <td>${i}</td>
                                <td>${products[i].title}</td>
                                <td>${products[i].price}</td>
                                <td>${products[i].taxes}</td>
                                <td>${products[i].ads}</td>
                                <td>${products[i].discount}</td>
                                <td>${products[i].total}</td>
                                <td>${products[i].category}</td>
                                <td><button><img src="images/edit_16dp_F8EDE3_FILL0_wght400_GRAD0_opsz20.png" alt="Edit" onclick = "updateProduct(${i})"></button></td>
                                <td><button><img src="images/delete_16dp_F8EDE3_FILL0_wght400_GRAD0_opsz20.png" alt="Delete" onclick = "deleteProduct(${i})"></button></td>
                            </tr>
                        `
                }
            }
        }
        let tbody = document.getElementById("tbody")
        tbody.innerHTML = content
    }
    window.SearchProduct = SearchProduct
    showProducts()
})