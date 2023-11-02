import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getRecipes = async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany()
    res.json(recipes)
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getRecipeById = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: parseInt(id) },
    });

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createRecipe = async (req, res) => {
    console.log('AQUI');
    try {
      const { proteins, fats, carbs, result, userId } = req.body;
  
      if (!proteins || !fats || !carbs || !result || !userId) {
        return res.status(400).json({ error: 'Invalid data' });
      }

      const newRecipe = await prisma.recipe.create({
        data: {
          proteins,
          fats,
          carbs,
          result,
          userId
        }
      })
  
      res.json(newRecipe)
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: parseInt(id) },
    });

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    await prisma.recipe.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Recipe successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
