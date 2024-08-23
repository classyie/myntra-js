let displayItemElement = document.querySelector('.items-container');
let displayItems = ''; // Initialize as an empty string
let cartItems;
const bagItemsElement = document.querySelector('.bag-items');
onload();
function onload(){
  const bagItemsStr = localStorage.getItem('bagItems');
  cartItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
  items.forEach((item) => {
    displayItems += concatItems(item); // Concatenate the HTML string
  });
  
  bagIconDisplay();
  displayItemElement.innerHTML = displayItems;
}

function concatItems(item){
  return (`
    <div class="item-container">
      <img
        class="item-image"
        src="${item.image}"
        alt="first_image"
        srcset=""
      />
      <div class="rating">${item.rating.stars}⭐ | ${item.rating.count}</div>
      <div class="product-productMetaInfo">
        <h3 class="product-brand">${item.company}</h3>
        <h4 class="product-product">${item.item_name}</h4>
        <div class="product-price">
          <span>
            <span class="product-discountedPrice">RS. ${item.current_price}</span>
            <span class="product-strike">${item.original_price}</span>
          </span>
          <span class="product-discountPercentage">(${item.discount_percentage}% OFF)</span>
        </div>
      </div>
      <button class="add-to-cart"  onClick=addToCart(${item.id})>Add to Cart</button>
    </div>`);
}

// Cache the DOM element outside the functions for better performance


function addToCart(item) {
  cartItems.push(item);
  localStorage.setItem("bagItems",JSON.stringify(cartItems));
  bagIconDisplay();
}

function bagIconDisplay() {
  if (cartItems.length > 0) {
    bagItemsElement.innerHTML = cartItems.length;
    bagItemsElement.style.visibility = 'visible';
  } else {
    bagItemsElement.style.visibility = 'hidden';
  }
}




