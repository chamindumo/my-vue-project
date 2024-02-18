<template>
  <div class="login-container">
    <el-card class="login-card">
      <h1>Login</h1>
      <div v-if="userDetails">
      </div>
      <el-form ref="loginForm" :model="loginForm" label-position="top" @submit.native.prevent="login">
        <el-form-item label="Username:" prop="username">
          <el-input v-model="loginForm.username" placeholder="Enter your username"></el-input>
        </el-form-item>
        <el-form-item label="Password:" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="Enter your password"></el-input>
        </el-form-item>
      
        <el-form-item>
          <el-button type="primary" native-type="submit">Login</el-button>

         </el-form-item>

        <el-form-item v-if="errorMessage" style="color: red;">
          {{ errorMessage }}
        </el-form-item>
        <el-form-item v-if="successMessage" style="color: green;">
          {{ successMessage }}
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import 'C:/Users/janit/source/repos/Nayana mama front/my-vue-project/src/StyleSheet.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore';


export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',

      },
      errorMessage: '',
      successMessage: '',
      userDetails: null, 
    };
  },
  
  methods: {

    async login() {
      const { username, password  } = this.loginForm;
console.log(password)
      try {
       
         
          console.log('Login successful');
          this.$router.push('/');
          this.successMessage = 'Login successful';
          this.errorMessage = ''; 
          this.$store.dispatch('login', { username: username }); // Pass the user object

          // Perform the necessary actions after successful login
        
      } catch (error) {
        console.error('An error occurred:', error);
        this.errorMessage = 'An error occurred while trying to log in.';
      }
    },
    goToSignUp() {
      this.$router.push('/signup');
    },

    async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
      try {
        const userCredential = await firebase.auth().signInWithPopup(provider);
        const userDetails = userCredential.user; // Get the user object
        console.log(userDetails)
        this.userDetails = userCredential.user; 

        await firebase.firestore().collection('users').doc(userDetails.uid).set({
          name: userDetails.displayName,
          email: userDetails.email,
    });
    this.userDetails = userDetails;

       this.$router.push({
        name: 'ProfilePage', // Name of the route you defined
        params: { name: userDetails.displayName, email: userDetails.email },
       });
      } catch (error) {
        console.error(error.message);
      }
    },

     async signInWithGit() {
    const provider = new firebase.auth.GithubAuthProvider();
      try {
        const userCredential = await firebase.auth().signInWithPopup(provider);
        const userDetails = userCredential.user; // Get the user object
        console.log(userDetails)
        this.userDetails = userCredential.user; 
        await firebase.firestore().collection('users').doc(userDetails.uid).set({
          name: userDetails.displayName,
          email: userDetails.email,
    });
          this.$router.push({
              name: 'ProfilePage', // Name of the route you defined
              params: { name: userDetails.displayName, email: userDetails.email },
            });
      } catch (error) {
        console.error(error.message);
      }
    },
   
  },
};
</script>



  
  <style scoped>

  </style>