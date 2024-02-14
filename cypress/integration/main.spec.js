describe("Main Page Tests", () => {
    it("Visits the homepage", () => {
        cy.visit("/");
    });
    it("Finds major categories", () => {
        cy.get("a[href='https://training.galaxyproject.org'] > h3").should("be.visible");
        cy.get("a[href='/events/'] > h3").should("be.visible");
    });
});

describe("Sitewide tests", () => {
    it("Visits the homepage", () => {
        cy.visit("/");
    });
    it("Tests the NavBar - Governance link", () => {
        // Check that the dropdown menus work.
        // findByRole doesn't seem to work on invisible elements.
        cy.get("#global-items [href='/community/governance/']").should("not.be.visible");
        cy.findByRole("button", { name: /Community/i }).click();
        cy.get("#global-items [href='/community/governance/']").should("be.visible");
    });
    it("Tests the NavBar - Home link", () => {
        // Check that navigating works.
        cy.visit("/");
    });
    it("Tests the NavBar - Events link", () => {
        cy.get("#subsite-items")
            .findByText(/Events/i)
            .click();
        cy.location("pathname").should("equal", "/events/");
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
        cy.get(".insert > p > a").findByText("Ask the organizers").should("be.visible");
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
        cy.findByRole("button", { name: /About/i }).click();
        cy.findByRole("menuitem", { name: /Stats/i }).click();
        cy.get(".title")
            .findByText(/Galaxy Project Stats/i)
            .should("be.visible");
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

describe("Page Redirects Test", () => {
    const sourcePage = "/0examples/test-redirect-source/";
    // const targetPage = '/0examples/test-redirect-target/';
    const targetPageTitle = "Test Redirect Target Page";
    const secondsDelay = 7;
    it("replaces", () => {
        cy.on("window:before:load", (win) => {
            win.__location = {
                replace: cy.stub().as("replace"),
            };
        });

        cy.intercept("GET", sourcePage, (req) => {
            req.continue((res) => {
                res.body = res.body.replaceAll("window.location.replace", "window.__location.replace");
            });
        }).as("index");

        cy.visit(sourcePage);

        cy.wait("@index", { timeout: secondsDelay * 1000 });
        cy.wait(secondsDelay * 1000);
        cy.title().should("include", targetPageTitle);
        // cy.get('@replace').should('have.been.calledWith', targetPath);
    });
});
