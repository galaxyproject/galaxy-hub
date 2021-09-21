describe("Main Page Tests", () => {
    it("Visits the homepage", () => {
        cy.visit("/");
    });
    it("Finds major categories", () => {
        cy.get("h2 > a[href='/news/']").should("be.visible");
        cy.get("h2 > a[href='/events/']").should("be.visible");
    });
    it("Opens gitter sidecar and the iframe is injected", () => {
        cy.get(".gitter-open-chat-button").click();
        cy.get("iframe[src='https://gitter.im/galaxyproject/Lobby/~embed']").should("be.visible");
    });
});

describe("Test insert functionality", () => {
    it("Visits 2013 GCC event page and ensures side insert with links is visible", () => {
        cy.visit("/events/gcc2013/");
        cy.get(".alert.alert-info  > p > a[href='/events/gcc2013/program/']").should("be.visible");
    });
});

describe("Bootstrap component tests", () => {
    it("Tests the video popup on /tutorials/chip/", () => {
        cy.visit("/tutorials/chip/");
        cy.get("h4.modal-title").should("not.be.visible");
        cy.get('[data-target="#lib_video"]').first().click();
        cy.get("h4.modal-title").should("be.visible");
    });
});
