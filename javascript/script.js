const URL = "https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json"
const CHECKOUT = document.getElementById("checkout");
const totalView = document.getElementById("total-view");
totalPrice = 0;
CHECKOUT.setAttribute("total",totalPrice);
let totalCart = localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0;
localStorage.setItem("total",JSON.stringify(totalCart));
let productsDetails = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
let productArray=[];
const cartView = document.getElementById("allCheckout");
cartView.addEventListener('click',()=>{
    window.location.href = "cart.html";
})
function getProducts() {
    fetch(URL
        ,{
            cache:"force-cache",
            method: "GET",
        }
    )
        .then((resp) => resp.json())
        .then(function(data) {
            getTotal();
            console.log(data.ProductCollection[0])
            paginate(data.ProductCollection)
            insertToHomePage(globalArray[0]);
            getPriceBTN(globalArray[0]);
        })
        .catch(function(error) {
            swal( "Oops" ,"Connection failed" , "error" )
        });
}
function insertToHomePage(products) {
    let mainDiv= document.getElementById("all")
    products.forEach((product) => {
        productArray.push(product)
        mainDiv.insertAdjacentHTML('beforeend', `
       <div class="col-lg-4 col-md-6 text-center ac">
             <div class="card  media-block card-bordered">
             <div style="height: 50%;">
             <div class="text-card media-block card-borderedenter m-md-3 text-primary w-100">
                 <h6 class="font-weight-bold">${product.Name}</h6>
             </div>
             <div id="${product.ProductId}" style="cursor: pointer;" onclick="showProduct(getAttribute('id'))" )>
                 <img class="ff" src="${product.ProductPicUrl}">
             </div>
             <div class="d-inline-block">
                 <h3 class="text-danger m-md-5">${"$"+product.Price}</h3>
             </div>
             <div class="d-inline-block">
                 <button  class="mb-2 btn btn-dark fa fa-shopping-cart priceBtn" id="${product.ProductId}" data-price="${product.Price}" data-quantity="${product.Quantity}"></button>
             </div>
         </div>
     </div>
 `)
    })

}
//get total from local storage
function getTotal(){
    //document.getElementById("1").style.backgroundColor="#343a40"
    totalView.innerHTML=productsDetails.length
    CHECKOUT.innerHTML =" $ "+localStorage.getItem("total")+" Checkout";
}
//list all items function
//add button function
function getPriceBTN(products){
    let priceBtn = document.querySelectorAll(".priceBtn");
    priceBtn.forEach((element)=>{
        element.addEventListener('click',(e)=>{
            e.stopPropagation();
            const found = productsDetails.find(p => p.productId == element.getAttribute("id"));
            console.log("hena el quantity",element.dataset.quantity)
            if(found != null && found.quantity < element.dataset.quantity)found.quantity +=1;
            else if(found != null &&found.quantity == element.dataset.quantity){
                swal( "Oops" ,"This quantity is greater than in Stock" , "error" )
            }
            else{
                productsDetails.push({
                    productId: element.getAttribute("id"),
                    price: element.dataset.price,
                    quantity: 1
                })
            }
            localStorage.setItem("products",JSON.stringify(productsDetails));
            console.log(element.getAttribute("id"));
            let id = element.getAttribute("id");
            let t = 0;
            productsDetails.forEach((p)=>{
                t += p.price * p.quantity;
                localStorage.setItem("total",JSON.stringify(t));

            })
            totalView.innerHTML=productsDetails.length
            CHECKOUT.innerHTML =" $ "+localStorage.getItem("total")+" Checkout";
        })
    })
}

function showProduct(id){
    productArray.forEach(function(ProductObject) {
        if(ProductObject.ProductId==id){
            let queryString = "?id="+id;
            window.location.href = "view_item.html" + queryString;
        }
    })
}
let globalArray=[]
function paginate (array) {
    let slicedArray;
    let pageNumber=0;
    let SPAN=document.getElementById('pages')
    for (let i=0;i<array.length;i+=15) {
        pageNumber++
        SPAN.insertAdjacentHTML("beforeend",
            `<button id='${i/15}' class="pn btn" onclick=" changeColor();this.style.backgroundColor='#343a40';setHtmlAndInsert(getAttribute('id'))">${pageNumber}</button>
`)
        slicedArray = array.slice(i,i+15);
        globalArray.push(slicedArray);
    }
    document.getElementById("0").style.backgroundColor="#343a40"
}
function changeColor() {
    let elements = document.getElementsByClassName("pn");
    for (let i=0; i<elements.length; i++ ) {
        document.getElementById(elements[i].id).style.backgroundColor = "#60a3bc";
        console.log(elements[i].id)
    }
}
function setHtmlAndInsert(id) {
    let container = document.getElementById("all");
    let elements = container.getElementsByClassName("ac");
    while (elements[0]) {
        elements[0].parentNode.removeChild(elements[0]);
    }
    getTotal();
    insertToHomePage(globalArray[id]);
    getPriceBTN(globalArray[id]);
}
getProducts()




