<template>
  <header class="app-header">
    <img src="@/assets/logo1.png" alt="Nazareth Care Logo" width="50" height="50">
    <h1>Nazareth Care</h1>
  </header>
</template>

<script>

export default {
  name: 'NavigationBar'
};
</script>

<style>
.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  margin-right: 10px; /* Adjust the margin as needed */
}

h1 {
  margin: 10px;
}
</style>
