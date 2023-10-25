const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('#search-btn');
const shoppingCart = document.querySelector('.shopping-cart');
const cartBtn = document.querySelector('#cart-btn');
const favForm = document.querySelector('.fav-form');
const selectionForm = document.querySelector('.selection-form');
const favBtn = document.querySelector('#fav-btn');
const profileBtn = document.querySelector('#profile-btn');
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('#menu-btn');
const section = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header .navbar a');


searchBtn.onclick = () => {
  searchForm.classList.toggle('active');
  shoppingCart.classList.remove('active');
  favForm.classList.remove('active');
  navbar.classList.remove('active');
  selectionForm.classList.remove('active');
};

cartBtn.onclick = () => {
  shoppingCart.classList.toggle('active');
  favForm.classList.remove('active');
  searchForm.classList.remove('active');
  navbar.classList.remove('active');
  selectionForm.classList.remove('active');
};

favBtn.onclick = () => {
  favForm.classList.toggle('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  navbar.classList.remove('active');
  selectionForm.classList.remove('active');
};

menuBtn.onclick = () => {
  navbar.classList.toggle('active');
  favForm.classList.remove('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  selectionForm.classList.remove('active');
};

profileBtn.onclick = () => {
  selectionForm.classList.toggle('active');
  favForm.classList.remove('active');
  searchForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  navbar.classList.remove('active');
};

window.onscroll = () => {
  navbar.classList.remove('active');
  favForm.classList.remove('active');
  shoppingCart.classList.remove('active');
  searchForm.classList.remove('active');
  selectionForm.classList.remove('active');

  section.forEach((sec) => {
    let top = window.scrollY;
    let height = sec.offsetHeight;
    let offset = sec.offsetTop - 150;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove('active');
        document
          .querySelector('header .navbar a[href*=' + id + ']')
          .classList.add('active');
      });
    }
  });

  if (window.scrollY > 50) {
    document.querySelector('#scroll-top').classList.add('active');
  } else {
    document.querySelector('#scroll-top').classList.remove('active');
  }
};

/*   Log in   */
const loginPopup = document.querySelector('.login-popup');
const loginButton = document.querySelector('.log-in-btn');
const close = document.querySelector('.close-login');

loginButton.addEventListener('click', function () {
  loginPopup.classList.add('show');
});

close.addEventListener('click', function () {
  loginPopup.classList.remove('show');
});

/* Sign UP */


document.addEventListener("DOMContentLoaded", function() {
  // JavaScript code for form validation and event listeners
  const signupPopup = document.querySelector('.signup-popup');
  const signupButton = document.querySelector('.sign-up-btn');
  const closeBtn = document.querySelector('.close-signup');
  
  signupButton.addEventListener('click', function () {
    signupPopup.classList.add('show');
  });
  
  closeBtn.addEventListener('click', function () {
    signupPopup.classList.remove('show');
  });
});

/* Add to Cart */
document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cart = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('#cart-total');
  let totalAmount = 0;
  const cartItems = [];

  function renderCart() {
    cart.innerHTML = '';

    if (cartItems.length === 0) {
      cart.innerHTML = '<p>Please add something to the cart.</p>';
    } else {
      cartItems.forEach((item) => {
        const cartItem = document.createElement('li');
        cartItem.classList.add('custom-list');
        cartItem.innerHTML = `
          <div class="box">
            <i class="fas fa-trash delete-item"></i>
            <img src="${item.image}" alt="${item.name}" />
            <div class="content">
              <h3 class="cart-item-name">${item.name}</h3>
              <span class="cart-item-price price">$${item.price.toFixed(2)}</span>
              <span class="cart-item-quantity quantity">
                <span class="decrement-quantity">-</span>
                ${item.quantity}
                <span class="increment-quantity">+</span>
              </span>
            </div>
          </div>
        `;
        cart.appendChild(cartItem);
      });
    }
  }

  function updateTotal() {
    totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
  }

  cart.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-item')) {
      const itemIndex = cartItems.findIndex((item) =>
        item.name === event.target.parentElement.querySelector('.cart-item-name').textContent
      );

      if (itemIndex !== -1) {
        const item = cartItems[itemIndex];
        totalAmount -= item.price * item.quantity;
        cartItems.splice(itemIndex, 1);
        updateTotal();
        renderCart();
      }
    } else if (event.target.classList.contains('increment-quantity')) {
      const itemIndex = cartItems.findIndex((item) =>
        item.name === event.target.parentElement.parentElement.querySelector('.cart-item-name').textContent
      );

      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity++;
        totalAmount += cartItems[itemIndex].price;
        updateTotal();
        renderCart();
      }
    } else if (event.target.classList.contains('decrement-quantity')) {
      const itemIndex = cartItems.findIndex((item) =>
        item.name === event.target.parentElement.parentElement.querySelector('.cart-item-name').textContent
      );

      if (itemIndex !== -1 && cartItems[itemIndex].quantity > 1) {
        cartItems[itemIndex].quantity--;
        totalAmount -= cartItems[itemIndex].price;
        updateTotal();
        renderCart();
      }
    }
  });

  renderCart();

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const dishContainer = button.parentElement;
      const dishName = dishContainer.querySelector('.dish-name').textContent;
      const dishPrice = parseFloat(
        dishContainer.querySelector('.dish-price').textContent.replace('$', '')
      );
      const dishImage = dishContainer.querySelector('img').src;

      let existingCartItem = cartItems.find((item) => item.name === dishName);

      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        const cartItem = {
          name: dishName,
          price: dishPrice,
          quantity: 1,
          image: dishImage,
        };
        cartItems.push(cartItem);
      }

      totalAmount += dishPrice;
      updateTotal();
      renderCart();
    });
  });
});


/* pop message*/
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartPopup = document.querySelector(".cart-popup");
const cartMessage = document.getElementById("cart-message");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Show the pop-up message
    cartMessage.textContent = "Added to Cart....";
    cartPopup.classList.add("show");

    // Hide the pop-up message after 2 seconds
    setTimeout(() => {
      cartPopup.classList.remove("show");
    }, 1000);
  });
});


/* Fav list*/
document.addEventListener('DOMContentLoaded', function () {
  const likeIcons = document.querySelectorAll('.fas.fa-heart');
  const favForm = document.querySelector('.fav-form ul.favorite-list');

  likeIcons.forEach((icon) => {
    icon.addEventListener('click', function () {
      const dishContainer = icon.parentElement;
      const dishName = dishContainer.querySelector('h3').textContent;
      const dishPrice = dishContainer.querySelector('.dish-price').textContent;
      const dishImage = dishContainer.querySelector('img').src;

      // Check if the item is already in the favorites list
      const existingFavItem = Array.from(favForm.children).find((item) =>
        item.querySelector('span').textContent === dishName
      );

      if (existingFavItem) {
        // If the item is already in favorites, remove it
        favForm.removeChild(existingFavItem);
        // Make the heart icon inactive (unfilled)
        icon.classList.remove('active');
      } else {
        // Create a list item for the fav item
        const favItem = document.createElement('li');
        favItem.innerHTML = `
          <img src="${dishImage}" alt="${dishName}" />
          <span>${dishName}</span>
          <span>${dishPrice}</span>
        `;

        // Add the fav item (list item) to the fav-form
        favForm.appendChild(favItem);
        // Make the heart icon active (filled)
        icon.classList.add('active');
      }
    });
  });
});

/* Form Validation */ 
document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const loginButton = document.getElementById('login-button');
  const closeLogin = document.querySelector('.close-login');

  const signupForm = document.getElementById('signup-form');
  const signupName = document.getElementById('signup-name');
  const signupEmail = document.getElementById('signup-email');
  const signupPassword = document.getElementById('signup-password');
  const signupButton = document.getElementById('signup-button');
  const closeSignup = document.querySelector('.close-signup');

  // Handle login form submission
  loginButton.addEventListener('click', function () {
    const emailValue = loginEmail.value.trim();
    const passwordValue = loginPassword.value;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(emailValue);

    // Validate password length (minimum 6 characters)
    const isPasswordValid = passwordValue.length >= 6;

    // Check email and password
    if (isEmailValid && isPasswordValid) {
      // Simulate a successful login (replace with your own logic)
      loginEmail.value = ''; // Clear the input
      loginPassword.value = ''; // Clear the input
      closeLogin.click(); // Close the login popup
      // You can perform a login request to your backend here
    } else {
      // Display error messages
      if (!isEmailValid) {
        loginEmail.nextElementSibling.textContent = 'Invalid email format';
      } else {
        loginEmail.nextElementSibling.textContent = '';
      }

      if (!isPasswordValid) {
        loginPassword.nextElementSibling.textContent = 'Password must be at least 6 characters';
      } else {
        loginPassword.nextElementSibling.textContent = '';
      }
    }
  });

  // Handle signup form submission
  signupButton.addEventListener('click', function () {
    const nameValue = signupName.value.trim();
    const emailValue = signupEmail.value.trim();
    const passwordValue = signupPassword.value;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(emailValue);

    // Validate password length (minimum 6 characters)
    const isPasswordValid = passwordValue.length >= 6;

    // Check email and password
    if (isEmailValid && isPasswordValid) {
      // Simulate a successful signup (replace with your own logic)
      signupName.value = ''; // Clear the input
      signupEmail.value = ''; // Clear the input
      signupPassword.value = ''; // Clear the input
      closeSignup.click(); // Close the signup popup
      // You can perform a sign-up request to your backend here
    } else {
      // Display error messages
      if (!isEmailValid) {
        signupEmail.nextElementSibling.textContent = 'Invalid email format';
      } else {
        signupEmail.nextElementSibling.textContent = '';
      }

      if (!isPasswordValid) {
        signupPassword.nextElementSibling.textContent = 'Password must be at least 6 characters';
      } else {
        signupPassword.nextElementSibling.textContent = '';
      }
    }
  });

  // Close login and signup sections
  closeLogin.addEventListener('click', function () {
    loginEmail.value = ''; // Clear the input
    loginPassword.value = ''; // Clear the input
  });

  closeSignup.addEventListener('click', function () {
    signupName.value = ''; // Clear the input
    signupEmail.value = ''; // Clear the input
    signupPassword.value = ''; // Clear the input
  });
});


