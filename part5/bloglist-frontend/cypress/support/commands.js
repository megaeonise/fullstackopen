// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, name, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
      }).then(response=>{
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://[::1]:5173')
      })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    const blogPost = {
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title, author, url},
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
    }
    cy.request(blogPost)
    cy.visit('http://[::1]:5173')
})

Cypress.Commands.add('createUser', ({ username, name, password}) => {
    cy.request('POST', 'http://localhost:3003/api/users', {
        username, name, password
      })
})

Cypress.Commands.add('addLikes', (entry, number) => {
    const button_id = `#${entry}-like-button`
    const likes_id = `#${entry}_likes`
    cy.contains(entry)
    .contains('view')
    .click()
    for (let i=0; i<number; i++){
        cy.contains(entry).
        get(button_id).
        click()
        cy.wait(1000)
        cy.get(likes_id).should('have.text', `likes ${i+1}like`)
    }
    cy.contains(entry)
    .contains('hide')
    .click()
})