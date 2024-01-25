<template>
  <div class="app">
    <NavigationBar />

    <el-drawer
      :visible.sync="drawerproduct"
      :direction="directionproduct"
      size="50%"
    >
      <div class="input-container">
        <label for="emailEmail" class="input-label">Template Name:</label>
        <input
          type="text"
          id="templateName"
          v-model="templateName"
          class="input-field"
          placeholder="Enter template name"
        />

        <label for="emailSubject" class="input-label">Email Subject:</label>
        <input
          type="text"
          id="emailSubject"
          v-model="emailSubject"
          class="input-field"
          placeholder="Enter email subject"
        />
      </div>

      <!-- Rich Text Editor -->
      <div>
        <div v-if="drawerproduct" id="quill-editor"></div>
      </div>
      <button @click="sendEmail" class="action-button large-button">Create Template</button>

    </el-drawer>

    <div style="position: absolute; top: 190px; left: 10px;">
      <el-button type="text" @click="drawerproduct = true" icon="el-icon-plus">
        Add Template
      </el-button>
    </div>
    <div style="position: absolute; top: 190px; right: 10px;">
      <el-button type="text" @click="drawerTemplate = true" icon="el-icon-plus">
        Add placeholders
      </el-button>
    </div>

   
    <!-- Button to open the preview modal -->

     <!-- Send Email Button -->
     <div>
      <br>
      <br>
      <h2>Template Management</h2>
      <br>
      <br>
      <br>
      <ul class="template-list">
        <li v-for="template in templates" :key="template.id">
          {{ template.templateName }}
          <button @click="editTemplate(template)">Edit</button>
          <button @click="deleteTemplate(template.templateName)">Delete</button>
        </li>
      </ul>
      </div>
      <br>
      <el-drawer
      :visible.sync="edit"
      :direction="editDrower"
      size="100%"
    >
  <modal name="edit-template-modal" :adaptive="true" class="custom-modal">
    <div>
      <br>
      <h2>Edit Email Template</h2>
      <br>
      <label for="editEmailSubject" class="input-label">Email Subject:</label>
      <input
        type="text"
        id="editEmailSubject"
        v-model="editEmailSubject"
        class="input-field"
        placeholder="Enter email subject"
      />

      <div id="edit-quill-editor" v-html="editEditorContent"></div>

      
         <br>
      <button @click="saveEditedTemplate" class="action-button">Save Changes</button>
      <button @click="closeEditModal" class="close-button">Close</button>
          <br>
    </div>
          <br>
  </modal>
  </el-drawer>

  <el-drawer
      :visible.sync="drawerTemplate"
      :direction="directionTemplate"
      size="100%"
    >
<div>
  <br>
    <h2>Add Placeholder</h2>
    <div class="input-container">
      <label for="templateName" class="input-label">Template Name:</label>
      <input
        type="text"
        id="templateName"
        v-model="templateName"
        class="input-field"
        placeholder="Enter template name"
      />
    </div>

    <div class="input-container">
      <label for="placeHolder" class="input-label">Placeholder Name:</label>
      <input
        type="text"
        id="placeHolder"
        v-model="placeHolder"
        class="input-field"
        placeholder="Enter placeholder name"
      />
    </div>

    <div class="input-container">
      <label for="value" class="input-label">value:</label>
      <input
        type="text"
        id="value"
        v-model="value"
        class="input-field"
        placeholder="Enter value"
      />
    </div>

    <button @click="addTemplateWithPlaceholder" class="action-button large-button">Add place holders</button>
  </div>
  </el-drawer>

  </div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import NavigationBar from './NavigationBar.vue';
import 'C:/Users/janit/source/repos/Nayana mama front/my-vue-project/src/StyleSheet.css'


export default {
  components: { NavigationBar},

  data() {
    return {
     emailSubject: '',
      editor: null,
      emailContent: '',
      templateName:'',
      previewContent: '',
      templates: [],
      editEmailSubject: '',
      editTemplateName: '', // To store the name of the template being edited
      editEditor: null, 
      placeHolder: '',
      value:'',
      visible: false,
      drawerproduct: false,
      directionproduct: 'rtl',
      drawerTemplate: false,
      directionTemplate: 'ltl',
      edit:false,
      editDrower:'rti',
      editEditorContent: '', // To store the content for the rich text editor in the edit modal

    };

  },
  mounted() {
    
    this.fetchTemplates();
  },
  watch: {
  drawerproduct(newVal) {
    if (newVal) {
      // The drawer is opened, initialize the Quill editor
      this.$nextTick(() => {
        if (!this.quillEditor) {
          this.quillEditor = new Quill('#quill-editor', {
            theme: 'snow',
            modules: {
              toolbar: [
                [{ header: '1' }, { header: '2' }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['align', 'blockquote'],
                ['code-block'],
                ['clean'],
              ],
            },
          });
        }
      });
    } else {
      // The drawer is closed, destroy the Quill editor
      if (this.quillEditor) {
        this.quillEditor = null;
      }
    }
  },
  edit(newVal) {
    if (newVal) {
      // The drawer is opened, initialize the Quill editor
      this.$nextTick(() => {
        if (!this.quillEditor) {
          this.quillEditor = new Quill('#quill-editor', {
            theme: 'snow',
            modules: {
              toolbar: [
                [{ header: '1' }, { header: '2' }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['align', 'blockquote'],
                ['code-block'],
                ['clean'],
              ],
            },
          });
        }
      });
    } else {
      // The drawer is closed, destroy the Quill editor
      if (this.quillEditor) {
        this.quillEditor = null;
      }
    }
  },
  
},

  methods: {
   async sendEmail() {
  // Get the email content from the editor
  const userContent = this.editor.root.innerHTML;
  console.log(userContent)
  console.log(this.emailSubject)
  
  // Validate that the email subject and content are not empty
  if (!this.emailSubject || !userContent) {
    alert('Please enter a subject and email content.');
    return;
  }
  const predefinedStyles = '<style>' +
    'p {  color: #555555; font-size: 16px; }' +
    'h1 { color: #333333; font-size: 24px; }' +
    'img { max-width: 100%; height: auto;}'+
    '</style>';

  // Create a request object with the subject and content
  const emailContent = predefinedStyles+userContent;
  const emailRequest = {

    subject: this.emailSubject,
    content: emailContent,
    templateName:this.templateName,
  
  };
console.log(emailRequest)
  try {
    // Send the emailRequest to your backend API for email sending
    const response = await axios.post('https://localhost:7141/send-rich-text-email', emailRequest);

    // Handle success
    console.log('Email sent successfully', response.data);
    // Optionally, you can show a success message to the user
  } catch (error) {
    // Handle error
    console.error('Error sending email:', error);
  } 
},
fetchTemplates() {
      // Make an API request to fetch the list of templates
      axios.get('https://localhost:7141/api/email')
        .then(response => {
          this.templates = response.data;
        })
        .catch(error => {
          console.error('Error fetching templates', error);
        });
    },

    editTemplate(template) {
  this.editTemplateName = template.templateName;
  this.editEmailSubject = template.subject;
  this.edit=true;
  // Create a new Quill editor for the editEditor
  this.$nextTick(() => {
        if (!this.editEditor) {
          this.editEditor = new Quill('#edit-quill-editor', {    theme: 'snow',
    modules: {
      toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['align', 'blockquote'], 
        ['code-block'], 
        ['clean'],
     ],
            },
          });
        }
      });
  // Set the content of the editor
  this.editEditor.clipboard.dangerouslyPasteHTML(template.content);
  
  this.$modal.show('edit-template-modal');
},


    saveEditedTemplate() {
      const editedContent = this.editEditor.root.innerHTML;
      // Find the template with the matching template name
      const editedTemplate = this.templates.find(template => template.templateName === this.editTemplateName);

      if (!editedTemplate) {
        console.error('Template not found for the given name.');
        return;
      }

      // Update the email subject and content of the template
      editedTemplate.subject = this.editEmailSubject;
      editedTemplate.content = editedContent;

      // Assuming you have an API endpoint for updating templates
      axios.put(`https://localhost:7141/Email/${editedTemplate.templateName}`, editedTemplate)
        .then(response => {
          console.log('Template updated successfully', response.data);
          this.$modal.hide('edit-template-modal');
          // Refresh the list of templates after updating
          this.fetchTemplates();
        })
        .catch(error => {
          console.error('Error updating template', error);
        });
    },

    closeEditModal() {
      this.$modal.hide('edit-template-modal');
    },
    deleteTemplate(templateName) {
  if (confirm('Are you sure you want to delete this template?')) {
    axios.delete(`https://localhost:7141/email/${templateName}`)
      .then(response => {
        console.log(response);
        // Update the templates list after successful deletion
        this.fetchTemplates();
      })
      .catch(error => {
        console.error('Error deleting template', error);
      });
  }
},

openPreview() {
      // Get the email content from the editor
      const emailContent = this.editor.root.innerHTML;
      // Set the preview content
      this.previewContent = emailContent;
      // Show the preview modal
      this.$modal.show('preview-modal');
    },
    closePreview() {
      this.$modal.hide('preview-modal');
    },
   addTemplateWithPlaceholder() {

      const templateData = {
        templateName: this.templateName,
        placeHolder:this.placeHolder,
        value: this.value,
      };

      // Send a POST request to your backend API to add the template and placeholder to the database
      axios.post('https://localhost:7141/Add/emailplaceholder', templateData)
        .then(response => {
          console.log('Template and placeholder added successfully', response.data);
          // Optionally, you can show a success message to the user
        })
        .catch(error => {
          console.error('Error adding template and placeholder', error);
          // Handle the error and show an error message if needed
        });
    },
  },
};
</script>

<style scoped>

</style>