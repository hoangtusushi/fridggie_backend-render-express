const Product = require('../models/Product');

const createProduct = async (req, res) => {
    const { barcode, name, production_date, expiration_date, quantity, used_quantity, category_id } = req.body;
    const user_id = req.user.id;

    try {
        const product = new Product({
            barcode,
            name,
            production_date: new Date(production_date),
            expiration_date: new Date(expiration_date),
            user_id,
            quantity,
            used_quantity,
            category_id,
        });

        if (req.file) {
            product.image = req.file.path;
        }

        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category_id user_id');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category_id user_id');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { barcode, name, production_date, expiration_date, quantity, used_quantity, category_id } = req.body;

    try {
        const updatedFields = {
            barcode,
            name,
            quantity,
            used_quantity,
            category_id,
        };

        if (production_date) {
            updatedFields.production_date = new Date(production_date);
        }

        if (expiration_date) {
            updatedFields.expiration_date = new Date(expiration_date);
        }

        if (req.file) {
            updatedFields.image = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
