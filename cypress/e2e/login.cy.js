context('Sign up', () => {

  it('sign up', () => {
    cy.visit('http://localhost:3000/signup')
    cy.get('.signUpClass')
    .find('[id="username"]').type('cypressDemo4')
  cy.get('.signUpClass')
    .find('[id="email"]').type('cypressD4@gmail.com')
  cy.get('.signUpClass')
    .find('[id="password"]').type('cypressPassword')
  
  cy.get('.signUpButtonClass').click()
  
  cy.url().should('eq','http://localhost:3000/cypressDemo4')
  })

  

    it('sign in', () => {
      cy.visit('http://localhost:3000/')
      cy.get('.signInClass')
        .find('[id="email"]').type('canary@gmail.com')
      cy.get('.signInClass')
        .find('[id="password"]').type('canary')
      
      cy.get('.signInButtonClass').click()
      
      cy.url().should('eq','http://localhost:3000/canary')
  
    })
    
    
  
  })