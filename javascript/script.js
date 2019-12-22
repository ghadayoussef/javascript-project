const URL = "https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json"
const CHECKOUT = document.getElementById("checkout");
totalPrice = 0;
CHECKOUT.setAttribute("total",totalPrice);
let itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
localStorage.setItem("items",JSON.stringify(itemsArray));
let data = JSON.parse(localStorage.getItem("items"));
let totalCart = localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0;
localStorage.setItem("total",JSON.stringify(totalCart));
let productsDetails = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];




const cartView = document.getElementById("redirect");
cartView.addEventListener('click',()=>{
  window.location.href = "cart.html";
})

function fetchItems(url){
    fetch(url)
    .then(function(response){
        return response.json();
        })
    .then((data) =>{          
        createDiv(data);
        getPriceBTN();
        
    })
    .catch((err) =>{
        console.error(err);

    })

}

function createDiv(data){
  var element = data.ProductCollection;
  var count = 0;
  for(var i = 0; i < 41; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    for(k = 0; k < 3; k++) {
      let col = document.createElement("div");
      col.className = "col-lg-4";
      let img = document.createElement("IMG");
      img.setAttribute("src", element[count].ProductPicUrl);
      img.setAttribute("width", "304");
      img.setAttribute("height", "228");
      let label = document.createElement("LABEL");
      let text = document.createTextNode(element[count].ProductId);
      let addBtn = document.createElement("BUTTON");
      let btnText = document.createTextNode("Add");
      addBtn.appendChild(btnText);
      addBtn.className = "priceBtn";
      addBtn.setAttribute("id",element[count].ProductId);
      label.appendChild(text);
      col.appendChild(img);
      col.appendChild(label);  
      col.appendChild(addBtn);    
      row.appendChild(col);
      count++;
    }
    document.body.appendChild(row);
}
}
function getPriceBTN(){
  let priceBtn = document.querySelectorAll(".priceBtn");
  //console.log("arrayyyy",typeof(priceBtn));
  priceBtn.forEach((element)=>{
    element.addEventListener('click',()=>{
      // if(productsDetails.length == 0){
      //   let obj = {
      //     productId: element.getAttribute("id"),
      //     quantity: 1
      //   }
      //   productsDetails.push(obj);
      // }
      //else{
        const found = productsDetails.find(p => p.productId == element.getAttribute("id"));
        if(found != null)found.quantity +=1;
        else {
          let obj = {
            productId: element.getAttribute("id"),
            quantity: 1
          }
          productsDetails.push(obj);
        }
      //}
         
      localStorage.setItem("products",JSON.stringify(productsDetails));
      console.log(element.getAttribute("id"));
      let id = element.getAttribute("id");
      fetch(URL)
      .then(function(response){
        return response.json();
        })
      .then((data)=>{
        data.ProductCollection.forEach((e)=>{
          if(e.ProductId === id){
            let totalCheckout = parseInt(CHECKOUT.getAttribute("total"));
            totalCheckout += e.Price;
            console.log("element price",e.Price);
            console.log("totalCheckout",totalCheckout)
            CHECKOUT.setAttribute("total",totalCheckout.toString());       
            CHECKOUT.innerHTML = totalCheckout;
            localStorage.setItem("total",JSON.stringify(totalCheckout));
            
          }
        })
      })
      .catch((err) =>{
        console.error(err);

    })
    })
  })
}
fetchItems(URL);
