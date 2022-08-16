describe('Account page', () => {
  const viewports = ['iphone-6', 'ipad-2', 'macbook-16'];
  before(() => {
    cy.visit('/accounts');
  });

  it('Render mocked data', () => {
    cy.get('h2').contains('Accounts');
    cy.contains('491632582.87');
  });

  it('Toggles APIs being used on page on/off', () => {
    cy.contains('Balances API').should('not.exist');
    cy.get('[data-cy="showApiData"]').click();
    cy.contains('Balances API');
    cy.contains('Transactions API');

    cy.get('[data-cy="showApiData"]').click();
    cy.contains('Balances API').should('not.exist');
  });

  it('Toggles Mocked data on/off', () => {
    const errorMessage =
      'Error gathering information from API. Toggle on mocked data below to see example information';
    cy.contains('491632582.87');
    cy.get('[data-cy="showMockedData"]').click();
    cy.get('[data-cy="errorMessage"]').contains(errorMessage);
    cy.contains('491632582.87').should('not.exist');
    cy.get('[data-cy="showMockedData"]').click();
    cy.contains(errorMessage).should('not.exist');
    cy.contains('491632582.87');
  });

  it('Filter accounts and reset', () => {
    viewports.forEach((viewport) => {
      cy.viewport(viewport);
      cy.get('[data-cy="accountId"]').contains('000000011116605').click();
      cy.get('[data-cy="transactionsGrid"]')
        .contains('000000011253770')
        .should('not.exist');
      cy.get('[data-cy="allAccountsCard"]').click();
      cy.get('[data-cy="transactionsGrid"]').contains('000000011253770');
      cy.get('[data-cy="transactionsGrid"]').contains('000000011116605');
    });
  });

  it('Select transaction', () => {
    viewports.forEach((viewport) => {
      cy.viewport(viewport);
      cy.get('[data-cy="transactionsGrid"]').contains('4.6').click();
      cy.contains('Raw Transaction JSON');
      cy.get('[data-cy="closeButton"]').click();
      cy.contains('Raw Transaction JSON').should('not.exist');
    });
  });
});
