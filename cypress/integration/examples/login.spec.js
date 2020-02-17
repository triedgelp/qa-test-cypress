/// <reference types="cypress" />
import Login from './POM/login_pom.js';

var loginPO = new Login();

describe('Login test cases', function () {

  beforeEach(() => {
    cy.visit(Cypress.env('url'));
    cy.fixture('data').then(function (data) {
      this.data = data;
    })
  })

  it('Validate Main titles label', function () {
    cy.get(loginPO.mainTitle).should(($els) => {
      const text = $els.toArray().map(el => el.innerText);
      expect(text).to.deep.eq(this.data.h1Labels);
    })
  });

  it('Validate labels', function () {
    cy.get(loginPO.labelDesc).should(($els) => {
      const text = $els.toArray().map(el => el.innerText);
      expect(text).to.deep.eq(this.data.loginLabels);
    })
  });

  it('Validate navigation to Register page', function () {
    cy.get(loginPO.regSelect).click();
    cy.get(loginPO.mainTitle).should('have.text', 'Erstellen Sie Ihren Pylot Account');
  });


  it('Validate User is a required field', function () {
    cy.get(loginPO.user).type('email@pylot.com').should('have.value', 'email@pylot.com');
    cy.get(loginPO.submit).should('be.disabled');
  })

  it('Validate Password is a required field', function () {
    cy.get(loginPO.pwd).type('email@pylot.com').should('have.value', 'email@pylot.com');
    cy.get(loginPO.submit).should('be.disabled');
  })

  it('Validate Forgot Password is displayed', function () {
    cy.get('a').eq(1).should('have.attr', 'href', '/forgot-password');
  })

  it('Validate Forgot Password  label is displayed', function () {
    cy.get('a').eq(1).should('have.text', 'Forgot password?');
  })

  it('Validate Forgot Password navigation', function () {
    cy.get('a').eq(1).click();
    cy.get(loginPO.mainTitle).eq(1).should('have.text','Did you forget your password?');
  })

  it('Validate Login error message', function () {
    cy.generateUser();
    cy.get(loginPO.pwd).type('adqe0adad');
    cy.get(loginPO.submit).click().then(() => {
      cy.get(loginPO.errorIcon).should('be.visible');
      cy.get(loginPO.errorText).contains('Sie haben das Password, die E-Mail-Adresse oder beides falsch eingegeben. Bitte überprüfen Sie Ihre Angaben.');
    })
  })

  it('Validate User successful login', function(){
    cy.get(loginPO.user).type('david.rosas@cockpit.com');
    cy.get(loginPO.pwd).type('Zer0c00LL');
    cy.get(loginPO.submit).click().then(() => {
      cy.get(loginPO.mainTitle).should('have.text', 'With the help of your information we personalize your Pylot Cockpit');
    });
  })
})