describe('Authentication', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('http://localhost:5173/auth')
  })

  it('shows the login form', () => {
    cy.contains('InstaLite').should('be.visible')
    cy.contains('Welcome back!').should('be.visible')
    cy.get('input[id="username"]').should('be.visible')
    cy.get('input[id="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('shows error when fields are empty', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Username is required').should('be.visible')
  })

  it('shows error with invalid credentials', () => {
    cy.get('input[id="username"]').type('invaliduser')
    cy.get('input[id="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid username or password', { timeout: 10000 }).should('be.visible')
  })

  it('logs in successfully with valid credentials', () => {
    cy.get('input[id="username"]').type('raresnou')
    cy.get('input[id="password"]').type('parola123')
    cy.get('button[type="submit"]').click()
    cy.url({ timeout: 10000 }).should('not.include', '/auth')
  })

  it('can switch to register mode', () => {
    cy.contains('button', 'Sign Up').click()
    cy.contains('Create your account').should('be.visible')
    cy.get('input[id="email"]').should('be.visible')
    cy.get('input[id="confirmPassword"]').should('be.visible')
  })
})