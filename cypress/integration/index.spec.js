describe('Homepage Rendered test', () => {
  it('finds the API Status page title', () => {
    cy.visit('/');
    cy.contains('API Status');
  });
});
