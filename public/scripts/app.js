// Client facing scripts here

// MAKES REQUEST AND ASSEMBLE THE MENU BASED ON ALL MENU ITEMS FUNCTION //
// import { allMenuItems }

// Function getAllItems: GET our burger menu's information(name,price,description) from the database

$(() => {
  getAllItems();
  getAllOrders();
});

const getAllOrders = () => {
  $.ajax({
    url:"/user/orders",
    type: "GET",
    success: (result) => {
      console.log('result:', result)
      const orders = result.orders;
      for (const order of orders) {
        $(".order-items").append(renderOrderItems(order));
      }
    },
    error: (err) => {
      console.log('error:', err.message)
    },
  });
};

const renderOrderItems = (order) => {
  console.log(order);
  const $orderList = `
            <div class="box-container">
              <div class="box">
                <p>placed on : <span>2022-06-08</span></p>
                <p>name : ${order.user_id}</span>
                <p>your orders : <span>BiteMe Burger (1), Chicken Sandwich (2) </span></p>
                <p>total price : <span>$20</span></p>
                <p>payment method : <span>cash on delivery</span></p>
                <p>payment status : <span>completed</span></p>
                <p>order placed : <span>12:35pm</span></p>
                <p>estimated time left : <span>20 minutes</span></p>
                <p>completed at : <span></span></p>
              </div>

              </div>
            </div>
            `;
          return $orderList;
};


const getAllItems = () => {
  $.ajax({
    url: "/user/items",
    type: "GET",
    success: (result) => {
      const items = result.items;
      for (const item of items) {
        $(".choose-order").append(renderMenuItems(item));
      }
    },
    error: (err) => {
      console.log("ERROR", err.message);
    },
  });
};

const renderMenuItems = (item) => {
  // console.log(item);
  const $itemList = `
  <div class="col-3">
  <div class="items food1">
  <img class="burger-img1" src="../${item.item_photo_url}">
  <div class="text-center mt-4">
  <h5 class="text">${item.item_name}</h5>
  <p>${item.item_description}</p>
  </div>
  <div class="food-card-footer">

  <div class="row quantity-and-price align-items-center justify-content-end">
  <div class="col-4"></div>
  <div class="quantity col-2">
  <input type="number" value="1" min="0" max="100" step="1"/>
  </div>
  <div class="col-3">
  <h3 class="">$${item.price}</h3>
  </div>
  <div class="col-1">
  <button class="cards-icon-container btn btn-light">
  <i class="bx bx-cart" type="button" name="select" value="addToCart"></i>
  </button>
  </div>
  </div>
  </div>
  `;
  return $itemList;
};


