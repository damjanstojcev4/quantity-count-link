import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemList from "./pages/ItemList";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit/:sku" element={<EditItem />} />
      </Routes>
    </Router>
  )
}

export default App
