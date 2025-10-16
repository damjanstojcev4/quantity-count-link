import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Item } from "../types";

const BACKEND_URL = import.meta.env.VITE_API_URL;

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
    if (!confirm(`Дали сте сигурни дека сакате да ја избришете шифра ${sku}?`)) return;
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
        <p className="text-gray-500 text-lg">Се вчитува артиклот...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        {/* Header with Back button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Уреди Артикал #{sku}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-blue-600 bg-blue-100 px-6 py-2 rounded hover:bg-blue-200 transition"
          >
            ← Назад
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Артикал"
            value={item.article}
            onChange={(e) => setItem({ ...item, article: e.target.value })}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            placeholder="Цена"
            value={item.price}
            onChange={(e) => setItem({ ...item, price: Number(e.target.value) })}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="number"
            placeholder="Количина"
            value={item.quantity}
            onChange={(e) => setItem({ ...item, quantity: Number(e.target.value) })}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Buttons */}
          <div className="flex justify-between gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Зачувај
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Избриши
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
