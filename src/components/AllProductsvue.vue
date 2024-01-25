<template>
  <div class="app">
    <NavigationBar />
    <Headder />

    <main class="app-main">
      <div v-if="products && products.length > 0" class="all-products">
        <h2>All Products</h2>
        <ul class="product-list">
          <li v-for="product in products" :key="product.id" class="product-item">
            <h3 class="product-name">{{ product.id }}</h3>
            <div class="product-details">
              <img :src="getImageUrl(product.imageData)" alt="Product Image" class="product-image" />
              <div class="product-properties">
                <p><strong>ID:</strong> {{ product.id }}</p>
                <p><strong>Name:</strong> {{ product.names }}</p>
                <p><strong>Description:</strong> {{ product.descriptions }}</p>
                <p><strong>Price:</strong> {{ product.price }}</p>
                <p><strong>Available:</strong> {{ product.isActive }}</p>
                <p><strong>Expiry Date:</strong> {{ formatDate(product.expirDate) }}</p>
              </div>
            </div>

          </li>
        </ul>
        <button
      id="myBtn"
      @click="scrollToTop"
      v-if="showScrollButton"
      style="
        position: fixed;
        bottom: 20px;
        right: 30px;
        background-color: #007BFF;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 20px;
      "
    >
      &#9650; <!-- Up arrow HTML entity -->
    </button>

      </div>

    </main>
    <Fotter />
  </div>
</template>
  
  <script>
  import axios from 'axios';
  import moment from 'moment';
  import Headder from './Headder.vue';
  import Fotter from './Fotter.vue';
  import NavigationBar from './NavigationBar.vue';
  
  export default {
    components: {
      Headder,
      Fotter,
      NavigationBar
    },
    name: 'MyComponent',
    data() {
      return {
        products: [],
        displayedProducts: [], // Add a new data property to hold displayed products
        currentPage: 1, // Track the current page of data
        pageSize: 10, // Define the number of items to load per page
        loading: false,  
        lastPage: false, // Define lastPage property
        showScrollButton:false
  
      };
    },
    created() {
      this.fetchAllProducts();
      window.addEventListener('scroll', this.handleScroll);

    },
    destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
    methods: {
      fetchAllProducts() {
        if (this.loading) return; // Prevent multiple requests
      this.loading = true;

      axios
        .get(`https://localhost:7141/Allproduct?pageNumber=${this.currentPage}&itemsPerPage=${this.pageSize}`)
        .then((response) => {
          const newProducts = response.data || [];
          this.products = this.products.concat(newProducts); // Append new data
          this.currentPage++; // Increment the page for the next request
          this.loading = false;
          this.updateDisplayedProducts();
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          this.loading = false;
        });
    },
    updateDisplayedProducts() {
      // Update the displayedProducts array to show the current page of products
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedProducts = this.products.slice(startIndex, endIndex);
    },
    handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 200) {
        this.fetchAllProducts();
    
      }
      this.showScrollButton = scrollPosition > 500; // Adjust the threshold as needed

    },
      getImageUrl(filename) {
        return `https://localhost:7141/Photos/${filename}`;
      },
      formatDate(date) {
        return moment(date).format('MMM D, YYYY');
      },
      
       scrollToTop() {
  // Get the scroll-to-top button element.
  const btn = document.getElementById('myBtn');

  // If the scroll-to-top button is not displayed, do nothing.
  if (btn.style.display === 'none') {
    return;
  }

 

  // Scroll to the top of the page smoothly.
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

      // ... Other methods ...
    },
  };
  </script>

  