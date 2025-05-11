import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Ticket from "../components/Ticket";
import HeaderBar from "../components/HeaderBar";
import Footer from "../components/Footer";
import SkeletonLoader from "../components/SkeletonLoader";
import { useFetchTickets } from "../hooks/useFetchTickets";

const TicketsPage = () => {
  const { categoryId } = useParams();
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  const navigate = useNavigate();

  const baseUrl = "https://egy-events.vercel.app/api/v1/events";
  const apiUrl = categoryId ? `${baseUrl}/category/${categoryId}` : baseUrl;

  const {
    tickets,
    loading: ticketsLoading,
    error,
    fetchTickets,
    paginationResult,
  } = useFetchTickets(apiUrl);

  const loading = ticketsLoading || categoriesLoading;

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const response = await axios.get(
          "https://egy-events.vercel.app/api/v1/categories"
        );
        setCategories(response.data.data || []);
        setCategoriesError(null);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategoriesError(err.message);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [categoryId]);

  const loadMoreTickets = () => {
    if (paginationResult?.nextPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchTickets(nextPage);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "all") {
      navigate("/events");
    } else {
      navigate(`/events/category/${categoryId}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderBar />

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Discover Events</h1>
          <p className="mt-2 text-blue-100 max-w-2xl">
            Browse through our collection of amazing events and book your
            tickets today.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8 -mt-6">
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <SkeletonLoader />
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-red-500 flex flex-col items-center">
              {/* Error Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-lg font-medium">{error}</p>
              <button
                onClick={() => fetchTickets(page)}
                className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Retry
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-3">
                Categories
              </h2>
              {categoriesError ? (
                <div className="rounded-lg bg-red-50 p-4 border border-red-100">
                  <p className="text-red-700 font-medium">
                    Failed to load categories
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Retry
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategoryClick("all")}
                    className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                      !categoryId
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    <span className="font-medium">All Events</span>
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => handleCategoryClick(category._id)}
                      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                        categoryId === category._id
                          ? "bg-blue-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      {category.image && (
                        <img
                          src={`http://localhost:5001/uploads/Categories/${category.image}`}
                          alt={category.name}
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                        />
                      )}
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">
                  Looking for something specific?
                </h3>
                <p className="text-sm text-blue-600">
                  Use the categories to filter events or contact our support
                  team for assistance.
                </p>
              </div>
            </aside>

            {/* Ticket List */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {categoryId
                      ? `${
                          categories.find((c) => c._id === categoryId)?.name ||
                          "Category"
                        } Events`
                      : "All Events"}
                  </h2>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {tickets.length} {tickets.length === 1 ? "Event" : "Events"}
                  </span>
                </div>

                {tickets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tickets.map((ticket) => (
                      <div
                        key={ticket._id}
                        className="transform transition-transform duration-300 hover:-translate-y-1"
                      >
                        <Ticket
                          title={ticket.title}
                          desc={ticket.description}
                          price={ticket.price}
                          imageCover={ticket.imageCover}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto text-gray-300 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-500 text-lg">
                      No events available for this category.
                    </p>
                    <button
                      onClick={() => handleCategoryClick("all")}
                      className="mt-4 px-6 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      View all events
                    </button>
                  </div>
                )}
              </div>

              {paginationResult?.nextPage && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={loadMoreTickets}
                    className="flex items-center px-8 py-3 bg-white border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition-colors duration-200 font-medium shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    Load More Events
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TicketsPage;
