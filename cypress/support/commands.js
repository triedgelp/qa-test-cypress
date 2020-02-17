

Cypress.Commands.add("generateUser", (eid) => {
    var text = "";
    var values = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++) {
        text += values.charAt(Math.floor(Math.random() * values.length));
    }
    var eid = "user"+ text +"@pylot.com";
    cy.get('#username').type(eid);
}) 