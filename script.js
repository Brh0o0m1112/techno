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

if (searchButton) {

    searchButton.addEventListener("click", function () {

        alert("Search feature coming soon.");

    });

}


const params = new URLSearchParams(window.location.search);

const articleId = params.get("id");


if (articleId && articles[articleId]) {

    const article = articles[articleId];


    document.title = article.title + " - ByteGuide";


    document.getElementById("article-category").textContent =
        article.category;


    document.getElementById("article-title").textContent =
        article.title;


    document.getElementById("article-date").textContent =
        article.date;


    document.getElementById("article-description").textContent =
        article.description;


    document.getElementById("article-content").innerHTML =
        article.content;

}