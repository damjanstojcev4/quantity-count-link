import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Item {
  id: number;
  article: string;
  sku: number;
  price: number;
  quantity: number;
}

const BACKEND_URL = "/api/link";

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(BACKEND_URL + '/')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch items");
        return res.json();
      })
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  const handleIncrement = async (sku: number) => {
    try {
      const res = await fetch(`${BACKEND_URL}/${sku}/increment`, { method: "PATCH" });
      const updated: Item = await res.json();
      setItems(prev => prev.map(i => (i.sku === sku ? updated : i)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecrement = async (sku: number) => {
    try {
      const res = await fetch(`${BACKEND_URL}/${sku}/decrement`, { method: "PATCH" });
      const updated: Item = await res.json();
      setItems(prev => prev.map(i => (i.sku === sku ? updated : i)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (sku: number) => navigate(`/edit/${sku}`);
  const handleAdd = () => navigate("/add");

  const handleDownload = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/export`, { method: "GET" });
      if (!response.ok) throw new Error("Failed to download Excel file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "zaliha.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const filteredItems = items.filter(i => i.sku.toString().includes(search));

  return (
    <div className="min-h-screen w-full p-4 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
        <h1 className="text-3xl font-bold">Линкести</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Побарај Шифра..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
          >
            Додај Артикал
          </button>
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Експорт Excel
          </button>
        </div>
      </div>

      {/* Table container for horizontal scroll on mobile */}
      <div className="overflow-x-auto w-full flex-1">
        <table className="w-full border-collapse shadow-lg rounded overflow-hidden min-w-[600px]">
          <thead className="bg-gray-300 text-left">
            <tr>
              <th className="p-3">Артикал</th>
              <th className="p-3">Шифра</th>
              <th className="p-3">Цена</th>
              <th className="p-3">Количина</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No items found
                </td>
              </tr>
            ) : (
              filteredItems.map((item, idx) => (
                <tr
                  key={item.sku}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-blue-100 transition-colors group`}
                >
                  <td className="p-3">{item.article}</td>
                  <td className="p-3">{item.sku}</td>
                  <td className="p-3">{item.price}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleIncrement(item.sku)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleDecrement(item.sku)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleEdit(item.sku)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemList;
