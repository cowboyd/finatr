describe('Transaction Delete Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#accounts')
      .contains('Add Account')
      .click();

    cy.get('form')
      .contains('starting')
      .parent()
      .parent()
      .find('input')
      .type('{selectall}55');

    cy.get('form')
      .contains('name')
      .parent()
      .parent()
      .find('input')
      .type('test account');

    cy.get('form').submit();
  });

  it('deletes the recently added transaction', () => {
    cy.get('#accounts')
      .contains('55.00')
      .parent()
      .within(() => {
        cy.get('.delete').click();
      });

    cy.get('#accounts')
      .contains('test account')
      .should('not.exist');
  });
});
