// SIGNUP FUNCTION
function signup() {
    let user = document.getElementById("newUser").value;
    let pass = document.getElementById("newPass").value;
    let msg = document.getElementById("signupMsg");

    if (user === "" || pass === "") {
        msg.innerHTML = "All fields required!";
        msg.style.color = "red";
        return;
    }

    // Save login info to browser
    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    msg.innerHTML = "Account created successfully!";
    msg.style.color = "green";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}


// LOGIN FUNCTION (NOW CHECKS SAVED DATA)
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let msg = document.getElementById("loginMsg");

    // Get saved signup data
    let savedUser = localStorage.getItem("username");
    let savedPass = localStorage.getItem("password");

    if (user === savedUser && pass === savedPass) {
        window.location.href = "home.html";
    } else {
        msg.innerHTML = "Invalid login!";
        msg.style.color = "red";
    }

}
//-----------------------------------------------------------------
// CART SYSTEM WITH LOCAL STORAGE
//-----------------------------------------------------------------

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}

// Show cart items in cart.html
function loadCart() {
    let cartList = document.getElementById("cartList");
    let totalPrice = 0;

    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        cartList.innerHTML += `
            <li>
                ${item.name} - ₹${item.price}
                <button class="remove-btn" onclick="removeItem(${index})">❌</button>
            </li>
        `;

        totalPrice += item.price;
    });

    document.getElementById("total").innerText = totalPrice;
}

// Remove an item
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Clear entire cart
function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}