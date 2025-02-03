describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'blogtester',
      name: 'blogger',
      password: 'iheartblogs'
    }
    cy.createUser(user)
  })

  it('Login form is shown', function() {
    cy.visit('http://[::1]:5173')
    cy.contains('log in to application')
    cy.contains('log in').click()
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://[::1]:5173')
      cy.contains('log in').click()
      cy.get('#username').type('blogtester')
      cy.get('#password').type('iheartblogs')
      cy.get('#login-button').click()
      cy.get('.message').should('contain', 'logged in').and('have.css', 'color', 'rgb(0, 128, 0)')
    })
    
    it('fails with wrong credentials', function() {
      cy.visit('http://[::1]:5173')
      cy.contains('log in').click()
      cy.get('#username').type('newuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'wrong username or password').and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'blogtester', password: 'iheartblogs'})
      cy.contains('new blog').click()
    })

    it('a blog can be created', function() {
      cy.get('#title').type('Cypress Title')
      cy.get('#author').type('Singu Wasifa')
      cy.get('#url').type('www.singufanclub.net')
      cy.get('#create').click()
      cy.get('#blog_title_blog_author').contains('Cypress Title Singu Wasifa')
      cy.contains('view').click()
      cy.get('#blog_url').contains('www.singufanclub.net')
    })

    it('a blog can be liked', function() {
      cy.createBlog({ title: 'liketester', author: 'likemaster', url: 'www.likes.net' })
      cy.contains('view').click()
      cy.get('#blog_likes').contains('likes 0')
      cy.get('#like-button').click()
      cy.get('#blog_likes').contains('likes 1')
    })
    
    it('a blog can be deleted', function() {
      cy.createBlog({ title: 'deletetester', author: 'deletemaster', url: 'www.delete.net' })
      cy.contains('deletetester deletemaster')
      cy.contains('view').click()
      cy.contains('blogtester')
      cy.get('#delete-button').click()
      cy.contains('deletetester deletemaster').should('not.exist')
    })

    it('the delete button can only be seen by the poster', function() {
      cy.createBlog({ title: 'buttontester', author: 'cannotsee', 'url':'www.invisiblebutton.com' })
      cy.contains('buttontester cannotsee')
      cy.contains('logout').click()
      cy.createUser({username: 'temp', name:'temporary', password:'temppass'})
      cy.login({ username: 'temp', password: 'temppass'})
      cy.contains('buttontester cannotsee')
      cy.contains('view').click()
      cy.contains('delete').should('not.exist')
    })
  })
})