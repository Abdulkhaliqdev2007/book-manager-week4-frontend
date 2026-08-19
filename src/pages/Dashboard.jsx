import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import {
  BookOpen,
  DollarSign,
  BarChart3,
  TrendingUp
} from 'lucide-react';

import { fetchDashboardStats } from '../services/dashboardService';

const COLORS = [
  '#4f46e5',
  '#7c3aed',
  '#0891b2',
  '#059669',
  '#f59e0b'
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetchDashboardStats();

        setStats(response.data);
      } catch (err) {
        setError(
          err.message || 'Failed to load dashboard data.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-65px)] bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-600 font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-65px)] bg-slate-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const categoryData =
    stats?.booksByCategory?.map((item) => ({
      category: item._id,
      count: item.count
    })) || [];

  const averagePriceData =
    stats?.averagePriceByCategory?.map((item) => ({
      category: item._id,
      averagePrice: Number(item.averagePrice.toFixed(2))
    })) || [];

  const booksOverTime =
    stats?.booksOverTime?.map((item) => ({
      month: `${item._id.month}/${item._id.year}`,
      count: item.count
    })) || [];

  return (
    <main className="min-h-[calc(100vh-65px)] bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8">

          <div className="flex items-center justify-between gap-4 mb-2">

            <div className="flex items-center gap-2">
              <BarChart3 className="w-7 h-7 text-indigo-600" />

              <h1 className="text-3xl font-bold text-slate-900">
                Dashboard
              </h1>
            </div>

            <Link
              to="/"
              className="flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-semibold py-2 px-4 rounded-lg transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Book Manager</span>
            </Link>

          </div>

          <p className="text-slate-500">
            Overview of your book collection and statistics.
          </p>

        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Total Books */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Books
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {stats.totalBooks}
                </p>
              </div>

              <div className="bg-indigo-100 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>

            </div>
          </div>

          {/* Total Value */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Total Value
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-1">
                  ${Number(stats.totalValue).toFixed(2)}
                </p>
              </div>

              <div className="bg-emerald-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>

            </div>
          </div>

          {/* Categories */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Categories
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {categoryData.length}
                </p>
              </div>

              <div className="bg-purple-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>

            </div>
          </div>

          {/* Average Price */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  Avg. Price
                </p>

                <p className="text-3xl font-bold text-slate-900 mt-1">
                  $
                  {averagePriceData.length
                    ? (
                        averagePriceData.reduce(
                          (sum, item) =>
                            sum + item.averagePrice,
                          0
                        ) / averagePriceData.length
                      ).toFixed(2)
                    : '0.00'}
                </p>
              </div>

              <div className="bg-amber-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>

            </div>
          </div>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Bar Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              Books by Category
            </h2>

            <p className="text-sm text-slate-500 mb-5">
              Number of books in each category.
            </p>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="category" />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Bar
                    dataKey="count"
                    name="Books"
                    fill="#4f46e5"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* Pie Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              Category Distribution
            </h2>

            <p className="text-sm text-slate-500 mb-5">
              Share of your books by category.
            </p>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                  <Pie
                    data={categoryData}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={105}
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* Line Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              Books Added Over Time
            </h2>

            <p className="text-sm text-slate-500 mb-5">
              Number of books added each month.
            </p>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={booksOverTime}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Books Added"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />

                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* Average Price Bar Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              Average Price by Category
            </h2>

            <p className="text-sm text-slate-500 mb-5">
              Average book price for each category.
            </p>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={averagePriceData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="category" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="averagePrice"
                    name="Average Price"
                    fill="#7c3aed"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
};

export default Dashboard;