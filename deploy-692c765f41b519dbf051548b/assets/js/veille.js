// assets/js/veille.js
class VeilleTechnologique {
    constructor() {
        this.feeds = {
            cybersecurity: [
                'https://www.cert.ssi.gouv.fr/feed/',
                'https://thehackernews.com/feeds/posts/default'
            ],
            sysadmin: [
                'https://techcommunity.microsoft.com/plugins/custom/microsoft/o365/custom-blog-rss?board=WindowsServerBlog',
                'https://www.redhat.com/en/blog/feed'
            ],
            forensics: [
                'https://www.sans.org/blog/rss/',
                'https://www.forensicfocus.com/feed/'
            ]
        };
        this.init();
    }

    async init() {
        // Afficher le loading immédiatement
        this.showLoading();
        
        // Charger les flux
        await this.loadFeeds();
        this.setupAutoRefresh();
    }

    showLoading() {
        // Le loading est déjà dans le HTML
        console.log('Chargement des flux RSS...');
    }

    async loadFeeds() {
        const loadPromises = [];
        
        for (const [category, urls] of Object.entries(this.feeds)) {
            loadPromises.push(
                this.loadCategoryFeeds(category, urls)
            );
        }
        
        await Promise.allSettled(loadPromises);
    }

    async loadCategoryFeeds(category, feedUrls) {
        try {
            const articles = await this.fetchRSS(feedUrls);
            this.displayArticles(category, articles);
        } catch (error) {
            console.error(`Erreur chargement ${category}:`, error);
            this.showError(category, error);
        }
    }

    async fetchRSS(feedUrls) {
        const articles = [];
        const proxyUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
        
        for (const url of feedUrls) {
            try {
                const response = await fetch(`${proxyUrl}${encodeURIComponent(url)}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.status === 'ok' && data.items) {
                    // Ajouter les 2 derniers articles de chaque flux
                    articles.push(...data.items.slice(0, 2));
                }
            } catch (error) {
                console.warn(`Impossible de charger: ${url}`, error);
                // Continuer avec les autres flux
            }
        }
        
        // Trier par date et limiter à 4 articles max
        return articles
            .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
            .slice(0, 4);
    }

    displayArticles(category, articles) {
        const container = document.querySelector(`[data-veille="${category}"]`);
        if (!container) return;

        if (articles.length === 0) {
            container.innerHTML = `
                <div class="loading-veille">
                    <i class="icon solid fa-exclamation-triangle"></i>
                    <span>Aucune actualité disponible pour le moment</span>
                </div>
            `;
            return;
        }

        container.innerHTML = articles.map(article => `
            <div class="actualite-item">
                <div class="actu-date">${this.formatDate(article.pubDate)}</div>
                <div class="actu-content">
                    <h5>${this.escapeHtml(article.title)}</h5>
                    <p>${this.truncateText(this.cleanDescription(article.description), 120)}</p>
                    <a href="${article.link}" class="actu-link" target="_blank" rel="noopener">Lire l'article</a>
                </div>
            </div>
        `).join('');
    }

    cleanDescription(description) {
        // Nettoyer le HTML de la description
        return description.replace(/<[^>]*>/g, '').trim();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    truncateText(text, maxLength) {
        if (!text) return 'Aucune description disponible';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }

    showError(category, error) {
        const container = document.querySelector(`[data-veille="${category}"]`);
        if (container) {
            container.innerHTML = `
                <div class="loading-veille">
                    <i class="icon solid fa-exclamation-triangle"></i>
                    <span>Erreur de chargement. Actualisation dans 1h.</span>
                </div>
            `;
        }
    }

    setupAutoRefresh() {
        // Actualiser toutes les heures en cas d'erreur, sinon toutes les 6h
        setInterval(() => this.loadFeeds(), 60 * 60 * 1000);
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new VeilleTechnologique();
});