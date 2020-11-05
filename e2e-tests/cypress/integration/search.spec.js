context('Search page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should have a search input', () => {
    cy.get('[data-cy="search-input"]');
  });

  it('Should NOT have a reset button', () => {
    cy.contains('[data-cy="reset-button"]').should('not.exist');
  });

  it('Should have a reset button', () => {
    cy.get('[data-cy="search-input"]').type('rick humanoid');
    cy.get('[data-cy="reset-button"]').should('exist');
  });

  it('Should write a text to the input', () => {
    cy.get('[data-cy="search-input"]').type('rick alive');
    cy.get('[data-cy="search-input"]').should('have.value', 'rick alive');
  });

  it('Should have a search button', () => {
    cy.get('[data-cy="search-button"]');
  });

  it('Should do a search', () => {
    cy.get('[data-cy="search-input"]').type('rick alive');
    cy.get('[data-cy="search-button"]').click();
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/results');
      expect(location.search).to.eq('?name=rick&status=alive');
    });
  });
});
