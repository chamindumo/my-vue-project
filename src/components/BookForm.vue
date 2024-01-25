<template>
    <el-form ref="formbook" :model="form" >
      <el-form-item label="Resident Full name:-"  prop="bookId">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Gardient Email:- " prop="bookTitle">
        <el-input v-model="form.emal"></el-input>
      </el-form-item>
      <el-form-item label="Gardiant Tell Number " prop="author">
        <el-input v-model="form.tellNumber"></el-input>
      </el-form-item>
      <el-form-item label="Resident medical issues " prop="author">
        <el-input v-model="form.medical"></el-input>
      </el-form-item>
      <el-form-item label="Resident Expect  Location " >
        <el-select v-model="form.branch" placeholder="Select user Branch">
        <el-option label="San Fransisco" value="SF"></el-option>
        <el-option label="Los andgalies" value="LA"></el-option>
        <!-- Add more options as needed -->
      </el-select>      
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitBook">Create</el-button>
      </el-form-item>
      
    </el-form>
  </template>
  
  <script>
  import axios from 'axios';
  import 'C:/Users/janit/source/repos/Nayana mama front/my-vue-project/src/StyleSheet.css'

  export default {
    name: 'BookForm',
    props: {
      bookData: Array,
      bookToEdit: Object,

    },
    data() {
      return {
        form: {
          name: '',
          emal: '',
          tellNumber: '',
          medical:"",
          branch:"",
        },
        rules: {
          bookId: [
            { required: true, message: 'Please enter the Book ID', trigger: 'blur' },
            { validator: this.validateBookId, trigger: 'blur'},
          ],
          bookTitle: [
            { required: true, message: 'Please enter the Book Title', trigger: 'blur' },
          ],
          author: [
            { required: true, message: 'Please enter the Book Author', trigger: 'blur' },
          ],
        },
      };
    },
    watch: {
    bookToEdit: {
      handler(newBookToEdit) {
        // Update the form fields when bookToEdit changes
        if (newBookToEdit) {
          this.form.name = newBookToEdit.name;
          this.form.emal = newBookToEdit.emal;
          this.form.tellNumber = newBookToEdit.tellNumber;
          this.form.medical = newBookToEdit.medical;
          this.form.branch = newBookToEdit.branch;


        } else {
          // Clear the form fields when bookToEdit becomes null
        }
      },
      immediate: true, // Invoke the handler immediately on component mount
    },
  },
    methods: {
      onSubmitBook() {
        this.$refs.formbook.validate(valid => {
          if (valid) {
            const newBook = {
              Name: this.form.name,
              Email: this.form.emal,
              Tell: this.form.tellNumber,
              MedicalIssue: this.form.medical,
              Branch: this.form.branch,


              
            };
  
            axios.post('https://localhost:7095/Add/Newuser', newBook)
              .then(response => {
                console.log('New Resident created successfully:', response.data);
                this.$emit('book-created', newBook); // Emit the event
                this.resetForm();
                this.$notify.success({
                  title: 'Resident Created',
                  message: 'The Pratient has been created successfully!',
                  offset: 100,
                });
              })
              .catch(error => {
                console.error('Error creating book:', error);
                
              });
          }
        });
      },
  
      validateBookId(rule, value, callback) {
      if (isNaN(value)) {
        callback(new Error('Book ID must be a number'));
      } else if (value <= 0) {
        callback(new Error('Book ID must be greater than 0'));
      } else {
        callback();
      }
    },

    updateBook() {
      this.$refs.formbook.validate(valid => {
          if (valid) {
        const updatedBook = {
          id: this.form.bookId,
          name: this.form.bookTitle,
          author: this.form.author,
        };

        axios.put(`https://localhost:7141/Book/${updatedBook.id}`, updatedBook)
          .then(response => {
            console.log('Resident updated successfully:', response.data);
            
            // Find the index of the updated book in the bookData array
            const index = this.bookData.findIndex(book => book.id === updatedBook.id);
            if (index !== -1) {
              // Update the book in the bookData array
              this.$emit('book-updated', updatedBook);                 
            }
          })
          
        }
      });
          
      },

    },

    

    
  };
  </script>
  