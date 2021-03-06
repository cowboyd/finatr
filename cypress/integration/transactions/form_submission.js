describe('Transaction Form Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#transactions')
      .contains('Add Transaction')
      .click();
  });

  it('tab switches to the form', () => {
    cy.contains('Add a Transaction');
  });

  it('submits simple transaction', () => {
    cy.get('form')
      .contains('value')
      .parent()
      .parent()
      .find('input')
      .type('55');
    cy.get('form').submit();
    cy.get('#transactions').contains('55.00');
  });

  it('check income is listed in income tab after submit', () => {
    cy.get('form')
      .contains('value')
      .parent()
      .parent()
      .find('input')
      .type('55');
    cy.get('form').submit();
    cy.get('#transactions')
      .contains('Income')
      .click();
    cy.get('#transactions').contains('55.00');
  });

  it('check expense is listed in expense tab after submit', () => {
    cy.get('form')
      .contains('value')
      .parent()
      .parent()
      .find('input')
      .type('67');

    cy.get('form')
      .contains('type')
      .parent()
      .parent()
      .find('select')
      .select('Expense');

    cy.get('form').submit();
    cy.get('#transactions')
      .contains('Expenses')
      .click();
    cy.get('#transactions').contains('67.00');
  });

  it('check transfer is listed in transfer tab after submit', () => {
    cy.get('form')
      .contains('value')
      .parent()
      .parent()
      .find('input')
      .type('53');

    cy.get('form')
      .contains('type')
      .parent()
      .parent()
      .find('select')
      .select('Transfer');

    cy.get('form').submit();
    cy.get('#transactions')
      .contains('Transfer')
      .click();
    cy.get('#transactions').contains('53.00');
  });
});
