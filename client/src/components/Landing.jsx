import HeaderBar from "./HeaderBar";
import Hero from './Hero';
import '../index.css'
import FeaturedTicket from "./FeaturedTicket";
import Footer from "./Footer";

const Landing = () => {
	return (
		<div>
			<HeaderBar />
			<Hero />
			<FeaturedTicket />
			<Footer />
		</div>
	)
}

export default Landing;
