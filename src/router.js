// router.js

import Vue from 'vue';
import Router from 'vue-router';
import store from './store'; // Import your Vuex store here
import axios from 'axios';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./components/HelloWorld.vue'),
    meta: {
      description: 'The home page of the application with the page description.',
    },
  },
  {
    path: '/book',
    name: 'Book',
    component: () => import('./components/BookIteam.vue'),
    meta: {
      description: 'View and manage books in the application.',
    },
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('./components/ProductIteam.vue'),
    meta: {
      description: 'View and manage products in the application.',
    },
  },
  {
    path: '/allproducts',
    name: 'AllProducts',
    component: () => import('./components/AllProducts.vue'),
    meta: {
      description: 'View a list of all products in the application using pagination.',
    },
  },
  {
    path: '/searchbyid',
    name: 'SearchById',
    component: () => import('./components/SearchById.vue'),
    meta: {
      description: 'Search for specific items using an ID.',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./components/LoginToWeb.vue'),
    meta: {
      description: 'Log in to the web application.',
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('./components/SignUp.vue'),
    meta: {
      description: 'Sign up for an account on the web application.',
      admin: true, 

    },
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: () => import('./components/ProfilePage.vue'),
    meta: {
      description: 'View and manage your profile information.',

    },
  },
  {
    path: '/allproductsvue',
    name: 'AllProductsvue',
    component: () => import('./components/AllProductsvue.vue'),
    meta: {
      description: 'View a list of all products in the apllication when user scroll down then the new products will be display.',
    },
  },
  {
    path: '/emailverification',
    name: 'EmailVerify',
    component: () => import('./components/EmailVerify.vue'),
    meta: {
      description: 'Verify your email address.',
    },
  },
 
  {
    path: '/productconfermation',
    name: 'ProductConfermation',
    component: () => import('./components/ProductConfermation.vue'),
    meta: {
      description: 'Confirm product details.',
    },
  },
  {
    path: '/richtext',
    name: 'RichText',
    component: () => import('./components/RichText.vue'),
    meta: {
      description: 'Use a rich text editor for text editing.',
      admin: true, 
  },
},
  {
    path: '/callender',
    name: 'FullCalender',
    component: () => import('./components/FullCalender.vue'),
    meta: {
      description: 'View and manage events in the calendar.',
    },
  },

  {
    path: '/chatgpt',
    name: 'chatgpt',
    component: () => import('./components/ChatGpt.vue'),
    meta: {
      description: 'Test Chatgpt api.',
    },
  },
 
 

 
];

const router = new Router({
  routes,
  mode: 'history' // Use history mode for cleaner URLs
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;

// Check if the route requires admin access
if (to.meta.admin) {
  const username = prompt('Username:');
  const password = prompt('Password:');

  // Send a request to your backend server to validate the credentials
  axios.get(`https://localhost:7095/Users/{id}?username=${username}&password=${password}`)
    .then(response => {
      console.log(response.data)
      // Assuming your server returns a success status (e.g., 200) on successful authentication
      if (response.status === 200) {
        const userRole = response.data.role;

        // Check if the user's role is super admin or admin
        if (userRole === 'Super Admin' || userRole === 'Admin') {
          // If user has the required role, allow access
          next();
        } else {
          // If user doesn't have the required role, redirect to Login page or any other appropriate action
          next({ name: 'Login' });
        }
      } else {
        // If credentials don't match, redirect to Login page or any other appropriate action
        next({ name: 'Login' });
      }
    })
    .catch(error => {
      console.error('Error authenticating:', error);
      next({ name: 'Login' });
    });
} else if (!isLoggedIn && to.name !== 'Login' && to.name !== 'Home') {
  next({ name: 'Login' });
} else {
  next();
}

});
export default router;



