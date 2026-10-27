"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  title: string;
  content: string;
  publishedAt: string;
  image: string;
  url: string;
  source: {
    name: string;
  };
}

export default function Modal({
  isOpen,
  setOpen,
  title,
  content,
  publishedAt,
  image,
  source,
  url,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, setOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/70"
        onClick={() => setOpen(false)}
        aria-label="Fechar janela da notícia"
      />

      <article className="relative z-10 max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-4 text-gray-900 shadow-2xl sm:p-6 md:p-8">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-3xl leading-none text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          aria-label="Fechar notícia"
        >
          &times;
        </button>

        <h2
          id="news-modal-title"
          className="mb-3 pr-10 text-xl font-bold leading-snug sm:text-2xl md:text-3xl"
        >
          {title}
        </h2>

        <p className="mb-5 text-sm text-gray-500">{publishedAt}</p>

        {image && (
          <img
            src={image}
            alt={title}
            className="mb-5 max-h-[45vh] w-full rounded-lg object-contain"
          />
        )}

        <p className="mb-6 whitespace-pre-line text-sm leading-relaxed sm:text-base">
          {content || "Conteúdo não disponível."}
        </p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Ler notícia completa
        </a>

        <p className="mt-5 text-sm text-gray-600">
          Fonte: <span className="font-semibold">{source.name}</span>
        </p>
      </article>
    </div>
  );
}
