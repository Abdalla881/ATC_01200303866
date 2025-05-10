const socialLinks = [
  {
    href: "https://github.com/Abdalla881 ",
    iconPath:
      "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577v-2.23c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.204.084 1.838 1.237 1.838 1.237 1.07 1.835 2.807 1.305 3.492.998.107-.775.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.47-2.382 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.49 11.49 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.838 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.81 1.096.81 2.21v3.285c0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.373-12-12-12z",
    platform: "GitHub",
  },

  {
    href: "https://www.linkedin.com/in/abdalla-osama-430056234 ",
    iconPath:
      "M20.447 20.452H17.21v-5.569c0-1.327-.027-3.037-1.849-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.233V9h3.104v1.561h.045c.433-.82 1.494-1.684 3.076-1.684 3.29 0 3.894 2.165 3.894 4.978v6.597zM5.337 7.433a1.87 1.87 0 1 1 0-3.74 1.87 1.87 0 0 1 0 3.74zm1.616 13.019H3.721V9h3.232v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
    platform: "LinkedIn",
  },
];

import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-neutral-200 text-center text-white dark:bg-neutral-600">
      <div className="container pt-9">
        <div className="mb-9 flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${link.platform}`}
              className="text-neutral-800 hover:text-blue-600 dark:text-neutral-200 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d={link.iconPath} />
              </svg>
            </a>
          ))}
        </div>
      </div>
      <div className="w-full bg-neutral-300 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
        © {new Date().getFullYear()} Copyright:{" "}
        <a className="text-neutral-800 hover:text-blue-500 dark:text-neutral-400 transition-colors duration-300">
          Abdalla Osama
        </a>
      </div>
    </footer>
  );
};

export default Footer;
