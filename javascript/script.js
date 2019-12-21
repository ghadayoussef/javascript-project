let productArray=[]
function getProducts() {
    fetch("https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json")
        .then((resp) => resp.json())
        .then(function(data) {
            data.ProductCollection.forEach((product,index)=>{
                productArray.push(product)
                insertToHomePage(product)
            });
        })
        .catch(function(error) {
            alert("Network Error")
        });
}
function insertToHomePage(product) {
   let mainDiv= document.getElementById("all")
    let productArray= []
    productArray.push(product)
     mainDiv.insertAdjacentHTML('beforeend', `
      <div class="col-lg-4 col-md-6 text-center">
            <div class="card  media-block card-bordered">
            <div style="height: 50%;">
            <div class="text-card media-block card-borderedenter m-md-3 text-primary w-100">
                <h6 class="font-weight-bold">${product.Name}</h6>
            </div>
            <div>
                <img class="ff" src="${product.ProductPicUrl}" alt="${product.ProductId}" style="cursor: pointer;" onclick="showProduct(this.alt)")>
            </div>
            <div class="d-inline-block">
                <h3 class="text-danger m-md-5">${"$ "+product.Price}</h3>
            </div>
            <div class="d-inline-block">
                <button  class="mb-2 btn btn-dark fa fa-shopping-cart $" value="${product.ProductId}" onclick="addToCart(this.value)"></button>
            </div>
        </div>
    </div>
`)
}

function addToCart(id){
    productArray.forEach(function(ProductObject) {
        if(ProductObject.ProductId==id)
        console.log(ProductObject);
    })
}
//show product on click on image
function showProduct(id){
    productArray.forEach(function(ProductObject) {
        if(ProductObject.ProductId==id)
            console.log(ProductObject);
    })
}
getProducts()



