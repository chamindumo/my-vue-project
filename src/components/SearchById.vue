<template>
    <div class="app">
      <NavigationBar/>
   <Headder/>
  <main class="app-main">
  
   <div class="item-search-container">
    <div class="search-form">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="Enter Id" prop="searchId">
              <el-input :rules="rules" v-model="form.searchId"></el-input>
            </el-form-item>
            <el-form-item label="Select Item" prop="itemType">
              <el-radio-group v-model="form.itemType">
                <el-radio label="Book">Book</el-radio>
                <el-radio label="Product">Product</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="fetchItem" round icon="el-icon-search">Search</el-button>
            </el-form-item>
            <el-form-item>
  <el-button type="primary" @click="generateQRCode">Generate QR Code</el-button>
</el-form-item>

          </el-form>
        </div>
  <div v-if="item === 'not-searched'" class="item-not-searched">
   <p class="error-message">Please enter an ID to search.</p>
         
         
       </div>
  
       <div v-else-if="item === 'not-found'" class="item-not-found">
         <p class="error-message">Item not found in the database.</p>
       </div>
  
  
       <div v-if="item !== 'not-searched'" class="item-details">
  <h2 class="item-title">{{ item.name || item.names }}</h2>
  <el-card class="item-card">
    <div class="item-properties">
      <p><strong>ID:</strong> {{ item.id }}</p>
      <p v-if="item.author"><strong>Author:</strong> {{ item.author }}</p>
      <p v-if="item.name"><strong>Title:</strong> {{ item.name }}</p>
      <p v-if="item.names"><strong>Name:</strong> {{ item.names }}</p>
      <p v-if="item.descriptions"><strong>Descriptions:</strong> {{ item.descriptions }}</p>
      <p v-if="item.isActive"><strong>Available:</strong> {{ item.isActive }}</p>
      <p v-if="item.expirDate"><strong>Expiry Date:</strong> {{ formatDate(item.expirDate) }}</p>
      <p v-if="item.price"><strong>Price:</strong> {{ item.price }}</p>
      <p v-if="item.imageData"><strong>Image:</strong> <img :src="getImageUrl(item.imageData)" alt="Item Image" class="item-image" style="width: 100px; height: 100px" :fit="fit" /></p>
    </div>
  </el-card>
</div>

<div v-if="qrCodeDataUrl" class="qr-code-container">
    <div>
      <p>Unique ID: {{ uniqueID }}</p> <!-- Display the unique ID here -->
      <img :src="qrCodeDataUrl" alt="QR Code" class="qr-code" style="width: 150px; height: 150px;" />
    </div>
    <el-button type="primary"  @click="downloadQRCode" class="download-link">Download QR Code</el-button>
  </div>
   
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
  import NavigationBar from './NavigationBar.vue';
  import 'C:/Users/janit/source/repos/Nayana mama front/my-vue-project/src/StyleSheet.css'
  import QRCode from 'qrcode-generator';

  
  
  export default {
   components: {
    Headder,
    Fotter,
    NavigationBar
},
   name: 'MyComponent',
   data() {
     return {
       item: 'not-searched', 
       qrCodeDataUrl: null, // Initialize qrCodeDataUrl to null
       uniqueID: '', // Store the unique ID
       form: {
       searchId: '',
       },
       rules: {
         searchId: [
           { required: true, message: 'Please enter the Book or Product ID', trigger: 'blur' },
           { validator: this.validateId, trigger: 'blur'},
       ],
             
     },
     };
   },
   computed: {
  downloadLink() {
    // Create a data URL for the QR code image
    return this.qrCodeDataUrl ? this.qrCodeDataUrl : '';
  },
},
   methods: {
    fetchItem() {
    this.$refs['form'].validate(valid => {
      if (valid) {
        if (this.form.searchId) {
          const type = this.form.itemType === 'Book' ? 'books' : 'product';
          axios.get(`https://localhost:7141/${type}/${this.form.searchId}`)
            .then(response => {
              this.item = response.data || 'not-found';
              this.getImageUrl();
            })
            .catch(error => {
              if (error.response && error.response.status === 404) {
                this.item = 'not-found'; // No item found
              } else {
                console.error('Error fetching item:', error);
                this.item = null; // Display error message
              }
            });
        } else {
          this.item = 'not-searched'; // Display "Please enter an ID to search" message
        }
      }
    });
  },
  
     
   getImageUrl(filename) {
     // Assuming you have a public URL to access the uploaded images
     console.log(filename)
     return `https://localhost:7141/Photos/${filename}`;
   },
  
     open2() {
             this.$message({
               showClose: true,
               message: 'Congrats, Your Iteam is updated.',
               type: 'fail'
             });
           },
  
     validateId(rule, value, callback) {
       if (isNaN(value)) {
         callback(new Error('ID must be a number'));
       } else if (value <= 0) {
         callback(new Error('ID must be greater than 0'));
       } else {
         callback();
       }
     },
  
  
     formatDate(date) {
       return moment(date).format('MMM D, YYYY');
     },
   
   

     generateQRCode() {
    if (this.item && this.item !== 'not-searched' && this.item !== 'not-found') {
      const uniqueID = this.generateUniqueID();
      const id = this.form.searchId;
      const type = this.form.itemType; // Get the selected item type
      const url = `http://localhost:8080/chatgpt?itemID=${id}&itemType=${type}`;

      const qrData = {
        uniqueID,
        item: this.item,
        type,
        url

      };
      const qr = QRCode(0, 'L'); // Create a QR Code instance
      qr.addData(JSON.stringify(qrData));
      qr.make();

      // Get QR code data URL
      const qrCodeDataUrl = qr.createDataURL(8, 0);

      // You can store the QR code data URL for rendering or use it as needed
      // For example, you can display it in a modal or save it as an image file.

      // You may also want to set it in the component's data to conditionally display it.
      this.qrCodeDataUrl = qrCodeDataUrl;
      this.uniqueID = uniqueID;


      
    }
  },
  downloadQRCode() {
  if (this.qrCodeDataUrl) {
    const qrCodeSize = 150; // Set the size of the QR code
    const qrCodeBackground = 'white'; // Set the background color

    // Create a new canvas element with a size that accommodates the QR code and the unique ID text
    const canvas = document.createElement('canvas');
    canvas.width = qrCodeSize;
    canvas.height = qrCodeSize + 30; // Adjust for the unique ID text
    const context = canvas.getContext('2d');

    // Set the background color
    context.fillStyle = qrCodeBackground;
    context.fillRect(0, 0, qrCodeSize, qrCodeSize);

    // Draw the QR code image
    const qrCodeImage = new Image();
    qrCodeImage.onload = () => {
      context.drawImage(qrCodeImage, 0, 0, qrCodeSize, qrCodeSize);

      // Add the unique ID text
      context.font = '12px Arial';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      const textX = qrCodeSize / 2;
      const textY = qrCodeSize + 20; // Position the text below the QR code
      context.fillText(` ID: ${this.uniqueID}`, textX, textY);

      // Convert the canvas to a data URL
      const modifiedQRCodeDataUrl = canvas.toDataURL('image/png');

      // Create a blob from the data URL and initiate the download
      const blob = this.dataURLtoBlob(modifiedQRCodeDataUrl);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qr_code_with_id.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    };

    qrCodeImage.src = this.qrCodeDataUrl;
  }
},
    dataURLtoBlob(dataURL) {
      const parts = dataURL.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], { type: contentType });
    },
  generateUniqueID() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let uniqueID = '';

  // Generate the first 5 characters as letters
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    uniqueID += letters.charAt(randomIndex);
  }

  // Generate the rest of the characters as numbers
  const idLength = 15; // Set the total length of the ID, including the 5 letters
  for (let i = 5; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    uniqueID += numbers.charAt(randomIndex);
  }

  return uniqueID;
},

  
}
  }
  
  </script>
  <style scoped>
  
  
  
  
  </style>