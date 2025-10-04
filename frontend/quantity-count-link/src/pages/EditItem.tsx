import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Item } from "../types";

const BACKEND_URL = "http://localhost:8080/api/items";

const EditItem = () => {
  const { sku } = useParams<{ sku: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/${sku}`);
        if (!res.ok) throw new Error("Item not found");
        const data: Item = await res.json();
        setItem(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItem();
  }, [sku]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    try {
      const res = await fetch(`${BACKEND_URL}/${sku}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article: item.article, price: item.price, quantity: item.quantity }),
      });
      if (!res.ok) throw new Error("Failed to update");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!item) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-xl mb-4">Edit Item {sku}</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" placeholder="Article" value={item.article} onChange={e => setItem({...item, article: e.target.value})} className="w-full border px-2 py-1 rounded" required/>
        <input type="number" placeholder="Price" value={item.price} onChange={e => setItem({...item, price: Number(e.target.value)})} className="w-full border px-2 py-1 rounded" required/>
        <input type="number" placeholder="Quantity" value={item.quantity} onChange={e => setItem({...item, quantity: Number(e.target.value)})} className="w-full border px-2 py-1 rounded" required/>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Update Item</button>
      </form>
    </div>
  );
};

export default EditItem;
