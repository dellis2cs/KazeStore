import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";
export default function App() {

  
  
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="Shop" element={<Shop />}></Route>
          <Route path="cart" element={<Cart />}></Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}
