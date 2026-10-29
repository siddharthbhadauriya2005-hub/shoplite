# 🛍️ ShopLite — Mini E-Commerce Store

> A lightweight, zero-dependency mini e-commerce web application built using **pure HTML, CSS, and Vanilla JavaScript**.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Demo & Screenshots](#-demo--screenshots)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [How It Works](#-how-it-works)
  - [1. In-Memory Data Store](#1-in-memory-data-store)
  - [2. Centralized State](#2-centralized-state)
  - [3. LocalStorage Cart Persistence](#3-localstorage-cart-persistence)
  - [4. Event Delegation](#4-event-delegation)
- [Browser Support](#-browser-support)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)

---

## 🌟 Overview

**ShopLite** is a front-end client-side e-commerce store application. It demonstrates core front-end fundamentals—**DOM manipulation, real-time filtering, state management, and web storage**—without relying on any external libraries, frameworks, npm packages, or third-party APIs.

Everything runs entirely in the user's browser, making it blazing fast, fully offline-capable, and simple to host on static web servers like GitHub Pages, Netlify, or Vercel.

---

## ✨ Key Features

- **🏷️ Product Catalog & Categorization**
  - Displays dynamic product cards with color banners, emojis, pricing, and descriptions.
  - Generates category filter pills dynamically from product data (`Electronics`, `Clothing`, `Accessories`, `Home`).

- **🔍 Real-Time Search & Multi-Criteria Sort**
  - Instant client-side search across product title, category, and description.
  - Sort products by:
    - Default order
    - Price: Low to High
    - Price: High to Low
    - Name: Alphabetical (A → Z)

- **🛒 Slide-Out Shopping Cart**
  - Add items with instant feedback via animated toast notifications.
  - Real-time badge counter updating with total item count.
  - Adjust individual item quantities (`+` / `−`) directly from the cart drawer.
  - Automatically remove items when the quantity reaches zero or via the delete button.

- **💵 Dynamic Price Calculations**
  - Real-time subtotal calculation using JavaScript's `.reduce()`.
  - Automatic tax computation (8% sales tax).
  - Grand total display.

- **💾 Persistent Cart State**
  - Saves cart items to the browser's `localStorage`.
  - Cart contents remain intact even after page refreshes or browser restarts.

- **📱 Fully Responsive Design**
  - Modern, clean layout built with CSS Grid and Flexbox.
  - Adapts fluidly across mobile phones, tablets, laptops, and desktop screens.

---

## 📸 Demo & Screenshots

```text
+-------------------------------------------------------------------------+
|  ShopLite             [ 🔍 Search products... ]               🛒 Cart (3)
+-------------------------------------------------------------------------+
|  [All]  [Electronics]  [Clothing]  [Accessories]      [Sort: Default  v]
+-------------------------------------------------------------------------+
|                                                      |  🛒 Your Cart [X]|
|  +-------------------+      +-------------------+    |  ----------------|
|  |     🎧 Blue       |      |     ⌚ Smart      |    |  🎧 Earbuds  x1  |
|  |  Wireless Earbuds |      |      Watch        |    |  ⌚ Watch    x2  |
|  |       $29.99  [+] |      |       $89.99  [+] |    |  ----------------|
|  +-------------------+      +-------------------+    |  Subtotal: $209.97
|                                                      |  Tax (8%):  $16.80
|  +-------------------+      +-------------------+    |  Total:    $226.77
|  |     🔊 Boom       |      |     👕 Cotton     |    |  [ Checkout ]    |
|  | Bluetooth Speaker |      |      T-Shirt      |    +------------------+
|  |       $45.99  [+] |      |       $19.99  [+] |
|  +-------------------+      +-------------------+
+-------------------------------------------------------------------------+

## Project Structure :

shoplite/
├── index.html        # Semantic markup and document layout
├── styles.css        # Custom CSS variables, responsive grid, animations
├── script.js         # Core application logic, event listeners, localStorage
└── README.md         # Project documentation
