'use client'
import { useEffect, useState } from 'react';
import { fetchNewsByCategory, GNewsArticle } from '../utils/api/newapi';

export default function Category({ category }: { category: string }) {
    const [news, setNews] = useState<GNewsArticle[]>([]);

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

    return (
        <ul className="flex flex-wrap gap-2">
            {news.map((article, index) => (
                <li key={index} className="relative">
                    <h3 className="absolute bottom-0 left-0 right-0 mb-0 text-xl bg-black bg-opacity-50 p-2">
                        {article.title}
                    </h3>
                    <img
                        src={article.image}
                        className="w-96 h-80 object-cover"
                        alt={article.title}
                    />
                </li>
            ))}
        </ul>

    );
}