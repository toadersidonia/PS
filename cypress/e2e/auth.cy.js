describe('Authentication Tests - InstaLite', () => {
  
  beforeEach(() => {
    // 1. Folosim ruta corecta /auth pe care am vazut-o in screenshot
    cy.visit('http://localhost:5173/auth'); 
  });

  it('should display the login form correctly', () => {
    // Verificam titlul sa fim siguri ca suntem unde trebuie
    cy.contains('InstaLite').should('be.visible');
    
    // Cautam input-urile dupa placeholder, e cea mai sigura metoda acum
    cy.get('input[placeholder="Enter your username"]').should('be.visible');
    cy.get('input[placeholder="At least 6 characters"]').should('be.visible');
    
    // Verificam butonul de Sign In
    cy.get('button').contains('Sign In').should('be.visible');
  });

  it('should allow typing username and password', () => {
    // Testam daca putem scrie in ele
    cy.get('input[placeholder="Enter your username"]').type('raresnou');
    cy.get('input[placeholder="At least 6 characters"]').type('parola123');
    
    // Apasam butonul mare roz de Sign In
    cy.get('button').contains('Sign In').click();
  });
});