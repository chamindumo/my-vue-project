import { mount, createLocalVue } from '@vue/test-utils';
import SignUp from '@/components/SignUp.vue';
import ElementUI from 'element-ui';
import axios from 'axios';

// Create a localVue instance
const localVue = createLocalVue();
localVue.use(ElementUI); // Use Element UI with the local Vue instance

describe('SignUp', () => {
  let wrapper;
  let mockAxios;

  beforeEach(() => {
    // Mock axios responses
    mockAxios = {
      get: jest.fn(() => Promise.resolve({ data: false })),
      post: jest.fn(() => Promise.resolve({ data: 'User registered successfully' })),
    };

    // Replace axios with the mocked instance
    axios.create = jest.fn(() => mockAxios);

    // Mount the component with the localVue instance
    wrapper = mount(SignUp, {
      localVue,
    });
  });
  it('renders the signup form correctly', () => {
    // Check if the form elements are rendered

    expect(wrapper.find('form').exists()).toBe(true); 

  });

  it('handles form submission', async () => {
    // Find the form element using a CSS selector (replace 'your-form-selector' with your actual selector)
    const form = wrapper.findComponent({ ref: 'signupForm' });

    // Set form input values
    await wrapper.setData({
      signupForm: {
        username: 'testuser',
        passwordHash: 'testpassword',
        email: 'test@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main St',
        city: 'City',
        region: 'Region',
      },
    });

    // Find the submit button within the form
    const submitButton = form.find('button[type="submit"]'); // Assuming it's a <button type="submit">.

    // Trigger a submit event on the form
    await form.trigger('submit.prevent');

   
  });
});
