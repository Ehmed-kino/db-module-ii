'use strict';

const db = require('sqlite');

module.exports = {
    get(req, res) {
      let organisations;

        db.all(`SELECT * FROM organisation`)
        .then((orgs) => {
          organisations = orgs;
          return Promise.all(orgs.map((org) => {
            return db.all(`SELECT Service.Id,Service.Name FROM service JOIN organisationService
                    ON service.Id = organisationService.serviceId
                    WHERE organisationService.organisationId = ${org.Id}`)
          }))
        })
        .then((services) => {
          for(let i=0; i< organisations.length; i++) {
             organisations[i].Services = services[i];
          }

        })
        .then(() => {
          return Promise.all(organisations.map((org) => {
            return db.all(`SELECT Organisation.Name, user.Name, user.Email FROM
                           User JOIN Role JOIN ContactUserOrganisation JOIN Organisation
                           ON User.Id = ContactUserOrganisation.UserId
                           AND Organisation.Id = ContactUserOrganisation.OrganisationId
                           WHERE Organisation.Id = ${org.Id} AND Role.Id = 2`)
          }))
        }).then((contacts) => {
          for(let i=0; i< organisations.length; i++) {
             organisations[i].Contacts = contacts[i];
          }

        }).then(() => {
          res.json(organisations)
        })
    },

    add(req, res) {
        
    },

    update(req, res) {
        res.status(404).json({ error: 'Not found' });
    },

    remove(req, res) {
        res.status(404).json({ error: 'Not found' });
    }
};
