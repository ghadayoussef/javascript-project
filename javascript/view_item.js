let totalCart = localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0;
const CHECKOUT = document.getElementById("checkout");
const totalView = document.getElementById("total-view");
const cartView = document.getElementById("allCheckout");
let PRODUCTS = localStorage.getItem("products") ? (JSON.parse(localStorage.getItem("products"))).length : 0;
totalView.innerHTML=PRODUCTS
CHECKOUT.innerHTML = " $ "+totalCart+" Checkout";;
function getProduct() {
    let productsDetails = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    fetch(
        "https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json", {
            cache: "force-cache",
            method: "GET",
        }
    )
        .then((resp) => resp.json())
        .then(function (data) {
            data.ProductCollection.forEach((product) => {
                var urlParams = new URLSearchParams(window.location.search);
                var id = urlParams.get('id');
                if (product.ProductId == id) {
                    productPrice.innerHTML = product.Price;
                    productDescription.innerHTML = product.Description;
                    productName.innerHTML = product.Name;
                    productImg.setAttribute("src", product.ProductPicUrl);
                    document.querySelector(".productIdButton").setAttribute("id", id);
                    document.getElementById(id).addEventListener("click", (e) => {
                        let checkout = document.getElementById("checkout");
                        console.log("quantity",quantity.value);
                        console.log("priceeeeeeeeee", product.Price)
                        const found = productsDetails.find(p => p.productId == id);
                        if (found != null && (quantity.value == product.Quantity || quantity.value < product.Quantity))
                            found.quantity = quantity.value;
                        else if (found != null && quantity.value > product.Quantity) {
                            found.quantity = product.Quantity;
                            swal( "Oops" ,"This quantity is greater than in Stock" , "error" )
                        }
                        else if (found == null && (quantity.value < product.Quantity || quantity.value == product.Quantity)) {
                            productsDetails.push({
                                productId: urlParams.get('id'),
                                price: product.Price,
                                quantity: quantity.value
                            })}
                        else {
                            productsDetails.push({
                                productId: urlParams.get('id'),
                                price: product.Price,
                                quantity: product.Quantity

                            })
                            swal( "Oops" ,"This quantity is greater than in Stock" , "error" )
                        }
                        localStorage.setItem("products", JSON.stringify(productsDetails));
                        let t = 0;
                        productsDetails.forEach((pr) => {
                            console.log("hena el pr", pr);
                            console.log("hena price ", pr.price);
                            console.log("hena el quantity ", pr.quantity)
                            t += +pr.price * +pr.quantity;
                        })
                        console.log("hena el ttt ", t);
                        localStorage.setItem("total", JSON.stringify(t));
                        let PRODUCTS = localStorage.getItem("products") ? (JSON.parse(localStorage.getItem("products"))).length : 0;
                        totalView.innerHTML=PRODUCTS
                        CHECKOUT.innerHTML = " $ "+t+" Checkout";;
                    })
                }
            });
        })
        .catch(function (error) {
            swal( "Oops" ,"Connection failed" , "error" )
        });
}
cartView.addEventListener('click', () => {
    window.location.href = "cart.html";
})
getProduct();