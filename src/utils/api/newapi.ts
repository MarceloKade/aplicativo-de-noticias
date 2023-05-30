import axios from 'axios';

const apiKey = 'd5a9aa2b17b9198c702053ebfc889d35';

export interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string; 
}

export async function fetchNewsByCategory(category: string): Promise<GNewsArticle[]> {
  try {
    const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
      params: {
        country: 'br',
        category: category,
        token: apiKey,
      },
    });

    const articles = response.data.articles.map((article: any) => ({
      author: article.source.name,
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.image,
      publishedAt: article.publishedAt,
      content: article.content,
      category: category,
    }));

    return articles;
  } catch (error) {
    console.error(error);
    return [];
  }
}