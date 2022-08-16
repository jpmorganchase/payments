describe('Account page', () => {
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
});
