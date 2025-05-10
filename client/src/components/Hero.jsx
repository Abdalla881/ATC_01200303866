import { Link } from "react-router-dom"; // ✅ Use actual React Router Link

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden py-20 sm:py-28 md:py-32 lg:py-40 bg-veryLightGray dark:bg-veryDarkBlue"
      aria-labelledby="hero-heading"
    >
      {/* Background gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 opacity-40 dark:opacity-20"
      >
        <div className="blur-lg h-64 bg-gradient-to-br from-purple-500 to-pink-400 dark:from-blue-700"></div>
        <div className="blur-lg h-64 bg-gradient-to-r from-indigo-500 to-purple-600 dark:to-fuchsia-700"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            id="hero-heading"
            className="text-darkBlue dark:text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight"
          >
            Your Next Event is Just a Click Away
            <span className="text-brightRed dark:text-white block sm:inline">
              Book Tickets Instantly
            </span>
          </h1>

          <p className="mt-6 text-lg text-darkGrayishBlue dark:text-gray-300 max-w-2xl mx-auto">
            Discover and book tickets for the latest concerts, sports, and
            events—all in one trusted platform.
          </p>

          <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 text-base font-medium text-white bg-brightRed rounded-full shadow-md hover:bg-brightRedLight focus:outline-none focus:ring-2 focus:ring-brightRed focus:ring-offset-2 transition-colors duration-200"
            >
              Create an Account
            </Link>

            <Link
              to="/events"
              className="px-8 py-3 text-base font-medium text-darkBlue bg-brightRedSupLight rounded-full shadow-md hover:bg-veryPaleRed focus:outline-none focus:ring-2 focus:ring-darkGrayishBlue focus:ring-offset-2 transition-colors duration-200"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-16 bg-gradient-to-t from-veryLightGray dark:from-veryDarkBlue opacity-90"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
