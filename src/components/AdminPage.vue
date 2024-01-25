<template>
  <div class="app">
    <NavigationBar />
    <Headder />
     <div class="signup-container">
    
      <el-card class="signup-card">
        <h1>Admin page to send the Email</h1>
        <el-form ref="signupForm" :model="signupForm" label-position="top" @submit.native.prevent="signup">
          <el-form-item label="Email:" prop="email">
            <el-input type="email" v-model="signupForm.email" placeholder="Enter your email"></el-input>
          </el-form-item>
          <el-form-item label="First Name:" prop="firstName">
            <el-input v-model="signupForm.firstName" placeholder="Enter your firstname"></el-input>
          </el-form-item>
          <el-form-item label="Last name:" prop="lastName">
            <el-input v-model="signupForm.lastName" placeholder="Enter your lastname"></el-input>
          </el-form-item>
          <el-form-item label="City:" prop="city">
            <el-input v-model="signupForm.city" placeholder="Enter your city"></el-input>
          </el-form-item>
          <el-form-item label="Region:" prop="Region">
            <el-input v-model="signupForm.Region" placeholder="Enter your region"></el-input>
          </el-form-item>
          <el-form-item label="Mobile Number:" prop="mobileNumber">
            <el-input v-model="signupForm.mobileNumber" placeholder="Enter your Mobile number"></el-input>
          </el-form-item>
          <el-form-item label="Address:" prop="address">
            <el-input v-model="signupForm.address" placeholder="Enter your address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sendWelcomeEmail">Send</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- Your registration form here -->

    </div>
    <Fotter />

    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import NavigationBar from './NavigationBar.vue';
  import Headder from './Headder.vue';
  import Fotter from './Fotter.vue';

  export default {
    components: { NavigationBar, Headder, Fotter },

    data() {
      return {
        signupForm: {
          
          email: '',
          firstName:'',
          lastName:'',
          city:'',
          Region:'',
          mobileNumber:'',
          address:'',
         
        },
      };
    },
    
    methods: {
     
      sendWelcomeEmail() {
       
  
        axios.post('https://localhost:7141/api/send-welcome-email',  this.signupForm )
          .then(response => {
            // Handle successful welcome email sending
            console.log(response ,'Welcome email sent successfully.');
          })
          .catch(error => {
            // Handle welcome email sending error
            console.error('Welcome email sending error:', error);
          });
      },
    },
  };
  </script>
