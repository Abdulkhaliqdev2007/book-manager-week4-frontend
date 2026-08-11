const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">

      <h1 className="text-6xl font-bold text-indigo-600">
        404
      </h1>

      <p className="text-xl text-slate-700 mt-4">
        Page Not Found
      </p>

      <p className="text-slate-500 mt-2">
        The page you are looking for does not exist.
      </p>

    </div>
  );
};

export default NotFound;