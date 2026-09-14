// =========================
// Newsletter
// =========================

const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        alert("Thank you for subscribing!");

    });

}


// =========================
// Search Button
// =========================

const searchButton = document.querySelector(".search-button");
const searchBox = document.querySelector(".search-box");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");


if (searchButton && searchBox) {

    searchButton.addEventListener("click", function () {

        searchBox.classList.toggle("active");

        if (searchBox.classList.contains("active")) {
            searchInput.focus();
        }

    });

}


if (searchInput && searchResults) {

    searchInput.addEventListener("input", function () {

        const searchTerm =
            searchInput.value.toLowerCase().trim();


        if (!searchTerm) {

            searchResults.innerHTML = "";

            return;

        }


        const results = Object.entries(articles)
            .filter(([id, article]) => {

                return (
                    article.title.toLowerCase().includes(searchTerm) ||
                    article.description.toLowerCase().includes(searchTerm) ||
                    article.category.toLowerCase().includes(searchTerm)
                );

            })
            .slice(0, 6);


        if (results.length === 0) {

            searchResults.innerHTML =
                "<p>No articles found.</p>";

            return;

        }


        searchResults.innerHTML = "";


        results.forEach(([id, article]) => {

            const result = document.createElement("a");

            result.href = "article.html?id=" + id;

            result.className = "search-result";


            result.innerHTML = `

                <strong>
                    ${article.title}
                </strong>

                <span>
                    ${article.category}
                </span>

            `;


            searchResults.appendChild(result);

        });

    });

}


// =========================
// Article System
// =========================

const params = new URLSearchParams(window.location.search);

const articleId = params.get("id");


if (articleId && articles[articleId]) {

    const article = articles[articleId];


    // Change browser page title

    document.title = article.title + " - ByteGuide";


    // Change meta description

    const metaDescription =
        document.getElementById("meta-description");

    if (metaDescription) {

        metaDescription.setAttribute(
            "content",
            article.description
        );

    }


    // Article category

    document.getElementById("article-category").textContent =
        article.category;


    // Article title

    document.getElementById("article-title").textContent =
        article.title;


    // Article date

    document.getElementById("article-date").textContent =
        article.date;


    // Article Meta

    const articleMeta =
        document.getElementById("article-meta");

    if (articleMeta) {

        const author =
            article.author || "ByteGuide";

        const readingTime =
            article.readingTime || "5 min read";

        articleMeta.textContent =
            "By " + author + " · " + readingTime;

    }

    // Article description

    document.getElementById("article-description").textContent =
        article.description;


    // Article content

    document.getElementById("article-content").innerHTML =
        article.content;


    // =========================
    // Canonical URL
    // =========================

    const canonicalUrl =
        document.getElementById("canonical-url");

    if (canonicalUrl) {

        canonicalUrl.setAttribute(
            "href",
            window.location.href
        );

    }


    // =========================
    // Article Schema
    // =========================

    const articleSchema =
        document.getElementById("article-schema");

    if (articleSchema) {

        const schemaData = {

            "@context": "https://schema.org",

            "@type": "Article",

            "headline": article.title,

            "description": article.description,

            "datePublished": article.date,

            "author": {
                "@type": "Organization",
                "name": "ByteGuide"
            },

            "publisher": {
                "@type": "Organization",
                "name": "ByteGuide"
            },

            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": window.location.href
            }

        };

        articleSchema.textContent =
            JSON.stringify(schemaData);

    }
    
    
    // =========================
    // Related Articles
    // =========================

    const relatedGrid =
        document.getElementById("related-articles-grid");

    if (relatedGrid) {

        const relatedArticles = Object.entries(articles)
            .filter(([id, item]) =>
                id !== articleId &&
                item.category === article.category
            )
            .slice(0, 3);


        relatedArticles.forEach(([id, item]) => {

            const articleCard = document.createElement("article");

            articleCard.className = "article-card";


            articleCard.innerHTML = `

                <span class="article-card-category">
                    ${item.category}
                </span>

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.description}
                </p>

                <a href="article.html?id=${id}">
                    Read Article →
                </a>

            `;


            relatedGrid.appendChild(articleCard);

        });

    }

}