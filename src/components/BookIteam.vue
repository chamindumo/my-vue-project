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
  <h2>New Resident Application</h2>
      <book-form  :book-to-edit="bookToEdit" :bookData="bookData" @book-created="handleBookCreated" @book-updated="handleBookUpdated"/>
</el-drawer>

<el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
</el-row>
    <h2 class="table-title">Resident Table</h2>
    <div class="button-container">
   
   
    </div>
    <BookTable :bookData="bookData" @edit-book="handleEditBook" @delete-book="deleteBook"/>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
    </div>
    <Fotter/>
        </main>
      </div>

    </div>
</template>



<script>
import Headder from './Headder.vue';
import Fotter from './Fotter.vue';
import BookTable from './BookTable.vue';
import BookForm from './BookForm.vue';
import NavigationBar from './NavigationBar.vue';
import 'C:/Users/janit/source/repos/Nayana mama front/my-vue-project/src/StyleSheet.css'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { mapState } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore();

export default {
  name: 'HelloWorld',
  components: {
    Headder,
    Fotter,
    BookTable,
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
  ...mapState(['loggedInUser', 'userDetails']),
        loggedInUserBranch() {
      return this.loggedInUser ? this.loggedInUser.branch : null;
 
  },
},

  data() {
      return {

        form: {
          bookId: '',      
          bookTitle: '',    
          author: '',
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
    },
    handleBookUpdated(updatedBook) {
      const index = this.bookData.findIndex(book => book.id === updatedBook.id);
      if (index !== -1) {
        this.bookData.splice(index, 1, updatedBook); // Update the bookData array
      }
    },


    fetchData() {
  // Assuming 'newUsers' is the name of your Firestore collection
  const collectionRef = db.collection('newUsers');

  // Check if the branch is "All"
  if (this.userDetails.branch === 'All') {
    collectionRef.get()
      .then(querySnapshot => {
        this.bookData = querySnapshot.docs.map(doc => doc.data());
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  } else {
    // Fetch data with filtering based on branch
    collectionRef.where('branch', '==', this.userDetails.branch).get()
      .then(querySnapshot => {
        this.bookData = querySnapshot.docs.map(doc => doc.data());
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
},
      

      
        open(bookIndex) {
            this.$confirm('Are you sure you want to delete this Resident? This action cannot be undone.', 'Delete Resident',  {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: 'Resident deleted successfully'
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
        this.$confirm('Are you sure you want to delete this Resident? This action cannot be undone.', 'Delete Resident', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Resident deleted successfully'
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
/* Style the main container */
.hello {
  background: linear-gradient(rgba(255, 255, 255, 0.534), rgba(255, 255, 255, 0.7)), url('@/assets/logo1.png') center/cover no-repeat;
  min-height: 100vh;
  overflow: hidden;
}

</style>
