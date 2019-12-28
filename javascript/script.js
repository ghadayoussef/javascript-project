const URL = "https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json"
const CHECKOUT = document.getElementById("checkout");
totalPrice = 0;
CHECKOUT.setAttribute("total",totalPrice);
let totalCart = localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0;
localStorage.setItem("total",JSON.stringify(totalCart));
let productsDetails = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
let productArray=[];

const cartView = document.getElementById("checkout");
cartView.addEventListener('click',()=>{
  window.location.href = "cart.html";
})




function getProducts() {
    fetch("https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json"
        ,{
           cache:"force-cache",
            method: "GET",
            mode: "cors"
        }
        )
        .then((resp) => resp.json())
        .then(function(data) {
          getTotal();          
          insertToHomePage(data.ProductCollection);
          getPriceBTN(productArray);
        })
        .catch(function(error) {
            alert("Network Error")
        });
}
function insertToHomePage(products) {
   let mainDiv= document.getElementById("all")
    products.forEach((product) => {
      productArray.push(product)
      mainDiv.insertAdjacentHTML('beforeend', `
       <div class="col-lg-4 col-md-6 text-center">
             <div id="${product.ProductId}" class="card  media-block card-bordered" style="cursor: pointer;" onclick="showProduct(getAttribute('id'))" )>
             <div style="height: 50%;">
             <div class="text-card media-block card-borderedenter m-md-3 text-primary w-100">
                 <h6 class="font-weight-bold">${product.Name}</h6>
             </div>
             <div>
                 <img class="ff" src="${product.ProductPicUrl}">
             </div>
             <div class="d-inline-block">
                 <h3 class="text-danger m-md-5">${"$ "+product.Price}</h3>
             </div>
             <div class="d-inline-block">
                 <button  class="mb-2 btn btn-dark fa fa-shopping-cart priceBtn" id="${product.ProductId}"></button>
             </div>
         </div>
     </div>
 `)





    })

}
//get total from local storage
function getTotal(){
  CHECKOUT.innerHTML = localStorage.getItem("total");  
}
//list all items function

//add button function
function getPriceBTN(products){
  let priceBtn = document.querySelectorAll(".priceBtn");
  priceBtn.forEach((element)=>{
    element.addEventListener('click',(e)=>{
      e.stopPropagation();
        const found = productsDetails.find(p => p.productId == element.getAttribute("id"));
        if(found != null)found.quantity +=1;
        else {
          let obj = {
            productId: element.getAttribute("id"),
            quantity: 1
          }
          productsDetails.push(obj);
        }         
      localStorage.setItem("products",JSON.stringify(productsDetails));
      console.log(element.getAttribute("id"));
      let id = element.getAttribute("id");
      
      products.forEach((e)=>{
          if(e.ProductId === id){
            //let totalCheckout = parseInt(CHECKOUT.getAttribute("total"));
            let totalCheckout = parseInt(JSON.parse(localStorage.getItem("total")));
            console.log("type of totalCheckout",typeof(totalCheckout));
            totalCheckout += e.Price;
            console.log("hena el checkout ",totalCheckout);
            console.log("element price",e.Price);
            console.log("totalCheckout",totalCheckout)
            CHECKOUT.setAttribute("total",totalCheckout.toString());       
            CHECKOUT.innerHTML = totalCheckout;
            localStorage.setItem("total",JSON.stringify(totalCheckout));
            
          }
        })
      
      
    })
  })
}

//show product on click on card
function showProduct(id){
    productArray.forEach(function(ProductObject) {
        if(ProductObject.ProductId==id){
          let queryString = "?id="+id;
          window.location.href = "view_item.html" + queryString;
        }


    })
}
getProducts()




