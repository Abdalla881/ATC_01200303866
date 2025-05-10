import { Link } from "react-router-dom";
import Ticket from "./Ticket";
import { useState, useEffect } from "react";

const url = "https://egy-events.vercel.app/api/v1/events"; // Add "http://" to the URL
const FeaturedTicket = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTickets(data.data);
      console.log("Fetched Tickets:", data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const firstThree = tickets.slice(0, 3);

  return (
    <section className="bg-white pt-20 lg:pt-[120px] pb-12 lg:pb-[90px] relative z-20 overflow-hidden">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
              <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
                Featured Tickets
              </h2>
              <p className="text-base text-body-color">
                Upcoming Events and Concerts
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {firstThree.map((ticket) => (
            <Ticket
              key={ticket._id}
              title={ticket.title}
              desc={ticket.description}
              price={ticket.price}
              imageCover={ticket.imageCover} // Pass the imageCover here
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/events"
            className="inline-block text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
          >
            View More Tickets
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTicket;
