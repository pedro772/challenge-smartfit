/// <reference types="cypress" />

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('verifies radio inputs', () => {
    cy.get('fieldset > :nth-child(2) > :nth-child(1) > div')
      .contains("Manhã")
      .get(':nth-child(2) > :nth-child(1) > :nth-child(2) > .font-gothamBook')
      .contains("06:00 às 12:00");
    
    cy.get('fieldset > :nth-child(2) > :nth-child(2) > div')
      .contains("Tarde")
      .get('fieldset > :nth-child(2) > :nth-child(2) > :nth-child(2) > .font-gothamBook')
      .contains("12:01 às 18:00");

    cy.get('fieldset > :nth-child(2) > :nth-child(3) > div')
      .contains("Noite")
      .get(':nth-child(3) > :nth-child(2) > .font-gothamBook')
      .contains("18:01 às 23:00");
  });

  it('verifies captions', () => {
    cy.get('.bg-gray-100 > :nth-child(1)')
      .should('contain', "Máscara")
      .and('contain', "Obrigatório")
      .and('contain', "Recomendado")
      .and('not.contain', "Parcial")
      .and('not.contain', "Proibido")
      .and('not.contain', "Liberado");

    cy.get('.bg-gray-100 > :nth-child(2)')
      .should('contain', "Toalha")
      .and('contain', "Obrigatório")
      .and('contain', "Recomendado")
      .and('not.contain', "Parcial")
      .and('not.contain', "Proibido")
      .and('not.contain', "Liberado");

    cy.get('.bg-gray-100 > :nth-child(3)')
      .should('contain', "Bebedouro")
      .and('contain', "Parcial")
      .and('contain', "Proibido")
      .and('not.contain', "Obrigatório")
      .and('not.contain', "Recomendado")
      .and('not.contain', "Liberado");

    cy.get('.bg-gray-100 > :nth-child(4)')
      .should('contain', "Vestiários")
      .and('contain', "Liberado")
      .and('contain', "Parcial")
      .and('contain', "Proibido")
      .and('not.contain', "Obrigatório")
      .and('not.contain', "Recomendado");
  });
})