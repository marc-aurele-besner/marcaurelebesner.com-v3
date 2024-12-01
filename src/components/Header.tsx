"use client";

import React, { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-darkBlue p-4 px-2 flex justify-between items-center md:hidden">
      <h1 className="text-2xl font-bold text-lightCyan mb-8">
        Marc-Aurele Besner
      </h1>
      <button
        className="text-2xl font-bold text-lightCyan mb-8"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-darkBlue">
          <ul className="flex flex-col items-center">
            <li className="p-2">
              <a href="#about" className="text-grayTone hover:text-lightCyan">
                About
              </a>
            </li>
            <li className="p-2">
              <a
                href="#experience"
                className="text-grayTone hover:text-lightCyan"
              >
                Experience
              </a>
            </li>
            <li className="p-2"><a href="#projects" className="text-grayTone hover:text-lightCyan">Projects</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
