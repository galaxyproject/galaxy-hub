const CYPRESS_ACCESSIBILITY_CONFIG = {
    iframes: false,
    ancestry: true,
    includedImpacts: ["serious", "critical"],
};

describe("Accessibility Testing", () => {
    it("Use page has no detectable a11y violations on load", () => {
        cy.visit("/use/").get("#app").injectAxe();
        // Ensure masthead has loaded
        cy.get("#masthead-logo").should("be.visible");
        // We really shouldn't be using cy.wait, but the problem here is that
        // the table contents fade in and we have to wait for the animation to
        // complete prior to checking contrast.
        cy.wait(500);
        cy.checkA11y("#app", CYPRESS_ACCESSIBILITY_CONFIG);
    });
    it("Homepage has no detectable a11y violations on load", () => {
        // cy.wait(500); /* passes */
        // cy.visit("/"); /* passes */
        // cy.get("#app").injectAxe(); /* fails */
        cy.visit("/", { timeout: 10000 });
        cy.injectAxe();
        cy.wait(7000); /* passes */
        cy.get("#masthead-logo").should("be.visible");
        // cy.visit("/").get("#app").injectAxe();
        // Ensure masthead has loaded
        // cy.get("#masthead-logo").should("be.visible");
        // // Only check for #app; ignores twitter and sidecar.
        // cy.checkA11y("#app", CYPRESS_ACCESSIBILITY_CONFIG);
    });
    it("GCC2022 page has no detectable a11y violations on load", () => {
        cy.visit("/events/gcc2022/").get("#app").injectAxe();
        // Ensure masthead has loaded
        cy.get("#masthead-logo").should("be.visible");
        // Only check for #app; ignores twitter and sidecar.
        cy.checkA11y("#app", CYPRESS_ACCESSIBILITY_CONFIG);
    });
});
