
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
  
    it('Assert you can\'t enter negative amount and more than two decimals', () => {
      cy.contains('Send a Payment');
      cy.get('[data-cy="amount"]').type('-1');
      cy.contains('amount must be a positive number');
      cy.get('[data-cy="amount"]').clear();
      cy.get('[data-cy="amount"]').type('0.234');
      cy.contains('The amount should be a decimal with maximum two digits');
      cy.get('[data-cy="amount"]').clear();
    });

    it('Assert you can\'t enter today\s date or day 30+ days in future', () => {
      cy.get('[data-cy="dateInput"]').type(oneMonthAndADay);
      cy.contains('Date cannot be more than 30days in advance');
      cy.get('[data-cy="dateInput"]').clear();
      cy.contains('Please enter a valid date');
      cy.get('[data-cy="dateInput"]').type(oneMonth);
      cy.contains('Date cannot be more than 30days in advance').should('not.exist');
      cy.get('[data-cy="dateInput"]').clear();
      });

    it('Previous JSON button selected', () => {
      viewports.forEach((viewport) => {
        cy.viewport(viewport);
        cy.get('[data-cy="amount"]').type('123456789');
        cy.get('[data-cy="dateInput"]').type(today.toISOString().split('T')[0]);

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
      cy.get('[data-cy="dateInput"]').type(today.toISOString().split('T')[0]);
      cy.contains('Submit')
      .click();
      cy.contains('Success!');
      cy.contains('Ok')
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
  