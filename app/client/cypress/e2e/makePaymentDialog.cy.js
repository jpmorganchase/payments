describe('Make Payment Dialog', () => {
    const viewports = ['iphone-6', 'ipad-2', 'macbook-16'];
    const mockedAccount = '000000010962009';
    const today = new Date();
    const oneMonth = new Date(new Date(today).setDate(today.getDate() + 31)).toISOString()
    .split('T')[0];
    const oneMonthAndADay = new Date(new Date(today).setDate(today.getDate() + 32)).toISOString()
    .split('T')[0];

    before(() => {
      cy.visit('/accounts');
    });

    it('Open dialog from overall account card and close again', () => {
        cy.get('[data-cy="allAccountsCard"]').get('[data-cy="makePaymentButton"]').click();
        cy.contains('Make a payment');
        cy.get('[data-cy="closeButton"]').click()
        cy.contains('Make a payment').should('not.exist');
      });

    it('Open dialog from sub-account card and close again', () => {
        cy.get('[data-cy="accountId"]').contains(mockedAccount).click();
        cy.get('[data-cy="makePaymentButton"]').click();
        cy.contains('Make a payment');
        cy.get('#debtorAccountId option:checked').should('contain', mockedAccount)
        cy.get('[data-cy="closeButton"]').click()
        cy.contains('Make a payment').should('not.exist');
    });

    it('Assert you can\'t enter negative amount and more than two decimals', () => {
        cy.get('[data-cy="allAccountsCard"]').get('[data-cy="makePaymentButton"]').click();
        cy.contains('Make a payment');
        cy.get('[data-cy="amount"]').type('-1');
        cy.contains('amount must be a positive number');
        cy.get('[data-cy="amount"]').clear();
        cy.get('[data-cy="amount"]').type('0.234');
        cy.contains('The amount should be a decimal with maximum two digits');
        cy.get('[data-cy="amount"]').clear();
        cy.get('[data-cy="closeButton"]').click()

      });

    it('Assert you can\'t enter today\s date or day 30+ days in future', () => {
    cy.get('[data-cy="allAccountsCard"]').get('[data-cy="makePaymentButton"]').click();
    cy.contains('Make a payment');
    cy.get('[data-cy="dateInput"]').type(oneMonthAndADay);
    cy.contains('Date cannot be more than 30days in advance');
    cy.get('[data-cy="dateInput"]').clear();
    cy.contains('Please enter a valid date');
    cy.get('[data-cy="dateInput"]').type(oneMonth);
    cy.contains('Date cannot be more than 30days in advance').should('not.exist');
    cy.get('[data-cy="dateInput"]').clear();
    cy.get('[data-cy="closeButton"]').click()

    });

});