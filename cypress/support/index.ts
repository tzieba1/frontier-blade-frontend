// This is the support file for Cypress, it will be loaded before any test files.

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err) => {
  // Prevent Cypress from failing the test on any uncaught exceptions in the app
  return false
})