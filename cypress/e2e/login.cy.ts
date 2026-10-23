// Demo account from src/services/mock/users.ts (login is mocked for the PWA).
const testEmail = 'demo@earguard.app';
const testPassword = 'festival123';

describe('Login screen', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('renders the login form', () => {
    cy.get('[data-testid="email-input"]').should('exist');
    cy.get('[data-testid="password-input"]').should('exist');
    cy.get('[data-testid="login-button"]').should('exist');
  });

  it('shows an error with a wrong password', () => {
    cy.typeInto('email-input', testEmail);
    cy.typeInto('password-input', 'wrong-password');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="password-input-error"]').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('logs in with valid credentials and navigates to the meter', () => {
    cy.typeInto('email-input', testEmail);
    cy.typeInto('password-input', testPassword);
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="meter-screen"]').should('be.visible');
  });
});
