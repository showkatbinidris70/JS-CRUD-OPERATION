const filterInputElm = document.querySelector("#filter");
const nameInputElm = document.querySelector(".nameInput");
const priceInputElm = document.querySelector(".priceInput");
const msgElm = document.querySelector(".msg");
const collectionElm = document.querySelector(".collection");
const form = document.querySelector("form");

let products = localStorage.getItem("storeProducts")
  ? JSON.parse(localStorage.getItem("storeProducts"))
  : [];

function receiveInputs() {
  const name = nameInputElm.value;
  const price = priceInputElm.value;

  return { name, price };
}

function clearMessage() {
  msgElm.textContent = "";
}

function showMessage(msg, action = "success") {
  const textMsg = `<div class="alert alert-${action}" role="alert">
    ${msg}
  </div>`;
  msgElm.insertAdjacentHTML("afterbegin", textMsg);
  setTimeout(() => {
    clearMessage();
  }, 1000);
}

function validateInputs(name, price) {
  let isValid = true;
  if (name === "" || price === "") {
    isValid = false;
    showMessage("Please enter all fields", "danger");
  }

  if (Number(price) !== Number(price)) {
    isValid = false;
    showMessage("Please enter price", "danger");
  }
  return isValid;
}

function resetInput() {
  nameInputElm.value = "";
  priceInputElm.value = "";
}
function addProduct(name, price) {
  const product = {
    id: products.length + 1,
    name,
    price,
  };

  // memory data store
  products.push(product);
  return product;
}
function showProductToUI(productInfo) {
  //remove not found product message and adding new products
  const notFoundMsgElm = document.querySelector(".not-found-product");
  if (notFoundMsgElm) {
    notFoundMsgElm.remove();
  }
  const { id, name, price } = productInfo;
  const elm = `<li
    class="list-group-item collection-item d-flex flex-row justify-content-between"
    data-productId = "${id}";
  >
    <div class="product-info">
      <strong>${name}</strong>- <span class="price">$${price}</span>
    </div>
    <div class="action-btn">
      <i class="fa fa-pencil-alt float-right me-2 edit-product"></i>
      <i class="fa fa-trash-alt float-right  delete-product"></i>
    </div>
  </li>`;
  collectionElm.insertAdjacentHTML("afterbegin", elm);
}

function addProductToStorage(product) {
  let products;
  if (localStorage.getItem("storeProducts")) {
    products = JSON.parse(localStorage.getItem("storeProducts"));
    products.push(product);
  } else {
    products = [];
    products.push(product);
  }

  localStorage.setItem("storeProducts", JSON.stringify(products));
}

function handleFormSubmit(event) {
  // prevent browser reload
  event.preventDefault();

  // reveice input data
  const { name, price } = receiveInputs();
  const isValided = validateInputs(name, price);
  if (!isValided) return;

  // reset the input
  resetInput();

  const product = addProduct(name, price);

  //add data to localstorage
  addProductToStorage(product);

  showProductToUI(product);

  console.log(name, price);
}

form.addEventListener("submit", handleFormSubmit);

function removeItem(id) {
  products = products.filter((product) => product.id !== id);
}

function removeItemFromUI(id) {
  document.querySelector(`[data-productId="${id}"]`).remove();
  showMessage("Product deleted successfully", "warning");
}

function getProductId(event) {
  const liElm = event.target.parentElement.parentElement;
  const id = Number(liElm.getAttribute("data-productId"));
  //remove product from data store
  removeItem(id);

  //remove product form ui
  removeItemFromUI(id);
}
function removeProductFromLocalStorage(id) {
  let products;
  products = JSON.parse(localStorage.getItem("storeProducts"));
  products = products.filter((product) => product.id !== id);
  localStorage.setItem("storeProducts", JSON.stringify(products));
}

function handleManipulateProduct(event) {
  if (event.target.classList.contains("delete-product")) {
    // get the product ID
    getProductId(event);

    //remove product from data store
    removeItem(id);

    //remove item from localstorage
    removeProductFromLocalStorage(id);

    //remove product form ui
    removeItemFromUI(id);
  }
  // console.log(event.target)
}

function showAllProductsToUI(products) {
  //looping
  let liElms;
  liElms =
    products.length === 0
      ? "<li class='list-group-item collection-item d-flex flex-row justify-content-between not-found-product'>No Products here</li>"
      : "";

  //sorted products when insert products
  const sortedProducts = products.sort((a, b) => {
    b.id - a.id;
  });
  //console.log(sortedProducts);
  products.forEach((product) => {
    const { id, name, price } = product;
    liElms += `<li
    class="list-group-item collection-item d-flex flex-row justify-content-between"
    data-productId = "${id}";
  >
    <div class="product-info">
      <strong>${name}</strong>- <span class="price">$${price}</span>
    </div>
    <div class="action-btn">
      <i class="fa fa-pencil-alt float-right me-2 edit-product"></i>
      <i class="fa fa-trash-alt float-right  delete-product"></i>
    </div>
  </li>`;
  });
  collectionElm.insertAdjacentHTML("afterbegin", liElms);
}
collectionElm.addEventListener("click", handleManipulateProduct);

document.addEventListener("DOMContentLoaded", () =>
  showAllProductsToUI(products)
);
