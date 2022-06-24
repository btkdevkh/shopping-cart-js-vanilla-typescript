import CardList from "./components/CardList.js";
import Cart from "./components/Cart.js";
import { products } from './data/products.js';
new CardList(products);
const cart = new Cart(products);
cart.addToCartHandler(1);
cart.changeQtyHandler();
