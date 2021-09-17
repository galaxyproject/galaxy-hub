describe("Main Page Tests", () => {
    it("Visits the homepage", () => {
        cy.visit("/");
    });
    it("Finds major categories", () =>{
        cy.get("h2 > a[href='/news/']").should("be.visible");
        cy.get("h2 > a[href='/events/']").should("be.visible");
    });
});
