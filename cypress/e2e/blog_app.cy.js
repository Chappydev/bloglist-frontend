describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'George Frenulum',
      username: 'georgie',
      password: 'password'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Login');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('georgie');
      cy.get('#password').type('password');
      cy.get('#login-button').click();

      cy.contains('George Frenulum is logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('georgie');
      cy.get('#password').type('wrong-password');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'George Frenulum is logged in');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('georgie');
      cy.get('#password').type('password');
      cy.get('#login-button').click();
    });

    it('A blog can be created', function() {
      cy.contains('New Note').click();
      cy.get('.title-input').type('Title...');
      cy.get('.author-input').type('Author...');
      cy.get('.url-input').type('Url...');
      cy.get('#submit-note').click();

      cy.contains('Title... Author...');
    });

    it('A blog can be liked', function() {
      cy.contains('New Note').click();
      cy.get('.title-input').type('Title...');
      cy.get('.author-input').type('Author...');
      cy.get('.url-input').type('Url...');
      cy.get('#submit-note').click();

      cy.contains('Title... Author...').parent().find('button').click();
      cy.contains('like').click();
      cy.contains('Title... now has 1 likes')
      cy.contains('likes: 1');
    });
  });
});