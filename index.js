import { menuArray } from '/data.js'
const order = document.getElementById('order')
const paymentForm = document.getElementById('payment-form')
const paymentInfo = document.getElementById('payment-info')

let orderList = []

renderMenu()

function renderMenu(){
    document.getElementById('menu').innerHTML = getMenuHtml() 
}

function getMenuHtml(){
    let menuHtml = ``
    
    menuArray.forEach( item => {
        menuHtml += `
        <div class = "menu-layout">
        <div class="menu-item">
            <span class="item-img">${item.emoji}
            </span>
            <div class="item-info">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-ingredients">${item.ingredients}</p>
                <p class="item-price">$${item.price}</p>
            </div>
        </div>
            <div class="add-order-btn">
            <i class="fa-regular fa-plus" data-add-order=${item.id}></i>
            </div>
        </div>
        <div class = "divider"></div>
        
        `
    })

    return menuHtml
}



document.addEventListener('click', (e) => {
    if(e.target.dataset.addOrder){
        handleAddClick(e.target.dataset.addOrder)
    }
    else if(e.target.dataset.removeOrderBtn){
        handleRemoveClick(e.target.dataset.removeOrderBtn)
    }
    
    else if (e.target.id === 'complete-order-btn') {
        handleCompleteOrderClick()
    }
    else if(e.target.id === 'close-btn-modal'){
        handleCloseModalClick()
    }
} )

function handleAddClick(itemId){
    const targetItemObj = menuArray.filter( item => item.id === Number(itemId) 
    )[0]
    orderList.push(targetItemObj)
    renderOrder()
}

function handleRemoveClick(itemIndex){
    const targetIndex = Number(itemIndex)
    orderList = orderList.filter( (item, index) => index !== targetIndex 
    )
    // orderList.splice(targetIndex, 1)
    renderOrder()
}

function handleCompleteOrderClick(){
    paymentForm.style.display = 'inline'
}
function handleCloseModalClick(){
    paymentForm.style.display = 'none'
}



function renderOrder(){
     if (orderList.length === 0) {
    order.innerHTML = '' 
    } else{
    order.innerHTML = getOrder() 
  }
}



function getOrder(){
    let orderHtml = ''
    orderList.forEach( (item,index) => {
        orderHtml += `
        <div>
        <div class = "item-order">
            <div class="order-line">
            <h3>${item.name}</h3>
            <button 
            type="button" 
            class ="remove-btn" 
            data-remove-order-btn=${index}>remove</button>
            </div>
            <p>$${item.price}</p>
        </div>
        </div>
        `
    })
    
     const totalPrice = orderList.reduce( (total, currentPrice) =>
      total + currentPrice.price, 0)
      
    return `<div class = "order-container">
                <h3 class ="order-headline">Your Order</h3>
                <div>
                    ${orderHtml}
                </div>
                <div class = "order-divider"></div>
                <div>
                    <div class = "item-order total-price">
                    <p>Total Price:</p>
                    <p>$${totalPrice}</p>
                    </div>
                    <button type="button" id="complete-order-btn">Complete order</button>
                </div>
            
            </div>
            `
}

paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const paymentInfoData = new FormData(paymentInfo)
    const fullName = paymentInfoData.get('name')
    
    document.getElementById('h2-modal').innerHTML = 
        `<div class ="modal-inner-loading">
            <img src="images/payment-loading.svg">
            <p id="comfirmation-text">Checking you card details...</p>
        </div>
        `
    setTimeout(function() {
    document.getElementById('comfirmation-text').innerHTML = `Bank said you're a real person✅`
    },1500)
    
    setTimeout(function() {
        paymentForm.style.display = 'none'
        order.innerHTML = `
        <div class="order-completed">
            <p>Thanks, ${fullName}! Your order is on its way!</p>
        </div>
        `
        orderList = []
        paymentInfo.reset()
        document.getElementById('h2-modal').innerHTML = 'Enter card details'

    },3000)
})