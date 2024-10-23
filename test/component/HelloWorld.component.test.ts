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

  it('increments the counter when the button is clicked', async () => {
    // Render the component
    const { getByText } = render(HelloWorld, {
      props: { msg: 'Counter Test' }
    });

    // Find the button with initial count of '0'
    const button = getByText('count is 0');

    // Simulate a button click
    await fireEvent.click(button);

    // Assert the count increments to 1
    expect(button.textContent).toBe('count is 1');

    // Simulate another click
    await fireEvent.click(button);

    // Assert the count increments to 2
    expect(button.textContent).toBe('count is 2');
  });
});