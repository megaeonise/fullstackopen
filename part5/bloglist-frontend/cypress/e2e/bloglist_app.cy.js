describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('log in').click()
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('newuser')
      cy.get('#password').type('correctpassword')
      cy.get('#login-button').click()
      cy.contains('logged in')
    })
    
    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('newuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })
})