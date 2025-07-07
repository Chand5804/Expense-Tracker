const firebaseConfig = {
  apiKey: "AIzaSyD894uaBkdlJmeAXIyrLzWZ5SSKbFsdtHk",
  authDomain: "expense-tracker-56f14.firebaseapp.com",
  projectId: "expense-tracker-56f14",
  storageBucket: "expense-tracker-56f14.firebasestorage.app",
  messagingSenderId: "1062238138306",
  appId: "1:1062238138306:web:3cede978a2f01e8ad6705b",
  measurementId: "G-Q0C621815Z"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM Elements
const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");

// Add Expense to Firestore
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  db.collection("expenses").add({
    title: title,
    amount: amount,
    date: date
  })
  .then(() => {
    form.reset();
    loadExpenses();
  })
  .catch((error) => {
    console.error("Error adding expense:", error);
    // catch block that runs if there is an error during the Firestore add operation
  });
});

// Load Expenses from Firestore
function loadExpenses() {
  list.innerHTML = "";

  db.collection("expenses").orderBy("date", "desc").get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement("li");

       li.textContent = `${data.title} - $${data.amount} on ${data.date}`;

            list.appendChild(li);
      });
    });
}

// Load on page load
window.onload = loadExpenses;