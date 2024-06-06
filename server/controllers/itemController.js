const itemModel = require('../models/itemModel');

// Add Item
exports.addItem = (req, res) => {
    const { itemName, itemType, unit, description, sellingPrice, createdDate, createdId, updatedId } = req.body;
    const pool = req.app.get('pool');

    itemModel.createItem(pool, itemName, itemType, unit, description, sellingPrice, createdDate, createdId, updatedId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(201).json({ message: 'Item added successfully' });
    });
};

// Edit Item
exports.editItem = (req, res) => {
    const { id } = req.params;
    const { itemName, itemType, unit, description, sellingPrice, updatedId } = req.body;
    const pool = req.app.get('pool');

    itemModel.getItemById(pool, id, (err, item) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        const updatedItem = {
            itemName: itemName || item.itemName,
            itemType: itemType || item.itemType,
            unit: unit || item.unit,
            description: description || item.description,
            sellingPrice: sellingPrice || item.sellingPrice,
            updatedId: updatedId
        };

        itemModel.updateItem(pool, id, updatedItem, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json({ message: 'Item updated successfully' });
        });
    });
};

// Delete Item
exports.deleteItem = (req, res) => {
    const { id } = req.params;
    const pool = req.app.get('pool');

    itemModel.deleteItem(pool, id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    });
};

// Get All Items
exports.getAllItems = (req, res) => {
    const pool = req.app.get('pool');

    itemModel.getAllItems(pool, (err, items) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.status(200).json(items);
    });
};


exports.getItemById = (req, res) => {
    const { id } = req.params;
    const pool = req.app.get('pool');

    itemModel.getItemById(pool, id, (err, item) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.status(200).json({ item });
    });
};
