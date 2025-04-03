
const category = require('../models/category');
const Category=require('../models/category');

// create a new category
const createCategory=async(req,res)=>{
    try{
        const {name}=req.body;
        if(!name){
            return res.status(400).json({status:false,message:"Category name is required"});         
        }
        const existingCategory=await Category.findOne({name});
        if(existingCategory){
            return res.status(400).json({status:false,message:"category already present"});

        }
        const newCategory=new Category({name});
        await newCategory.save();
        res.status(201).json({status:true,message:'category created successfully'});
    }catch(error){
        return res.status(500).json({status:false,message:"Server error",error:error.message});
    }
};

// get all category

const getCategories=async(req,res)=>{
    try{
       const categories=await Category.find();
       if(categories.length===0)
          return res.status(404).json({status:false,message:"no category found"});
       res.status(200).json({status:true,data:categories});  
    }catch(error){
        return res.status(500).json({status:false,message:"server error",error:error.message});
    }
}


// get a single category by Id

const getCategoryById=async(req,res)=>{
   try{
    let id=req.params.id;
    const result=await Category.findById(id);
    if(!result)
        return res.status(404).json({status:false,message:"category not found in this id"});
    res.status(200).json({status:true,data:result});
   }catch(error){
    return res.status(500).json({status:false,message:"server error",error:error.message});
   }
};

// update category by Id

const updateCategoryById=async(req,res)=>{
    try{
    const {name}=req.body;
    if(!name)
         return res.status(400).json({status:false,message:"category name is required"});
    const result=await category.findByIdAndUpdate(req.params.id,{name},{new:true});
    if(!result)
         return res.status(404).json({status:false,message:"category not found in this id"});
    res.status(200).json({status:true,message:"category updated successfully",data:result});   

    }catch(error){
        return res.status(500).json({status:false,message:"server error",error:error.message});
    }
};

// delete category by Id

const deleteCategoryById=async(req,res)=>{
    try{
       const result=await Category.findByIdAndDelete(req.params.id);
       if(!result)
          return res.status(404).json({status:false,message:"category not found"});
        res.status(200).json({status:true,message:"category deleted successfully"});  
    }catch(error){
        return res.status(500).json({status:false,message:"server error",error:error.message});
    }
};

module.exports={createCategory,getCategories,updateCategoryById,deleteCategoryById,getCategoryById};
