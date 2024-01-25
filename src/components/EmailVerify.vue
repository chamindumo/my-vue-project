<template>
  <div class="verification-container">
    <h2>Email Verification</h2>
    <p class="verification-description">Enter your email and verification token to verify your email.</p>
    <div class="input-group">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" placeholder="Enter your email" class="input-field" />
    </div>
    <div class="input-group">
      <label for="token">Verification Token:</label>
      <input type="text" id="token" v-model="token" placeholder="Enter your verification token" class="input-field" />
    </div>
    <button @click="verifyEmail" class="verify-button">Verify Email</button>
    <p class="verification-message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';
import 'C:/Users/janit/source/repos/Nayana mama front/my-vue-project/src/StyleSheet.css'

export default {
  data() {
    return {
      email: '',
      token: '',
      message: '',
    };
  },
  methods: {
    verifyEmail() {
      const recipientEmail = this.email;
      const token = this.token;

      axios.post(`https://localhost:7141/Email/${recipientEmail}/${token}`)
        .then(response => {
          // Handle success
          if (response.status === 200) {
            this.message = 'Email verification successful!';
            this.$router.push('/');
          } else {
            this.message = 'Email verification failed.';
          }
        })
        .catch(error => {
          // Handle error
          this.message = 'Error verifying email.';
          console.error('Error verifying email:', error);
        });
    },
  },
  mounted() {
    // Set a 5-minute (300,000 milliseconds) time limit
    const timeLimit = 300000;

    // Use setTimeout to automatically redirect to the signup page when the time limit expires
    setTimeout(() => {
      this.$router.push('/signup'); // Replace '/signup' with your actual signup route
    }, timeLimit);
  },
};
</script>
<style scoped>

</style>