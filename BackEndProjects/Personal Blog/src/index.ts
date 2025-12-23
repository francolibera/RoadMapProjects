import express from 'express';
import { getAllArticles, getArticleBySlug, saveArticle } from './articleService.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    const articles = await getAllArticles();
    res.json(articles);
});

app.get('/article/:slug', async (req, res) => {
    const slug = req.params.slug;
    const article = await getArticleBySlug(slug);

    if (!article) {
        res.status(404).json({ message: 'Article not found' });
    }else {

    res.send(`
        <h1>${article.title}</h1>
        <small>${article.date}</small>
        <p>${article.content}</p>
        <a href="/">Volver</a>
    `);
    }
});

app.listen(PORT, () => console.log(`Blog corriendo en puerto ${PORT}`));