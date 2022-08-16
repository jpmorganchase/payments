describe('Account page', () => {
  before(() => {
    cy.visit('/accounts');
  });

  it('Render mocked data', () => {
    cy.get('h2').contains('Accounts');
    cy.contains('491632582.87');
    cy.get('[data-cy="completeTab"]')
      .contains('COMPLETE')
      .should('have.class', 'bg-green-100');
    cy.get('[data-cy="intermittentTab"]')
      .contains('INTERMITTENT')
      .should('have.class', 'bg-red-100');

    cy.get('[data-cy="defaultTab"]')
      .contains('OFFLINE')
      .should('have.class', 'bg-blue-100');

    cy.contains('TCH');
  });
});
