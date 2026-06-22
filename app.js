import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const options = document.querySelectorAll(".product-option");

const selectedProduct = document.getElementById("selectedProduct");
const unitPrice = document.getElementById("unitPrice");
const quantityText = document.getElementById("quantity");
const totalText = document.getElementById("total");

const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");
const orderBtn = document.getElementById("orderBtn");

const clientName = document.getElementById("clientName");
const clientPhone = document.getElementById("clientPhone");
const message = document.getElementById("message");

let productName = "Individual";
let price = 50;
let quantity = 1;

function updateTotal() {
  selectedProduct.textContent = productName;
  unitPrice.textContent = price;
  quantityText.textContent = quantity;
  totalText.textContent = price * quantity;
}

options.forEach(option => {
  option.addEventListener("click", () => {
    options.forEach(item => item.classList.remove("selected"));
    option.classList.add("selected");

    productName = option.dataset.name;
    price = Number(option.dataset.price);
    quantity = 1;

    updateTotal();
  });
});

plusBtn.addEventListener("click", () => {
  quantity++;
  updateTotal();
});

minusBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    updateTotal();
  }
});

orderBtn.addEventListener("click", async () => {
  const name = clientName.value.trim();
  const phone = clientPhone.value.trim();

  if (name === "" || phone === "") {
    message.textContent = "Completa tu nombre y teléfono.";
    message.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "pedidos"), {
      cliente: name,
      telefono: phone,
      producto: productName,
      precioUnitario: price,
      cantidad: quantity,
      total: price * quantity,
      estado: "pendiente",
      fecha: serverTimestamp()
    });

    message.textContent = "Pedido guardado correctamente.";
    message.style.color = "green";

    clientName.value = "";
    clientPhone.value = "";
    quantity = 1;
    updateTotal();

  } catch (error) {
    console.log(error);
    message.textContent = "Error al guardar el pedido.";
    message.style.color = "red";
  }
});

updateTotal();