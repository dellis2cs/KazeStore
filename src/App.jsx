import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Shop from "./components/Shop";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="Shop" element={<Shop />}></Route>
      </Routes>
    </Router>
  );
}
