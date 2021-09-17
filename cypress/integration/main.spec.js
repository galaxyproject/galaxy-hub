describe("Main Page Tests", () => {
    it("Visits the homepage", () => {
        cy.visit("/");
    });
    it("Finds major categories", () =>{
        cy.get("h2 > a[href='/news/']").should("be.visible");
        cy.get("h2 > a[href='/events/']").should("be.visible");
    });
    it("Opens gitter sidecar and the iframe is injected", () => {
        cy.get(".gitter-open-chat-button").click();
        cy.get("iframe[src='https://gitter.im/galaxyproject/Lobby/~embed']").should("be.visible");
    });
});