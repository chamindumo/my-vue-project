import { mount, createLocalVue } from '@vue/test-utils';
import BookTable from '@/components/BookTable.vue'; // Replace with the actual path to your component
import ElementUI from 'element-ui';

const localVue = createLocalVue(); // Create a local Vue instance
localVue.use(ElementUI);

describe('BookTable', () => {
  it('renders a table with book data', () => {
    const bookData = [
      { id: 1, name: 'Book 1', author: 'Author 1' },
      { id: 2, name: 'Book 2', author: 'Author 2' },
      // Add more book data as needed
    ];

    const wrapper = mount(BookTable, {
      localVue,
      propsData: {
        bookData,
      },
    });

    // Assert that the component renders correctly
    expect(wrapper.exists()).toBe(true);

    // Assert that the table contains the correct number of rows
    const tableRows = wrapper.findAll('tbody tr');
    expect(tableRows.length).toBe(bookData.length);

    // You can add more assertions here to check the content and behavior of the component
  });

  // Add more test cases as needed
});
