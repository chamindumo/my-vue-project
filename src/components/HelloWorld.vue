<template>
  <div class="app">
   
<br>    
<template>
    <div class="app">
      <NavigationBar/>
      <div id="Hedder">
      <Headder/>
      <main class="app-main">
<div class ="hello">

<el-drawer
  :visible.sync="drawerbook"
  :direction="directionbook"
  size="55%">
  <h2>Book Application</h2>
      <book-form  :book-to-edit="bookToEdit" :bookData="bookData" @book-created="handleBookCreated" @book-updated="handleBookUpdated"/>
</el-drawer>

<el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
<br>
<br>
    <el-button type="primary" @click="drawerbook = true" icon="el-icon-plus"  >
      Click Hear to Ask......
    </el-button>
   
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    </div>
        </main>
      </div>

    </div>
</template>






    <br>
    <Fotter />

  </div>
</template>

<script>
import axios from 'axios';
import Headder from './Headder.vue';
import Fotter from './Fotter.vue';
import BookForm from './BookForm.vue';
import NavigationBar from './NavigationBar.vue';
import 'C:/Users/janit/source/repos/Nayana mama front/my-vue-project/src/StyleSheet.css'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


export default {
  name: 'HelloWorld',
  components: {
    Headder,
    Fotter,
    BookForm,
    NavigationBar
},
  props: {
    msg: String,
    bookIndex: Number,
  },
  computed: {
  filteredBookData() {
    if (!this.bookSearch) {
      return this.bookData;
    }
    const searchLower = this.bookSearch.toLowerCase();
      return this.bookData.filter(book =>
        book.id.toLowerCase().includes(searchLower)
      );
  },
 
  },

  data() {
      return {

        form: {
          bookId: '',      
          bookTitle: '',    
          author: '',
        },
        rules: {
            bookId: [
              { required: true, message: 'Please enter the Book ID', trigger: 'blur' },
              { validator: this.validateBookId, trigger: 'blur'},
            ],
            bookTitle:[
            { required: true, message: 'Please enter the Book Title', trigger: 'blur' },

            ],
            author:[
            { required: true, message: 'Please enter the Book Author', trigger: 'blur' },

            ]

    },


          bookData: [],
          editingBookIndex: -1,
          visible: false,
          drawerbook: false,
          responseData: null,  
          bookToEdit: null, 
          directionbook: 'rtl',
          selectedId: "", // The ID entered by the user

    
      }

    },
    mounted() {
      this.fetchData()
    },
    methods: {
           
          handleBookCreated(newBook) {
      this.bookData.push(newBook); // Update the bookData array
      this.$notify.success({
                  title: 'Patient Created',
                  message: 'The Pratient has been created successfully!',
                  offset: 100,
                });
                this.drawerbook = false;

    },
    handleBookUpdated(updatedBook) {
      const index = this.bookData.findIndex(book => book.id === updatedBook.id);
      if (index !== -1) {
        this.bookData.splice(index, 1, updatedBook); // Update the bookData array
      }
    },


        fetchData() {
          axios.get('https://localhost:7095/NewUser')
            .then(response => {
              this.bookData = response.data;

            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        },


        deleteBookById(bookId) {
          console.log('Book deleted successfully:', bookId);

        axios.delete(`https://localhost:7095/Newuser/${bookId}`)
          .then(response => {
            console.log('Book deleted successfully:', response.data);
            // Update the bookData array to remove the deleted book
            this.bookData = this.bookData.filter(book => book.id !== bookId);
          })
          .catch(error => {
            console.error('Error deleting book:', error);
          });
          console.log(bookId);
      },
      

      
        open(bookIndex) {
            this.$confirm('Are you sure you want to delete this book? This action cannot be undone.', 'Delete Book',  {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: 'Book deleted successfully'
              });
              this.handleDelete(bookIndex,1);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: 'Delete canceled'
              });          
            });
          },
        
          deleteBook(tell) {
        this.$confirm('Are you sure you want to delete this book? This action cannot be undone.', 'Delete Book', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Book deleted successfully'
          });
          this.deleteBookById(tell);
          }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });
        });
      },

      
        
     
            open2() {
            this.$message({
              showClose: true,
              message: 'Congrats, Your Iteam is updated.',
              type: 'success'
            });
          },

            
          
            handleSelect(key, keyPath) {
            console.log(key, keyPath);  
            },
           

    handleEditBook(book) {
      this.bookToEdit = book; // Set the bookToEdit prop when editing
      this.drawerbook = true; // Open the form drawer
    },
 
    saveEditedBook() {
      if (this.editingBookIndex >= 0) {
        const updatedBook = {
          id: this.form.bookId,
          name: this.form.bookTitle,
          author: this.form.author
        };

        this.bookData.splice(this.editingBookIndex, 1, updatedBook);
        this.cancelEditBook();
        this.resetForm();
      }
    },
    
  exportToPDF() {
  window.html2canvas = html2canvas;
  var doc = new jsPDF("p", "pt", "a4");

  const appContainer = document.querySelector(`#${this.selectedId}`);

  if (appContainer) {
    const options = {
      logging: true,
    };
console.log(appContainer)
    html2canvas(appContainer, options).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      doc.addImage(imgData, "PNG", 10, 10, 200, 100); // Adjust the coordinates and dimensions as needed
      doc.save("mypdf.pdf");
    });
  }
},



            handleUpdateBook() {
          if (this.editingBookIndex >= 0) {
            this.bookData[this.editingBookIndex].id = this.form.bookId;
            this.bookData[this.editingBookIndex].name = this.form.bookTitle;
            this.bookData[this.editingBookIndex].author = this.form.author;
            
            this.cancelEditBook();
            this.open2();
            
          }
        },
        
      
        cancelEditBook() {
          this.editingBookIndex = -1;
          this.resetForm();
        },
      
        resetForm() {
          this.form = {
            bookId: '',
            bookTitle: '',
            author: '',
          };
        },      
        handleDelete(bookIndex) {
            console.log(bookIndex);
            this.bookData.splice(bookIndex,1);
          },
          
        }
      }
</script>

<style scoped>
.hello {
  background: linear-gradient(rgba(255, 255, 255, 0.534), rgba(255, 255, 255, 0.7)), url('@/assets/logo1.png') center/cover no-repeat;
  min-height: 100vh;
  overflow: hidden;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px; /* Adjust padding as needed */
}

.logo {
  margin-right: 10px;
}

h1 {
  margin: 10px;
}

/* Add other styles for your components as needed */
#Hedder {
  /* Add styles for the header section */
}

#hello {
  /* Add styles for the main content section */
}

</style>

