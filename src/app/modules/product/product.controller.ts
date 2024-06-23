import { Request, Response } from "express";
import { productService } from "./product.service";
import productValidationSchema from "./product.validation";

const getAllProducts = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm;
  let result: unknown;
  let message: string;
  try {
    if (searchTerm) {
      result = await productService.findProductsByTagFromDB(
        req.query.searchTerm as string
      );
      message = `Products matching search term ${searchTerm} fetched successfully!`;
    } else {
      result = await productService.getAllProductsFromDB();
      message = "Products fetched successfully!";
    }
    res.json({
      success: true,
      message,
      data: result,
    });
  } catch (err) {
    res.send("something went wrong!");
  }
};
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParseData = productValidationSchema.parse(productData);
    const result = await productService.createProductToDB(zodParseData);
    res.json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err) {
    sendErrorResponse(res, err);
  }
};
const findProductById = async (req: Request, res: Response) => {
  try {
    const result = await productService.findProductByIDFromDB(
      req.params.productId
    );
    if (!result) {
      res.status(404).json({
        success: true,
        message: "No Product Found!",
        data: result,
      });
    } else {
      res.json({
        success: true,
        message: "Product fetched successfully!",
        data: result,
      });
    }
  } catch (err) {
    sendErrorResponse(res, err);
  }
};
const updateProductById = async (req: Request, res: Response) => {
  try {
    const result = await productService.updateProductByIdFromDB(
      req.params.productId,
      req.body
    );
    if (!result) {
      res.status(404).json({
        success: true,
        message: "No Product Found to Update!",
        data: result,
      });
    } else {
      res.json({
        success: true,
        message: "Product updated successfully!",
        data: result,
      });
    }
  } catch (err) {
    sendErrorResponse(res, err);
  }
};
const deleteProductById = async (req: Request, res: Response) => {
  try {
    const result = await productService.deleteProductByIdFromDB(
      req.params.productId
    );
    if (!result.deletedCount) {
      res.status(404).json({
        success: true,
        message: "No Product Found to Delete!",
        data: result,
      });
    } else {
      res.json({
        success: true,
        message: "Product deleted successfully!",
        data: result,
      });
    }
  } catch (err) {
    sendErrorResponse(res, err);
  }
};

const sendErrorResponse = (res: Response, err: unknown) => {
  res.status(500).json({
    success: false,
    message: "something went wrong!",
    error: err,
  });
};

const noRouteFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export const productController = {
  getAllProducts,
  createProduct,
  findProductById,
  updateProductById,
  deleteProductById,
  noRouteFound,
};
