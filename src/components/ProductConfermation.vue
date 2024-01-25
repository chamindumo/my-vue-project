<template>
    <div class="app">
      <NavigationBar />

      <h1>Facebook Post</h1>
    <input v-model="postMessage" type="text" placeholder="Enter your message or link" />
    <label>
      <input type="radio" v-model="postType" value="message" /> Message
    </label>
    <label>
      <input type="radio" v-model="postType" value="link" /> Link
    </label>
    <br>
    <button @click="postToFacebook">Post to Facebook</button>

    <div>
    <input type="file" @change="onFileChange" accept="image/*" />
    <input type="text" v-model="caption" placeholder="Caption" />
    <div v-if="selectedFile">
      <img :src="imagePreview" alt="Image Preview" style="max-width: 100%; max-height: 200px;" />
    </div>
    <button @click="uploadImage">Upload</button>
  </div>

    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import NavigationBar from './NavigationBar.vue';

  export default {
    components: { NavigationBar},

    data() {
      return {
        selectedFile: null,
        caption: "",
        postMessage: "",
        postType: "message", 
        message:"",
        link:"",
        imageData:"",
        imagePreview: null,


  
      };
    },
    
    methods: {
  postToFacebook() {
        console.log(this.postType)
  
        if (this.postMessage.trim() === "") {
          alert("Message cannot be empty.");
          return;
        }
  
      
        axios
          .post(`https://localhost:7141/FaceBook?type=${this.postType}`, this.postMessage, {
          
            headers: {
              "Content-Type": "application/json", // Specify JSON content type
            },
          
          })
          .then((response) => {
            console.log(response)
            if (response.status === 200) {
              alert("Posted to Facebook successfully.");
            } else {
              alert("Failed to post to Facebook.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },
  onFileChange(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.imagePreview = URL.createObjectURL(this.selectedFile);
      } else {
        this.imagePreview = null;
      }
    },
    async uploadImage() {
      if (this.selectedFile) {
        try {
          const formData = new FormData();
          formData.append("image", this.selectedFile);
          formData.append("caption", this.caption);

          // Send the formData to your server for processing
          const response = await axios.post("https://localhost:7141/facebook/upload-image", formData);

          if (response.status === 200) {
            alert("Posted to Facebook successfully.");
          } else {
            alert("Failed to post to Facebook.");
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
      
    
    
  

    },
  };
  </script>
  <style>
  
  
  label {
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 5px;
    margin: 5px 0;
  }
  
  button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .pagination {
    margin-top: 20px;
  }
  
  .pagination button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 15px;
    margin-right: 5px;
    cursor: pointer;
  }
  
  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  </style>