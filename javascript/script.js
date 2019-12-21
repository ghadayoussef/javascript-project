const prices = [];
var pics = []
var obj;
var arrtest = []
function fetchItems(url){
    fetch(url)
    .then(function(response){
        return response.json();
        })
    .then((data) =>{       
        // //console.log("all data",data.ProductCollection[0]);
        // data.ProductCollection.forEach(element => {
        // prices.push(element.Price);
        // pics.push(element.ProductPicUrl);
        // //console.log("element Price",element.Price)
        // let img = document.createElement("IMG");
        // img.setAttribute("src", element.ProductPicUrl);
        // img.setAttribute("width", "304");
        // img.setAttribute("height", "228");
        // img.setAttribute("alt", "The Pulpit Rock");
        // document.body.appendChild(img);
        



        //});
        createDiv(data);
        
    })
    // .catch((err) =>{
    //     console.error(err);

    // })

}

function createDiv(data){
  var element = data.ProductCollection;
  console.log("elll",element[0]);
   var count = 0;
  //  for(var i = 0; i < 123; i++){
  //   let col = document.createElement("div");
  //   //col.classList.add("col-lg-3");
  //   let img = document.createElement("IMG");
  //   img.setAttribute("src", element[i].ProductPicUrl);
  //   img.setAttribute("width", "300");
  //   img.setAttribute("height", "300");
  //   col.appendChild(img);
  //   document.body.appendChild(col);
  //  }
   
  for(var i = 0; i < 41; i++) {
    var row = document.createElement("div");
    row.classList.add("row");    
    //document.body.innerHTML+='<div class="row">';
    for(k = 0; k < 3; k++) {
      console.log("row no",i)
      let col = document.createElement("div");
      //col.classList.add("col-lg-4");
      col.className = "col-lg-4";
      let img = document.createElement("IMG");
      img.setAttribute("src", element[count].ProductPicUrl);
      img.setAttribute("width", "304");
      img.setAttribute("height", "228");
      col.appendChild(img);
      row.appendChild(col);
      count++;
    }
    document.body.appendChild(row);
}

}
async function fetchProducts(url) {
    const response = await fetch(url);
    const json = await response.json();
    console.log("jsonnnnn ",json)
    obj = json;
    console.log("inside function",obj)
    // var prices = await json.ProductCollection;
    // console.log(prices)

    return json.ProductCollection;
}

const URL = "https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json"
//console.log("function ",fetchProducts(URL))
      //.then(data => dataset = data);
//console.log("dataset",obj)
//console.log("henaaaa",prices)
//console.log("prices length",prices)
fetchItems(URL);
//console.log("prices ",typeof(prices));
//console.log("hena el array",Object.values(prices))
//console.log("pics url  ",pics);
var dataset; 
fetch('https://jsonplaceholder.typicode.com/todos/1') 
      .then(response => response.json()) 
      .then(data => {
       dataset = data;
        logDataset();
        doSomething();
  });  
  function logDataset () { 
    console.log("ddddddd",dataset); 
  }
  function doSomething(){
    arrtest.push(dataset);
    console.log("tttttt",arrtest)

  }