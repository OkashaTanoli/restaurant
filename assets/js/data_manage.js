


function changeList(a = 'all') {
    document.getElementsByClassName('fiter-list')[0].childNodes.forEach((e) => {
        e.childNodes[1] != undefined ? e.childNodes[1].classList.remove('active') : false
    })
    document.getElementById(a).classList.add('active')
    fetch('./assets/js/data.json', {
        mode: 'cors'
    })
        .then(response => response.json())
        .then(data => {
            let newData;
            if (a != 'all') {
                newData = data.filter((val) => val.category === a)
            }
            else {
                newData = data
            }
            menu(newData)
        })
        .catch((err) => {
            console.log(err)
        })


}


const food_menu_list = document.querySelector('.food-menu-list')
function menu(x) {
    food_menu_list.innerHTML = x.map((val) => {
        return `
                            <li>
                                <div class="food-menu-card">
    
                                    <div class="card-banner">
                                        <div class='img_div'>
                                            <img src=${val.image_url} width="100%" height="100%" loading="lazy"
                                              alt="Fried Chicken Unlimited" class="w-100">
                                        </div>
                                        <div class="badge">-${val.off}%</div>
    
                                        <button class="btn food-menu-btn" onclick=addToCart(${val.id})>Add To Cart</button>
                                    </div>
    
                                    <div class="wrapper">
                                        <p class="category">${val.category.toUpperCase()}</p>
    
                                        <div class="rating-wrapper">
                                        ${val.rating.map(() => '<ion-icon name="star"></ion-icon>').join('')
            }
                                        </div>
                                    </div>
    
                                    <h3 class="h3 card-title">${val.name}</h3>
    
                                    <div class="price-wrapper">
    
                                        <p class="price-text">Price:</p>
    
                                        <data class="price">Rs${Math.floor(val.price - (val.off / 100 * val.price))}</data>
    
                                        <del class="del" value="69.00">Rs${val.price}</del>
    
                                    </div>
    
                                </div>
                            </li>
        `
    }).join(' ')
}





function addToCart(id) {
    fetch('./assets/js/data.json', {
        mode: 'cors'
    })
        .then(response => response.json())
        .then(data => {
            let filtered = data.find((val) => val.id === id)
            let local_data = localStorage.getItem("cart_items")

            if (!local_data) {
                local_data = [{ ...filtered, total: 1 }]
            }
            else {
                local_data = JSON.parse(local_data)
                let isAvailable= false
                for (let i = 0; i < local_data.length; i++) {
                    if (local_data[i].id === id) {
                        local_data[i].total++
                        isAvailable = true

                    }
                    else{
                        isAvailable = false
                        console.log(local_data[i])
                    }
                }
                !isAvailable?local_data.push({...filtered,total:1}):null
            }
            localStorage.setItem("cart_items", JSON.stringify(local_data))
        })
        .catch((err) => {
            console.log(err)
        })
}


changeList()