describe('Login Flow', () => {
    it('should log in with valid credentials and navigate to the dashboard', () => {
        // Visit the login page
        cy.visit('/login');

        // Fill in the login form
        cy.get('input[placeholder="Enter Email"]').type('z@gmail.com');
        cy.get('input[placeholder="Enter Password"]').type('Zarmeena1!');
        cy.get('button').contains('Login').click();

        // Wait for navigation
        cy.url().should('include', '/DashBoard');
    });
});
