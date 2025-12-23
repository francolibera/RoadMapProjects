import express from 'express';
import path from 'path';
import { authMiddleware } from './auth';
import { getAllArticles, getArticleBySlug, saveArticle, deleteArticle } from './articleService.js';
import { Article } from './articleService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/api/articles', async (req, res) => {
    const articles = await getAllArticles();
    res.json(articles);
});

app.get('/admin', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

app.post('/admin/articles', authMiddleware, async (req, res) => {

    const { slug, title, date, content } = req.body;
    if (!slug || !title || !date || !content) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    const article: Article = { slug, title, date, content };
    await saveArticle(article);
    res.status(201).json({ message: 'Article saved successfully.' });
});

app.delete('/api/articles/:slug', authMiddleware, async (req, res) => {
    const success = await deleteArticle(req.params.slug);
    if (success) {
        res.json({ message: 'Borrado' });
    } else {
        res.status(404).json({ error: 'No encontrado' });
    }
});

app.get('/article/:slug', async (req, res) => {
    const slug = req.params.slug;
    const article = await getArticleBySlug(slug);

    if (!article) {
        res.status(404).json({ message: 'Article not found' });
    }else {

    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>${article.title}</title>
            <link rel="stylesheet" href="/style.css"> 
        </head>
        <body>
            <div class="sketch-container">
                <a href="/" class="button-link">← Go back home</a>
                <br><br>
                <h1>${article.title}</h1>
                <small>📅 ${article.date}</small>
                <hr>
                <div style="font-size: 1.1rem; line-height: 1.6;">
                    ${article.content} 
                </div>
            </div>
        </body>
        </html>
    `);
    }
});

app.listen(PORT, () => console.log(`Blog corriendo en puerto ${PORT}`));