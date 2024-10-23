const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080', // Replace with your actual base URL
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
    specPattern: 'cypress/e2e/**/*.{js,ts}', // Define where your test files are located
    supportFile: 'cypress/support/index.js', // Path to the support file if you need one
  },
  component: {
    devServer: {
      framework: 'vue', // Specify that you're using Vue.js
      bundler: 'webpack', // Since you're using Vue CLI, webpack bundler should be selected
    },
    specPattern: 'cypress/component/**/*.{js,ts}', // Define where component test files are located
  },
  viewportWidth: 1280, // Set default viewport size
  viewportHeight: 720,
})
