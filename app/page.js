"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "./component/AnimatedSection";
import AnimatedSection from "./component/AnimatedSection";
import { Github, Linkedin, Mail, Phone, Hand } from "lucide-react";

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
      toast.error("Please fill all the fields.", toastConfig);
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
    <div className="min-h-screen bg-[#010206] text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center">
          <AnimatedSection className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            >
              Hello, I am Tarun Tyagi
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-2xl text-gray-300 mb-8">
              Full Stack Web Developer | React & Node.js Enthusiast
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="space-x-4">
              <button onClick={handleDownloadCV} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transform transition hover:scale-105">
                Download CV
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg transform transition hover:scale-105"
              >
                Contact Me
              </button>
            </motion.div>
          </AnimatedSection>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center py-20">
          <AnimatedSection className="max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">About Me</h2>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                I am a passionate web developer with 2 years of experience in creating responsive and user-friendly web applications. Specialized in React, Next.js, and Node.js, I love turning complex
                problems into simple, beautiful solutions.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-400">Frontend</h3>
                  <div className="space-y-2">
                    {["HTML", "CSS", "JavaScript", "React", "Next.js", "React Native", "Tailwind CSS"].map((skill, index) => (
                      <div key={skill} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-400">Backend</h3>
                  <div className="space-y-2">
                    {["Node.js", "Express", "MongoDB", "Java", "Spring Boot", "MySQL"].map((skill, index) => (
                      <div key={skill} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <AnimatedSection className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Professional Experience</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Software Engineer",
                  company: "Adobe",
                  period: "2023 – Present",
                  description: "Omnichannel Customer Experience Platform",
                  responsibilities: [
                    "Involved in design and development of application using front-end technologies like React Js",
                    "Collaborated with platform/integration tracks to identify component usability",
                    "Analyzed business and requirement specifications",
                    "Collaborated with architects and Tech Lead",
                    "Refactored automation scripts",
                    "Actively participated in Agile ceremonies",
                  ],
                },
                {
                  title: "Software Engineer",
                  company: "Agile Cockpit",
                  period: "2022 – 2023",
                  description: "JIRA-like Project Management Tool",
                  responsibilities: [
                    "Reviewed and improved technical documentation",
                    "Worked on CI/CD pipeline",
                    "Developed web applications",
                    "Improved and debugged API functions",
                    "Maintained version control",
                    "Demonstrated strong communication skills",
                  ],
                },
                {
                  title: "Quality Specialist",
                  company: "Amazon",
                  period: "2021 – 2022",
                  description: "Last Mile Delivery Experience",
                  responsibilities: ["Improved last mile delivery experience for customers in Hyderabad, India"],
                },
              ].map((job, index) => (
                <AnimatedSection key={job.company} delay={index * 0.2} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl transform transition hover:scale-[1.02]">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-blue-400">{job.title}</h3>
                      <p className="text-gray-400">
                        {job.company} | {job.description}
                      </p>
                    </div>
                    <span className="text-gray-500">{job.period}</span>
                  </div>
                  <ul className="list-disc list-outside pl-5 space-y-2 text-gray-300">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20">
          <AnimatedSection className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Projects</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "MoviesHub",
                  description: "A React application to search movies and add them to favourites.",
                  demo: "https://moviesearch-tarun.netlify.app/",
                },
                {
                  title: "Meal App",
                  description: "App to search meals and get their recipes.",
                  demo: "https://tarun-tyagii.github.io/Meal/index.html",
                },
                {
                  title: "Tesla Clone",
                  description: "A web app to view Tesla models.",
                  demo: "https://tarun-tesla-clone.netlify.app/",
                },
              ].map((project, index) => (
                <AnimatedSection key={project.title} delay={index * 0.2} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl transform transition hover:scale-[1.05]">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-400">{project.title}</h3>
                  <p className="text-gray-400 mb-6 h-[5rem]">{project.description}</p>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    Live Demo
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center py-20">
          <AnimatedSection className="max-w-xl w-full">
            <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Contact Me</h2>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-center space-x-6 mb-8">
                <a href="tel:+917015674537" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Phone className="w-6 h-6" />
                </a>
                <a href="mailto:your.email@example.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
                <a href="https://github.com/TARUN-TYAGII" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/taruntyagii" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>

              <form className="space-y-4" onSubmit={handleSubmitButton}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full p-4 bg-white/10 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full p-4 bg-white/10 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-4 bg-white/10 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition-all resize-none"
                ></textarea>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transform transition hover:scale-105">
                  Send Message
                </button>
              </form>
            </div>
          </AnimatedSection>
        </section>
      </main>

      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-400">© 2024 Tarun Tyagi. All Rights Reserved.</p>
        </div>
      </footer>

      <ToastContainer theme="dark" style={{ zIndex: 9999 }} />
    </div>
  );
}
