import { TProduct } from "./product.interface"
import { productModel } from "./product.model"

const createProductToDB=async(productData:TProduct)=>{
    return await productModel.create(productData)
}

const getAllProductsFromDB=async()=>{
  return await productModel.find({})
}
const findProductByIDFromDB=async(productId:string)=>{
  return await productModel.findOne({_id:productId})
}
const updateProductByIdFromDB=async(productId:string,updatedData:Object)=>{
  return await productModel.findOneAndUpdate({_id:productId},updatedData,{new:true})
}
const deleteProductByIdFromDB=async(productId:string)=>{
  return await productModel.deleteOne({_id:productId})
}
const findProductByKeyword = async (keyword: string) => {
  const query = {
    $or: [
      { name: { $regex: keyword, $options: 'i' } }, 
      { description: { $regex: keyword, $options: 'i' } } 
    ]
  };
  
   return await productModel.find(query);
 
}

export const productService={
  createProductToDB,
  getAllProductsFromDB,
  findProductByIDFromDB,
  updateProductByIdFromDB,
  deleteProductByIdFromDB,
  findProductsByTagFromDB: findProductByKeyword
}