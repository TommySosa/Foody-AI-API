import { Router} from "express";

import { getRecipes, getRecipeById, createRecipe, deleteRecipe } from "../controllers/recipes.controller.js";

const router = Router();

router.get('/recipes', getRecipes);
router.get('/recipe/:id', getRecipeById);
router.post('/recipe', createRecipe);
router.delete('/recipe/:id', deleteRecipe);

export default router;