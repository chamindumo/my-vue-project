<template>
  <div class="chatgpt-page">
    <h1>ChatGPT - Item Details</h1>
    <div class="item-details">
      <p><strong>ID:</strong> {{ itemID }}</p>
      <p><strong>Type:</strong> {{ itemType }}</p>
      <!-- Display other item details as needed -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatGPTComponent',
  data() {
    return {
      itemID: '',
      itemType: '',
    };
  },
  created() {
    // Access URL parameters and set itemID and itemType
    this.itemID = this.$route.query.itemID || '';
    this.itemType = this.$route.query.itemType || '';
  },
};
</script>
