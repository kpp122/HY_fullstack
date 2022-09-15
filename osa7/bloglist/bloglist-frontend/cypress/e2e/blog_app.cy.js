describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'root',
      name: 'superuser',
      password: 'secret',
    });

    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.get('#login-form').contains('login');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#login-username').type('root');
      cy.get('#login-password').type('secret');
      cy.get('#login-button').click();
      cy.contains('superuser logged in');
    });

    it('fails with incorrect credentials', function () {
      cy.get('#login-username').type('root');
      cy.get('#login-password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.rejected')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });

    describe('when logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'root', password: 'secret' });
      });

      it('A blog can be created', function () {
        cy.get('#togglable-show').click();

        cy.get('#createBlog-title').type('Cypress testing');
        cy.get('#createBlog-author').type('whoever');
        cy.get('#createBlog-url').type('localhost:3000');
        cy.get('#createBlog-button').click();

        cy.contains('Cypress testing');
      });

      describe('and a blog exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Cypress testing',
            author: 'whoever',
            url: 'localhost:3000',
            likes: 12,
          });
          cy.createBlog({
            title: 'react testing',
            author: 'badauthor',
            url: 'localhost:3000',
            likes: 50,
          });
          cy.createBlog({
            title: 'jest testing',
            author: 'good',
            url: 'localhost:3000',
            likes: 49,
          });
        });

        it('a blog can be liked', function () {
          cy.contains('Cypress testing').parent().as('parentDiv');
          cy.get('@parentDiv').find('#blog-visibilityButton').click();
          cy.get('@parentDiv').find('#blog-likeButton').click();
        });

        it('and blogs exists they are sorted correctly by likes', function () {
          cy.get('.blog').eq(0).should('contain', 'react testing');
          cy.get('.blog').eq(1).should('contain', 'jest testing');
          cy.get('.blog').eq(2).should('contain', 'Cypress testing');

          cy.contains('jest testing').parent().as('parentDiv');
          cy.get('@parentDiv').find('#blog-visibilityButton').click();
          cy.get('@parentDiv').find('#blog-likeButton').click();
          cy.wait(150);
          cy.get('@parentDiv').find('#blog-likeButton').click();
          cy.wait(150);

          cy.get('.blog').eq(1).should('contain', 'react testing');
          cy.get('.blog').eq(0).should('contain', 'jest testing');
          cy.get('.blog').eq(2).should('contain', 'Cypress testing');
        });

        it('a blog can be deleted', function () {
          cy.contains('Cypress testing').parent().as('parentDiv');
          cy.get('@parentDiv').find('#blog-visibilityButton').click();
          cy.get('@parentDiv').find('#blog-removeButton').click();
        });
      });
    });
  });
});
