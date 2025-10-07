import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Item } from "../types";

const BACKEND_URL = "/api/link";

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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    try {
      const res = await fetch(`${BACKEND_URL}/${sku}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          article: item.article,
          price: item.price,
          quantity: item.quantity,
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete SKU ${sku}?`)) return;
    try {
      const res = await fetch(`${BACKEND_URL}/${sku}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!item)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Loading item...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Артикал со Шифра: {sku}
        </h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Article"
            value={item.article}
            onChange={(e) =>
              setItem({ ...item, article: e.target.value })
            }
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) =>
              setItem({ ...item, price: Number(e.target.value) })
            }
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) =>
              setItem({ ...item, quantity: Number(e.target.value) })
            }
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-700 transition font-semibold"
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition font-semibold"
            >
              Бриши
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
