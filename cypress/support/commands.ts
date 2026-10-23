// The web build is statically pre-rendered (output: "static"), so the HTML exists before React
// takes over. Typing before hydration is lost, so wait until React has attached its props to the node.
Cypress.Commands.add('typeInto', (testId: string, text: string) => {
  cy.get(`[data-testid="${testId}"]`)
    .should(($el) => {
      const node = $el[0];
      expect(node !== undefined && Object.keys(node).some((key) => key.startsWith('__reactProps'))).to.equal(true);
    })
    .type(text);
});

Cypress.Commands.add('loginAsDemo', () => {
  cy.visit('/login');
  cy.typeInto('email-input', 'demo@earguard.app');
  cy.typeInto('password-input', 'festival123');
  cy.get('[data-testid="login-button"]').click();
  cy.get('[data-testid="meter-screen"]').should('be.visible');
});

declare global {
  namespace Cypress {
    interface Chainable {
      typeInto(testId: string, text: string): Chainable<void>;
      loginAsDemo(): Chainable<void>;
    }
  }
}

export {};
