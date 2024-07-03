import {Router} from "express";
import { ErrorHandler } from "../error.handler";
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "../controllers/products";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const productRoutes:Router=Router()
productRoutes.post("/create", [authMiddleware, adminMiddleware], ErrorHandler(createProduct))
productRoutes.put("/:id", [authMiddleware, adminMiddleware], ErrorHandler(updateProduct))
productRoutes.delete("/:id", [authMiddleware, adminMiddleware], ErrorHandler(deleteProduct))
productRoutes.get("/:id", [authMiddleware, adminMiddleware], ErrorHandler(getProductById))
productRoutes.get("/", [authMiddleware, adminMiddleware], ErrorHandler(listProducts))
export default productRoutes