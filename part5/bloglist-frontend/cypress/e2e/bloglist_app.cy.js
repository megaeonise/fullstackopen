describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'blogtester',
      name: 'blogger',
      password: 'iheartblogs'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://[::1]:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('log in').click()
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('blogtester')
      cy.get('#password').type('iheartblogs')
      cy.get('#login-button').click()
      cy.get('.message').should('contain', 'logged in').and('have.css', 'color', 'rgb(0, 128, 0)')
    })
    
    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('newuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})