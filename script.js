document.addEventListener("DOMContentLoaded", function() {
product_data = {
        1: {
            name: "Дошка звичайна",
            img: "doska-obreznaya.jpg",
            price: 400,
            about: "1м"
        },
        2: {
            name: "Диван Європейський",
            img: "mid_10578_4400517.jpg",
            price: 21040,
            about: "120 см х 195 см"
        },
        3: {
            name: "Диван Шериданс",
            img: "21066_6686646.jpg",
            price: 120060,
            about: "160 см х 200 см"
        },
        4: {
            name: "фарба Farbex",
            img: "3049973483_w600_h600_3049973483.webp",
            price: 178,
            about: "1 лт"
        },
        5: {
            name: "WERK",
            img: "nab-r-nstrument-v-profes-yniy-1-2-1-4-110-od-werk-70221-1-1200x1200.webp",
            price: 1350,
            about: "Набір інструментів професійний 1/2 та 1/4 110 од. WERK 70221 "
        },
        6: {
            name: "Лопати 2Е",
            img: "Baner-lopaty-2E_3000kh2000.jpg",
            price: 3800,
            about: "Зручні, легкі, компактні та багатофункціональні лопати 2Е від"
        },
        7: {
            name: "Труби Металева звичайна",
            img: "truba.png",
            price: 570.40,
            about: "102x3 мм"
        },
        8: {
            name: "Диван Женева",
            img: "jmd.jpg",
            price: 20000,
            about: "170 х 200 см"
        },
        9: {
            name: "Диван Неери",
            img: "gihyuyi.jpg",
            price: 90000,
            about: "150 х 170 см"
        },
        10: {
            name: "Стіл Обідній Браво Чорний",
            img: "stol-bravo-shorniy.png",
            price: 5040,
            about: "Неман Висота: 74; Глибина: 73;Ширина: 107,8;140"
        }
        
}
basket_data = {

}

let catalog = document.querySelector(".catalog")
let countBuy = document.querySelector(".count-buy")
let basket = document.querySelector(".basket")
let basketList = document.querySelector(".basket-list")
let delete_item = document.querySelector(".delete")
let countPrice = document.querySelector(".sum-price")
        


basket.addEventListener("click", function() {
    location.href = "basket.html"
})
if (delete_item){
    delete_item.addEventListener("click", function(){
        localStorage.clear()
        countPrice.innerHTML = ""
        add_basket_buy()
    })
}



function add_data(){
    for(let i = 1; i <= Object.keys(product_data).length; i += 1)
        catalog.innerHTML += `  
    <article class="product">
        <img src="${product_data[i]['img']}">
        <div class="product-name">${product_data[i]['name']}</div>
        <div class="product-about">${product_data[i]['about']}</div>
        <div class="product-list">
            <div class="product-price">${product_data[i]['price']} грн.</p>
            <a class="product-button">Купити</a>
        </div>
    </article>`
}
if (catalog){
    add_data()
}
let productButton = document.querySelectorAll(".product-button")

//EVENT BUTTON
if (productButton.length != 0){
    for(let i = 1; i <= Object.keys(product_data).length; i += 1){
        productButton[i-1].addEventListener("click", function(){
            countBuy.innerHTML = +countBuy.innerHTML + 1
            countPrice += product_data[i]["price"]
            if ( !localStorage.getItem(i.toString())){
                localStorage.setItem(i, JSON.stringify({  name: product_data[i]["name"],
                                    img: product_data[i]["img"],
                                    price: product_data[i]["price"],
                                    count: 1
                }))

            } else{
                temp = JSON.parse(localStorage.getItem(i.toString()) || "{}")
                temp["count"] += 1 
                localStorage.setItem(i.toString(), JSON.stringify(temp))
            }
        })
    }
}

function add_basket_buy(){
    basketList.innerHTML = ""
    countPrice.innerHTML = ""
    if (localStorage.length == 0){
        basketList.innerHTML = "<h1>У вашому кошику пусто</h1>"
    } else{

        for (let key in localStorage){
            if (localStorage.hasOwnProperty(key)){
                let tempData = JSON.parse(localStorage.getItem(key) || "{}")
                basketList.innerHTML += `<article class="basket-item">
                                    <img src="${tempData["img"]}">
                                    <div class="basket-name-item">${tempData["name"]}</div>
                                    <div class="basket-count-item">${tempData["count"]}</div>
                                    <div class="basket-count-price">${tempData["price"]} грн.</div>
                                </article>`
                countPrice.innerText = +countPrice.innerText + tempData["price"]
            }}
        countPrice.innerText += " грн."
    }
}     
if (basketList){
    add_basket_buy()
}    

})