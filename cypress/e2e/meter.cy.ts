// The real microphone can't be used in CI, so each test replaces getUserMedia:
// either with a fake microphone (a steady tone from an oscillator) or with a refusal.
// Fake microphone: a steady tone, so every reading is the same loud level.
function fakeMicrophone() {
  cy.window().then((win) => {
    const context = new win.AudioContext();
    const oscillator = context.createOscillator();
    const destination = context.createMediaStreamDestination();
    oscillator.connect(destination);
    oscillator.start();
    cy.stub(win.navigator.mediaDevices, 'getUserMedia').resolves(destination.stream);
  });
}

const sessionsUrl = '**/rest/v1/measurement_sessions*';

describe('Live sound meter', () => {
  beforeEach(() => {
    cy.loginAsDemo();
  });

  it('measures with the microphone and stops again', () => {
    fakeMicrophone();

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

  // cy.clock() fakes time: tick(15000) runs 15 s of readings instantly.
  // cy.intercept() answers the save request, so tests don't fill the demo account's history.
  it('saves the session when measuring stops', () => {
    cy.intercept('POST', sessionsUrl, (request) => {
      request.reply(201, {
        id: 'test-session',
        user_id: 'test-user',
        created_at: new Date().toISOString(),
        ...request.body,
      });
    }).as('saveSession');
    fakeMicrophone();
    cy.clock();

    cy.get('[data-testid="live-start-button"]').click();
    cy.tick(15000);
    cy.get('[data-testid="live-session-progress"]').should('contain.text', 'of daily dose');
    cy.get('[data-testid="live-stop-button"]').click();

    cy.wait('@saveSession').its('request.body.duration_seconds').should('be.gte', 10);
    cy.get('[data-testid="session-summary-status"]').should('have.text', 'Session saved');
    cy.get('[data-testid="session-summary-stats-dose"]').should('be.visible');
  });

  it('offers a retry when the session could not be saved', () => {
    cy.intercept('POST', sessionsUrl, { forceNetworkError: true });
    fakeMicrophone();
    cy.clock();

    cy.get('[data-testid="live-start-button"]').click();
    cy.tick(15000);
    cy.get('[data-testid="live-stop-button"]').click();

    cy.get('[data-testid="session-summary-status"]').should('have.text', 'Not saved');
    cy.get('[data-testid="session-summary-error"]').should('contain.text', 'offline');
    cy.get('[data-testid="session-retry-button"]').should('be.visible');
  });

  it("doesn't keep sessions that are too short", () => {
    fakeMicrophone();
    cy.clock();

    cy.get('[data-testid="live-start-button"]').click();
    cy.tick(3000);
    cy.get('[data-testid="live-stop-button"]').click();

    cy.get('[data-testid="session-summary-status"]').should('have.text', 'Too short to save');
  });
});
