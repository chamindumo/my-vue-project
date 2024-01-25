 <template>
  <div class="app">
    <NavigationBar/>
    <Headder/>
   <div v-if="userDetails" class="user-details">
    <el-drawer
      v-model="editMode"
      direction="rtl"
      title="Edit Profile"
      size="50%"
      :visible.sync="editMode"
    >
      <el-form ref="profileForm" :model="editedUser">
        <el-form-item label="Email:" prop="email">
          <el-input type="email" v-model="editedUser.email" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item label="Username:" prop="username">
          <el-input v-model="editedUser.username" placeholder="Enter your username"></el-input>
        </el-form-item>
        <el-form-item label="First Name:" prop="firstName">
          <el-input v-model="editedUser.firstName" placeholder="Enter your first name"></el-input>
        </el-form-item>
        <el-form-item label="Last Name:" prop="lastName">
          <el-input v-model="editedUser.lastName" placeholder="Enter your last name"></el-input>
        </el-form-item>
        <el-form-item label="Address:" prop="address">
          <el-input v-model="editedUser.address" placeholder="Enter your address"></el-input>
        </el-form-item>
        <el-form-item label="City:" prop="city">
          <el-input v-model="editedUser.city" placeholder="Enter your city"></el-input>
        </el-form-item>
        <el-form-item label="Region:" prop="region">
          <el-input v-model="editedUser.region" placeholder="Enter your region"></el-input>
        </el-form-item>
        <el-form-item label="Mobile Number:" prop="mobileNumber">
          <el-input v-model="editedUser.mobileNumber" placeholder="Enter your mobile number"></el-input>
        </el-form-item>
        <el-form-item label="Product Image">
              <input type="file" @change="handleImageUpload">
            </el-form-item>
        <!-- Add input fields for other properties as needed -->

        <el-button @click="saveProfile" type="primary">Submit</el-button>
        <el-button @click="closeDrawer">Cancel</el-button>
      </el-form>
    </el-drawer>     
    <p v-if="userDetails.imageData"><strong></strong> <img :src="getImageUrl(userDetails.imageData)" alt="Item Image" class="item-image" style="width: 100px; height: 100px" :fit="fit" /></p>

      <p><strong>Full Name</strong> {{ userDetails.firstName }} {{ userDetails.lastName }}</p>
      <p><strong>Branch:</strong> {{ userDetails.branch }}</p>

      <el-button  type="danger" @click="logout">Logout</el-button> 
      <el-button @click="openDrawer" v-if="!editMode">Edit Profile</el-button>


    </div>
    <div v-else >
    <div class="user-details">
          <p><strong>Full Name:</strong> {{ $route.params.name }}</p>
          <p><strong>Email:</strong> {{ $route.params.email }}</p>
          <el-button  type="danger" @click="logout">Logout</el-button>
    </div>
    <div v-if="!$route.params.name" class="login-button-container">
    <el-button type="primary" @click="redirectToSignup">Login</el-button>
    </div>
    </div>
    <Fotter/>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
import Headder from './Headder.vue';
import Fotter from './Fotter.vue';
import { mapState } from 'vuex';
import axios from 'axios';
import 'C:/Users/janit/source/repos/Nayana mama front/my-vue-project/src/StyleSheet.css'


export default {
  computed: {
    ...mapState(['loggedInUser', 'userDetails']),
  },
  components: { NavigationBar, Headder, Fotter },
  data() {
    return {
      users: [],
      editMode: false,
      editedUser: {
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        region: '',
        mobileNumber: '',
        imageData: null, 

        // Initialize other properties as needed
      },
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
    async fetchUserDetails(username) {
      try {
        const response = await axios.get(`https://localhost:7095/Users?username=${username}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
      }
    },
    redirectToSignup() {
      this.$router.push('/login'); 
    },
    openDrawer() {
      // Open the drawer
      this.editMode = true;

      // Initialize the editedUser object with the current user details
      this.editedUser = { ...this.userDetails };
    },
    handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('postedFile',file);
    axios.post('hhttps://localhost:7095/SaveFile',formData)
    .then(response=>{
      console.log("image",response.data)
      this.editedUser.imageData=response.data
    })
    .catch(error=>{
      console.log("error",error)
    })
  },
    async saveProfile() {
      try {
        // Send the updated user data to your server
        const response = await axios.put(`https://localhost:7095/Users?username=${this.userDetails.username}`, this.editedUser);

        if (response.status === 200) {
          // Update the user's details in your Vue state or Vuex store
          this.$store.commit('setUserDetails', this.editedUser);
          this.redirectToSignup();

          // Close the edit form
          this.editMode = false;
        } else {
          console.error('Error updating user profile.');
        }
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    },
    onImageChange(event) {
      // Handle the file change event and set the selected file in the editedUser object.
    const file = event.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('postedFile',file);
    axios.post('hhttps://localhost:7095/SaveFile',formData)
    .then(response=>{
      console.log("image",response.data)
      this.editedUser.imageData=response.data
    })
    .catch(error=>{
      console.log("error",error)
    })    },
    closeDrawer() {
      // Close the drawer
      this.editMode = false;

      // Reset the form
      this.$refs.profileForm.resetFields();
    },
    logout() {
      // Implement your logout logic here, such as clearing user data, redirecting, or making an API request.
      // For example, if you want to clear user data and redirect to the login page:
      this.$store.commit('clearUserDetails'); // Assuming you have a mutation to clear user data.
      this.$router.push('/login');
    },
    getImageUrl(filename) {
     // Assuming you have a public URL to access the uploaded images
     console.log(filename)
     return `https://localhost:7095/Photos/${filename}`;
   },
   
  },
};
</script>

<style scoped>


/* Add more custom styling as needed */
</style>




