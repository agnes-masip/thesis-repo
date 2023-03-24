context('Demo - Full Test', () => {

  it('sign in', () => {
    // https://on.cypress.io/submit
    cy.visit('http://localhost:3000/')
      cy.get('.signInClass')
        .find('[id="email"]').type('canary@gmail.com')
      cy.get('.signInClass')
        .find('[id="password"]').type('canary')
      
      cy.get('.signInButtonClass').click()
      
      cy.url().should('eq','http://localhost:3000/canary')

      cy.get('.listForm')
        .find('[id="title"]').type('newListTitle')
      
      cy.get('.listSubmitButton').click()

      cy.get('.listDataGrid').should('contain','newListTitle')

      cy.get('#seenewListTitle').click()
  

      cy.url().should('include','list/canary')
        
      cy.get('.addSourceButton').click()

      cy.url().should('include','add/canary')

      cy.get('.addSourceForm')
      .find('[id="title"]').type('New Demo Title')
      cy.get('.addSourceForm')
      .find('[id="author"]').type('A popular author')
      cy.get('.addSourceForm')
      .find('[id="description"]').type('A description')
      cy.get('.addSourceForm')
      .find('[id="year"]').type(2023)
    
    cy.get('.addSourceButton').click()

    cy.url().should('include','list/canary')
    
    cy.get('.papersDataGrid').should('contain','New Demo Title')

    cy.get('.papersDataGrid')
    .find('[id="New Demo Title"]').click();

    cy.wait(1000)

    cy.get('.editSourceForm')
    .find('[id="title"]').type("2")

    cy.get('.editSourceButton').click()

    cy.url().should('include', 'list/canary')

    cy.wait(1000)

    cy.get('.papersDataGrid').should('contain', 'New Demo Title2')

    cy.get('.backButton').click()

    cy.url().should('eq','http://localhost:3000/canary')

    cy.get('#deletenewListTitle').click()

    cy.wait(1000)

    cy.get('.listDataGrid').should('not.contain', 'newListTitle')
      
    })

  

    
    
    
  
  })