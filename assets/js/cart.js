function getItems() {
    const cart_data = localStorage.getItem("cart_items")
    const parsed_data = JSON.parse(cart_data)
    const cart_items = document.querySelector('.cart_items')
    const proceed = document.querySelector('.check_out_div')
    if (parsed_data.length === 0) {
        cart_items.innerHTML = "<h1 class='empty_cart'>Empty Cart...<h1/>"
        proceed.innerHTML = ''
        return;
    }
    cart_items.innerHTML = parsed_data.map((val) => {
        return `
        <div class="cart_item">
                <div class="img_div">
                    <img src=${val.image_url} alt=${val.name}>
                </div>
                <div class="cart_item_section">
                    <div class="cart_item_section_first_div">
                        <p class="item_category">${val.category}</p>
                        <p class="item_name">C${val.name}</p>
                    </div>
                    <div  class="cart_item_section_second_div">
                        <p class="item_price">RS: ${val.price*val.total}</p>
                        <div class="item_increase">
                            <span onclick="IncDec(${val.id},'Decrement')"><ion-icon name="remove"></ion-icon></span>
                            <span>${val.total}</span>
                            <span onclick="IncDec(${val.id},'Increment')"><ion-icon name="add"></ion-icon></span>
                        </div>
                        <ion-icon name="close" class="del_icon" onclick="RemoveItem(${val.id})"></ion-icon>
                    </div>
                </div>
            </div>
        `
    }).join(' ')
}

getItems()




function RemoveItem(id) {
    const cart_data = localStorage.getItem("cart_items")
    const parsed_data = JSON.parse(cart_data)
    let changed_data = parsed_data.filter((val) => val.id !== id)
    localStorage.setItem("cart_items", JSON.stringify(changed_data))

    getItems()
}

function IncDec(id, method) {
    const cart_data = localStorage.getItem("cart_items")
    const parsed_data = JSON.parse(cart_data)
    let changed_data = parsed_data.map((val) => {
        if (val.id === id) {
            if (method === "Decrement" && val.total > 1) {
                val.total = val.total - 1;

            }
            else if (method === "Increment") {
                val.total = val.total + 1;
            }
        }
        return val
    })
    localStorage.setItem("cart_items", JSON.stringify(changed_data))
    getItems()
}

// function Decrement(id) {
//     const cart_data = localStorage.getItem("cart_items")
//     const parsed_data = JSON.parse(cart_data)
//     let changed_data = parsed_data.map((val) => {
//         if (val.id === id && val.total > 1) {
//             val.total = val.total - 1;
//         }
//         return val
//     })
//     localStorage.setItem("cart_items", JSON.stringify(changed_data))
//     getItems()
// }


// function Increment(id) {
//     const cart_data = localStorage.getItem("cart_items")
//     const parsed_data = JSON.parse(cart_data)
//     let changed_data = parsed_data.map((val) => {
//         if (val.id === id) {
//             val.total = val.total + 1;
//         }
//         return val
//     })
//     localStorage.setItem("cart_items", JSON.stringify(changed_data))
//     getItems()
// }