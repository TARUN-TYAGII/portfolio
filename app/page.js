"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const toastConfig = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/assets/TARUN.pdf";
    link.download = "TARUN.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill all the fields.",toastConfig);
      return;
    }

    try {
      const sendingToast = toast.loading("Sending message...", toastConfig);

      const response = await axios.post("/api/send-email", {
        name,
        email,
        message,
      });

      toast.dismiss(sendingToast);
      toast.success("Message sent successfully!", toastConfig);

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message. Please try again.", toastConfig);
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      <div className="text-white bg-[#010206]">
        <header className="sticky top-0 z-50 bg-[#010206]">
          <div className="flex items-center justify-between p-5 border-b-2 border-gray-800">
            <div className="flex items-center space-x-5">
              <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-400" onClick={() => scrollToSection("home")}>
                Portfolio
              </h1>
            </div>
            <nav>
              <ul className="flex items-center space-x-5">
                <li className="hover:text-blue-400 cursor-pointer" onClick={() => scrollToSection("home")}>
                  Home
                </li>
                <li className="hover:text-blue-400 cursor-pointer" onClick={() => scrollToSection("about")}>
                  About
                </li>
                <li className="hover:text-blue-400 cursor-pointer" onClick={() => scrollToSection("projects")}>
                  Projects
                </li>
                <li className="hover:text-blue-400 cursor-pointer" onClick={() => scrollToSection("contact")}>
                  Contact
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <div>
          <main>
            {/* Hero Section */}
            <div id="home" className="flex items-center justify-center h-screen">
              <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">👋 Hello, I'm Tarun Tyagi</h1>
                <p className="text-2xl text-gray-300">Full Stack Web Developer | React & Node.js Enthusiast</p>
                <div className="mt-8 space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg" onClick={handleDownloadCV}>
                    Download CV
                  </button>
                  <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg" onClick={() => scrollToSection("contact")}>
                    Contact Me
                  </button>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div id="about" className="flex items-center justify-center h-screen">
              <div className="max-w-2xl text-center">
                <h1 className="text-4xl font-bold mb-8">About Me</h1>
                <p className="text-xl text-gray-300 mb-6 text-left">
                  I'm a passionate web developer with 2 years of experience in creating responsive and user-friendly web applications. Specialized in React, Next.js, and Node.js, I love turning
                  complex problems into simple, beautiful solutions.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div>
                    <h3 className="text-2xl font-semibold">Frontend</h3>
                    <p className="text-gray-400">Html, CSS, Javascript, React, Next.js, React Native, Tailwind CSS</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">Backend</h3>
                    <p className="text-gray-400">Node.js, Express, MongoDB, Java, Springboot, MySql</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div id="projects" className="flex items-center justify-center h-screen">
              <div className="max-w-4xl">
                <h1 className="text-4xl font-bold text-center mb-12">Projects</h1>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4">MoviesHub</h3>
                    <p className="text-gray-400 mb-4 h-[5rem]">An react application to search movies and add them to favourites.</p>
                    <div className="flex space-x-4">
                      {/* <a href="" className="text-blue-400 hover:underline">
                        GitHub
                      </a> */}
                      <a href="https://moviesearch-tarun.netlify.app/" target="_blank" className="text-blue-400 hover:underline">
                        Live Demo
                      </a>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4">Meal App</h3>
                    <p className="text-gray-400 mb-4 h-[5rem]">App to search the meal and get the recipe of the meal.</p>
                    <div className="flex space-x-4">
                      {/* <a href="https://tarun-tyagii.github.io/Meal/index.html" className="text-blue-400 hover:underline">
                        GitHub
                      </a> */}
                      <a href="https://tarun-tyagii.github.io/Meal/index.html" target="_blank" className="text-blue-400 hover:underline">
                        Live Demo
                      </a>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-2xl font-semibold mb-4">Tesla</h3>
                    <p className="text-gray-400 mb-4 h-[5rem]">An web app to view the tesla models.</p>
                    <div className="flex space-x-4">
                      {/* <a href="#" className="text-blue-400 hover:underline">
                        GitHub
                      </a> */}
                      <a href="https://tarun-tesla-clone.netlify.app/" target="_blank" className="text-blue-400 hover:underline">
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div id="contact" className="flex items-center justify-center h-screen">
              <div className="max-w-md w-full">
                <h1 className="text-4xl font-bold text-center mb-12">Contact Me</h1>
                <form className="space-y-6" onSubmit={handleSubmitButton}>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full p-3 bg-gray-800 rounded-lg" />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" className="w-full p-3 bg-gray-800 rounded-lg" />
                  <textarea placeholder="Your Message" rows={4} className="w-full p-3 bg-gray-800 rounded-lg" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>

        <footer className="text-center p-6 border-t border-gray-800">
          <p className="text-gray-400">© 2024 Tarun Tyagi. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://linkedin.com/in/taruntyagii" target="_blank" className="text-gray-400 hover:text-white">
              LinkedIn
            </a>
            <a href="https://github.com/TARUN-TYAGII" target="_blank" className="text-gray-400 hover:text-white">
              GitHub
            </a>
          </div>
        </footer>
      </div>
      <ToastContainer theme="dark" style={{ zIndex: 9999 }} />
    </>
  );
}
