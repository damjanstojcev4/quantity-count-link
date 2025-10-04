import type { Item } from "../types";

interface Props {
  item: Item;
  onIncrement: (sku: number) => void;
  onDecrement: (sku: number) => void;
  onEdit: (sku: number) => void;
}

const ItemRow = ({ item, onIncrement, onDecrement, onEdit }: Props) => {
  return (
    <tr className="hover:bg-gray-100 group transition-colors">
      <td className="p-2">{item.article}</td>
      <td className="p-2">{item.sku}</td>
      <td className="p-2">{item.price}</td>
      <td className="p-2">{item.quantity}</td>
      <td className="p-2 space-x-2">
        <button
          onClick={() => onIncrement(item.sku)}
          className="hidden group-hover:inline bg-green-500 text-white px-2 py-1 rounded"
        >
          +
        </button>
        <button
          onClick={() => onDecrement(item.sku)}
          className="hidden group-hover:inline bg-red-500 text-white px-2 py-1 rounded"
        >
          -
        </button>
        <button
          onClick={() => onEdit(item.sku)}
          className="hidden group-hover:inline bg-blue-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ItemRow;
