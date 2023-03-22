context('Sign up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('sign up', () => {
    // https://on.cypress.io/submit
    cy.get('.signUpClass')
    .find('[id="username-signup-input"]').type('cypressDemo4')
  cy.get('.signUpClass')
    .find('[id="email-signup-input"]').type('cypressD4@gmail.com')
  cy.get('.signUpClass')
    .find('[id="password-signup-input"]').type('cypressPassword')
  
  cy.get('.signUpButtonClass').click()
  
  cy.url().should('eq','http://localhost:3000/cypressDemo4')
  })

  

    it('sign in', () => {
      // https://on.cypress.io/submit
      cy.get('.signInClass')
        .find('[id="email-signin-input"]').type('canary@gmail.com')
      cy.get('.signInClass')
        .find('[id="password-signin-input"]').type('canary')
      
      cy.get('.signInButtonClass').click()
      
      cy.url().should('eq','http://localhost:3000/canary')
  
    })
    
    
  
  })