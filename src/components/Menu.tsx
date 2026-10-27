"use client";

import { useEffect, useState } from "react";
import Category from "./Category";

export default function Menu() {
  const categories = [
    { name: "Geral", originalName: "General" },
    { name: "Mundo", originalName: "World" },
    { name: "Nação", originalName: "Nation" },
    { name: "Negócios", originalName: "Business" },
    { name: "Tecnologia", originalName: "Technology" },
    { name: "Entretenimento", originalName: "Entertainment" },
    { name: "Esportes", originalName: "Sports" },
    { name: "Ciência", originalName: "Science" },
    { name: "Saúde", originalName: "Health" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("general");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCategoryClick = (originalName: string) => {
    setSelectedCategory(originalName.toLowerCase());
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen w-full">
      <header className="relative mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-category-menu"
          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          KadeNews
        </h1>

        <nav
          aria-label="Categorias de notícias"
          className="absolute left-0 right-0 top-full hidden px-4 md:block"
        >
          <ul className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const isSelected =
                selectedCategory === category.originalName.toLowerCase();

              return (
                <li key={category.originalName}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category.originalName)}
                    aria-current={isSelected ? "page" : undefined}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-white text-blue-900"
                        : "bg-gray-700 text-gray-100 hover:bg-gray-600"
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-category-menu"
        aria-label="Menu de categorias"
        aria-hidden={!menuOpen}
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(80vw,320px)] flex-col border-r border-white/10 bg-gray-900 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <span className="text-xl font-bold">KadeNews</span>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
            tabIndex={menuOpen ? 0 : -1}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-3xl text-gray-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            &times;
          </button>
        </div>

        <nav
          aria-label="Categorias de notícias"
          className="flex-1 overflow-y-auto p-4"
        >
          <ul className="space-y-2">
            {categories.map((category) => {
              const isSelected =
                selectedCategory === category.originalName.toLowerCase();

              return (
                <li key={category.originalName}>
                  <button
                    type="button"
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() => handleCategoryClick(category.originalName)}
                    aria-current={isSelected ? "page" : undefined}
                    className={`w-full rounded-lg px-4 py-3 text-left text-base font-medium transition-colors ${
                      isSelected
                        ? "bg-white text-blue-900"
                        : "text-gray-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <main className="min-h-[60vh] w-full bg-blue-950/20 py-6 sm:py-8 md:mt-16 md:py-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <Category category={selectedCategory} />
        </div>
      </main>
    </div>
  );
}
