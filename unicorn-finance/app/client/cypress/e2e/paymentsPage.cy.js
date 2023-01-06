
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

    it('Changing payment type changes changes accounts', () => {
      //Check US RTP setup correctly
      cy.get('[data-cy="paymentType"]').should('have.value', 'US RTP')
      cy.get('[data-cy="debtorAccount"]').find(':selected').contains('RAPID AUDIO LLC - 000000010900009')
      cy.get('[data-cy="creditorAccount"]').find(':selected').contains('MORRIS ELECTRIC CONTRACTING LLC - 000000010962009')

      // Check US RTP json output correct
      cy.contains('Preview JSON')
      .click();
      cy.get('[data-cy="jsonDialogContent"]').contains('000000010900009')
      cy.get('[data-cy="jsonDialogContent"]').contains('000000010962009')
      cy.get('[data-cy="closeButton"]').click();

      // Swap to EU SEPA
      cy.get('[data-cy="paymentType"]')
      .select('EU RTP (SEPA)');
      cy.get('[data-cy="debtorAccount"]').find(':selected').contains('6231400596')
      cy.get('[data-cy="creditorAccount"]').find(':selected').contains('0041287103')

      //Check JSON updated with payment type swap
      cy.contains('Preview JSON')
      .click();
      cy.get('[data-cy="jsonDialogContent"]').contains('6231400596')
      cy.get('[data-cy="jsonDialogContent"]').contains('0041287103')
      cy.get('[data-cy="closeButton"]').click();

      //Reset
      cy.get('[data-cy="paymentType"]')
      .select('US RTP');
    });

    it.only('Check amount is sent as number in JSON', () => {
      cy.get('[data-cy="amount"]').clear().type(26.99)
      cy.contains('Preview JSON')
      .click();
      cy.get('[data-cy="jsonDialogContent"]').contains(26.99)
      cy.get('[data-cy="jsonDialogContent"]').contains("\"26.99\"").should('not.exist')

      cy.get('[data-cy="closeButton"]').click();

    });
  });
  