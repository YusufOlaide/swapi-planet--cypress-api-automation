/// <reference types="cypress" />
import myData from "../fixtures/data.json";
describe('MOCK DATA',()=>{
    it('mock response', ()=>{
        cy.intercept('GET', myData.url,{
            headers: {
                 'content-type': 'text/html'
            } ,
            statusCode: 200,
            body: {
                "name": "Yusuf Olaide",
                "rotation_period": "24"
            }
        })
        cy.visit(myData.url)
    })
})