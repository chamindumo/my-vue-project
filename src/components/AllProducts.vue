<template>
  <div class="app">
    <NavigationBar/>
    <Headder/>
  
    <main class="app-main">
      <!-- Your search form and item details code... -->

      <div v-if="products && products.length > 0" class="all-products">
        <h2>All Residents</h2>
        <label for="itemsPerPage">Items per page:</label>
      <input
        id="itemsPerPage"
        type="number"
        v-model.number="itemsPerPage"
        @input="fetchAllProducts"
        min="1"
      />
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
                <p><strong>Available:</strong> {{ product.isAvalable }}</p>
                <p><strong>Expiry Date:</strong> {{ formatDate(product.expirDate) }}</p>

              </div>
            </div>
          </li>
        </ul>
      </div>
      <label for="itemsPerPage">Items per page:</label>
      <input
        id="itemsPerPage"
        type="number"
        v-model.number="itemsPerPage"
        @input="fetchAllProducts"
        min="1"
      />
      <div class="pagination-controls">
        <button @click="moveToFirstPage" :disabled="pageNumber === 1">1</button>
        <button @click="goToPreviousPage" :disabled="pageNumber === 1">Previous</button>
        <span>Page {{ pageNumber }}</span>
        <button @click="goToNextPage" :disabled="products.length < itemsPerPage">Next</button>
        <button @click="moveToLastPage" :disabled="pageNumber === lastPage">Last Page</button>

      </div>
      </main>
    <Fotter/>
  </div>
  
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Headder from './Headder.vue';
import Fotter from './Fotter.vue';
import 'C:/Users/janit/source/repos/Nayana mama front/my-vue-project/src/StyleSheet.css'
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
      pageNumber: 1,       
      itemsPerPage: 10, 
      allProduts:[], 
      lastPage:'',
 
     };
  },
  created() {
    this.fetchAllProducts();
  },
  methods: {
    fetchAllProducts() {
      axios.get('https://localhost:7141/Allproduct', {
        params: {
          pageNumber: this.pageNumber,
          itemsPerPage: this.itemsPerPage
        }
      })
        .then(response => {
          this.products = response.data || [];

        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    getallproducts(){
      axios.get('https://localhost:7141/product')
        .then(response=>{
        this.allProduts= response.data || [];
        console.log(this.allProduts.length);
      })
      .catch(error =>{
        console.error('Error fetching',error)
      });

    },
    getImageUrl(filename) {
      return `https://localhost:7141/Photos/${filename}`;
    },
    formatDate(date) {
      return moment(date).format('MMM D, YYYY');
    },
    goToPreviousPage() {
      if (this.pageNumber > 1) {
        this.pageNumber--;
        this.fetchAllProducts();
      }
    },

    goToNextPage() {
      this.pageNumber++;
      this.fetchAllProducts();
    },
    moveToFirstPage() {
      if (this.pageNumber > 1) {
        this.pageNumber = 1;
        this.fetchAllProducts();
      }
    },
    moveToLastPage() {
      this.getallproducts();
      const lastPage = Math.ceil(this.allProduts.length / this.itemsPerPage);
      console.log(this.allProduts.length)
      if (this.pageNumber < lastPage) {
        this.pageNumber = lastPage;
        this.fetchAllProducts();
      }
    },
    // ... Other methods ...
  },
};
</script>

<style scoped>

</style>
