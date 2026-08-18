/**
 * components/BookForm.jsx
 * 
 * Form component for adding and editing books.
 * Handles form validation, submission, and loading states.
 */
import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Save,
  X,
  Loader2,
  Upload,
  Image as ImageIcon,
  Trash2,
} from 'lucide-react';
const BookForm = ({ onSubmit, onCancel, initialData, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    publishedDate: '',
    price: '',
    description: '',
    coverImage: null,
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  // Populate form when editing
  useEffect(() => {
    if (initialData) {

      setFormData({
        title: initialData.title || "",
        author: initialData.author || "",
        category: initialData.category || "",
        publishedDate: initialData.publishedDate
          ? initialData.publishedDate.slice(0, 10)
          : "",
        price: initialData.price || "",
        description: initialData.description || "",
        coverImage: null,
      });

    } else {

      setFormData({
        title: "",
        author: "",
        category: "",
        publishedDate: "",
        price: "",
        description: "",
        coverImage: null,
      });

    }

  }, [initialData]);

  // Handle input changes
  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "coverImage") {
    const file = files?.[0];

    if (!file) return;

    // Allowed file types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    // Maximum size: 5MB
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        coverImage: "Only JPG, PNG, and WebP images are allowed.",
      }));

      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        coverImage: "Image size must be less than 5MB.",
      }));

      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      coverImage: file,
    }));

    setPreview(URL.createObjectURL(file));

    setErrors((prev) => ({
      ...prev,
      coverImage: "",
    }));

    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  if (errors[name]) {
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }
};

  // Validate form
  const validate = () => {

    const newErrors = {};


    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }


    if (!formData.publishedDate) {
      newErrors.publishedDate = "Published date is required";
    }


    if (
      formData.price &&
      (isNaN(formData.price) || Number(formData.price) < 0)
    ) {
      newErrors.price = "Price must be a positive number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Handle submit
  const handleSubmit = (e) => {
   e.preventDefault();
    if (!validate()) return;
    const bookData = new FormData();


    bookData.append(
      "title",
      formData.title.trim()
    );


    bookData.append(
      "author",
      formData.author.trim()
    );


    bookData.append(
      "category",
      formData.category
    );

    bookData.append(
      "publishedDate",
      formData.publishedDate
    );


    bookData.append(
      "price",
      Number(formData.price)
    );

    bookData.append(
      "description",
      formData.description.trim()
    );

    if (formData.coverImage) {
      bookData.append(
        "coverImage",
        formData.coverImage
      );
    }


    onSubmit(bookData);

  };

  const isEditing = !!initialData;
    return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-white" />

          <h2 className="text-xl font-bold text-white">
            {isEditing ? "Edit Book" : "Add New Book"}
          </h2>

        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-5"
      >
        {/* Title */}
        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>


          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.title
                ? "border-red-400"
                : "border-slate-300"
            }`}
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title}
            </p>
          )}

        </div>

        {/* Author */}
        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Author <span className="text-red-500">*</span>
          </label>


          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.author
                ? "border-red-400"
                : "border-slate-300"
            }`}
          />


          {errors.author && (
            <p className="mt-1 text-sm text-red-500">
              {errors.author}
            </p>
          )}

        </div>

        {/* Category Dropdown */}
        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Category <span className="text-red-500">*</span>
          </label>


          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300"
          >

            <option value="">
              Select Category
            </option>

            <option value="Programming">
              Programming
            </option>

            <option value="Fiction">
              Fiction
            </option>

            <option value="Science">
              Science
            </option>

            <option value="History">
              History
            </option>

            <option value="Other">
              Other
            </option>

          </select>


          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category}
            </p>
          )}

        </div>

        {/* Date + Price */}
        <div className="grid grid-cols-2 gap-4">


          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Published Date <span className="text-red-500">*</span>
            </label>


            <input
              type="date"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300"
            />


            {errors.publishedDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.publishedDate}
              </p>
            )}

          </div>

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Price ($)
            </label>


            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300"
            />


            {errors.price && (
              <p className="mt-1 text-sm text-red-500">
                {errors.price}
              </p>
            )}

          </div>


        </div>
{/* Description */}
<div>

  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
    Description
  </label>

  <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    rows="4"
    placeholder="Enter book description (optional)"
    className="w-full px-4 py-2.5 rounded-lg border border-slate-300"
  />

  {errors.description && (
    <p className="mt-1 text-sm text-red-500">
      {errors.description}
    </p>
  )}

</div>
{/* Image Upload */}
<div>
  <label className="block text-sm font-semibold text-slate-700 mb-2">
    Cover Image
  </label>

  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-400 transition">

    <input
      id="coverImage"
      type="file"
      name="coverImage"
      accept="image/jpeg,image/png,image/webp"
      onChange={handleChange}
      className="hidden"
    />

    {!preview ? (
      <label
        htmlFor="coverImage"
        className="cursor-pointer flex flex-col items-center justify-center"
      >
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
          <Upload className="w-6 h-6 text-indigo-600" />
        </div>

        <p className="text-sm font-semibold text-slate-700">
          Click to upload a cover image
        </p>

        <p className="text-xs text-slate-500 mt-1">
          JPG, PNG or WebP • Maximum 5MB
        </p>
      </label>
    ) : (
      <div className="space-y-4">

        <div className="relative mx-auto w-fit">
          <img
            src={preview}
            alt="Cover preview"
            className="w-40 h-56 object-cover rounded-lg shadow-md border border-slate-200"
          />
        </div>

        <div className="flex items-center justify-center gap-3">

          <label
            htmlFor="coverImage"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-semibold hover:bg-indigo-200"
          >
            <Upload className="w-4 h-4" />
            Change Image
          </label>

          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                coverImage: null,
              }));

              setPreview(null);

              const input = document.getElementById("coverImage");

              if (input) {
                input.value = "";
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>

        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-green-600">
          <ImageIcon className="w-4 h-4" />
          Image ready to upload
        </div>

      </div>
    )}

  </div>

  {errors.coverImage && (
    <p className="mt-2 text-sm text-red-500">
      {errors.coverImage}
    </p>
  )}

</div>

 {/* Buttons */}
        <div className="flex gap-3 pt-2">


          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg disabled:opacity-60"
          >

            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isEditing ? "Updating..." : "Adding..."}
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditing ? "Update Book" : "Add Book"}
              </>
            )}

          </button>



          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2.5 px-4 rounded-lg"
          >

            <X className="w-4 h-4" />
            Cancel

          </button>


        </div>


      </form>

    </div>
  );
};


export default BookForm;