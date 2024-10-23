describe('HelloWorld Component E2E Test', () => {
  beforeEach(() => {
    // Visit the home page where HelloWorld.vue is rendered
    cy.visit('/');
  });

  it('should render the message passed as a prop', () => {
    // Check if the message is displayed correctly
    cy.contains('Vite + Vue').should('be.visible');
  });

  it('should increment the counter when the button is clicked', () => {
    // Initial state of the button
    cy.contains('count is 0').should('be.visible');

    // Click the button to increment
    cy.contains('count is 0').click();

    // The count should now be 1
    cy.contains('count is 1').should('be.visible');

    // Click again to increment to 2
    cy.contains('count is 1').click();
    cy.contains('count is 2').should('be.visible');
  });

  it('should display the correct double count', () => {
    // Initial double count
    cy.contains('Double count is 0').should('be.visible');

    // Click the button to increment count
    cy.contains('count is 0').click();

    // Double count should now be 2
    cy.contains('Double count is 2').should('be.visible');

    // Click the button again
    cy.contains('count is 1').click();

    // Double count should now be 4
    cy.contains('Double count is 4').should('be.visible');
  });
});
