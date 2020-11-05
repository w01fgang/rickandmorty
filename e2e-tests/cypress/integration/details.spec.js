context('Character details page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("Should Rick's page", () => {
    cy.get('[data-cy="search-input"]').type('Rick Sanchez');
    cy.get('[data-cy="search-button"]').click();
    cy.contains('Rick Sanchez')
      .parent()
      .parent()
      .contains('View')
      .click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/view/1');
    });

    cy.get('[data-cy="breadcrumbs"]')
      .contains('Rick Sanchez');

    cy.get('[data-cy="paper"]')
      .find('h2')
      .contains('Rick Sanchez');
    cy.screenshot('profile-view-page');
  });
});
