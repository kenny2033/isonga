// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // ====================
  // DARK MODE TOGGLE
  // ====================
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Check if dark mode preference is saved in localStorage
  const isDarkMode = localStorage.getItem("darkMode") === "enabled";

  // Apply dark mode if preference exists
  if (isDarkMode) {
    body.classList.add("dark-mode");
    darkModeToggle.innerHTML = "<span>☀️</span> Light Mode";
  }

  // Toggle dark mode when button is clicked
  darkModeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");

    // Update button text and save preference to localStorage
    if (isDark) {
      darkModeToggle.innerHTML = "<span>☀️</span> Light Mode";
      localStorage.setItem("darkMode", "enabled");
    } else {
      darkModeToggle.innerHTML = "<span>🌙</span> Dark Mode";
      localStorage.setItem("darkMode", "disabled");
    }
  });

  // ====================
  // USER FORM SUBMISSION
  // ====================
  const userForm = document.getElementById("userForm");

  userForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // In a real app, you would process the data here
    console.log("User submitted:", { name, email });

    // Show success message
    alert(`Thank you, ${name}! Your information has been submitted.`);

    // Reset form
    userForm.reset();
  });

  // ====================
  // MOUSE POSITION TRACKING
  // ====================
  const mouseTracker = document.getElementById("mouseTracker");
  const mouseX = document.getElementById("mouseX");
  const mouseY = document.getElementById("mouseY");

  // Track mouse movement in the mouseTracker element
  mouseTracker.addEventListener("mousemove", function (e) {
    mouseX.textContent = e.clientX;
    mouseY.textContent = e.clientY;
  });

  // ====================
  // ITEM LISTER FUNCTIONALITY
  // ====================
  const itemForm = document.getElementById("itemForm");
  const itemInput = document.getElementById("itemInput");
  const itemList = document.getElementById("itemList");

  // Load items from localStorage when page loads
  loadItems();

  // Add item when form is submitted
  itemForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const itemText = itemInput.value.trim();

    if (itemText) {
      addItem(itemText);
      itemInput.value = ""; // Clear input
      saveItems(); // Save to localStorage
    }
  });

  // Function to add a new item to the list
  function addItem(text) {
    // Create new list item
    const li = document.createElement("li");

    // Create text node with item text
    const textNode = document.createTextNode(text);

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    // Add event listener to delete button
    deleteBtn.addEventListener("click", function () {
      // Show confirmation dialog
      if (confirm("Are you sure you want to delete this item?")) {
        li.remove(); // Remove the list item
        saveItems(); // Update localStorage
      }
    });

    // Append elements to list item
    li.appendChild(textNode);
    li.appendChild(deleteBtn);

    // Add new item to the top of the list
    itemList.insertBefore(li, itemList.firstChild);
  }

  // Function to save items to localStorage
  function saveItems() {
    const items = [];
    // Get all text from list items
    document.querySelectorAll("#itemList li").forEach((li) => {
      // Get the text content excluding the delete button text
      items.push(li.childNodes[0].textContent);
    });

    // Save to localStorage
    localStorage.setItem("items", JSON.stringify(items));
  }

  // Function to load items from localStorage
  function loadItems() {
    const savedItems = JSON.parse(localStorage.getItem("items"));

    if (savedItems) {
      // Clear existing items except the default ones
      while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
      }

      // Add saved items to the list
      savedItems.forEach((item) => {
        addItem(item);
      });
    }
  }

  // Add event listeners to existing delete buttons
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this item?")) {
        this.parentElement.remove();
        saveItems();
      }
    });
  });

  // ====================
  // DEMONSTRATING DOM METHODS
  // ====================
  console.log("Demonstrating DOM methods:");

  // getElementById
  const userFormElement = document.getElementById("userForm");
  console.log("Form element by ID:", userFormElement);

  // getElementsByClassName
  const boxes = document.getElementsByClassName("box");
  console.log("Elements with class 'box':", boxes);

  // getElementsByTagName
  const buttons = document.getElementsByTagName("button");
  console.log("All button elements:", buttons);

  // querySelector
  const firstBox = document.querySelector(".box");
  console.log("First element with class 'box':", firstBox);

  // querySelectorAll
  const allBoxes = document.querySelectorAll(".box");
  console.log("All elements with class 'box':", allBoxes);

  // DOM Traversal examples
  if (itemList.firstElementChild) {
    const firstItem = itemList.firstElementChild;
    console.log("First item in the list:", firstItem);

    const parent = firstItem.parentNode;
    console.log("Parent of first item:", parent);

    const nextSibling = firstItem.nextElementSibling;
    console.log("Next sibling of first item:", nextSibling);
  }
});
