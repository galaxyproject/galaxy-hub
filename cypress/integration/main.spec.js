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

describe("Use Page Tests", () => {
    it("Visits the Use index, exercises controls", () => {
        cy.visit("/use/");
        cy.get("#masthead-logo").should("be.visible");
        cy.findByRole("tablist").within(() => {
            cy.findByText(/Public Servers/i).should("be.visible");
            cy.findByText(/Public Servers/i).click();
        });
        cy.get(".tab-pane.active").within(() => {
            cy.get("#public-server-filter-input").should("be.visible");
            cy.get("#public-server-filter-input").type("Galaxy Test");
            cy.findByText(/Beta version of Galaxy Main/i).should("be.visible");
            cy.findByText(/Showing 1 to 1 of 1 results/i).should("be.visible");
            cy.get("#public-server-filter-input").clear();
            cy.findByText(/Showing .+ total/i).should("be.visible");
        });
    });

    it("Tries to visit another page after /use/, via the masthead", () => {
        // Of course this works, it's the develop server...
        // TODO: test against the simple production server after a build?
        cy.visit("/use/");
        cy.get("#masthead-logo").should("be.visible");
        cy.findByRole("button", { name: /Community/i }).click();
        cy.findByRole("menuitem", { name: /Stats/i }).click();
        cy.findByText(/Galaxy Project Stats/i).should("be.visible");
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
