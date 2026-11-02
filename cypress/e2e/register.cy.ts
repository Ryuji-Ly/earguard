// These tests create real accounts in Supabase. A unique email per run avoids
// "already exists" errors; delete old e2e-* users in the dashboard now and then.
describe('Sign up', () => {
  it('switches between login and sign-up', () => {
    cy.visit('/login');
    cy.get('[data-testid="go-to-register"]').click();
    cy.get('[data-testid="register-screen"]').should('be.visible');
    cy.get('[data-testid="go-to-login"]').click();
    cy.get('[data-testid="login-screen"]').should('be.visible');
  });

  it('keeps the button disabled until the password is long enough', () => {
    cy.visit('/register');
    cy.typeInto('register-name-input', 'Test User');
    cy.typeInto('register-email-input', 'short@earguard.app');
    cy.typeInto('register-password-input', '123');
    cy.get('[data-testid="register-password-input-error"]').should('be.visible');
    cy.get('[data-testid="register-button"]').should('have.attr', 'aria-disabled', 'true');
  });

  it('creates an account and logs straight in', () => {
    const email = `e2e-${Date.now()}@earguard.app`;
    cy.visit('/register');
    cy.typeInto('register-name-input', 'Festival Tester');
    cy.typeInto('register-email-input', email);
    cy.typeInto('register-password-input', 'festival123');
    cy.get('[data-testid="register-button"]').click();

    cy.get('[data-testid="meter-screen"]').should('be.visible');
    cy.get('[data-testid="tab-profile"]').click();
    cy.get('[data-testid="profile-name"]').should('have.text', 'Festival Tester');
    cy.get('[data-testid="profile-email"]').should('have.text', email);
  });

  it('explains when the email is already taken', () => {
    cy.visit('/register');
    cy.typeInto('register-name-input', 'Someone');
    cy.typeInto('register-email-input', 'demo@earguard.app');
    cy.typeInto('register-password-input', 'something-else');
    cy.get('[data-testid="register-button"]').click();

    cy.get('[data-testid="register-error"]').should('contain.text', 'already exists');
    cy.get('[data-testid="register-screen"]').should('be.visible');
  });
});
