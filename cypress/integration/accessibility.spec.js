const CYPRESS_ACCESSIBILITY_CONFIG = {
    //includedImpacts: ["serious", "critical"],
    includedImpacts: ["critical"],
};

describe("Accessibility Testing", () => {
    it("Homepage has no detectable a11y violations on load", () => {
        cy.visit("/").get("#app").injectAxe();
        // Ensure masthead has loaded
        cy.get("#masthead-logo").should("be.visible");
        // Only check for #app; ignores twitter and sidecar.
        cy.checkA11y("#app", CYPRESS_ACCESSIBILITY_CONFIG);
    });
    it("Use page has no detectable a11y violations on load", () => {
        cy.visit("/use/").get("#app").injectAxe();
        // Ensure masthead has loaded
        cy.get("#masthead-logo").should("be.visible");
        // Only check for #app; ignores twitter and sidecar.
        cy.checkA11y("#app", CYPRESS_ACCESSIBILITY_CONFIG);
    });
    it("GCC2022 page has no detectable a11y violations on load", () => {
        cy.visit("/events/gcc2022/").get("#app").injectAxe();
        // Ensure masthead has loaded
        cy.get("#masthead-logo").should("be.visible");
        // Only check for #app; ignores twitter and sidecar.
        cy.checkA11y("#app", CYPRESS_ACCESSIBILITY_CONFIG);
    });
});
