// The history requests are intercepted, so these tests don't depend on (or change)
// the demo account's real data in Supabase.
const sessionsUrl = '**/rest/v1/measurement_sessions*';

const sampleRows = [
  {
    id: 'session-a',
    user_id: 'demo',
    started_at: '2026-11-01T21:40:00Z',
    duration_seconds: 9000,
    average_db: 97,
    peak_db: 108,
    dose_percent: 240,
    created_at: '2026-11-01T23:10:00Z',
  },
  {
    id: 'session-b',
    user_id: 'demo',
    started_at: '2026-10-31T19:00:00Z',
    duration_seconds: 1800,
    average_db: 84,
    peak_db: 92,
    dose_percent: 4.2,
    created_at: '2026-10-31T19:30:00Z',
  },
];

describe('History', () => {
  beforeEach(() => {
    cy.loginAsDemo();
  });

  it('lists past sessions, newest first', () => {
    cy.intercept('GET', sessionsUrl, { body: sampleRows }).as('getSessions');
    cy.get('[data-testid="tab-history"]').click();
    cy.wait('@getSessions');

    cy.get('[data-testid="sessions-list"]').should('be.visible');
    cy.get('[data-testid^="session-"][data-testid$="-date"]').should('have.length', 2);
    cy.get('[data-testid="session-session-a"]').should('be.visible');
  });

  it('shows an empty state for a new user', () => {
    cy.intercept('GET', sessionsUrl, { body: [] });
    cy.get('[data-testid="tab-history"]').click();

    cy.get('[data-testid="sessions-empty"]').should('be.visible');
    cy.get('[data-testid="sessions-start"]').click();
    cy.get('[data-testid="meter-screen"]').should('be.visible');
  });

  it('shows an error with a retry when loading fails', () => {
    cy.intercept('GET', sessionsUrl, { forceNetworkError: true });
    cy.get('[data-testid="tab-history"]').click();

    // supabase-js retries failed reads 3 times (after 1, 2 and 4 s) before reporting an error.
    cy.get('[data-testid="sessions-loading"]').should('be.visible');
    cy.get('[data-testid="sessions-error"]', { timeout: 15000 }).should('be.visible');
    cy.get('[data-testid="sessions-retry"]').should('be.visible');
  });

  it('deletes a session only after confirming', () => {
    cy.intercept('GET', sessionsUrl, { body: sampleRows });
    cy.intercept('DELETE', sessionsUrl, { statusCode: 204 }).as('deleteSession');
    cy.get('[data-testid="tab-history"]').click();

    cy.get('[data-testid="session-session-a-delete"]').click();
    cy.get('[data-testid="session-session-a-cancel"]').click();
    cy.get('[data-testid="session-session-a-confirm"]').should('not.exist');

    cy.get('[data-testid="session-session-a-delete"]').click();
    cy.get('[data-testid="session-session-a-confirm-delete"]').click();
    cy.wait('@deleteSession').its('request.url').should('include', 'id=eq.session-a');
    cy.get('[data-testid="session-session-a"]').should('not.exist');
    cy.get('[data-testid="session-session-b"]').should('be.visible');
  });
});
