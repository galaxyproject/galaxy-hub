export function interceptPlausible() {
    cy.intercept("https://plausible.galaxyproject.eu/js/script.js", {
        statusCode: 404,
    });
}
