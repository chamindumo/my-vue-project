<template>
  <nav class="navigation-bar">
    <el-menu mode="horizontal" background-color="#E4E7ED" router>
      <el-menu-item index="/">Home</el-menu-item>
      <el-submenu v-if="loggedInUser" index="products" class="submenu-right">
        <template slot="title">Patent</template>
        <el-menu-item index="/book">New Patent</el-menu-item>
        <el-menu-item index="/product">Registed patent</el-menu-item>
      </el-submenu>

      <!-- Move the "Profile" menu item to the right -->
      <el-menu-item v-if="loggedInUser" index="/profile" slot="default">
        <template slot="title">
          <div style="display: flex; align-items: center;">
            <div style="margin-right: auto;">Profile</div>
          </div>
        </template>
      </el-menu-item>
      <el-menu-item v-if="loggedInUser && !isAdmin" index="/signup">Signup</el-menu-item>

      <!-- Conditional rendering for "Signup" menu item -->
      <el-menu-item v-if="!loggedInUser" index="/login">Loging</el-menu-item>

      <!-- "Logout" menu item in a separate el-menu for positioning to the right -->
    </el-menu>
  </nav>
</template>

<style scoped>
.submenu-right {
  margin-right: auto;
}

.logout-menu {
  margin-left: 10px; /* Adjust the margin as needed */
}
</style>



<script>
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    ...mapState(['loggedInUser', 'userDetails']),
    isAdmin() {
      return (this.userDetails && this.userDetails.role === 'Admin') ||  (this.userDetails && this.userDetails.role === 'Super Admin');
    },
  },
  name: 'NavigationBar',
  data() {
    return {
      users: [], // Array to store the fetched users
    };
  },
  async created() {
    if (this.loggedInUser) {
      const userDetails = await this.fetchUserDetails(this.loggedInUser.username);
      if (userDetails) {
        this.$store.commit('setUserDetails', userDetails);
      } else {
        console.error('Error fetching user details.');
      }
    }
    this.users =this.$route.params.name ,this.$route.params.email;
  },
  methods: {
    ...mapMutations(['setLoggedInUser']), // If using Vuex for state management

    async fetchUserDetails(username) {
      try {
        const response = await axios.get(`https://localhost:7095/Users?username=${username}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
      }
    },
    getImageUrl(filename) {
     // Assuming you have a public URL to access the uploaded images
     console.log(filename)
     return `https://localhost:7095/Photos/${filename}`;
   },

   logout() {
      // Perform logout actions, such as clearing user data and updating state
      // For example, if using Vuex:
      this.setLoggedInUser(null); // Clear the loggedInUser in the state

      // Redirect the user to the login page
      this.$router.push('/login'); // Change '/login' to your actual login route
    },
  }
};
</script>

<style scoped>
.el-avatar {
  margin-right: 0px;
}
</style>



