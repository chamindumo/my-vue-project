<template>
  <div>
    <el-table
      :data="bookData"
      class="custom-table"
    >
      
      <el-table-column
        prop="name"
        label="Name"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="Email"
        width="250"
      ></el-table-column>
      <el-table-column
        prop="tell"
        label="Tell"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="medicalIssue"
        label="Medical Issues"
        width="180"
      ></el-table-column>
      
    </el-table>
  </div>
</template>

<script>
export default {
  props: ['bookData'],
  methods: {
    handleEditBook(book) {
      this.$emit('edit-book', book);
    },
    handleDeleteBook(bookId) {
      this.$emit('delete-book', bookId);
    }
  }
};
</script>

<style scoped>
</style>
