describe('Sidebar', () => {
  before(() => {
    cy.visit('/');
  });

  it('Render basic sidebar', () => {
    cy.get('a').contains('Dashboard');
    cy.get('a').contains('Accounts');
  });

  it('Navigates to accounts', () => {
    cy.get('[data-cy="accountsLink"]').click();
    cy.location('pathname', { timeout: 60000 }).should('include', '/accounts');
  });

  it('Navigates to accounts using logo', () => {
    cy.visit('/service_status');
    cy.get('[data-cy="logo"]').click();
    cy.location('pathname', { timeout: 60000 }).should('include', '/accounts');
  });

  it('Navigates to service status - mobile page', () => {
    cy.viewport('iphone-6'); // Set viewport to 375px x 667px
    cy.get('[data-cy="popover"]').click();
    cy.get('[data-cy="serviceStatusLink"]').click();
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/service_status',
    );
  });

  it('Navigates to service status - medium page', () => {
    cy.viewport('ipad-2');
    cy.get('[data-cy="popover"]').click();
    cy.get('[data-cy="serviceStatusLink"]').click();
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/service_status',
    );
  });

  it('Navigates to service status - macbook', () => {
    cy.viewport('macbook-16');
    cy.get('[data-cy="serviceStatusDesktopLink"]').click();
    cy.location('pathname', { timeout: 60000 }).should(
      'include',
      '/service_status',
    );
  });
});
