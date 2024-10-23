// Add custom commands here
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login to the app.
     * @example cy.login('username', 'password')
     */
    login(username: string, password: string): Chainable<void>;
  }
}

// Adding a custom command for login as an example
Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: '/api/login', // Replace with your actual login endpoint
    body: {
      username,
      password,
    },
  }).then((resp) => {
    // Perform actions after login if necessary
  })
})