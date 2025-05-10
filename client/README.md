# Egy-Events Client

A modern, responsive web application for event booking and management built with React and Tailwind CSS.

![Egy-Events](https://img.shields.io/badge/Egy--Events-Platform-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

- **Modern UI/UX**: Beautiful and responsive design with smooth animations
- **Authentication**: Secure user authentication and authorization
- **Event Management**: Browse, book, and manage events
- **Ticket System**: Digital ticket management and verification
- **Cart System**: Shopping cart functionality for event bookings
- **Dark Mode**: Built-in dark mode support
- **Responsive Design**: Optimized for all device sizes

## 📦 Project Structure

```
client/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── assets/         # Images and other assets
│   └── App.jsx         # Main application component
└── package.json        # Project dependencies
```

## 🛠️ Technologies Used

- **React 18**: Frontend library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Lucide Icons**: Beautiful and consistent icons
- **Axios**: HTTP client for API requests
- **React Context**: State management
- **Vite**: Next-generation frontend tooling

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abdalla881/Nodejs-Events-Booking-System.git
   cd egy-events/client
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the client directory:
   ```env
   VITE_API_URL=your_api_url_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:5173`

## 🎨 UI Components

### HeaderBar
- Responsive navigation
- User authentication status
- Cart integration
- Dark mode support
- Mobile-friendly menu

### Event Cards
- Event information display
- Booking functionality
- Image optimization
- Responsive design

### Cart System
- Real-time updates
- Ticket quantity management
- Price calculations
- Checkout process

## 🔧 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## 🎯 Features in Detail

### Authentication
- User registration and login
- JWT token management
- Protected routes
- Session persistence

### Event Management
- Browse events
- Search and filter
- Event details
- Booking system

### Ticket System
- Digital ticket generation
- QR code verification
- Ticket history
- Download functionality

### Cart Features
- Add/remove tickets
- Quantity adjustment
- Price calculation
- Checkout process

## 🎨 Styling

The project uses Tailwind CSS for styling with a custom configuration:

- Custom color palette
- Responsive design
- Dark mode support
- Custom animations
- Consistent spacing

## 🔒 Security

- JWT authentication
- Protected routes
- Secure API calls
- Input validation
- XSS protection

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint optimization
- Touch-friendly interfaces
- Adaptive layouts

## 🌙 Dark Mode

- System preference detection
- Manual toggle
- Consistent theming
- Smooth transitions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Abdalla Osama - Initial work - https://github.com/Abdalla881

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Vite](https://vitejs.dev/)
