function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

context('Sign up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('.submit() - submit a form', () => {
    // https://on.cypress.io/submit
    cy.get('.signUpClass')
    .find('[id="username-signup-input"]').type('cypressTest')
  cy.get('.signUpClass')
    .find('[id="email-signup-input"]').type('cypressT@gmail.com')
  cy.get('.signUpClass')
    .find('[id="password-signup-input"]').type('cypressPassword')
  
  cy.get('.signUpButtonClass').click()

  sleep(3000)
  
  cy.url().should('include','cypressTest')
  })

  

    it('sign in', () => {
      // https://on.cypress.io/submit
      cy.get('.signInClass')
        .find('[id="email-signin-input"]').type('canary@gmail.com')
      cy.get('.signInClass')
        .find('[id="password-signin-input"]').type('canary')
      
      cy.get('.signInButtonClass').click()
  
      sleep(3000)
      
      cy.url().should('include','cypress')
  
    })
    
    
  
  })