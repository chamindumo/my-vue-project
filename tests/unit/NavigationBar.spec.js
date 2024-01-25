import { mount,createLocalVue } from '@vue/test-utils';
import NavigationBar from '@/components/NavigationBar.vue';
import ElementUI from 'element-ui';
const localVue = createLocalVue(); // Create a local Vue instance
localVue.use(ElementUI);

describe('NavigationBar.vue', () => {
  it('renders navigation links correctly', () => {
    const wrapper = mount(NavigationBar,{      localVue    });
    
    // Replace with your actual navigation links
    const links = [
      'Home',
      'Book',
      'Product',
      'All Product',
      'Search',
      'Profile',
      'Signup',
      'Allproducts'
    ];

    const menuItems = wrapper.findAll('menu-item');
    
  

    // Check if each menu item contains the expected text
    menuItems.wrappers.forEach((menuItem, index) => {
      expect(menuItem.text()).toBe(links[index]);
    });

    // You can add more specific tests as needed
  });
  
  // Add more tests as needed
});
