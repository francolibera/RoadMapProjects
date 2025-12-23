import { promises as fs } from 'fs';
import * as path from 'path';

export interface Article {
    slug: string;
    title: string;
    date: string;
    content: string;
}

const ARTICLES_DIR = path.join(__dirname, '../articles');

export async function getAllArticles(): Promise<Article[]> {
  try {
    const fileNames = await fs.readdir(ARTICLES_DIR);

    const articles = await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = path.join(ARTICLES_DIR, fileName);
        const fileContents = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContents) as Article;
      }));
      
    return articles;
  } catch (error) {
    console.error('Error reading articles:', error);
    return [];
  } 
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents) as Article;
  } catch (error) {
    console.error(`Error reading article with slug ${slug}:`, error);
    return null;
  }}

export async function saveArticle(article: Article): Promise<void> {
  try {
    const filePath = path.join(ARTICLES_DIR, `${article.slug}.json`);
    const fileContents = JSON.stringify(article, null, 2);
    await fs.writeFile(filePath, fileContents, 'utf-8');
  } catch (error) {
    console.error(`Error saving article with slug ${article.slug}:`, error);
  }}

export async function deleteArticle(slug: string): Promise<boolean> {
  try {
    const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    console.error(`Error deleting article with slug ${slug}:`, error);
    return false;
  } 
}