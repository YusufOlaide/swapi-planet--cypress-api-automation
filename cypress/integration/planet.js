/// <reference types="cypress" />
import Ajv from "ajv"
const ajv = new Ajv() 
import schemaData from "../fixtures/planetSchema.json";
import myData from "../fixtures/data.json";

describe('GET PLANET INSTANCE',()=>{
    it('Verify Response Data',()=>{
        cy.request('GET', Cypress.env('url')).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property("name", "Yavin IV")
            expect(response.body).to.have.property("url", myData.url)
        })
    })

    it('Verify Response Headers', ()=>{
        cy.request('GET', Cypress.env('url')).then((response)=>{
            expect(response.headers, 'response headers').to.include({
                allow: "GET, HEAD, OPTIONS",
                'content-type': "application/json",
              })
        })
        
    })

    it('Verify Response Time', ()=>{
        cy.request('GET', Cypress.env('url')).then((response)=>{
            expect(response.duration).to.not.be.greaterThan(3)
        })
        
    })

    it('Verify JSON Schema',()=>{
        cy.request('GET', Cypress.env('url')).then((response)=>{
            const validate = ajv.compile(schemaData)
            const valid = validate(response.body)
            if (!valid) cy.log(validate.errors).then(()=>{
            })
        })
    })

    it('Negative Test', ()=>{
        cy.request({
            method: 'POST',
            url: Cypress.env('url'),
            failOnStatusCode: false,
            "name": "Automated testing",
            "Completed": true,
        }).then((response)=>{
                 expect(response.body).to.have.property("detail", myData.negativeMsg)
                 expect(response.status).to.eq(405)
        })
    })
})