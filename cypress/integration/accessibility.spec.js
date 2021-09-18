describe("Accessibility Testing", () => {
    beforeEach(() => {
        cy.visit("/").get("#app").injectAxe()
    })

    it("Has no detectable a11y violations on load", () => {
        cy.checkA11y("#app");
    });
});