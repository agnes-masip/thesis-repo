function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  
  it('sign up', async() => {
    // https://on.cypress.io/submit
    cy.get('.signUpClass')
      .find('[id="username-signup-input"]').type('cypress')
    cy.get('.signUpClass')
      .find('[id="email-signup-input"]').type('cypress@gmail.com')
    cy.get('.signUpClass')
      .find('[id="password-signup-input"]').type('cypressPassword')
    
    cy.get('.signUpButtonClass').click()

    await sleep(3000);
    
    cy.url().should('include','cypress')

  })

  it('sign in', async() => {
    // https://on.cypress.io/submit
    cy.get('.signInClass')
      .find('[id="email-signin-input"]').type('canary@gmail.com')
    cy.get('.signInClass')
      .find('[id="password-signin-input"]').type('canary')
    
    cy.get('.signInButtonClass').click()

    await sleep(3000);
    
    cy.url().should('include','cypress')

  })
})