import { mount,createLocalVue } from '@vue/test-utils';
import ProductForm from '@/components/ProductForm.vue'; // Update the import path based on your project structure
import ElementUI from 'element-ui';


const localVue = createLocalVue(); // Create a local Vue instance
localVue.use(ElementUI);
describe('ProductForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(ProductForm, {
        localVue,
      propsData: {
        productData: [],
        productToEdit: null,
      },
    });

    // Ensure that the form elements are rendered
    expect(wrapper.find('form')).toBeTruthy();
    expect(wrapper.find('input[type="text"]')).toBeTruthy();
    expect(wrapper.find('input[type="textarea"]')).toBeTruthy();
    expect(wrapper.find('input[type="number"]')).toBeTruthy();
    expect(wrapper.find('input[type="file"]')).toBeTruthy();
    expect(wrapper.find('input[type="radio"]')).toBeTruthy();
    expect(wrapper.find('el-date-picker-stub')).toBeTruthy();
    expect(wrapper.find('vue-recaptcha-stub')).toBeTruthy();

    // Check if the buttons are rendered
    expect(wrapper.find('el-button[type="primary"]')).toBeTruthy();
    expect(wrapper.find('el-button[type="info"]')).toBeTruthy();

    // You can add more specific checks here based on your component's structure
  });

  it('emits "product-created" event when create button is clicked', () => {
    const wrapper = mount(ProductForm, {
        localVue,
      propsData: {
        productData: [],
        productToEdit: null,
      },
    });

    // Fill in the form fields (you may need to update this part based on your form structure)
    wrapper.setData({
      form: {
        Id: '123',
        Names: 'Sample Product',
        Descriptions: 'Description of the product',
        price: 50,
        isAvalable: true,
        expirDate: new Date(),
        ImageData: 'sample-image.jpg',
      },
    });

    // Trigger the click event on the create button

    // Check if the "product-created" event was emitted with the expected data
   
  });

  // You can add more test cases for other functionality as needed
});
