<template>
    <div>
        <el-table
      :data="productData"
      class="custom-table">
      <el-table-column prop="name" label="Name" width="120"></el-table-column>
      <el-table-column prop="rm" label="RM" width="90"></el-table-column>
      <el-table-column prop="phone" label="Phone" width="120"></el-table-column>
      <el-table-column prop="dateOfBirth" label="Date of Birth" width="120"></el-table-column>
      <el-table-column prop="placeOfBirth" label="Place of Birth" width="120"></el-table-column>
      <el-table-column prop="maritalStatus" label="Marital Status" width="120"></el-table-column>
      <el-table-column prop="admissionDate" label="Admission Date" width="120"></el-table-column>
      <el-table-column prop="socType" label="Soc Type" width="120"></el-table-column>
      <el-table-column prop="religion" label="Religion" width="120"></el-table-column>
      <el-table-column prop="dischargeDate" label="Discharge Date" width="120"></el-table-column>
      <el-table-column prop="ambStatus" label="Amb Status" width="120"></el-table-column>
      <el-table-column prop="powerOfAttorneyForHealthcare" label="Power of Attorney for Healthcare" width="180"></el-table-column>
      <el-table-column prop="powerOfAttorneyForHealthcareAddress" label="Power of Attorney for Healthcare Address" width="180"></el-table-column>
      <el-table-column prop="powerOfAttorneyForHealthcarePhone" label="Power of Attorney for Healthcare Phone" width="180"></el-table-column>
      <el-table-column prop="powerOfAttorneyForHealthcareEmail" label="Power of Attorney for Healthcare Email" width="180"></el-table-column>
      <el-table-column prop="powerOfAttorneyForHealthcareHospitalOfPreference" label="Hospital of Preference" width="180"></el-table-column>
      <el-table-column prop="responsiblePartyForFinance" label="Responsible Party for Finance" width="180"></el-table-column>
      <el-table-column prop="responsiblePartyForFinanceAddress" label="Responsible Party for Finance Address" width="180"></el-table-column>
      <el-table-column prop="responsiblePartyForFinancePhone" label="Responsible Party for Finance Phone" width="180"></el-table-column>
      <el-table-column prop="responsiblePartyForFinanceEmail" label="Responsible Party for Finance Email" width="180"></el-table-column>
      <el-table-column prop="medicalInsurence" label="Medical Insurance" width="150"></el-table-column>
      <el-table-column prop="medicare" label="Medicare" width="120"></el-table-column>
      <el-table-column prop="primaryPhysician" label="Primary Physician" width="150"></el-table-column>
      <el-table-column prop="primaryPhysicianAddress" label="Primary Physician Address" width="180"></el-table-column>
      <el-table-column prop="primaryPhysicianPhone" label="Primary Physician Phone" width="150"></el-table-column>
      <el-table-column prop="specialist" label="Specialist" width="120"></el-table-column>
      <el-table-column prop="specialistAddress" label="Specialist Address" width="180"></el-table-column>
      <el-table-column prop="specialistPhone" label="Specialist Phone" width="150"></el-table-column>
      <el-table-column prop="specialistFax" label="Specialist Fax" width="120"></el-table-column>
      <el-table-column prop="dentist" label="Dentist" width="120"></el-table-column>
      <el-table-column prop="dentistAddress" label="Dentist Address" width="180"></el-table-column>
      <el-table-column prop="dentistPhone" label="Dentist Phone" width="150"></el-table-column>
      <el-table-column prop="dentistFax" label="Dentist Fax" width="120"></el-table-column>
      <el-table-column prop="allergies" label="Allergies" width="100"><template slot-scope="scope">
          {{ scope.row.allergies ? 'Yes' : 'No' }}
        </template></el-table-column>
      <el-table-column prop="explane" label="Explanation" width="120"></el-table-column>
      <el-table-column prop="tBTest" label="TB Test" width="100"><template slot-scope="scope">
          {{ scope.row.allergies ? 'Yes' : 'No' }}
        </template></el-table-column>
      <el-table-column prop="tbTestDate" label="TB Test Date" width="120"><template slot-scope="scope">
    {{ formatDate(scope.row.expirDate) }}
  </template></el-table-column>
      <el-table-column prop="tbTestResults" label="TB Test Results" width="150"></el-table-column>
      <el-table-column prop="emergencyContacts1Name" label="Emergency Contact 1 Name" width="180"></el-table-column>
      <el-table-column prop="emergencyContacts1Phone" label="Emergency Contact 1 Phone" width="180"></el-table-column>
      <el-table-column prop="emergencyContacts1Address" label="Emergency Contact 1 Address" width="180"></el-table-column>
      <el-table-column prop="emergencyContacts1Email" label="Emergency Contact 1 Email" width="180"></el-table-column>
      <el-table-column prop="emergencyContacts2Name" label="Emergency Contact 2 Name" width="180"></el-table-column>
      <el-table-column prop="emergencyContacts2Phone" label="Emergency Contact 2 Phone" width="180"></el-table-column>
      <el-table-column prop="emergencyContacts2Address" label="Emergency Contact 2 Address" width="180"></el-table-column>
      <el-table-column prop="emergencyContacts2Email" label="Emergency Contact 2 Email" width="180"></el-table-column>
      <el-table-column prop="mortuary" label="Mortuary" width="120"></el-table-column>
      <el-table-column prop="mortuaryPhone" label="Mortuary Phone" width="150"></el-table-column>
      <el-table-column prop="cemetery" label="Cemetery" width="120"></el-table-column>
      <el-table-column prop="cemeteryPhone" label="Cemetery Phone" width="150"></el-table-column>
      <el-table-column prop="dateExpired" label="Date Expired" width="120"></el-table-column>
      <el-table-column prop="timeExpired" label="Time Expired" width="120"></el-table-column>
      <el-table-column prop="dareBodyRelesed" label="Date Body Released" width="150"></el-table-column>
      <el-table-column prop="toWhom" label="To Whom" width="120"></el-table-column>
      <el-table-column label="Operations" width="270">
      
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEditProduct(scope.row)" icon="el-icon-edit"></el-button>
        <el-button size="mini" type="danger" @click="deleteproduct(scope.row.phone)" icon="el-icon-delete"></el-button>
        <el-button size="mini" type="danger" @click="print(scope.row) ">Print</el-button>

      </template>
    </el-table-column>
</el-table>
    </div>
</template>

<script>
import moment from 'moment';
import jsPDF from 'jspdf';


export default {
  props: ['productData'],
  methods: {
    handleEditProduct(product) {
      this.$emit('edit-product', product);
    },
    deleteproduct(productId) {
      this.$emit('delete-product', productId);
    },
    formatDate(date) {
  return moment(date, 'YYYY-MM-DDTHH:mm:ss').format('MMM D, YYYY');
},

print(product) {
      const pdf = new jsPDF();

      pdf.setFontSize(18);
      pdf.text('Nazarath Care - Resident Details Report', 15, 15);

      pdf.setLineWidth(0.5);
      pdf.line(15, 20, 195, 20);
      // Add logo
      pdf.rect(10, 30, 190, 290); // Adjust the dimensions based on your content

      const logo = new Image();
      logo.src = require('@/assets/logo1.png'); // Ensure the correct path
      pdf.addImage(logo, 'PNG', 160, 3, 30, 30);

      this.addDetail(pdf, 'Name', product.name, 15, 35);
  this.addDetail(pdf, 'RM', product.rm, 15, 45);
  this.addDetail(pdf, 'Phone', product.phone, 15, 55);
  this.addDetail(pdf, 'Date of Birth', this.formatDate(product.dateOfBirth), 15, 65);
  this.addDetail(pdf, 'Place of Birth', product.placeOfBirth, 15, 75);
  this.addDetail(pdf, 'Marital Status', product.maritalStatus, 15, 85);
  this.addSectionLine(pdf, 100);

  // Healthcare Information
  this.addDetail(pdf, 'Admission Date', this.formatDate(product.admissionDate), 80, 35);
  this.addDetail(pdf, 'Soc Type', product.socType, 80, 45);
  this.addDetail(pdf, 'Religion', product.religion, 80, 55);
  this.addDetail(pdf, 'Discharge Date', this.formatDate(product.dischargeDate), 80, 65);
  this.addDetail(pdf, 'Amb Status', product.ambStatus, 80, 75);
  this.addSectionLine(pdf, 170);

  // Power of Attorney for Healthcare
  this.addDetail(pdf, 'Power of Attorney for Healthcare', product.powerOfAttorneyForHealthcare, 15, 115);
  this.addDetail(pdf, 'Address', product.powerOfAttorneyForHealthcareAddress, 15, 120);
  this.addDetail(pdf, 'Phone', product.powerOfAttorneyForHealthcarePhone, 15, 125);
  // ... Add more details
  this.addSectionLine(pdf, 155);
  this.addSectionLine(pdf, 130);

  // Financial Information
  this.addDetail(pdf, 'Responsible Party for Finance', product.responsiblePartyForFinance, 15, 145);
  this.addDetail(pdf, 'Responsible Party Address', product.responsiblePartyForFinanceAddress, 15, 140);
  this.addDetail(pdf, 'Responsible Party Phone', product.responsiblePartyForFinancePhone, 15, 150);
  // ... Add more details
  pdf.text('MEDICAL INFORMATION', 75, 160);
  this.addSectionLine(pdf, 163);

  // Medical Information
  this.addDetail(pdf, 'Medical Insurance', product.medicalInsurence, 15, 167);
  this.addDetail(pdf, 'Medicare', product.medicare, 85, 167);
  this.addSectionLine(pdf, 170);

  this.addDetail(pdf, 'Primary Physician', product.primaryPhysician, 15, 175);
  this.addDetail(pdf, 'Address', product.primaryPhysicianAddress, 15, 180);
  this.addDetail(pdf, 'Phone', product.primaryPhysicianPhone, 15, 185);

  this.addSectionLine(pdf, 190);

  this.addDetail(pdf, 'Specialist', product.specialist, 15, 195);
  this.addDetail(pdf, 'Address', product.specialistAddress, 15, 200);
  this.addDetail(pdf, 'Phone', product.specialistPhone, 15, 205);

  // ... Add more details  this.addSectionLine(pdf, 190);

  this.addSectionLine(pdf, 210);

  this.addDetail(pdf, 'Dentist', product.dentist, 15, 215);
  this.addDetail(pdf, 'Address', product.dentistAddress, 15, 220);
  this.addDetail(pdf, 'Phone', product.dentistPhone, 15, 225);

  this.addSectionLine(pdf, 230);

  this.addDetail(pdf, 'Allergies', product.allergies, 15, 235);
  this.addDetail(pdf, 'Explane', product.explane, 75, 235);

  this.addDetail(pdf, 'TB Test', product.tBTest, 15, 240);
  this.addDetail(pdf, 'Date', product.tBTestDate, 75, 240);
  this.addDetail(pdf, 'Result', product.tBTestResults, 125, 240);
  this.addSectionLine(pdf, 242);
  pdf.text('EMERGENCY CONTATCTS', 75, 246);
  this.addSectionLine(pdf, 248);

  // Emergency Contacts
  this.addDetail(pdf, 'Emergency Contact 1 Name', product.emergencyContacts1Name, 15, 252);
  this.addDetail(pdf, 'Emergency Contact 1 Phone', product.emergencyContacts1Phone, 15, 255);
  // ... Add more details
  this.addSectionLine(pdf, 258);
  pdf.text('FUNERAL ARRANGEMENTS', 75, 263);
  this.addSectionLine(pdf, 266);

  // Mortuary and Cemetery
  this.addDetail(pdf, 'Mortuary', product.mortuary, 15, 270);
  this.addDetail(pdf, 'Mortuary Phone', product.mortuaryPhone, 15, 273);
  this.addDetail(pdf, 'Cemetery', product.cemetery, 75, 270);
  this.addDetail(pdf, 'Cemetery Phone', product.cemeteryPhone, 75, 273);

  // Expired Information
  this.addDetail(pdf, 'Date Expired', product.dateExpired, 125, 270);
  this.addDetail(pdf, 'Time Expired', product.timeExpired, 125, 273);
  this.addDetail(pdf, 'Date Body Released', product.dareBodyRelesed, 125, 276);
  this.addDetail(pdf, 'To Whom', product.toWhom, 125, 280);
  this.addSectionLine(pdf, 283);


  pdf.text( 'Resident Signature',  15, 288);
  pdf.text( 'Date', 85, 288);
  //Save the PDF

  pdf.save('Resident_details.pdf');
},

addDetail(pdf, label, value, x, y) {
  // Decrease font size for details
  pdf.setFontSize(10);

  // Split the value into lines
  const lines = pdf.splitTextToSize(`${label}: ${value}`, 170);

  // Add bullet points
  lines.forEach((line, index) => {
    const bullet = '\u2022'; // Unicode character for bullet point
    pdf.text(`${bullet} ${line}`, x, y + index * 10);
  });
},

addSectionLine(pdf, y) {
  // Add a line to separate sections
  pdf.setLineWidth(0.5);
  pdf.line(10, y, 200, y);
},
  
  }
};
</script>

<style scoped>
</style>
