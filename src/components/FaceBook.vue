<template>
      <h1>Facebook Post</h1>
    <input v-model="postMessage" type="text" placeholder="Enter your message or link" />
    <label>
      <input type="radio" v-model="postType" value="message" /> Message
    </label>
    <label>
      <input type="radio" v-model="postType" value="link" /> Link
    </label>
    <input type="file" @change="onFileChange" accept="image/*" />
    <br>
    <button @click="postToFacebook">Post to Facebook</button>

    <div>
      <h2>Post to Both Facebook and Another Platform</h2>
      <input v-model="message" type="text" placeholder="Enter your message" />
      <input v-model="link" type="text" placeholder="Enter your link" />
      <button @click="postToBothFacebook">Post to both Facebook</button>
    </div>

</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      location1: "",
      location2: "",
      selectedChoice: "", // Store the selected choice
      choices: ["coffe shop", "atm", "restaurants", "hotels", "gas stations"], // Add your choices here
      placesResponse: null,
      fromLocation: null, // Store the "from location" coordinates
      resultsPerPage: 10, // Number of results to display per page
      currentPage: 1, // Current page
      postMessage: "",
      postType: "message", 
      message:"",
      link:"",
      selectedFile: null,

    };
  },
  
  methods: {
   
  onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },

postToFacebook() {
      console.log(this.postType)

      if (this.postMessage.trim() === "") {
        alert("Message cannot be empty.");
        return;
      }

    
      axios
        .post(`https://localhost:7041/api/Product/post?type=${this.postType}`, this.postMessage, {
        
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

    postToBothFacebook(){
      axios
        .post(`https://localhost:7041/api/Product/facebook?link=${this.selectedFile}`, this.message, {
        
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
  
    changePage(direction) {
    // Handle pagination by changing the current page
    if (direction === -1 && this.currentPage > 1) {
      this.currentPage -= 1;
    } else if (direction === 1 && (this.currentPage * this.resultsPerPage) < this.placesResponse.results.length) {
      this.currentPage += 1;
    }
  },
  },
};
</script>
<style>
div {
  margin: 20px;
}

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