let bagItemsCountElement = document.querySelector('.bag-items');
let bagItemsElement = document.querySelector('.bag-items-container');
let cartItems = [];
let bagitemsObj;
let bagSummaryElement = document.querySelector('.bag-summary');
onload()

function onload() {
  bagIconDisplay();
  displayCartItems();
  bagSummaryDisplay();
}


function bagIconDisplay() {
  const itemCountstr = localStorage.getItem("bagItems");
  cartItems = JSON.parse(itemCountstr);
  if (cartItems.length > 0) {
    bagItemsCountElement.innerHTML = cartItems.length;
    bagItemsCountElement.style.visibility = 'visible';
  } else {
    bagItemsCountElement.style.visibility = 'hidden';
  }
}

function displayCartItems() {
  let cartItemsHTML;
  fetchCartItem();
  bagitemsObj.map((item) => {
    cartItemsHTML += concatCartItem(item);
  })
  bagItemsElement.innerHTML = cartItemsHTML;
}

function fetchCartItem() {
  bagitemsObj = cartItems.map((item) => {
    for (i = 0; i < items.length; i++) {
      if (item == items[i].id) {
        return (items[i]);
      }
    }
  });
}

function concatCartItem(item) {
  return (`<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.original_price}</span>
                <span class="original-price">Rs ${item.current_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date} Oct 2023</span>
              </div>
            </div>
            <div class="remove-from-cart" onClick=handleDeleteItem(${item.id})>X</div>
          </div>
`
  );

}

function handleDeleteItem(itemId){
  cartItems = cartItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('bagItems', JSON.stringify(cartItems));
  bagIconDisplay();
  bagSummaryDisplay();
  displayCartItems();
  bagSummaryDisplay();
}


function bagSummaryDisplay() {
  let totalPrice = 0;
  let discountMRP = 0;
  const CONVENIENCE_FEE = 99;
  let totalAmount;
  bagitemsObj.forEach(item => {
    totalPrice += item.original_price;
    discountMRP += (item.original_price - item.current_price);
  });
  totalAmount = totalPrice - discountMRP + CONVENIENCE_FEE;

  return (bagSummaryElement.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${cartItems.length} Items)</div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">Rs${totalPrice}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount"
                >-Rs${discountMRP}</span
              >
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs ${CONVENIENCE_FEE}</span>
            </div>
            <hr />
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${totalAmount}</span>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`);
}