<template>
  <el-form ref="formproduct" :model="form"  >
    <el-form-item label="Name" >
        <el-input v-model="formData.name"></el-input>
      </el-form-item>

      <el-form-item label="RM">
        <el-input v-model="formData.rM"></el-input>
      </el-form-item>
      <el-form-item label="Branch">
      <el-select v-model="formData.branch" placeholder="Select user Branch">
        <el-option label="San Fransisco" value="SF"></el-option>
        <el-option label="Los andgalies" value="LA"></el-option>
        <!-- Add more options as needed -->
      </el-select>
      </el-form-item>
      <el-form-item label="Phone">
        <el-input v-model="formData.phone"></el-input>
      </el-form-item>
      <el-form-item label="Resident Image">
              <input type="file" @change="handleImageUpload">
            </el-form-item>
            <div v-if="imageUrl">
              <img :src="imageUrl" alt="Image Preview" class="small-image-preview">
            </div>

      <el-form-item label="Date of Birth">
        <el-date-picker type="date" placeholder="Pick a date" v-model="formData.dateOfBirth"></el-date-picker>
      </el-form-item>

      <el-form-item label="Place of Birth">
        <el-input v-model="formData.placeOfBirth"></el-input>
      </el-form-item>

      <el-form-item label="Marital Status">
        <el-input v-model="formData.maritalStatus"></el-input>
      </el-form-item>

      <el-form-item label="Admission Date">
        <el-date-picker type="date" placeholder="Pick a date" v-model="formData.admissionDate"></el-date-picker>
      </el-form-item>

      <el-form-item label="Soc Type">
        <el-input v-model="formData.socType"></el-input>
      </el-form-item>

      <el-form-item label="Religion">
        <el-input v-model="formData.religion"></el-input>
      </el-form-item>

      <el-form-item label="Discharge Date">
        <el-date-picker type="date" placeholder="Pick a date" v-model="formData.dischargeDate"></el-date-picker>
      </el-form-item>

      <el-form-item label="Amb Status">
        <el-input v-model="formData.ambStatus"></el-input>
      </el-form-item>

      <el-form-item label="Power of Attorney for Healthcare">
        <el-input v-model="formData.powerOfAttorneyForHealthcare"></el-input>
      </el-form-item>

      <el-form-item label="Power of Attorney for Healthcare Address">
        <el-input v-model="formData.powerOfAttorneyForHealthcareAddress"></el-input>
      </el-form-item>

      <el-form-item label="Power of Attorney for Healthcare Phone">
        <el-input v-model="formData.powerOfAttorneyForHealthcarePhone"></el-input>
      </el-form-item>

      <el-form-item label="Power of Attorney for Healthcare Email">
        <el-input v-model="formData.powerOfAttorneyForHealthcareEmail"></el-input>
      </el-form-item>

      <el-form-item label="Power of Attorney for Healthcare Hospital of Preference">
        <el-input v-model="formData.powerOfAttorneyForHealthcareHospitalOfPreference"></el-input>
      </el-form-item>

      <el-form-item label="Responsible Party for Finance">
        <el-input v-model="formData.responsiblePartyForFinance"></el-input>
      </el-form-item>

      <el-form-item label="Responsible Party for Finance Address">
        <el-input v-model="formData.responsiblePartyForFinanceAddress"></el-input>
      </el-form-item>

      <el-form-item label="Responsible Party for Finance Phone">
        <el-input v-model="formData.responsiblePartyForFinancePhone"></el-input>
      </el-form-item>

      <el-form-item label="Responsible Party for Finance Email">
        <el-input v-model="formData.responsiblePartyForFinanceEmail"></el-input>
      </el-form-item>

      <el-form-item label="Medical Insurance">
        <el-input v-model="formData.medicalInsurence"></el-input>
      </el-form-item>

      <el-form-item label="Medicare">
        <el-input v-model="formData.medicare"></el-input>
      </el-form-item>

      <el-form-item label="Primary Physician">
        <el-input v-model="formData.primaryPhysician"></el-input>
      </el-form-item>

      <el-form-item label="Primary Physician Address">
        <el-input v-model="formData.primaryPhysicianAddress"></el-input>
      </el-form-item>

      <el-form-item label="Primary Physician Phone">
        <el-input v-model="formData.primaryPhysicianPhone"></el-input>
      </el-form-item>

      <el-form-item label="Specialist">
        <el-input v-model="formData.specialist"></el-input>
      </el-form-item>

      <el-form-item label="Specialist Address">
        <el-input v-model="formData.specialistAddress"></el-input>
      </el-form-item>

      <el-form-item label="Specialist Phone">
        <el-input v-model="formData.specialistPhone"></el-input>
      </el-form-item>

      <el-form-item label="Specialist Fax">
        <el-input v-model="formData.specialistFax"></el-input>
      </el-form-item>

      <el-form-item label="Dentist">
        <el-input v-model="formData.dentist"></el-input>
      </el-form-item>

      <el-form-item label="Dentist Address">
        <el-input v-model="formData.dentistAddress"></el-input>
      </el-form-item>

      <el-form-item label="Dentist Phone">
        <el-input v-model="formData.dentistPhone"></el-input>
      </el-form-item>

      <el-form-item label="Dentist Fax">
        <el-input v-model="formData.dentistFax"></el-input>
      </el-form-item>

      <el-form-item label="Allergies">
        <el-checkbox v-model="formData.allergies"></el-checkbox>
      </el-form-item>

      <el-form-item label="Explanation">
        <el-input v-model="formData.explane"></el-input>
      </el-form-item>

      <el-form-item label="TB Test">
        <el-checkbox v-model="formData.tBTest"></el-checkbox>
      </el-form-item>

      <el-form-item label="TB Test Date">
        <el-date-picker type="date" placeholder="Pick a date" v-model="formData.tBTestDate"></el-date-picker>
      </el-form-item>

      <el-form-item label="TB Test Results">
        <el-input v-model="formData.tBTestResults"></el-input>
      </el-form-item>

      <el-form-item label="Emergency Contacts 1 Name">
        <el-input v-model="formData.emergencyContacts1Name"></el-input>
      </el-form-item>

      <el-form-item label="Emergency Contacts 1 Phone">
        <el-input v-model="formData.emergencyContacts1Phone"></el-input>
      </el-form-item>

      <el-form-item label="Emergency Contacts 1 Address">
        <el-input v-model="formData.emergencyContacts1Address"></el-input>
      </el-form-item>

      <el-form-item label="Emergency Contacts 1 Email">
        <el-input v-model="formData.emergencyContacts1Email"></el-input>
      </el-form-item>

      <el-form-item label="Emergency Contacts 2 Name">
        <el-input v-model="formData.emergencyContacts2Name"></el-input>
      </el-form-item>

      <el-form-item label="Emergency Contacts 2 Phone">
        <el-input v-model="formData.emergencyContacts2Phone"></el-input>
      </el-form-item>

      <el-form-item label="Emergency Contacts 2 Address">
        <el-input v-model="formData.emergencyContacts2Address"></el-input>
      </el-form-item>

      <el-form-item label="Emergency Contacts 2 Email">
        <el-input v-model="formData.emergencyContacts2Email"></el-input>
      </el-form-item>

      <el-form-item label="Mortuary">
        <el-input v-model="formData.mortuary"></el-input>
      </el-form-item>

      <el-form-item label="Mortuary Phone">
        <el-input v-model="formData.mortuaryPhone"></el-input>
      </el-form-item>

      <el-form-item label="Cemetery">
        <el-input v-model="formData.cemetery"></el-input>
      </el-form-item>

      <el-form-item label="Cemetery Phone">
        <el-input v-model="formData.cemeteryPhone"></el-input>
      </el-form-item>

      <el-form-item label="Date Expired">
        <el-date-picker type="date" placeholder="Pick a date" v-model="formData.dateExpired"></el-date-picker>
      </el-form-item>

      <el-form-item label="Time Expired">
        <el-input v-model="formData.timeExpired"></el-input>
      </el-form-item>

      <el-form-item label="Date Body Released">
        <el-date-picker type="date" placeholder="Pick a date" v-model="formData.dareBodyRelesed"></el-date-picker>
      </el-form-item>

      <el-form-item label="To Whom">
        <el-input v-model="formData.toWhom"></el-input>
      </el-form-item>

      <el-form-item label="Resident's Signature">
        <el-input v-model="formData.residentsSignature"></el-input>
      </el-form-item>

      <el-form-item label="Resident's Signature Date">
        <el-date-picker type="date" placeholder="Pick a date" v-model="formData.residentsSignatureDate"></el-date-picker>
      </el-form-item>
    <el-form-item label="Captcha">
    <VueRecaptcha
      ref="recaptcha"
      @verify="onCaptchaVerified"
      sitekey="6Lck6TQoAAAAACfG3WueojPNVFskm0zBrmCd2-sL"
    ></VueRecaptcha>
  </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmitProduct" round >Create</el-button>
      <el-button type="info"  @click="UpdateProduct" round>Update</el-button>
    </el-form-item>
  </el-form>

</template>
<style scoped>
.small-image-preview {
  width: 100px; /* Set the desired width */
  height: auto; /* Maintain the aspect ratio */
  max-height: 100px; /* Set the maximum height if needed */
}
</style>
<script>
import axios from 'axios';
import { VueRecaptcha } from 'vue-recaptcha';
import { mapState } from 'vuex';


export default {
  computed: {
  ...mapState(['loggedInUser', 'userDetails']),
},
    components: {
  VueRecaptcha,
},
  name: 'ProductForm',
  props: {
    productData: Array,
    productToEdit: Object,
  },
  data() {
    return {
      formData: {
        name: '',
        rM: '',
        branch: '',
        phone: '',
        imageData:'',
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

          email: {
            email: '',
            productNmae: '',
            productId: '',
            imgName: '', 
          },
          imageUrl: null,

      
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
         
          
    };
  },
  watch: {
     productToEdit: {
      handler(newProductToEdit) {
  if (newProductToEdit) {
    this.formData.name = newProductToEdit.name;
    this.formData.rM = newProductToEdit.rm;
    this.formData.branch = newProductToEdit.branch;
    this.formData.phone = newProductToEdit.phone;
    this.formData.dateOfBirth = newProductToEdit.dateOfBirth;
    this.formData.placeOfBirth = newProductToEdit.placeOfBirth;
    this.formData.maritalStatus = newProductToEdit.maritalStatus;
    this.formData.admissionDate = newProductToEdit.admissionDate;
    this.formData.socType = newProductToEdit.socType;
    this.formData.religion = newProductToEdit.religion;
    this.formData.dischargeDate = newProductToEdit.dischargeDate;
    this.formData.ambStatus = newProductToEdit.ambStatus;
    this.formData.powerOfAttorneyForHealthcare = newProductToEdit.powerOfAttorneyForHealthcare;
    this.formData.powerOfAttorneyForHealthcareAddress = newProductToEdit.powerOfAttorneyForHealthcareAddress;
    this.formData.powerOfAttorneyForHealthcarePhone = newProductToEdit.powerOfAttorneyForHealthcarePhone;
    this.formData.powerOfAttorneyForHealthcareEmail = newProductToEdit.powerOfAttorneyForHealthcareEmail;
    this.formData.powerOfAttorneyForHealthcareHospitalOfPreference = newProductToEdit.powerOfAttorneyForHealthcareHospitalOfPreference;
    this.formData.responsiblePartyForFinance = newProductToEdit.responsiblePartyForFinance;
    this.formData.responsiblePartyForFinanceAddress = newProductToEdit.responsiblePartyForFinanceAddress;
    this.formData.responsiblePartyForFinancePhone = newProductToEdit.responsiblePartyForFinancePhone;
    this.formData.responsiblePartyForFinanceEmail = newProductToEdit.responsiblePartyForFinanceEmail;
    this.formData.medicalInsurence = newProductToEdit.medicalInsurence;
    this.formData.medicare = newProductToEdit.medicare;
    this.formData.primaryPhysician = newProductToEdit.primaryPhysician;
    this.formData.primaryPhysicianAddress = newProductToEdit.primaryPhysicianAddress;
    this.formData.primaryPhysicianPhone = newProductToEdit.primaryPhysicianPhone;
    this.formData.specialist = newProductToEdit.specialist;
    this.formData.specialistAddress = newProductToEdit.specialistAddress;
    this.formData.specialistPhone = newProductToEdit.specialistPhone;
    this.formData.specialistFax = newProductToEdit.specialistFax;
    this.formData.dentist = newProductToEdit.dentist;
    this.formData.dentistAddress = newProductToEdit.dentistAddress;
    this.formData.dentistPhone = newProductToEdit.dentistPhone;
    this.formData.dentistFax = newProductToEdit.dentistFax;
    this.formData.allergies = newProductToEdit.allergies;
    this.formData.explane = newProductToEdit.explane;
    this.formData.tBTest = newProductToEdit.tBTest;
    this.formData.tBTestDate = newProductToEdit.tbTestDate;
    this.formData.tBTestResults = newProductToEdit.tbTestResults;
    this.formData.emergencyContacts1Name = newProductToEdit.emergencyContacts1Name;
    this.formData.emergencyContacts1Phone = newProductToEdit.emergencyContacts1Phone;
    this.formData.emergencyContacts1Address = newProductToEdit.emergencyContacts1Address;
    this.formData.emergencyContacts1Email = newProductToEdit.emergencyContacts1Email;
    this.formData.emergencyContacts2Name = newProductToEdit.emergencyContacts2Name;
    this.formData.emergencyContacts2Phone = newProductToEdit.emergencyContacts2Phone;
    this.formData.emergencyContacts2Address = newProductToEdit.emergencyContacts2Address;
    this.formData.emergencyContacts2Email = newProductToEdit.emergencyContacts2Email;
    this.formData.mortuary = newProductToEdit.mortuary;
    this.formData.mortuaryPhone = newProductToEdit.mortuaryPhone;
    this.formData.cemetery = newProductToEdit.cemetery;
    this.formData.cemeteryPhone = newProductToEdit.cemeteryPhone;
    this.formData.dateExpired = newProductToEdit.dateExpired;
    this.formData.timeExpired = newProductToEdit.timeExpired;
    this.formData.dareBodyRelesed = newProductToEdit.dareBodyRelesed;
    this.formData.toWhom = newProductToEdit.toWhom;
    this.formData.residentsSignature = newProductToEdit.residentsSignature;
    this.formData.residentsSignatureDate = newProductToEdit.residentsSignatureDate;
  } else {
    this.resetForm();
  }
},

                immediate: true, // Invoke the handler immediately on component mount
              },
            },


  methods: {
    onSubmitProduct() {
      this.$refs.formproduct.validate(valid => {
        if (valid) {
          this.email.productNmae = this.form.Names;
          this.email.productId = this.form.Id;
          this.email.email = this.userDetails.email;
          console.log(this.email)

          const newProduct = {
              id: this.form.Id,
              names: this.form.Names,
              descriptions: this.form.Descriptions,
              expirDate: this.formatDateToISO(this.form.expirDate),
              isAvalable: this.form.isAvalable,
              price: this.form.price,
              imageData: this.form.ImageData,

          };

        

         
          axios.post('https://localhost:7095/Add/Regested', this.formData)
                      .then(response => {
                      console.log('Product added successfully:', response.data);
                      console.log(this.form)
                      this.$emit('product-created', newProduct); // Emit the event
                      this.cancelEditProduct();
                      this.$notify.success({
                          title: 'Product Submit',
                          message: 'The product was successfully created!',
                          offset: 100
                      });
                  })
                      .catch(error => {
                      console.error('Error adding product:', error);
                  });
                  console.log(newProduct);
              }
          });
          console.log("hello ",this.email)

          
    


      },

      handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('postedFile',file);
    axios.post('https://localhost:7095/SaveFile',formData)
    .then(response=>{
      console.log("image",response.data)
      this.signupForm.imageData=response.data
    })
    .catch(error=>{
      console.log("error",error)
    })
  },
      async fetchUserDetails(username) {
    try {
      const response = await axios.get(`https://localhost:7141/UsersInformation?username=${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  },
        onCaptchaVerified(response) {

    if (response) {

      // The captcha has been verified successfully.

      // You can now proceed with your desired action.

      // For example, enable the submit button.

    } else {

      // Captcha verification failed. Handle it accordingly.

      // For example, disable the submit button.

    }

  },

  verifyCaptcha() {

    // Trigger the captcha verification manually if needed.

    this.$refs.recaptcha.execute();

  },







     
  



      UpdateProduct() {
      const updatedProduct = {
        name: this.formData.name,
        rM: this.formData.rM,
        branch: this.formData.branch,
        phone: this.formData.phone,
        dateOfBirth: this.formData.dateOfBirth,
        placeOfBirth: this.formData.placeOfBirth,
        maritalStatus: this.formData.maritalStatus,
        admissionDate: this.formData.admissionDate,
        socType: this.formData.socType,
        religion: this.formData.religion,
        dischargeDate: this.formData.dischargeDate,
        ambStatus: this.formData.ambStatus,
        powerOfAttorneyForHealthcare: this.formData.powerOfAttorneyForHealthcare,
        powerOfAttorneyForHealthcareAddress: this.formData.powerOfAttorneyForHealthcareAddress,
        powerOfAttorneyForHealthcarePhone: this.formData.powerOfAttorneyForHealthcarePhone,
        powerOfAttorneyForHealthcareEmail: this.formData.powerOfAttorneyForHealthcareEmail,
        powerOfAttorneyForHealthcareHospitalOfPreference: this.formData.powerOfAttorneyForHealthcareHospitalOfPreference,
        responsiblePartyForFinance: this.formData.responsiblePartyForFinance,
        responsiblePartyForFinanceAddress: this.formData.responsiblePartyForFinanceAddress,
        responsiblePartyForFinancePhone: this.formData.responsiblePartyForFinancePhone,
        responsiblePartyForFinanceEmail: this.formData.responsiblePartyForFinanceEmail,
        medicalInsurence: this.formData.medicalInsurence,
        medicare: this.formData.medicare,
        primaryPhysician: this.formData.primaryPhysician,
        primaryPhysicianAddress: this.formData.primaryPhysicianAddress,
        primaryPhysicianPhone: this.formData.primaryPhysicianPhone,
        specialist: this.formData.specialist,
        specialistAddress: this.formData.specialistAddress,
        specialistPhone: this.formData.specialistPhone,
        specialistFax: this.formData.specialistFax,
        dentist: this.formData.dentist,
        dentistAddress: this.formData.dentistAddress,
        dentistPhone: this.formData.dentistPhone,
        dentistFax: this.formData.dentistFax,
        allergies: this.formData.allergies,
        explane: this.formData.explane,
        tBTest: this.formData.tBTest,
        tBTestDate: this.formData.tBTestDate,
        tBTestResults: this.formData.tBTestResults,
        emergencyContacts1Name: this.formData.emergencyContacts1Name,
        emergencyContacts1Phone: this.formData.emergencyContacts1Phone,
        emergencyContacts1Address: this.formData.emergencyContacts1Address,
        emergencyContacts1Email: this.formData.emergencyContacts1Email,
        emergencyContacts2Name: this.formData.emergencyContacts2Name,
        emergencyContacts2Phone: this.formData.emergencyContacts2Phone,
        emergencyContacts2Address: this.formData.emergencyContacts2Address,
        emergencyContacts2Email: this.formData.emergencyContacts2Email,
        mortuary: this.formData.mortuary,
        mortuaryPhone: this.formData.mortuaryPhone,
        cemetery: this.formData.cemetery,
        cemeteryPhone: this.formData.cemeteryPhone,
        dateExpired: this.formData.dateExpired,
        timeExpired: this.formData.timeExpired,
        dareBodyRelesed: this.formData.dareBodyRelesed,
        toWhom: this.formData.toWhom,
        residentsSignature: this.formData.residentsSignature,
        residentsSignatureDate: this.formData.residentsSignatureDate,
      };

      axios.put(`https://localhost:7095/Add/Regested?tell=${this.formData.phone}`, updatedProduct)
        .then(response => {
          console.log('Product updated successfully:', response.data);
          this.$emit('product-updated', updatedProduct); // Emit an event for the updated product
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    
},

      resetForm(){
        this.form= {
              Id: '',
              Names: '',
              Descriptions: '',
              price: '',
              isAvalable: false,
              expirDate: null,
          };
        },
      formatDateToISO(date) {
          if (!date)
              return ''; // Handle cases where date might be undefined or null
          return new Date(date).toISOString();
      },

      
  },
};
</script>
