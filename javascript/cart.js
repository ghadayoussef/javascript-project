const URL ="https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json"
let itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
let productsDetails = JSON.parse(localStorage.getItem("products"));
const table = document.getElementById("products-table");
const tableTotal = document.getElementById("table-total");
function fetchData(){
    fetch(URL)
    .then((resp) => resp.json())
    .then((data)=>{
        makeProduct(data.ProductCollection)
    })
    
}

function makeProduct(products){
    let tot = 0;
    productsDetails.forEach(element => {
        products.forEach(item=>{
            if(item.ProductId == element.productId){
                let imageUrl = item.ProductPicUrl;
                let img = document.createElement("IMG");
                img.setAttribute("src", imageUrl);
                img.setAttribute("width", "100");
                img.setAttribute("height", "100");
                //console.log("da5all el conditioon");
                const tr = document.createElement('tr');
			    table.append(tr);      
                const td1 = document.createElement('td');
                td1.appendChild(img);
                let name = document.createTextNode(item.Name);
			    td1.appendChild(name);
                td1.setAttribute("id",item.ProductId)
                td1.style.cursor="pointer";
                td1.addEventListener("click",evt => {
                    let queryString = "?id="+td1.getAttribute("id");
                    window.location.href = "view_item.html" + queryString;
                })
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
                const td6 = document.createElement('td');
                const td5 = document.createElement('button');
                td5.className ="btn btn-outline-primary  delete";
                td5.setAttribute("id",element.productId);
                td5.innerHTML = "Remove";
                td6.appendChild(td5);
                tr.appendChild(td6);
                td5.addEventListener('click',(e)=>{
                    productsDetails.forEach((p) =>{
                       if(p.productId == td5.getAttribute("id")){
                        var index = productsDetails.indexOf(p);
                        productsDetails.splice(index,1);
                        localStorage.setItem("products",JSON.stringify(productsDetails));
                        total -= +td4.innerHTML;
                        localStorage.setItem("total",JSON.stringify(total));
                        document.querySelector(".totalNumber").innerHTML = total;
                       }
                    })
                    td5.parentElement.parentElement.remove();
                })                
                table.appendChild(tr);
            }
        })

        tot+= +element.price * +element.quantity;
        localStorage.setItem("total",JSON.stringify(tot));

    });
    let total = JSON.parse(localStorage.getItem("total"));
    let totalRow = document.createElement("tr");
    let totalCart = document.createElement("td");
    let t = document.createElement("td");
    t.className = "totalNumber";
    totalCart.innerHTML = "Total";
    t.innerHTML = total.toString();
    totalRow.appendChild(totalCart);
    totalRow.appendChild(t);
    tableTotal.appendChild(totalRow);

}
fetchData();