import { Library, Plus } from "lucide-react";

const EmptyState = ({ onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="bg-indigo-100 p-4 rounded-full">
        <Library className="w-10 h-10 text-indigo-600" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-slate-800">
        Your library is empty
      </h2>

      <p className="mt-2 text-sm text-slate-500 max-w-md">
        You haven't added any books yet. Start building your personal
        library by adding your first book.
      </p>

      <button
        onClick={onAddClick}
        className="mt-6 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        <Plus className="w-4 h-4" />
        Add Your First Book
      </button>
    </div>
  );
};

export default EmptyState;