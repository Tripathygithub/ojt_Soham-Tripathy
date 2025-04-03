var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path");
var storage = multer.memoryStorage()
var upload = multer({ storage: storage });




const categoryController=require('../../controller/category');
const subCategoryController=require('../../controller/subCategory');

router.get('/category',categoryController.getCategories);
router.get('/sub-category',subCategoryController.getSubCategories);
module.exports = router;


