"use server";

import { summarizeArticle } from "@/ai/flows/summarize-article";

export async function getArticleSummary(articleContent: string) {
  if (!articleContent) {
    return { summary: null, error: "Nenhum conteúdo fornecido para resumir." };
  }
  
  try {
    const result = await summarizeArticle({ articleContent });
    if (result.summary) {
        return { summary: result.summary, error: null };
    } else {
        return { summary: null, error: "Não foi possível gerar um resumo." };
    }
  } catch (e) {
    console.error("AI Summary Error:", e);
    return { summary: null, error: "Ocorreu uma falha ao tentar gerar o resumo." };
  }
}
