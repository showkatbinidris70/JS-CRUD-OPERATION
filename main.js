const filterInputElm = document.querySelector("#filter");
const nameInputElm = document.querySelector(".nameInput");
const priceInputElm = document.querySelector(".priceInput");
const msgElm = document.querySelector(".msg");
const form = document.querySelector("form");

function receiveInputs() {
  const name = nameInputElm.value;
  const price = priceInputElm.value;

  return { name, price };
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
  if (name === "" || price === "") {
    showMessage("Please enter name and price");
  }
}

function handleFormSubmit(event) {
  //prevent browser reload
  event.preventDefault();

  //reveice input data
  const { name, price } = receiveInputs();
  validateInputs(name, price);
  //console.log(name, price);
}

form.addEventListener("submit", handleFormSubmit);
