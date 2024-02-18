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
     Verify(passwordHash, inputPassword) {
    const storedBytes = Buffer.from(passwordHash, 'base64');
    const salt = storedBytes.slice(0, 16);

    const combinedBytes = Buffer.concat([salt, Buffer.from(inputPassword, 'utf-8')]);
    const hashedBytes = crypto.createHash('sha256').update(combinedBytes).digest();

    for (let i = 0; i < hashedBytes.length; i++) {
        if (hashedBytes[i] !== storedBytes[salt.length + i]) {
            return false;
        }
    }

    return true;
},
async login() {
  const { username, password } = this.loginForm;

  try {
    const collectionRef = db.collection('users');
    const userDoc = await collectionRef.where('username', '==', username).get();

    if (!userDoc.empty) {
      const userData = userDoc.docs[0].data();
      
      if (this.Verify(userData.passwordHash, password)) {
        console.log('Login successful');
        this.$router.push('/');
        this.successMessage = 'Login successful';
        this.errorMessage = '';
        this.$store.dispatch('login', { username: username }); // Pass the user object

        // Perform the necessary actions after successful login
      } else {
        console.log('Login failed');
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.successMessage = '';
        this.loginForm.attempts++;
        console.log(this.loginForm.attempts);
      }
    } else {
      console.log('User not found');
      this.errorMessage = 'User not found. Please check your credentials.';
      this.successMessage = '';
      this.loginForm.attempts++;
      console.log(this.loginForm.attempts);
    }
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