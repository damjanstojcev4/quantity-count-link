import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "http://backend:8080/link";

const AddItem = () => {
  const [article, setArticle] = useState("");
  const [sku, setSku] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(BACKEND_URL + '/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          article,
          sku: Number(sku),
          price: Number(price),
          quantity: Number(quantity),
        }),
      });
      if (!res.ok) throw new Error(`Failed to add item: ${res.status}`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Додади нов Артикал
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Артикал"
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            placeholder="Шифра"
            value={sku}
            onChange={(e) => setSku(Number(e.target.value))}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            placeholder="Цена"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            placeholder="Количина"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-700 transition font-semibold"
          >
            Додај
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
