
const subCategory=require('../model/subcategory');
const Category=require('../model/category');


// cretae subCategory 

const createSubCategory=async(req,res)=>{
    try{
    const {name,category}=req.body;
    if(!name || !category){
         return res.status(400).json({status:false,messaage:"subactegory name and category id are required"});

    }
    const categoryExists=await Category.findById(category);
    if(!categoryExists)
        return res.status(404).json({status:false,message:"category not found  in this id"});
    const newSubCategory=new subCategory({name,category});
    await newSubCategory.save();
    res.status(201).json({status:true,message:"subcategory created successfully"}); 
}catch(error){
    return res.status(500).json({status:false,message:"server error",error:error.message});
}
};

// get subCategories
const getSubCategories=async(req,res)=>{
    try{
       const subCategories=await subCategory.find().populate('Category');
       if(subCategories.length===0)
          return res.status(404).json({status:false,message:"no subcategory found"});
         res.status(200).json({status:true,data:subCategories});
    }catch(error){
        return res.status(500).json({status:false,message:"server error",error:error.message});
    }
}

// get subcategory by id

const getSubCategoryById=async(req,res)=>{
    try{
        let id=req.params.id;
        const result=await subCategory.findById(id).populate('Category');
        if(!result)
            return res.status(404).json({status:false,message:"subcategory not found in this id"});
        res.status(200).json({status:true,data:result});
    }catch(error){
        return res.status(500).json({status:false,message:"server error",error:error.message});
    }
}

// update subcategory by id

const updateSubCategoryById=async(req,res)=>{
   try{
    const {name,category}=req.body;
    if(!name || !category){
        return res.status(400).json({status:false,message:"subcategory name and category id are required"});
    }
    const categoryExists=await Category.findById(category);
    if(!categoryExists)
        return res.status(404).json({status:false,message:"category not found in this id"});
    const result=await subCategory.findByIdAndUpdate(req.params.id,{name,category},{new:true});
    if(!result)
        return res.status(404).json({status:false,message:"subcategory not found in this id"});
    res.status(200).json({status:true,message:"subcategory updated successfully",data:result});
   }catch(error){
    return res.status(500).json({status:false,message:"server error",error:error.message});
   }
}

// delete subcategory by id
const deleteSubCategoryById=async(req,res)=>{
    try{
        const result=await subCategory.findByIdAndDelete(req.params.id);
        if(!result)
            return res.status(404).json({status:false,message:"subcategory not found in this id"});
        res.status(200).json({status:true,message:"subcategory deleted successfully"});
    }catch(error){
        return res.status(500).json({status:false,message:"server error",error:error.message});
    }
}
module.exports={
    createSubCategory,
    getSubCategories,
    getSubCategoryById,
    updateSubCategoryById,
    deleteSubCategoryById
};
