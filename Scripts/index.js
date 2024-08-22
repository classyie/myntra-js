let displayItemElement = document.querySelector('.items-container');
let displayItems = ''; // Initialize as an empty string

items.forEach((item, index) => {
  displayItems += concatItems(item); // Concatenate the HTML string
});

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
      <button class="add-to-cart">Add to Cart</button>
    </div>`);
}

// Finally, set the innerHTML of the container
displayItemElement.innerHTML = displayItems;
