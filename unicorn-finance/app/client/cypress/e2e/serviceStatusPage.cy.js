
describe('Service status page', () => {
  before(() => {
    cy.visit('/service_status');
  });

  it('Render mocked data', () => {
    cy.contains('Bankers Bank Test3');
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
  it('Toggles APIs being used on page on/off', () => {
    cy.get('h2').contains('Service status');
    cy.get('[data-cy="showApiData"]').click();
    cy.get('h1').contains(
      'Platform Availability Communication Manangement API',
    );
    cy.get('[data-cy="showApiData"]').click();
    cy.contains('Platform Availability Communication Manangement API').should(
      'not.exist',
    );
  });

  it('Toggles Mocked data on/off', () => {
    const errorMessage =
      'Error gathering information from API. Toggle on mocked data below to see example information';
    cy.get('h2').contains('Service status');
    cy.get('[data-cy="showMockedData"]').click();
    cy.get('[data-cy="errorMessage"]').contains(errorMessage);
    cy.get('[data-cy="showMockedData"]').click();
    cy.contains(errorMessage).should('not.exist');
    cy.contains('200000041T1');
  });
});
