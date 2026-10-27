"use client";

import { useEffect, useState } from "react";
import { fetchNewsByCategory, GNewsArticle } from "../utils/api/newapi";
import Modal from "../components/Modal";

export default function Category({ category }: { category: string }) {
  const [news, setNews] = useState<GNewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<GNewsArticle | null>(
    null,
  );

  useEffect(() => {
    let active = true;

    async function loadNews() {
      try {
        const response = await fetchNewsByCategory(category);

        const cleanedNews = response.map((article) => ({
          ...article,
          content: (article.content ?? "").replace(/\[.*?\]/g, ""),
        }));

        if (active) {
          setNews(cleanedNews);
        }
      } catch (error) {
        console.error("Erro ao carregar notícias:", error);

        if (active) {
          setNews([]);
        }
      }
    }

    loadNews();

    return () => {
      active = false;
    };
  }, [category]);

  function handleDate(date: string): string {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Data indisponível";
    }

    return parsedDate.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  return (
    <>
      {news.length === 0 ? (
        <p className="py-10 text-center text-gray-200">
          Nenhuma notícia disponível nesta categoria.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {news.map((article, index) => (
            <li key={`${article.url}-${index}`} className="min-w-0">
              <button
                type="button"
                onClick={() => setSelectedArticle(article)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-800 text-left shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label={`Ler notícia: ${article.title}`}
              >
                {article.image ? (
                  <img
                    src={article.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-300">
                    Imagem indisponível
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <h2 className="absolute inset-x-0 bottom-0 line-clamp-3 p-3 text-base font-semibold leading-snug text-white sm:p-4 sm:text-lg">
                  {article.title}
                </h2>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedArticle && (
        <Modal
          isOpen={true}
          setOpen={(isOpen) => {
            if (!isOpen) {
              setSelectedArticle(null);
            }
          }}
          title={selectedArticle.title}
          publishedAt={handleDate(selectedArticle.publishedAt)}
          image={selectedArticle.image}
          content={selectedArticle.content ?? ""}
          url={selectedArticle.url}
          source={{ name: selectedArticle.source.name }}
        />
      )}
    </>
  );
}
