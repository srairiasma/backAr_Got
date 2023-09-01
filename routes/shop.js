import express from 'express';
import ShopItem from '../model/ShopItems.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to authenticate user
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Save shop items for a user
router.post('/saveShopItems', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const shopItems = req.body.shopItems;
  try {
    const itemsToSave = shopItems.map(item => ({
      userId,
      image: item.Image,
      price: item.Price,
      isPurchased: item.IsPurchased
    }));


    
    await ShopItem.insertMany(itemsToSave);
    res.json({ message: 'Shop items saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save shop items' });
  }
});

export default router;
