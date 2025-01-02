// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '53o8gn',
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
})
