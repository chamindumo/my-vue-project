<template>
  <div class="app">
    <NavigationBar/>
    <Headder/>

    <main class="app-main">
      <el-drawer
        :visible.sync="drawerproduct"
        :direction="directionproduct"
        size="50%">
        <h2>Resident Addimit Form</h2>
        <product-form
          :product-to-edit="productToEdit"
          @product-created="handleProductCreated"
          @product-updated="handleproductUpdated"
        />
      </el-drawer>

      <h2 class="table-title">Resident Table</h2>
<br>
<div>
    <el-button type="primary" @click="drawerproduct = true" icon="el-icon-plus">
      Add Resident
    </el-button>
    <br>
    <br>
    

    <div v-if="isAdminOrSuperAdmin" class="branch-filter">
      <el-select v-model="selectedBranch" placeholder="Select Branch">
        <el-option v-for="branch in branches" :key="branch.value" :label="branch.label" :value="branch.value"></el-option>
      </el-select>
      <el-button type="primary" @click="filterByBranch">Filter</el-button>
    </div>

    <div class="export-options-right">
      <el-radio-group v-model="exportFormat">
        <el-radio label="excel">Excel</el-radio>
        <el-radio label="csv">CSV</el-radio>
      </el-radio-group>
      <el-button type="primary" @click="downloadData">Download</el-button>
    </div>
  </div>

      <ProductTable :productData="productData" @edit-product="handleEditProduct" @delete-product="deleteproduct"/>
     
    </main>
    

    <Fotter/>
  </div>
</template>


<script>
import moment from 'moment';
import Headder from './Headder.vue';
import Fotter from './Fotter.vue';
import ProductTable from './ProductTable.vue';
import ProductForm from './ProductForm.vue';
import NavigationBar from './NavigationBar.vue';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { mapState } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore();

import 'C:/Users/janit/source/repos/Nayana mama front/my-vue-project/src/StyleSheet.css'

export default {

    name: 'HelloWorld',
    props: {
        msg: String,
        productIndex: Number,
    },
    components: {
    Headder,
    Fotter,
    ProductTable,
    ProductForm,
    NavigationBar
},

    computed: {
        filteredProductData() {
            if (!this.productSearch) {
                return this.productData;
            }
            const searchLower = this.productSearch.toLowerCase();
            return this.productData.filter(product => product.Id.toLowerCase().includes(searchLower));
        },
        ...mapState(['loggedInUser', 'userDetails']),
        loggedInUserBranch() {
      return this.loggedInUser ? this.loggedInUser.branch : null;
    },
    isAdminOrSuperAdmin() {
      return this.userDetails.role === 'Admin' || this.userDetails.role === 'Super Admin';
    },

    },
    data() {
        return {
    selectedBranch: '', // Store the selected branch from the dropdown
      branches: [
        { label: 'San Francisco', value: 'SF' },
        { label: 'Los Angeles', value: 'LA' },
        // Add other branches as needed
      ],
            form: {
              name: '',
        rm: '',
        phone: '',
        dateOfBirth: '',
        placeOfBirth: '',
        maritalStatus: '',
        admissionDate: '',
        socType: '',
        religion: '',
        dischargeDate: '',
        ambStatus: '',
        powerOfAttorneyForHealthcare: '',
        powerOfAttorneyForHealthcareAddress: '',
        powerOfAttorneyForHealthcarePhone: '',
        powerOfAttorneyForHealthcareEmail: '',
        powerOfAttorneyForHealthcareHospitalOfPreference: '',
        responsiblePartyForFinance: '',
        responsiblePartyForFinanceAddress: '',
        responsiblePartyForFinancePhone: '',
        responsiblePartyForFinanceEmail: '',
        medicalInsurence: '',
        medicare: '',
        primaryPhysician: '',
        primaryPhysicianAddress: '',
        primaryPhysicianPhone: '',
        specialist: '',
        specialistAddress: '',
        specialistPhone: '',
        specialistFax: '',
        dentist: '',
        dentistAddress: '',
        dentistPhone: '',
        dentistFax: '',
        allergies: false,
        explane: '',
        tBTest: false,
        tBTestDate: '',
        tBTestResults: '',
        emergencyContacts1Name: '',
        emergencyContacts1Phone: '',
        emergencyContacts1Address: '',
        emergencyContacts1Email: '',
        emergencyContacts2Name: '',
        emergencyContacts2Phone: '',
        emergencyContacts2Address: '',
        emergencyContacts2Email: '',
        mortuary: '',
        mortuaryPhone: '',
        cemetery: '',
        cemeteryPhone: '',
        dateExpired: '',
        timeExpired: '',
        dareBodyRelesed: '',
        toWhom: '',
        residentsSignature: '',
        residentsSignatureDate: '',
            },
           
            productData: [],
            editingProductIndex: -1,
            visible: false,
            drawerproduct: false,
            directionproduct: 'rtl',
            productToEdit: null,
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            
            },
              exportFormat: 'excel',
        };
    },
    mounted() {
        this.fetchData()
    },
    
    methods: {

        handleProductCreated(newProduct) {
      this.productData.push(newProduct); // Update the bookData array
    },
    downloadData() {
      const dataToExport = this.productData.map(product => ({
       rm: product.rm,
        phone: product.phone,
        dateOfBirth: product.dateOfBirth,
        placeOfBirth: product.placeOfBirth,
        maritalStatus: product.maritalStatus,
        admissionDate: product.admissionDate,
        socType: product.socType,
        religion: product.religion,
        dischargeDate: product.dischargeDate,
        ambStatus: product.ambStatus,
        powerOfAttorneyForHealthcare: product.powerOfAttorneyForHealthcare,
        powerOfAttorneyForHealthcareAddress: product.powerOfAttorneyForHealthcareAddress,
        powerOfAttorneyForHealthcarePhone: product.powerOfAttorneyForHealthcarePhone,
        powerOfAttorneyForHealthcareEmail: product.powerOfAttorneyForHealthcareEmail,
        powerOfAttorneyForHealthcareHospitalOfPreference: product.powerOfAttorneyForHealthcareHospitalOfPreference,
        responsiblePartyForFinance: product.responsiblePartyForFinance,
        responsiblePartyForFinanceAddress: product.responsiblePartyForFinanceAddress,
        responsiblePartyForFinancePhone: product.responsiblePartyForFinancePhone,
        responsiblePartyForFinanceEmail: product.responsiblePartyForFinanceEmail,
        medicalInsurence: product.medicalInsurence,
        medicare: product.medicare,
        primaryPhysician: product.primaryPhysician,
        primaryPhysicianAddress: product.primaryPhysicianAddress,
        primaryPhysicianPhone: product.primaryPhysicianPhone,
        specialist: product.specialist,
        specialistAddress: product.specialistAddress,
        specialistPhone: product.specialistPhone,
        specialistFax: product.specialistFax,
        dentist: product.dentist,
        dentistAddress: product.dentistAddress,
        dentistPhone: product.dentistPhone,
        dentistFax: product.dentistFax,
        allergies: product.allergies,
        explane: product.explane,
        tBTestDate: product.tbTestDate,
        tBTestResults: product.tbTestResults,
        emergencyContacts1Name: product.emergencyContacts1Name,
        emergencyContacts1Phone: product.emergencyContacts1Phone,
        emergencyContacts1Address: product.emergencyContacts1Address,
        emergencyContacts1Email: product.emergencyContacts1Email,
        emergencyContacts2Name: product.emergencyContacts2Name,
        emergencyContacts2Phone: product.emergencyContacts2Phone,
        emergencyContacts2Address: product.emergencyContacts2Address,
        emergencyContacts2Email: product.emergencyContacts2Email,
        mortuary: product.mortuary,
        mortuaryPhone: product.mortuaryPhone,
        cemetery: product.cemetery,
        cemeteryPhone: product.cemeteryPhone,
        dateExpired: product.dateExpired,
        timeExpired: product.timeExpired,
        dareBodyRelesed: product.dareBodyRelesed,
        toWhom: product.toWhom,
        residentsSignature: product.residentsSignature,
      }));

      if (this.exportFormat === 'excel') {
        this.exportToExcel(dataToExport);
      } else if (this.exportFormat === 'csv') {
        this.exportToCSV(dataToExport);
      }
    },
   

    exportToExcel(dataToExport) {
      const ws = XLSX.utils.json_to_sheet(dataToExport);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Resident Data');
      XLSX.writeFile(wb, 'Resident.xlsx'); // Download as Excel file
    },

    // ... your other methods ...
   


  
  

    exportToCSV(dataToExport) {
    const csv = Papa.unparse(dataToExport, {
      header: true,
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'Resident.csv');
    link.click();
  },
    handleproductUpdated(updatedProduct) {
      const index = this.productData.findIndex(product => product.phone === updatedProduct.phone);
      if (index !== -1) {
        this.productData.splice(index, 1, updatedProduct); // Update the bookData array
      }
    },
        formatDateToISO(date) {
            if (!date)
                return ''; // Handle cases where date might be undefined or null
            return new Date(date).toISOString();
        },
        openproduct(productIndex) {
            this.$confirm('Are you sure you want to delete this product? This action cannot be undone.', 'Delete Product', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: 'Resident deleted successfully'
                });
                this.handleDeleteproduct(productIndex);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Delete canceled'
                });
            });
        },
        formatDate(date) {
            return moment(date).format('MMM D, YYYY');
        },
        fetchData() {
  // Assuming 'products' is the name of your Firestore collection
  const collectionRef = db.collection('products');

  // Check if the branch is "All"
  if (this.userDetails.role === 'Admin' || this.userDetails.role === 'Super Admin') {
    collectionRef.get()
      .then(querySnapshot => {
        this.productData = querySnapshot.docs.map(doc => doc.data());
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  } else if (this.userDetails.role === 'Worker') {
    // Fetch data with filtering based on branch
    collectionRef.where('branch', '==', this.userDetails.branch).get()
      .then(querySnapshot => {
        this.productData = querySnapshot.docs.map(doc => doc.data());
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
},
        deleteproduct( Id) {
          console.log(Id)
            this.$confirm('Are you sure you want to delete this Resident? This action cannot be undone.', 'Delete Resident', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: 'Resident deleted successfully'
                });
                this.deleteProductbyId(Id);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Delete canceled'
                });
            });
        },
        filterByBranch() {
      // Check if a branch is selected
      if (this.selectedBranch) {
        // Map the selected branch to its corresponding value
        const mappedBranch = this.branches.find(branch => branch.value === this.selectedBranch);
        // Filter the data based on the selected branch
        console.log(mappedBranch)

        this.filteredData = this.productData.filter(product => product.branch === mappedBranch.value);
        console.log(this.filteredData)
        this.productData = this.filteredData;

      } else {
        // If no branch is selected, show all data
        this.filteredData = this.productData;
      }
    },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        
        deleteProductbyId(Id) {
          console.log('Product deleted successfully:',Id);

          const productRef = db.collection('products').doc(Id);

          productRef.delete()
            .then(() => {
              console.log('Product deleted successfully:', Id);
              // Update the productData array to remove the deleted product
              this.productData = this.productData.filter(product => product.id !== Id);
            })
            .catch(error => {
              console.error('Error deleting Product:', error);
            });
          console.log(Id);
        },
        handleEditProduct(product) {
            this.productToEdit = product; // Set the bookToEdit prop when editing
            this.drawerproduct = true; // Open the form drawer
    },
       
        cancelEditProduct() {
            this.editingProductIndex = -1;
            this.resetForm();
        },
        
        
        handleDeleteproduct(productIndex) {
            console.log(productIndex);
            this.productData.splice(productIndex, 1);
        }
    },
}
</script>

<style>
/* Style the main container */
.export-options-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  }

  .app-main {
  background: linear-gradient(rgba(255, 255, 255, 0.534), rgba(255, 255, 255, 0.7)), url('@/assets/logo1.png') center/cover no-repeat;
  min-height: 100vh;
  overflow: hidden;
}

  .export-options-right {
    display: flex; /* Use flex container */
    align-items: center; /* Center items vertically */
  }

  .export-options-right > * {
    margin-right: 10px; /* Adjust the margin as needed */
  }
</style>


