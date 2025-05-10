import React from 'react';

const UnderProcessingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl text-red-500 font-bold">
          Hello from Areeb Technology! 😅
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          I’ve finished the backend part, but the frontend? 🤔
          I'm a bit stuck on that! 😬
        </p>
        <p className="text-lg text-gray-600 mt-4">
          The backend is all set, but when it comes to the frontend, I’m having some trouble.
          The deadline is tight, and I'm struggling to make it work 😓. If anyone can help with the frontend, I’d really appreciate it! 🙏
        </p>
        <p className="text-lg text-gray-600 mt-4">
          If you have any questions or would like more details, feel free to reach out to me at{' '}
          <a href="mailto:abdallaforjob@gmail.com" className="text-blue-500">
            abdallaforjob@gmail.com 📧
          </a>!
        </p>
      </div>
    </div>
  );
};

export default UnderProcessingPage;
