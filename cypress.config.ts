const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',  // Adjust the port if necessary
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
    supportFile: false,  // Remove this if you want to use support files
  },
});