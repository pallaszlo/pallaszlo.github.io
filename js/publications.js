let allBooks = [];
let allJournalArticles = [];
let allConferencePapers = [];
let showingAll = false;
const MAX_INITIAL_PUBLICATIONS = 5;

document.addEventListener('DOMContentLoaded', loadPublications);

async function loadPublications() {
    try {
        const [booksRes, journalsRes, conferencesRes] = await Promise.all([
            fetch('data/books.json'),
            fetch('data/journal_articles.json'),
            fetch('data/conference_papers.json')
        ]);

        allBooks = await booksRes.json();
        allJournalArticles = await journalsRes.json();
        allConferencePapers = await conferencesRes.json();

        allJournalArticles.sort((a, b) => b.year - a.year);
        allConferencePapers.sort((a, b) => b.year - a.year);

        displayPublications();
    } catch (error) {
        console.error('Error loading publications:', error);
        document.getElementById('publications-list').innerHTML =
            '<p class="error">Error loading publications.</p>';
    }
}

function displayPublications() {
    const container = document.getElementById('publications-list');

    let html = '';

    // Books
    html += `<div class="publications-category">
        <h3><i class="fas fa-book"></i> Books (${allBooks.length})</h3>
        ${allBooks.map(pub => createBookHTML(pub)).join('')}
    </div>`;

    // Journal Articles
    const journalsToShow = showingAll ? allJournalArticles : allJournalArticles.slice(0, MAX_INITIAL_PUBLICATIONS);
    html += `<div class="publications-category">
        <h3><i class="fas fa-file-alt"></i> Journal Articles (${allJournalArticles.length})</h3>
        ${journalsToShow.map(pub => createArticleHTML(pub)).join('')}
    </div>`;

    // Conference Papers
    const conferencesToShow = showingAll ? allConferencePapers : allConferencePapers.slice(0, MAX_INITIAL_PUBLICATIONS);
    html += `<div class="publications-category">
        <h3><i class="fas fa-users"></i> Conference Papers (${allConferencePapers.length})</h3>
        ${conferencesToShow.map(pub => createArticleHTML(pub)).join('')}
    </div>`;

    container.innerHTML = html;

    updateButton();
}

function createBookHTML(pub) {
    return `
        <div class="publication-item">
            <div class="publication-title">${pub.title}</div>
            <div class="publication-authors">${formatAuthors(pub.authors)}</div>
            <div class="publication-venue">
                ${pub.publisher}${pub.isbn ? `, ISBN: ${pub.isbn}` : ''}
            </div>
            <div class="publication-meta">
                <span class="publication-year"><i class="fas fa-calendar-alt"></i> ${pub.year}</span>
                ${pub.doi ? `<a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener" class="doi-link"><i class="fas fa-link"></i> DOI</a>` : ''}
            </div>
        </div>
    `;
}

function createArticleHTML(pub) {
    return `
        <div class="publication-item">
            <div class="publication-title">${pub.title}</div>
            <div class="publication-authors">${formatAuthors(pub.authors)}</div>
            <div class="publication-venue">
                <i class="fas fa-book-open" style="font-size: 0.8rem; margin-right: 4px;"></i>
                ${pub.venue}${pub.volume ? `, ${pub.volume}` : ''}${pub.pages ? `, pp. ${pub.pages}` : ''}
            </div>
            <div class="publication-meta">
                <span class="publication-year"><i class="fas fa-calendar-alt"></i> ${pub.year}</span>
                ${pub.doi ? `<a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener" class="doi-link"><i class="fas fa-link"></i> DOI</a>` : ''}
            </div>
        </div>
    `;
}

function formatAuthors(authors) {
    return authors
        .replace(/Pál, L\./g, '<strong>Pál, L.</strong>')
        .replace(/László Pál/g, '<strong>László Pál</strong>')
        .replace(/L\. Pál/g, '<strong>L. Pál</strong>');
}

function toggleAllPublications() {
    showingAll = !showingAll;
    displayPublications();

    if (showingAll) {
        document.getElementById('publications').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function updateButton() {
    const button = document.querySelector('.view-all .button');
    if (button) {
        const totalHidden = (allJournalArticles.length - MAX_INITIAL_PUBLICATIONS) +
                           (allConferencePapers.length - MAX_INITIAL_PUBLICATIONS);
        if (!showingAll && totalHidden > 0) {
            button.innerHTML = `<i class="fas fa-list"></i> Show ${totalHidden} More Publications`;
        } else {
            button.innerHTML = `<i class="fas fa-list"></i> Show Less`;
        }
    }
}
