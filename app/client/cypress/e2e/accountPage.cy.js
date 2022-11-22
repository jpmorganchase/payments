describe('Account page', () => {
  const viewports = ['iphone-6', 'ipad-2', 'macbook-16'];
  const mockedTotal = '9077401192.84';
  const mockedAccount = '000000010900009';
  before(() => {
    cy.visit('/accounts');
  });

  it('Render mocked data', () => {
    cy.get('h2').contains('Accounts');
    cy.contains(mockedTotal);
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
    cy.contains(mockedTotal);
    cy.get('[data-cy="showMockedData"]').click();
    cy.get('[data-cy="errorMessage"]').contains(errorMessage);
    cy.contains(mockedTotal).should('not.exist');
    cy.get('[data-cy="showMockedData"]').click();
    cy.contains(errorMessage).should('not.exist');
    cy.contains(mockedTotal);
  });

  it('Filter accounts and reset', () => {
    viewports.forEach((viewport) => {
      cy.viewport(viewport);
      cy.get('[data-cy="accountId"]').contains(mockedAccount).click();
      cy.get('[data-cy="transactionsGrid"]')
        .contains('000000010962009')
        .should('not.exist');
      cy.get('[data-cy="transactionsGrid"]').contains(mockedAccount);
      cy.get('[data-cy="allAccountsCard"]').click();
      cy.get('[data-cy="transactionsGrid"]').contains(mockedAccount);
      cy.get('[data-cy="transactionsGrid"]').contains('000000010962009');
    });
  });

  it('Select transaction', () => {
    viewports.forEach((viewport) => {
      cy.viewport(viewport);
      cy.get('[data-cy="transactionsGrid"]')
        .contains('TXN-C-779702311-369abcdef')
        .click();
      cy.contains('Raw JSON');
      cy.get('[data-cy="closeButton"]').click();
      cy.contains('Raw JSON').should('not.exist');
    });
  });

  it('Searches for MISC transaction and return one result', () => {
    viewports.forEach((viewport) => {
      cy.viewport(viewport);
      cy.get('[data-cy="transactionSearch"]').type('MISC');
      cy.get('#transactionsTable').find('tr').should('have.length', 2);
      cy.get('[data-cy="transactionSearch"]').clear();
    });
  });

  it('Searches for Hello transaction and return no results', () => {
    viewports.forEach((viewport) => {
      cy.viewport(viewport);
      cy.get('[data-cy="transactionSearch"]').type('Hello');
      cy.get('#transactionsTable').should('not.exist');
      cy.contains('No Transactions found');
      cy.get('[data-cy="transactionSearch"]').clear();
    });
  });
  it('Searches for Account and returns one results', () => {
    viewports.forEach((viewport) => {
      cy.viewport(viewport);
      cy.get('[data-cy="accountSearch"]').type('5001');
      cy.contains('No Accounts found').should('not.exist');
      cy.contains('22907042.39').should('not.exist');
      cy.contains('2090008705.83').should('exist');
      cy.get('[data-cy="accountSearch"]').clear();
    });
  });

  it('Searches for Account Hello and returns no results', () => {
    viewports.forEach((viewport) => {
      cy.viewport(viewport);
      cy.get('[data-cy="accountSearch"]').type('Hello');
      cy.contains('No Accounts found');
      cy.get('[data-cy="accountSearch"]').clear();
    });
  });

  it('Searches for Account and transaction', () => {
    viewports.forEach((viewport) => {
      cy.viewport(viewport);
      cy.get('[data-cy="accountSearch"]').type('000000010975001');
      cy.get('[data-cy="transactionSearch"]').type('TXN-C-779702312-7');
      cy.get('#transactionsTable').find('tr').should('have.length', 2);
      cy.get('[data-cy="transactionSearch"]').clear();
      cy.get('[data-cy="accountSearch"]').clear();
    });
  });
});
