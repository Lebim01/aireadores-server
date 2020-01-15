const express = require("express");
const models = require("../models");

/**
 * Basic CRUD
 * 
 * @param model Nombre del modelo sequelize (singular)
 * @param modelName Nombre del modelo descriptivo eg. Node, Pool, Timer
 * 
 */

exports.getBasicRoutes = function(model, modelName){
    const router = express.Router();

    router.route(`/`).get((req, res) => {
        models[model].findAll().then(result => {
            if (result) res.json({ success: true, result });
            else res.status(400).json({ success: false, error: `${modelName} not found.` });
        })
    });

    /**
     * La función recibe el :id por parametro URL
     * returns
     *  success: true|false
     *  [contenido de la variable model]: resultado de la consulta (object)
     */
    router.route(`/:id`).get((req, res) => {
        const id = req.params.id
        models[model].find({ where: { id } }).then(result => {
            if (result) res.json({ success: true, result });
            else res.status(400).json({ success: false, error: `${modelName} not found.` });
        })
    });
    
    /**
     * La función recibe el :id por parametro URL
     * returns
     *  success: true|false
     *  [contenido de la variable model]: resultado de la consulta (object)
     */
    router.route(`/`).post((req, res) => {
        let { name } = req.body;
        models[model]
            .create({ name })
            .then(result => res.json({ success: true, result }))
            .catch(err => res.status(400).json({ success: false, errors: { globals: err }}));
    });
    
    router.route(`/:id`).put((req, res) => {
        let { name, id } = req.body;
        models[model]
            .update({ name }, { where: { id }})
            .then(() => res.json({ success: true }))
            .catch(err => res.status(400).json({ success: false, errors: { globals: err }}));
    });
    
    router.route(`/:id`).delete((req, res) => {
        const id = req.params.id;
        models[model]
            .destroy({ where: { id } })
            .then(() => res.json({ success: true }))
            .catch(err => res.status(400).json({ success: false, errors: { globals: err } }));
    });

    return router
}