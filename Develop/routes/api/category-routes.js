const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    // find all categories
    // be sure to include its associated Products
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.error("Error in GET /api/categories:", err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.error("Error in GET /api/categories/:id:", err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new category
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (err) {
    console.error("Error in POST /api/categories:", err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a category by its `id` value
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData[0]) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.error("Error in PUT /api/categories/:id:", err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete a category by its `id` value
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.error("Error in DELETE /api/categories/:id:", err);
    res.status(500).json(err);
  }
});

module.exports = router;
