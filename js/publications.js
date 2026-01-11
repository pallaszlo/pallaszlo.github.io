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
        <div class="pub-compact-v2">
            <div class="pub-header">
                <span class="pub-icon">📕</span>
                <span class="pub-title">${pub.title}</span>
            </div>
            <div class="pub-footer">
                <span class="pub-authors">${formatAuthors(pub.authors)}</span>
                <span class="pub-divider">·</span>
                <span class="pub-venue">${pub.publisher}</span>
                <span class="pub-divider">·</span>
                <span class="pub-year">${pub.year}</span>
                ${pub.doi ? `<span class="pub-divider">·</span><a href="https://doi.org/${pub.doi}" class="pub-action" target="_blank" rel="noopener">DOI ↗</a>` : ''}
            </div>
        </div>
    `;
}

function createArticleHTML(pub) {
    const icon = pub.venue && pub.venue.includes('Conference') ? '📄' : '📰';
    const links = [];
    if (pub.doi) {
        links.push(`<a href="https://doi.org/${pub.doi}" class="pub-action" target="_blank" rel="noopener">DOI ↗</a>`);
    }
    links.push(`<a href="https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}" class="pub-action" target="_blank" rel="noopener">Scholar ↗</a>`);

    return `
        <div class="pub-compact-v2">
            <div class="pub-header">
                <span class="pub-icon">${icon}</span>
                <span class="pub-title">${pub.title}</span>
            </div>
            <div class="pub-footer">
                <span class="pub-authors">${formatAuthors(pub.authors)}</span>
                <span class="pub-divider">·</span>
                <span class="pub-venue">${pub.venue}${pub.volume ? `, ${pub.volume}` : ''}</span>
                <span class="pub-divider">·</span>
                <span class="pub-year">${pub.year}</span>
                <span class="pub-divider">·</span>
                ${links.join('<span class="pub-divider">·</span>')}
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
