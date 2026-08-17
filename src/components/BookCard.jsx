/**
 * components/BookCard.jsx
 * 
 * Individual book card component displaying book details.
 * Includes edit and delete actions.
 */

import React from 'react';
import { BookOpen, Pencil, Trash2, Calendar, DollarSign, Tag } from 'lucide-react';

const BookCard = ({ book, onEdit, onDelete, loading }) => {

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-white/10 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">
                {book.title}
              </h3>
              <p className="text-slate-400 text-sm mt-0.5">by {book.author}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Cover Image */}
{book.coverImage && (
  <div className="w-full h-48 overflow-hidden">
    <img
      src={`http://localhost:5000/${book.coverImage.replace(/\\/g, "/")}`}
      alt={book.title}
      className="w-full h-full object-cover"
    />
  </div>
)}

      {/* Card Body */}
      <div className="p-5 space-y-3">
        {/* Category */}
<div className="flex items-center gap-2 text-slate-600">
  <Tag className="w-4 h-4 text-indigo-500" />
  <span className="text-sm font-medium">
    {book.category || 'Uncategorized'}
  </span>
</div>
       {/* Price */}
<div className="flex items-center gap-2 text-slate-600">
  <DollarSign className="w-4 h-4 text-emerald-500" />
  <span className="text-sm font-medium">
    {book.price ? `$${Number(book.price).toFixed(2)}` : 'Free'}
  </span>
</div>

        {/* Published Year */}
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="w-4 h-4 text-amber-500" />
         <span className="text-sm font-medium">
  {
    book.publishedDate
      ? new Date(book.publishedDate).getFullYear()
      : 'Unknown Year'
  }
</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={() => onEdit(book)}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium py-2 px-3 rounded-lg transition-colors text-sm disabled:opacity-50"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={() => onDelete(book._id)}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 px-3 rounded-lg transition-colors text-sm disabled:opacity-50"
          >
           <Trash2 className="w-3.5 h-3.5" />

{loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
