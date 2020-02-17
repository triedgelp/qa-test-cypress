/// <reference types="cypress" />
import Register from './POM/register_pom';

const registerPO = new Register();

describe('Register test cases', function () {
  beforeEach(() => {
    cy.visit(Cypress.env('url') + "register");
    cy.fixture('data').then(function (data) {
      this.data = data;
    })
  })

  it('Validate the left section titles', function () {
    cy.get(registerPO.leftTitles).should(($els) => {
      const text = $els.toArray().map(el => el.innerText);
      expect(text).to.deep.eq(this.data.leftTitles);
    });
  })

  it('Validate the left section descriptions', function () {
    cy.get(registerPO.leftDescriptions).should(($els) => {
      const text = $els.toArray().map(el => el.innerText);
      expect(text).to.deep.eq(this.data.desc);
    });
  })

  it('Validate the Main Title', function () {
    cy.get(registerPO.mainTitle).click().should('have.text', 'Erstellen Sie Ihren Pylot Account');
  })

  it('Validate the Misc labels', function () {
    cy.get(registerPO.mainDescs).eq(5).should('have.text', 'Registrieren');
    cy.get(registerPO.mainDescs).eq(6).should('have.text', 'Registrieren Sie sich mit Ihrer E-Mail-Adresse.');
  })

  it('Validate navigation to Login page', function () {
    cy.get(registerPO.regSelect).click();
    cy.get(registerPO.mainTitle).eq(1).should('have.text', 'Welcome back!');
  })

  it('Validate Email must have 3 letters', function () {
    cy.generateUser();
    cy.get(registerPO.submit).should('be.disabled');
  })

  it('Validate Password is a required field', function () {
    cy.get(registerPO.pwd).type('Zer-C00LL');
    cy.get(registerPO.submit).should('be.disabled');
  })

  it('Validate Password required 6 characters', function () {
    cy.generateUser();
    cy.get(registerPO.pwd).type('zero');
    cy.get(registerPO.submit).should('be.disabled');
  })

  it('Validate Password required at least an uppercase', function () {
    cy.generateUser();
    cy.get(registerPO.pwd).type('zerocool');
    cy.get(registerPO.submit).should('be.disabled');
  })

  it('Validate Password required at least a number', function () {
    cy.generateUser();
    cy.get(registerPO.pwd).type('Zerocool');
    cy.get(registerPO.submit).should('be.disabled');
  })

  it('Validate agree with terms must be checked', function () {
    cy.get(registerPO.checkbox).check().should('be.checked');
  })

  it('Validate button label', function () {
    cy.get(registerPO.submit).should('have.text', 'Weiter')
  })

  it('Validate Submit button is enabled', function () {
    cy.generateUser();
    cy.get(registerPO.pwd).type('Zer0cool');
    cy.get(registerPO.submit).should('be.enabled');
  })

  it('Validate User already exists error message', function () {
    cy.get(registerPO.user).type('david.rosas@cockpit.com');
    cy.get(registerPO.pwd).type('Zer0c00LL');
    cy.get(registerPO.submit).click();
    cy.get(registerPO.userExists).should('have.text', 'Username Exists Exception');
  })

  it('Validate User succesfull login', function () {
    cy.generateUser();
    cy.get(registerPO.pwd).type('Zer0c00LL');
    cy.get(registerPO.submit).click().then(() => {
      cy.wait(3000);
      cy.get(registerPO.mainTitle).should('have.text', 'With the help of your information we personalize your Pylot Cockpit');
    });
  })
})