context('Search results page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should find Rick', () => {
    cy.get('[data-cy="search-input"]').type('Rick Sanchez');
    cy.get('[data-cy="search-button"]').click();
    cy.contains('Rick Sanchez');
  });

  it('Should find Morty', () => {
    cy.get('[data-cy="search-input"]').type('Artist Morty');
    cy.get('[data-cy="search-button"]').click();
    cy.contains('Artist Morty');
  });

  it('Should fill search input and set filters', () => {
    cy.get('[data-cy="search-input"]').type('rick alive human male');
    cy.get('[data-cy="search-button"]').click();
    cy.get('[data-cy="search-input"]').should('have.value', 'rick alive human male');
    cy.get('[data-cy="filter"]')
      .contains('Alive');
    cy.get('[data-cy="filter"]')
      .contains('Human');
    cy.get('[data-cy="filter"]')
      .contains('Male');

    cy.log('Clear gender filter');
    cy.get('[data-cy="filter"] svg')
      .eq(2)
      .click();
    cy.get('[data-cy="search-input"]').should('have.value', 'rick alive human');
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/results');
      expect(location.search).to.eq('?name=rick&status=alive&species=human');
    });

    cy.log('Clear search input');
    cy.contains('Summer Smith').should('not.exist');
    cy.get('[data-cy=reset-button]').click();
    cy.get('[data-cy="search-input"]').should('have.value', '');
    cy.contains('Summer Smith').should('exist');
  });
});
