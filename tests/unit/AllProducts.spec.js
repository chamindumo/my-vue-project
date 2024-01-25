import { shallowMount, createLocalVue } from '@vue/test-utils';
import axios from 'axios'; // Import Axios
import MockAdapter from 'axios-mock-adapter'; // Import axios-mock-adapter
import moment from 'moment';
import AllProducts from '@/components/AllProducts.vue';

// Create a local Vue instance for testing
const localVue = createLocalVue();

describe('AllProducts.vue', () => {
  let wrapper;
  let mockAxios;

  // Before each test, create a new Axios mock instance
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  // After each test, reset the Axios mock
  afterEach(() => {
    mockAxios.restore();
  });

  // Helper function to mount the component with required props
  const mountComponent = () => {
    return shallowMount(AllProducts, {
      localVue,
      // Add any additional props, data, or other configuration options here
    });
  };

  it('fetches products from the API service on created', async () => {
    // Define the mock data you want to return from the API
    const mockData = [
      // Your mock product data here
    ];

    // Set up the Axios mock to respond with your mock data
    mockAxios.onGet('https://localhost:7141/Allproduct').reply(200, mockData);

    // Mount the component
    wrapper = mountComponent();

    // Wait for any asynchronous tasks to complete (e.g., Axios request)
    await wrapper.vm.$nextTick();

    // Now, you can assert that the component behaves as expected
    expect(wrapper.vm.products).toEqual(mockData);
  });

  // Add more test cases as needed for other component methods and behavior
});
