const filterInputElm = document.querySelector("#filter");
const nameInputElm = document.querySelector(".nameInput");
const priceInputElm = document.querySelector(".priceInput");
const msgElm = document.querySelector(".msg");
const collectionElm = document.querySelector(".collection");
const form = document.querySelector("form");


const products = [
    // {
    //     id: 1,
    //     name: "banana",
    //     price: 30
    // }, {
    //     id: 1,
    //     name: "banana",
    //     price: 30
    // }
]

function receiveInputs() {
    const name = nameInputElm.value;
    const price = priceInputElm.value;

    return {name, price};
}

function clearMessage() {
    msgElm.textContent = "";
}

function showMessage(msg) {
    const textMsg = `<div class="alert alert-danger" role="alert">
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
        showMessage("Please enter all fields");
    }

    if (Number(price) !== Number(price)) {
        isValid = false;
        showMessage("Please enter price");
    }
    return isValid;
}

function resetInput() {
    nameInputElm.value = ''
    priceInputElm.value = ''
}
function addProduct(name, price) {
    const product = {
        id: products.length + 1,
        name,
        price
    }

    // memory data store
    products.push(product);
    return product;
}
function showProductToUI(productInfo) {
  
}
function handleFormSubmit(event) { // prevent browser reload
    event.preventDefault();

    // reveice input data
    const {name, price} = receiveInputs();
    const isValided = validateInputs(name, price);
    if (! isValided) 
        return;
    


    // reset the input
    resetInput();

    const product = addProduct(name, price);

    showProductToUI(product);

    console.log(name, price);
}

form.addEventListener("submit", handleFormSubmit);
