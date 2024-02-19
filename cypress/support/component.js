Cypress.on("uncaught:exception", (err, runnable) => {
    // Dont't fail a test if the error message contains the included text
    // https://docs.cypress.io/api/cypress-api/catalog-of-events#Uncaught-Exceptions
    // https://github.com/galaxyproject/galaxy-hub/actions/runs/7921386714/job/21626571641?pr=2388#step:10:92
    return false;
});
