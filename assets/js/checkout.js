function getCheckItems() {
    const cart_data = localStorage.getItem("cart_items")
    const parsed_data = JSON.parse(cart_data)
    const items_list = document.querySelector('.items_list')
    const item_total = document.querySelector('.item_total').children
    const checkout_details = document.querySelector('#checkout_details')
    if(parsed_data.length === 0){
        checkout_details.remove()
        return 
    }
    items_list.innerHTML = parsed_data.map((val) => {
        return `
                <div class="item_list">
                    <div>${val.name}</div>
                    <div>${val.total}</div>
                    <div>${val.price * val.total}</div>
                </div>
        `
    }).join(' ')

    item_total[1].innerHTML = parsed_data.reduce((prev, val) => prev + val.total, 0)
    item_total[2].innerHTML = parsed_data.reduce((prev, val) => prev + val.price*val.total, 0)

}

getCheckItems()