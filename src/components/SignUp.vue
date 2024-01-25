<template>
    <div class="signup-container">
      <el-card class="signup-card">
        <h1>Sign Up</h1>
        <el-form ref="signupForm" :model="signupForm" label-position="top" @submit.native.prevent="signup">
          <el-form-item label="Email:" prop="email">
            <el-input type="email" v-model="signupForm.email" placeholder="Enter your email"></el-input>
          </el-form-item>
          <el-form-item label="Username:" prop="username">
            <el-input v-model="signupForm.username" placeholder="Enter your username"></el-input>
          </el-form-item>
          <el-form-item label="Password:" prop="passwordHash">
            <el-input type="password" v-model="signupForm.passwordHash" placeholder="Enter your password"></el-input>
          </el-form-item>
          <el-form-item label="First Name:" prop="firstName">
            <el-input v-model="signupForm.firstName" placeholder="Enter your firstname"></el-input>
          </el-form-item>
          <el-form-item label="Last name:" prop="lastName">
            <el-input v-model="signupForm.lastName" placeholder="Enter your lastname"></el-input>
          </el-form-item>
          
          <el-form-item label="Branch:" prop="lastName">
            
                <el-select v-model="signupForm.branch" placeholder="Select user Branch">
                  <el-option label="San Fransisco" value="SF"></el-option>
                  <el-option label="Los andgalies" value="LA"></el-option>
                  <!-- Add more options as needed -->
            </el-select>
          </el-form-item>
          <el-form-item label="Branch:" prop="lastName">
            
            <el-select v-model="signupForm.role" placeholder="Select user Branch">
              <el-option label="Super Admin" value="Super Admin"></el-option>
              <el-option label="Admin " value="Admin"></el-option>
              <el-option label="Worker " value="Worker"></el-option>
        </el-select>
      </el-form-item>
           
          <div id="recaptcha-container"></div>
          <el-form-item>
            <el-button type="primary" native-type="submit">Sign Up</el-button>
            <el-button type="text" @click="goToLogin"  >Already have an account</el-button>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="goToHome">Home</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    
  </template>
  
  <script>
  import axios from 'axios';
  import { MessageBox } from 'element-ui'; 
  import 'C:/Users/janit/source/repos/Nayana mama front/my-vue-project/src/StyleSheet.css'



  export default {
    data() {
      return {
        signupForm: {
          username: '',
          passwordHash: '',
          firstName:'',
          lastName:'',
          imageData: 'string', 
          branch:'',
          role: '',


        },
        recipient: '',
        subject: '',
        message: '',
        emails:{
          email: '',
          subject: "",
          message: "",
          
        },
        welcomeEmail:{
          email: '',
          firstName:'',
          lastName:'',
          city:'',
          Region:'',
          mobileNumber:'',
          address:'',

        },
        imageUrl: null,

      };
    },
    methods: {
      async signup() {
      try {
       

      

        const usernameExistsResponse = await axios.get(`https://localhost:7095/Users?username=${this.signupForm.username}`);
        if (usernameExistsResponse.data) {
          MessageBox.alert('Username already exists.', 'Error', {
          confirmButtonText: 'OK',
        });
        return;
      }
    
      
    
    

        const response = await axios.post('https://localhost:7095/Add/Users', this.signupForm);
        console.log('User registered:', response.data);

  
        
        // Redirect to login or any other page as needed
        this.$router.push('/');
        

      } catch (error) {
        console.error('Error during signup:', error);
        // Handle error (show error message, etc.)
      }
    },
    goToLogin() {
      // Navigate to the user registration page
      this.$router.push('/login');
    },
    goToHome(){
      this.$router.push('/');
    },
    
    getImageUrl(filename) {
  // Assuming you have a public URL to access the uploaded images
  return `https://localhost:7141/Photos/${filename}`;
},


handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('postedFile',file);
    axios.post('https://localhost:7095/SaveFile',formData)
    .then(response=>{
      console.log("image",response.data)
      this.signupForm.imageData=response.data
    })
    .catch(error=>{
      console.log("error",error)
    })
  },
    
  
   async conform(){
   const results = this.confirmationResult
   const verificationCode = prompt("Enter the verification code sent to your phone:");
    if (!verificationCode) {
      return;
    }
    const userCredential = await results.confirm(verificationCode);
    console.log("User signed in:", userCredential.user);
    },
    sendEmail() {
      const emailData = {
        recipient: this.signupForm.email
       
      };

      axios.post('https://localhost:7141/api/send-email', emailData)
        .then(response => {
          // Handle success
          console.log('Email sent:', response.data);
        })
        .catch(error => {
          // Handle error
          console.error('Error sending email:', error);
        });
      },
      sendWelcomeEmail() {

       this.welcomeEmail.firstName = this.signupForm.firstName
       this.welcomeEmail.lastName = this.signupForm.lastName
       this.welcomeEmail.email = this.signupForm.email
       this.welcomeEmail.city = this.signupForm.city
       this.welcomeEmail.Region = this.signupForm.region
       this.welcomeEmail.mobileNumber = this.signupForm.mobileNumber
       this.welcomeEmail.address = this.signupForm.address
  
       axios.post('https://localhost:7141/api/send-welcome-email',  this.welcomeEmail )
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
  
  <style scoped>
   .signup-container {
  background: linear-gradient(rgba(255, 255, 255, 0.534), rgba(255, 255, 255, 0.7)), url('@/assets/logo1.png') center/cover no-repeat;
  min-height: 100vh;
  overflow: hidden;
}


.signup-card {
  background: linear-gradient(rgba(255, 255, 255, 0.534), rgba(255, 255, 255, 0.7)) center/cover no-repeat;
  min-height: 100vh;
  overflow: hidden;
}


  </style>
  