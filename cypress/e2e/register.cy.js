describe('Registration Flow', () => {
    it('should register a new user and navigate based on the role', () => {
        // Visit the sign-up page
        cy.visit('/signup');

        // Fill in the registration form
        cy.get('input[placeholder="Enter Name"]').type('John Doe');
        cy.get('input[placeholder="Enter Email"]').type('john.doe@example.com');
        cy.get('select').select('Mentor'); // Adjust to match the role dropdown
        cy.get('input[placeholder="Enter Password"]').type('StrongPass123!');
        
        // Submit the registration form
        cy.get('button[type="submit"]').contains('Register').click();

        // Wait for the confirmation dialog
        cy.get('.dialog-box') // Assuming this is the class for the dialog
            .should('be.visible')
            .contains('You have successfully singed up !!'); 

        // Close the dialog and verify navigation
        cy.get('.dialog-box button').click(); // Close button

        // Validate navigation based on role
        cy.url().should('include', '/DashBoard/Mentor');
    });
});
