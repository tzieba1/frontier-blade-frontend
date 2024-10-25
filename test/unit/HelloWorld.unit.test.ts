import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import HelloWorld from '@/components/HelloWorld.vue';

describe('HelloWorld.vue Unit Test with <script setup>', () => {
  it('increments count and emits event on button click', async () => {
    // Render the component
    const { getByText, emitted } = render(HelloWorld, {
      props: { msg: 'Event Test' }
    });

    // Find the button and simulate a click
    const button = getByText('count is 0');
    await fireEvent.click(button);

    // After clicking, count should increment
    expect(button.textContent).toBe('count is 1');

    // Check the double count
    expect(getByText('Double count is 2')).toBeInTheDocument();

    // Check if the event was emitted with the correct value
    const emittedEvents = emitted();
    expect(emittedEvents).toHaveProperty('countIncremented');
    expect(emittedEvents.countIncremented[0]).toEqual([1]);
  });
});
