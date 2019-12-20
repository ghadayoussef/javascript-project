function fetchItems(url){
    fetch(url).
    then(function(response){
        return response.json();
        })
    .then((data) =>{
        console.log("all data",data.ProductCollection)
    })
    .catch((err) =>{
            console.error(err);

    })

}
const URL = "https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json"
fetchItems(URL);