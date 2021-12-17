describe("Main Page Tests", () => {
    it("Visits the homepage", () => {
        cy.visit("/");
    });
    it("Finds major categories", () => {
        cy.get("h2 > a[href='/news/']").should("be.visible");
        cy.get("h2 > a[href='/events/']").should("be.visible");
    });
});

describe("Sitewide tests", () => {
    it("Visits the homepage", () => {
        cy.visit("/");
    });
    it("Opens gitter sidecar and the iframe is injected", () => {
        cy.get(".gitter-open-chat-button").click();
        cy.get("iframe[src='https://gitter.im/galaxyproject/Lobby/~embed']").should("be.visible");
    });
    it("Tests the NavBar", () => {
        // Check that the dropdown menus work.
        // findByRole doesn't seem to work on invisible elements.
        cy.get("#navbar-menu [href='/events/']").should("not.be.visible");
        cy.findByRole("button", { name: /Community/i }).click();
        cy.get("#navbar-menu")
            .findByRole("menuitem", { name: /Events/i })
            .should("be.visible");
        // Check that navigating works.
        cy.findByRole("button", { name: /Deploy & Develop/i }).click();
        cy.findByRole("menuitem", { name: /Install Galaxy/i }).click();
        cy.location("pathname").should("equal", "/admin/get-galaxy/");
    });
});

describe("Test Markdown rendering", () => {
    it("Tests Markdown rendering", () => {
        cy.visit("/community/");
        // Make sure the title exists and isn't empty.
        cy.get("h1.title").contains(/./);
        // Make sure the body exists and isn't empty.
        cy.get(".content.markdown").contains(/./);
    });
});

describe("Test insert functionality", () => {
    it("Visits 2012 GCC event page and ensures footer insert is visible", () => {
        cy.visit("/events/gcc2012/");
        cy.get(".markdown > p > a").findByText("Ask the organizers").should("be.visible");
    });
});

describe("Use Page Tests", () => {
    it("Visits the Use index, exercises controls", () => {
        cy.visit("/use/");
        // Just to make sure the Cypress waits for Vue to render the page.
        cy.get("#masthead-logo").should("be.visible");
        // Switching tabs.
        cy.findByRole("tab", { name: /Public Servers/i }).click();
        cy.get(".tab-pane.active").within(() => {
            cy.get("#public-server-filter-input").should("be.visible");
            // Searching the table.
            cy.get("#public-server-filter-input").type("Galaxy Test");
            cy.findByText(/Beta version of Galaxy Main/i).should("be.visible");
            // The pageStart/pageEnd/displayed calculation.
            cy.findByText(/Showing 1 to 1 of 1 results/i).should("be.visible");
            cy.get("#public-server-filter-input").clear();
            cy.findByText(/Showing .+ total/i).should("be.visible");
        });
    });

    it("Tries to visit another page after /use/, via the masthead", () => {
        cy.visit("/use/");
        cy.get("#masthead-logo").should("be.visible");
        // This test gives intermittent failures without a wait here
        // (Todo: investigate a more refined wait target -- these explicit sleeps are terrible)
        cy.wait(1000);
        cy.findByRole("button", { name: /Community/i }).click();
        cy.findByRole("menuitem", { name: /Stats/i }).click();
        cy.get(".title")
            .findByText(/Galaxy Project Stats/i)
            .should("be.visible");
    });
});

describe("Bootstrap component tests", () => {
    it("Tests the video popup on /tutorials/chip/", () => {
        cy.visit("/tutorials/chip/");
        // This test gives intermittent failures without a wait here.
        // Probably needs time to load Bootstrap's JS from the CDN (unpkg.com).
        cy.wait(1000);
        cy.get("h4.modal-title").should("not.be.visible");
        cy.get('[data-target="#lib_video"]').first().click();
        cy.get("h4.modal-title").should("be.visible");
    });
    it("Tests collapsing elements on /tutorials/nt-rnaseq/", () => {
        cy.visit("/tutorials/nt-rnaseq/");
        // This test gives intermittent failures without a wait here (just like above).
        cy.wait(1000);
        // First collapsible element
        cy.get("#qc").should("not.be.visible");
        cy.get('[href="#qc"]').click();
        cy.get("#qc").should("be.visible");
        // Second collapsible element
        cy.get("#collapseOne").should("not.be.visible");
        cy.get('[href="#collapseOne"]').click();
        cy.get("#collapseOne").should("be.visible");
    });
});

// Save the tests with long timeouts for the end.

describe("Test 404 page", () => {
    it("Tests 404 page", () => {
        cy.visit("/thisPageShould_never-exist-fd08b54e4/", { failOnStatusCode: false });
        // Just make sure the page rendered.
        cy.get(".markdown");
        // Check that it redirects to the properly slugified url.
        cy.location("pathname", { timeout: 6000 }).should("equal", "/this-page-should-never-exist-fd08b54e4/");
    });
});

describe("Redirect tests", () => {
    it("Tests page redirects from metadata", () => {
        cy.visit("/0examples/non-vue/");
        cy.location("pathname").should("equal", "/0examples/non-vue/");
        cy.location("pathname", { timeout: 6000 }).should("equal", "/");
    });
});
