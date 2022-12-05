
describe('Payments page', () => {
  const viewports = ['iphone-6', 'ipad-2', 'macbook-16'];

    before(() => {
      cy.visit('/payments');
    });

    const mockedAccount = '000000010962009';
    const today = new Date();
    const oneMonth = new Date(new Date(today).setDate(today.getDate() + 31)).toISOString()
    .split('T')[0];
    const oneMonthAndADay = new Date(new Date(today).setDate(today.getDate() + 32)).toISOString()
    .split('T')[0];
  
    it('Previous JSON button selected', () => {
      viewports.forEach((viewport) => {
        cy.viewport(viewport);
        cy.get('[data-cy="amount"]').type('123456789');
        cy.get('[data-cy="date"]').type(today.toISOString().split('T')[0]);

        cy.contains('Preview JSON')
          .click();
        cy.contains('Raw JSON');
        cy.contains('123456789')
        cy.get('[data-cy="closeButton"]').click();
        cy.contains('Raw JSON').should('not.exist');
        cy.get('[data-cy="amount"]').clear();
      });
    });

    it('Submit button selected', () => {
      cy.get('[data-cy="amount"]').type('1000');
      cy.get('[data-cy="date"]').type(today.toISOString().split('T')[0]);
      cy.contains('Submit')
      .click();
      cy.contains('Success!');
      cy.contains('Make another payment')
      .click();
      cy.get('[data-cy="amount"]').clear();
    });

    it('Display mocked Previous payments', () => {
      cy.get('[data-cy="previousPaymentsGrid"]')
      .contains('uf1668512640964')
      .click();
      cy.contains("8a254fcc-fca9-4136-80f4-b48802c759a0")
      cy.get('[data-cy="closeButton"]').click();
    });
  });
  