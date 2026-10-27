import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;

export interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  category: string;
  source: {
    name: string;
  };
}

export async function fetchNewsByCategory(
  category: string,
): Promise<GNewsArticle[]> {
  try {
    const categoryMap: Record<string, string> = {
      general: "top",
      nation: "politics",
    };

    const apiCategory = categoryMap[category] ?? category;

    const response = await axios.get("https://newsdata.io/api/1/latest", {
      params: {
        apikey: apiKey,
        country: "br",
        language: "pt",
        category: apiCategory,
      },
    });

    const articles = (response.data.results ?? []).map((article: any) => ({
      source: {
        name: article.source_name || "Fonte desconhecida",
      },
      title: article.title || "",
      description: article.description || "",
      url: article.link || "",
      image: article.image_url || "",
      publishedAt: article.pubDate || "",
      content: article.content || article.description || "",
      category,
    }));

    return articles;
  } catch (error: any) {
    console.error(
      "Erro ao buscar notícias:",
      error.response?.data ?? error.message,
    );
    return [];
  }
}
