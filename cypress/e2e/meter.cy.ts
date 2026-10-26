// The real microphone can't be used in CI, so each test replaces getUserMedia:
// either with a fake microphone (a steady tone from an oscillator) or with a refusal.
describe('Live sound meter', () => {
  beforeEach(() => {
    cy.loginAsDemo();
  });

  it('measures with the microphone and stops again', () => {
    cy.window().then((win) => {
      const context = new win.AudioContext();
      const oscillator = context.createOscillator();
      const destination = context.createMediaStreamDestination();
      oscillator.connect(destination);
      oscillator.start();
      cy.stub(win.navigator.mediaDevices, 'getUserMedia').resolves(destination.stream);
    });

    cy.get('[data-testid="live-start-button"]').click();
    cy.get('[data-testid="live-badge"]').should('be.visible');
    cy.get('[data-testid="sound-level-value"]').invoke('text').should('match', /^\d+$/);
    cy.get('[data-testid="live-estimate-note"]').should('be.visible');
    cy.get('[data-testid="demo-reading-front"]').should('not.exist');

    cy.get('[data-testid="live-stop-button"]').click();
    cy.get('[data-testid="demo-badge"]').should('be.visible');
    cy.get('[data-testid="demo-reading-front"]').scrollIntoView().should('be.visible');
  });

  it('explains when microphone access is blocked and keeps the demo', () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.mediaDevices, 'getUserMedia').rejects(new win.DOMException('Permission denied', 'NotAllowedError'));
    });

    cy.get('[data-testid="live-start-button"]').click();
    cy.get('[data-testid="mic-error"]').should('be.visible');
    cy.get('[data-testid="mic-error-message"]').should('contain.text', 'Allow microphone access');
    cy.get('[data-testid="live-retry-button"]').should('be.visible');
    cy.get('[data-testid="demo-badge"]').should('be.visible');
    cy.get('[data-testid="demo-reading-front"]').scrollIntoView().should('be.visible');
  });
});
