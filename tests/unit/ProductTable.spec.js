import { mount,createLocalVue } from '@vue/test-utils';
import ProductTable from '@/components/ProductTable.vue'; // Update the import path based on your project structure
import ElementUI from 'element-ui';

const localVue = createLocalVue(); // Create a local Vue instance
localVue.use(ElementUI);

describe('ProductTable', () => {
  it('renders correctly', () => {
    // Mock product data for testing
    const productData = [
      {
        id: 1,
        names: 'Product A',
        descriptions: 'Description A',
        price: 50,
        expirDate: '2023-09-30',
        isAvalable: true,
        imageData: 'product-a.jpg',
      },
      // Add more mock products as needed
    ];

    const wrapper = mount(ProductTable, {
        localVue,
      propsData: {
        productData,
      },
    });

    // Ensure that the table is rendered
    expect(wrapper.find('.custom-table').exists()).toBe(true);

    // Check if the product data is correctly rendered in the table
    const tableRows = wrapper.findAll('tbody tr');
    expect(tableRows.length).toBe(productData.length);

    productData.forEach((product, index) => {
      const row = tableRows.at(index);

      expect(row.find('.product-id')).toBeTruthy();
      expect(row.find('.product-name')).toBeTruthy();
      expect(row.find('.product-description')).toBeTruthy();
      expect(row.find('.product-price')).toBeTruthy();
      expect(row.find('.product-expire-date')).toBeTruthy(); // Format may vary
      expect(row.find('.product-available')).toBeTruthy();
    });

    // You can also test other interactions or events related to this component
  });

  // You can add more test cases for other functionality as needed
});
