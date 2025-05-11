import { Link } from "react-router-dom";
import Ticket from "./Ticket";
import { useState, useEffect } from "react";

const FeaturedTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://egy-events.vercel.app/api/v1/events");
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      const data = await res.json();
      setTickets(data.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError("Failed to load tickets. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const firstThree = tickets.slice(0, 3);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 pt-20 lg:pt-[120px] pb-12 lg:pb-[90px] relative z-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
              <span className="text-blue-600 font-semibold text-lg mb-2 block">
                Discover
              </span>
              <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-gray-900 mb-4">
                Featured Events
              </h2>
              <p className="text-base text-gray-600">
                Explore our handpicked selection of upcoming events and concerts
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center text-red-600">
            {error}
            <button
              onClick={fetchTickets}
              className="ml-3 text-blue-600 font-medium hover:text-blue-800"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {firstThree.map((ticket) => (
                <div
                  key={ticket._id}
                  className="transform transition-transform duration-300 hover:-translate-y-2"
                >
                  <Ticket
                    title={ticket.title}
                    desc={ticket.description}
                    price={ticket.price}
                    imageCover={ticket.imageCover}
                    availableSeats={ticket.availableSeats}
                    totalSeat={ticket.totalSeat}
                  />
                </div>
              ))}
            </div>

            {tickets.length > 3 && (
              <div className="mt-12 text-center">
                <Link
                  to="/events"
                  className="inline-block bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  View All Events
                </Link>
              </div>
            )}

            {tickets.length === 0 && !isLoading && !error && (
              <div className="text-center py-10">
                <p className="text-gray-600">
                  No events available at the moment.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-10 -left-4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
      <div className="absolute -bottom-10 -right-4 w-72 h-72 bg-purple-50 rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
    </section>
  );
};

export default FeaturedTicket;
