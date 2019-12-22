const URL ="https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json"
let itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
let productsDetails = JSON.parse(localStorage.getItem("products"));
const table = document.getElementById("products-table");
function fetchData(){
    fetch(URL)
    .then((resp) => resp.json())
    .then((data)=>{
        makeProduct(data.ProductCollection)
    })
    
}

function makeProduct(products){
    productsDetails.forEach(element => {
        //console.log("element",element);
        products.forEach(item=>{
            if(item.ProductId == element.productId){
                let imageUrl = item.ProductPicUrl;
                let img = document.createElement("IMG");
                img.setAttribute("src", imageUrl);
                img.setAttribute("width", "100");
                img.setAttribute("height", "100");
                console.log("da5all el conditioon");
                const tr = document.createElement('tr');
			    table.append(tr);      
                const td1 = document.createElement('td');
                td1.appendChild(img);
                let name = document.createTextNode(item.Name);
			    td1.appendChild(name);
			    tr.appendChild(td1);
			    const td2 = document.createElement('td');
                td2.innerHTML = item.Price;
                tr.appendChild(td2);
                const td3 = document.createElement('td');
                td3.innerHTML = element.quantity;
                tr.appendChild(td3);
                const td4 = document.createElement('td');
                td4.innerHTML = element.quantity * item.Price;
                tr.appendChild(td4);
            }
        })
    });

}
fetchData();