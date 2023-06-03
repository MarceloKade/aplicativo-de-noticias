'use client'
import { useEffect, useState } from 'react';
import { fetchNewsByCategory, GNewsArticle } from '../utils/api/newapi';
import Modal from '../components/Modal';

export default function Category({ category }: { category: string }) {
    const [news, setNews] = useState<GNewsArticle[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<GNewsArticle | null>(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetchNewsByCategory(category);
                const cleanedNews = removeBracketsFromNews(response);
                setNews(cleanedNews);
            } catch (error) {
                console.error(error);
            }
        }

        fetchNews();
    }, [category]);

    function removeBracketsFromNews(news: GNewsArticle[]): GNewsArticle[] {
        return news.map(article => {
            const cleanedContent = article.content.replace(/\[.*?\]/g, '');
            return { ...article, content: cleanedContent };
        });
    }

    function handleDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('pt-BR', options);
    }

    return (
        <div>
            <ul className="flex justify-center flex-wrap gap-2">
                {news.map((article, index) => (
                    <li key={index} className="relative">
                        <h3 className="absolute bottom-0 left-0 right-0 mb-0 text-xl bg-black bg-opacity-50 p-2 z-10">
                            {article.title}
                        </h3>
                        <div
                            onClick={() => {
                                setSelectedArticle(article);
                                setOpen(true);
                            }}
                            className="w-96 h-80 cursor-pointer overflow-hidden rounded-xl"
                        >
                            <img
                                src={article.image}
                                className="w-full h-full object-cover transform transition-transform hover:scale-110"
                                style={{ transitionDuration: '1s' }}
                                alt={article.title}
                            />
                        </div>

                    </li>
                ))}
            </ul>
            {selectedArticle && (
                <Modal
                    isOpen={open}
                    setOpen={setOpen}
                    title={selectedArticle.title}
                    publishedAt={handleDate(new Date(selectedArticle.publishedAt))}
                    image={selectedArticle.image}
                    content={selectedArticle.content}
                    url={selectedArticle.url}
                    source={{ name: selectedArticle.source.name }}
                />
            )}
        </div>
    );
}