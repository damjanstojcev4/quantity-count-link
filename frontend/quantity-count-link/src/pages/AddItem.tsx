import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://localhost:8080/api/items";

const AddItem = () => {
  const [article, setArticle] = useState("");
  const [sku, setSku] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article, sku: Number(sku), price: Number(price), quantity: Number(quantity) }),
      });
      if (!res.ok) throw new Error(`Failed to add item: ${res.status}`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-xl mb-4">Add New Item</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" placeholder="Article" value={article} onChange={e => setArticle(e.target.value)} className="w-full border px-2 py-1 rounded" required/>
        <input type="number" placeholder="SKU" value={sku} onChange={e => setSku(Number(e.target.value))} className="w-full border px-2 py-1 rounded" required/>
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full border px-2 py-1 rounded" required/>
        <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full border px-2 py-1 rounded" required/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
