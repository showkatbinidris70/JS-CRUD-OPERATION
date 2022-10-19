const filterInputElm = document.querySelector("#filter");
const nameInputElm = document.querySelector(".nameInput");
const priceInputElm = document.querySelector(".priceInput");
const msgElm = document.querySelector(".msg");
const collectionElm = document.querySelector(".collection");
const form = document.querySelector("form");

let products = [
  // {
  //     id: 1,
  //     name: "banana",
  //     price: 30
  // }, {
  //     id: 1,
  //     name: "banana",
  //     price: 30
  // }
];

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

function handleManipulateProduct(event) {
  if (event.target.classList.contains("delete-product")) {
    // get the product ID
    getProductId(event);
  }
  // console.log(event.target)
}
collectionElm.addEventListener("click", handleManipulateProduct);
