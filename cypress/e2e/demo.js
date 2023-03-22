function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

context('Demo - Full Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('sign in', () => {
    // https://on.cypress.io/submit
    cy.get('.signInClass')
      .find('[id="email-signin-input"]').type('demo@gmail.com')
    cy.get('.signInClass')
      .find('[id="password-signin-input"]').type('demo')
    
    cy.get('.signInButtonClass').click()

    sleep(3000)
    
    cy.url().should('include','demo')

  })

   it('create list', () => {
      // https://on.cypress.io/submit
      cy.get('.listForm')
        .find('[id="title"]').type('newListTitle')
      
      cy.get('.listSubmitButton').click()
  
      sleep(3000)

      cy.get('.listDataGrid').should('contain','newListTitle')
        
    })

    it('go to list', () => {
      // https://on.cypress.io/submit
      cy.get('.viewButton')
        .find('[title="newListTitle"]').click()
  
      sleep(3000)

      cy.url().should('include','list/demo')
        
    })

    it('add source', () => {
      // https://on.cypress.io/submit
      cy.get('.addSourceButton').click()
  
      sleep(3000)

      cy.url().should('include','add/demo')

      cy.get('.addSourceForm')
      .find('[id="title"]').type('New Demo Title')
      cy.get('.addSourceForm')
      .find('[id="author"]').type('A popular author')
      cy.get('.addSourceForm')
      .find('[id="description"]').type('A description')
      cy.get('.addSourceForm')
      .find('[id="year"]').type(2023)
    
    cy.get('.addSourceButton').click()

    sleep(3000)

    cy.url().should('include','list/demo')
    
    cy.get('.papersDataGrid').should('contain','New Demo Title')


        
    })

  

    
    
    
  
  })