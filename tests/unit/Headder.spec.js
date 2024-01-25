import { shallowMount } from '@vue/test-utils';
import NavigationBar from 'C:/Users/Chamindu/source/repos/front/src/components/Headder.vue';

describe('Headder.vue', () => {
  it('renders the component with the correct title', () => {
    const wrapper = shallowMount(NavigationBar);
    const title = wrapper.find('h1');

    expect(title.text()).toBe('KiWiSUIT');
  });

});
