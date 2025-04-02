var express = require('express');
var router = express.Router();

var adminsRouter=require('./admin')
var usersRouter=require('./user')


const middleware = require('../../service/middleware').middleware;

const UserController=require('../../controllers/auth/user');
const adminController=require('../../controllers/auth/admin');

router.post('/user/register',UserController.register);
router.post('/user/login',UserController.login);

router.post('/admin/register',adminController.register);
router.post('/admin/login',adminController.login);




router.use(middleware); 

router.use('/admin',adminsRouter)
router.use('/user',usersRouter)
module.exports = router;