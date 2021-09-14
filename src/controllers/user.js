// user authentication i.e. login, register logout work will be done here
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../services/validate-request');
const authorize = require('../services/authorize')
const userService = require('../services/user');

login = (req, res) => {
    res.render("login")
}

logout = (req, res) => {
    req.session.destroy();
    res.redirect("/login")
}


register = (req, res) => {
    res.render("register")
}


authenticateSchema = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        hash: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

authenticate = (req, res, next) => {
    userService.authenticate(req.body)
        .then((user) =>{
        req.session.username = user.username;
        req.session.id = user.id;
        req.session.save((err)=>{
            if(err){
                res.flash("info","some error occurred");
                res.redirect('/');
            }else{
                res.redirect('/');
            }
        })
        })     
        .catch(next);
}

registerSchema = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        hash: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

registeruser = (req, res, next) => {
    userService.create(req.body)
    .then((user) =>{
        req.session.username = req.body.username;
        req.session.id = req.body.id;
        req.session.save((err)=>{
            if(err){
                res.flash("info","some error occurred");
                res.redirect('/');
            }else{
                res.redirect('/');
            }
        })
        }) 
        .catch(next);
}

// function getAll(req, res, next) {
//     userService.getAll()
//         .then(users => res.json(users))
//         .catch(next);
// }

// function getCurrent(req, res, next) {
//     res.json(req.user);
// }

// function getById(req, res, next) {
//     userService.getById(req.params.id)
//         .then(user => res.json(user))
//         .catch(next);
// }

// function updateSchema(req, res, next) {
//     const schema = Joi.object({
//         firstName: Joi.string().empty(''),
//         lastName: Joi.string().empty(''),
//         username: Joi.string().empty(''),
//         password: Joi.string().min(6).empty('')
//     });
//     validateRequest(req, next, schema);
// }

// function update(req, res, next) {
//     userService.update(req.params.id, req.body)
//         .then(user => res.json(user))
//         .catch(next);
// }

// function _delete(req, res, next) {
//     userService.delete(req.params.id)
//         .then(() => res.json({ message: 'User deleted successfully' }))
//         .catch(next);
// }

module.exports = {login: login,logout:logout,register: register,authenticate: authenticate,
    authenticateSchema:authenticateSchema,registerSchema:registerSchema,registeruser:registeruser}