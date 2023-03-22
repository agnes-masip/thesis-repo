context('Demo - Full Test', () => {

  it('sign in', () => {
    // https://on.cypress.io/submit
    cy.visit('http://localhost:3000/')
    cy.get('.signInClass')
      .find('[id="email-signin-input"]').type('canary@gmail.com')
    cy.get('.signInClass')
      .find('[id="password-signin-input"]').type('canary')
    
    cy.get('.signInButtonClass').click()

    cy.url().should('eq','http://localhost:3000/canary')

      cy.get('.listForm')
        .find('[id="title"]').type('newListTitle')
      
      cy.get('.listSubmitButton').click()

      cy.get('.listDataGrid').should('contain','newListTitle')

    //   cy.get('.viewButton')
    //     .find('[title="newListTitle"]').click()
  

    //   cy.url().should('include','list/demo')
        
    //   cy.get('.addSourceButton').click()

    //   cy.url().should('include','add/demo')

    //   cy.get('.addSourceForm')
    //   .find('[id="title"]').type('New Demo Title')
    //   cy.get('.addSourceForm')
    //   .find('[id="author"]').type('A popular author')
    //   cy.get('.addSourceForm')
    //   .find('[id="description"]').type('A description')
    //   cy.get('.addSourceForm')
    //   .find('[id="year"]').type(2023)
    
    // cy.get('.addSourceButton').click()

    // cy.url().should('include','list/demo')
    
    // cy.get('.papersDataGrid').should('contain','New Demo Title')


        
    })

  

    
    
    
  
  })