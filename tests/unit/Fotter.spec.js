import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/Fotter.vue';

describe('Footer.vue', () => {
  it('renders the component with the correct copyright text', () => {
    const wrapper = shallowMount(Footer);
    const copyrightText = wrapper.find('p');

    expect(copyrightText.text()).toBe('\u00A9 2023 KiWiSuit. All rights reserved.');
  });

 
});
