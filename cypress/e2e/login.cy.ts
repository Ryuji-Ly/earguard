// Demo account that exists in the Supabase project (see README / authService).
const testEmail = 'demo@earguard.app';
const testPassword = 'festival123';

describe('Login screen', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('redirects to login when not authenticated', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
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

  it('stays logged in after a page refresh', () => {
    cy.typeInto('email-input', testEmail);
    cy.typeInto('password-input', testPassword);
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="meter-screen"]').should('be.visible');

    cy.reload();
    cy.get('[data-testid="meter-screen"]').should('be.visible');
    cy.url().should('not.include', '/login');
  });
});
