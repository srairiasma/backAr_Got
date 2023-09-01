import mongoose from "mongoose" 

const ShopItemsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: String,
  price: Number,
  isPurchased: Boolean
});

export default mongoose.model("ShopItems",ShopItemsSchema)
