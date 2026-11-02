describe('App navigation', () => {
  beforeEach(() => {
    cy.loginAsDemo();
  });

  it('updates the meter when a demo spot is selected', () => {
    cy.get('[data-testid="demo-reading-front"]').click();
    cy.get('[data-testid="sound-level-value"]').should('have.text', '106');
    cy.get('[data-testid="sound-level-label"]').should('have.text', 'Dangerous');
  });

  it('keeps the selected demo spot when switching tabs', () => {
    cy.get('[data-testid="demo-reading-bar"]').click();
    cy.get('[data-testid="tab-learn"]').click();
    cy.get('[data-testid="learn-screen"]').should('be.visible');
    cy.get('[data-testid="tab-meter"]').click();
    cy.get('[data-testid="sound-level-value"]').should('have.text', '88');
  });

  it('loads the tips and expands one', () => {
    cy.get('[data-testid="tab-learn"]').click();
    cy.get('[data-testid="tips-list"]').should('be.visible');
    cy.get('[data-testid="tip-earplugs"]').click();
    cy.get('[data-testid="tip-earplugs-body"]').should('be.visible');
  });

  it('shows the profile and logs out', () => {
    cy.get('[data-testid="tab-profile"]').click();
    cy.get('[data-testid="profile-email"]').should('have.text', 'demo@earguard.app');
    cy.get('[data-testid="logout-button"]').click();
    cy.get('[data-testid="login-screen"]').should('be.visible');
  });
});
