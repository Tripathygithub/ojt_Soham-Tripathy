var express = require('express');
var router = express.Router();
const multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage });


///////////////////////////////////////  epin ///////////////////////////////////////////////////
const categoryController=require('../../controller/category');
const subCategoryController=require('../../controller/subCategory');


//category routes
router.post('/category',categoryController.createCategory);

router.get('/category',categoryController.getCategories);

router.get('/category/:id',categoryController.getCategoryById);

router.put('category/:id',categoryController.updateCategoryById);

router.delete('/category/:id',categoryController.deleteCategoryById);

// subCategory routes

router.post('/sub-category',subCategoryController.createSubCategory);

router.get('/sub-category',subCategoryController.getSubCategories);

router.get('/sub-category/:id',subCategoryController.getSubCategoryById);

router.put('/sub-category/:id',subCategoryController.updateSubCategoryById);

router.delete('/sub-category/:id',subCategoryController.deleteSubCategoryById);




module.exports = router;
