const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({message: 'Product created successfully', success: true, result: product});
  } catch (err) {
    res.status(400).json({ error: err.message, success: false, result: null });
  }
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({message: 'Products fetched successfully', success: true, result: products});
  } catch (err) {
    res.status(500).json({ error: err.message, success: false, result: null });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product details
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found', success: false, result: null });
    res.json({message: 'Product fetched successfully', success: true, result: product});
  } catch (err) {
    res.status(500).json({ error: err.message, success: false, result: null });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update product partially
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: OK
 */
router.patch('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Not found', success: false, result: null });
    res.json({message: 'Product updated successfully', success: true, result: product});
  } catch (err) {
    res.status(400).json({ error: err.message, success: false, result: null });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 */
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found', success: false, result: null });
    res.json({message: 'Product deleted successfully', success: true, result: product});
  } catch (err) {
    res.status(500).json({ error: err.message, success: false, result: null });
  }
});

module.exports = router;
