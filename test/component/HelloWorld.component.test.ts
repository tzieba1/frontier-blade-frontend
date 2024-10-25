import { render, fireEvent } from '@testing-library/vue';
import HelloWorld from '@/components/HelloWorld.vue';
import { describe, it, expect } from 'vitest';

describe('HelloWorld.vue', () => {
  it('renders the message passed via props', () => {
    // Render the component with a message
    const msg = 'Hello Vitest';
    const { getByText } = render(HelloWorld, {
      props: { msg }
    });

    // Assert that the message is rendered correctly
    expect(getByText(msg)).toBeInTheDocument();
  });
});