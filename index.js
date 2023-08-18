let products = []


function kitcut(text, limit) {
    text = text.trim();
    if( text.length <= limit) return text;
  
    text = text.slice(0, limit);
  
    return text.trim() + "...";
  }

let my_limit = 10

let skip = 10

async function get_products(limit){
    
   let a =  await fetch(`https://dummyjson.com/products?limit=${limit}`)
    .then(res => res.json())
    console.log("1")
    console.log(a)
    for (let i = 0; i< a.products.length; i++) {
        products.push(a.products[i])
    }
  
    console.log("2")
    console.log(products)
    show_products()
}


async function More_Products(){
 
    let a =  await fetch(`https://dummyjson.com/products?limit=${my_limit}&skip=${skip}`)
    .then(res => res.json())
    console.log("1")
    console.log(a)
    skip
    for (let i = 0; i< a.products.length; i++) {
        products.push(a.products[i])
    }
  skip += 10
    console.log("2")
    console.log(products)
    show_products()


}

function More_button(i){

  console.log(products[i])


}
function show_products() {
    let productsHTML = "";


    for (let i = 0; i < products.length; i++) {

        let text =  kitcut(products[i].description, 40)
       let title = kitcut(products[i].title , 18)
        let discount_price = 0
        if(products[i].discountPercentage > 5){
            
            discount_price = products[i].price- ((products[i].price / 100) * products[i].discountPercentage)
        }
  
       if(discount_price !=0){

        productsHTML += "<div class='post-card'>" +
            "<img class='post-img' src='" + products[i].images[0] + "'></img>" +
            "<h4>" + products[i].brand + "</h4>" +
            "<h2>" + title + "</h2>" +
            "<div class='post-discript'>" +
            "<h4>" + text + "</h4>" +
            "</div>" +
            "<div class='price_button'>"+ "<h2 class='line-through'>" +products[i].price + "</h2>"+
            "<h2>" + Math.round(products[i].discountPercentage) + "%</h2>"+
            "<h1>" +Math.round(discount_price) + "</h1>"+
            "<button class='post_button' onclick = 'More_button("+i+")'>See</button>" +
            "</div>" +
            "</div>";
    
        console.log(products[i].title);
       }else{
        productsHTML += "<div class='post-card'>" +
            "<img class='post-img' src='" + products[i].images[0] + "'></img>" +
            "<h4>" + products[i].brand + "</h4>" +
            "<h2>" + products[i].title + "</h2>" +
            "<div class='post-discript'>" +
            "<h4>" + text + "</h4>" +
            "</div>" +
            "<div class='price_button'>"+ "<h1>"+ products[i].price + "</h1>"+
            "<button class='post_button'  onclick = 'More_button("+i+")'>To See</button>" +
            "</div>" +
            "</div>";
    

       }


    }

    document.getElementById("products").innerHTML = productsHTML;
}

get_products(my_limit)

/*

*/