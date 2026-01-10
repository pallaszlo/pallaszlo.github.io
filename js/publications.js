// Publications management
let allPublications = [];
let showingAll = false;
const MAX_INITIAL_PUBLICATIONS = 5;

// Load publications on page load
document.addEventListener('DOMContentLoaded', loadPublications);

async function loadPublications() {
    try {
        const response = await fetch('data/publications.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Loaded data:', data);

        // Convert category-based structure to flat array with type info
        const books = (data.books || []).map(pub => ({ ...pub, type: 'book', pubType: 'Books' }));
        const journals = (data.journal_articles || []).map(pub => ({ ...pub, type: 'journal', pubType: 'Journal Articles' }));
        const conferences = (data.conference_papers || []).map(pub => ({ ...pub, type: 'conference', pubType: 'Conference Papers' }));

        allPublications = [...books, ...journals, ...conferences];

        console.log('Total publications loaded:', allPublications.length);

        // Sort by year (descending), then by featured status
        allPublications.sort((a, b) => {
            if (b.year !== a.year) return b.year - a.year;
            if (b.featured && !a.featured) return 1;
            if (!b.featured && a.featured) return -1;
            return 0;
        });

        displayPublications();
    } catch (error) {
        console.error('Error loading publications:', error);
        const pubList = document.getElementById('publications-list');
        if (pubList) {
            pubList.innerHTML =
                '<p class="error">Error loading publications: ' + error.message + '</p>';
        }
    }
}

function displayPublications() {
    const container = document.getElementById('publications-list');

    if (allPublications.length === 0) {
        container.innerHTML = '<p>No publications found.</p>';
        return;
    }

    const publicationsToShow = showingAll ? allPublications : allPublications.slice(0, MAX_INITIAL_PUBLICATIONS);

    // Group by type if not showing all (for better organization when showing selected items)
    let html = '';

    if (showingAll) {
        // Show all grouped by category
        const books = allPublications.filter(p => p.type === 'book');
        const journals = allPublications.filter(p => p.type === 'journal');
        const conferences = allPublications.filter(p => p.type === 'conference');

        if (books.length > 0) {
            html += '<h3><i class="fas fa-book"></i> Books</h3>';
            html += books.map(pub => createPublicationHTML(pub)).join('');
        }

        if (journals.length > 0) {
            html += '<h3><i class="fas fa-file-alt"></i> Journal Articles</h3>';
            html += journals.map(pub => createPublicationHTML(pub)).join('');
        }

        if (conferences.length > 0) {
            html += '<h3><i class="fas fa-users"></i> Conference Papers</h3>';
            html += conferences.map(pub => createPublicationHTML(pub)).join('');
        }
    } else {
        // Show selected items without grouping
        html = publicationsToShow.map(pub => createPublicationHTML(pub)).join('');
    }

    container.innerHTML = html;

    // Update button text
    const button = document.querySelector('.view-all .button');
    if (button) {
        const remaining = allPublications.length - MAX_INITIAL_PUBLICATIONS;
        if (!showingAll && remaining > 0) {
            button.innerHTML = `<i class="fas fa-list"></i> Show ${remaining} More Publications`;
        } else {
            button.innerHTML = `<i class="fas fa-list"></i> Show Less`;
        }
    }
}

function createPublicationHTML(pub) {
    const typeIcon = getTypeIcon(pub.type);
    const featuredBadge = pub.featured ?
        '<span style="color: #e74c3c; font-weight: 600; font-size: 0.85rem;"><i class="fas fa-star"></i> Featured</span>' : '';

    // Format authors with bold for László Pál
    const authors = formatAuthors(pub.authors);

    // Build links
    const links = [];
    if (pub.doi) {
        links.push(`<a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener"><i class="fas fa-link"></i> DOI</a>`);
    }
    if (pub.pdf) {
        links.push(`<a href="${pub.pdf}" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> PDF</a>`);
    }
    // Always add Google Scholar link
    links.push(`<a href="https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}" target="_blank" rel="noopener"><i class="fas fa-graduation-cap"></i> Scholar</a>`);

    // Build venue information
    let venueHTML = '';
    if (pub.venue) {
        let venueText = pub.venue;
        if (pub.volume) {
            venueText += `, Vol. ${pub.volume}`;
        }
        if (pub.pages) {
            venueText += `, pp. ${pub.pages}`;
        }
        venueHTML = `<div class="publication-venue"><i class="fas fa-book-open" style="font-size: 0.8rem; margin-right: 4px;"></i>${venueText}</div>`;
    }

    // For books, show publisher instead of venue
    let publisherHTML = '';
    if (pub.publisher) {
        publisherHTML = `<div class="publication-venue"><i class="fas fa-building" style="font-size: 0.8rem; margin-right: 4px;"></i>${pub.publisher}, ${pub.year}</div>`;
    }

    return `
        <div class="publication-item">
            <div class="publication-title">
                ${typeIcon} ${pub.title}
            </div>
            <div class="publication-authors">
                ${authors}
            </div>
            ${venueHTML}
            ${publisherHTML}
            <div class="publication-meta">
                <span class="publication-year">
                    <i class="fas fa-calendar-alt"></i> ${pub.year}
                </span>
                ${featuredBadge}
            </div>
            ${links.length > 0 ? `
            <div class="publication-links">
                ${links.join('')}
            </div>
            ` : ''}
        </div>
    `;
}

function formatAuthors(authors) {
    // Bold László Pál's name in various formats
    return authors
        .replace(/László Pál/g, '<strong>László Pál</strong>')
        .replace(/Pál, László/g, '<strong>Pál, László</strong>')
        .replace(/L\. Pál/g, '<strong>L. Pál</strong>')
        .replace(/Pál L\./g, '<strong>Pál L.</strong>')
        .replace(/László, P\./g, '<strong>László, P.</strong>')
        .replace(/L\.? Pál/g, '<strong>L. Pál</strong>');
}

function getTypeIcon(type) {
    const icons = {
        'journal': '<i class="fas fa-file-alt"></i>',
        'conference': '<i class="fas fa-users"></i>',
        'book': '<i class="fas fa-book"></i>',
        'preprint': '<i class="fas fa-file-alt"></i>'
    };
    return icons[type] || '<i class="fas fa-file-alt"></i>';
}

function toggleAllPublications() {
    showingAll = !showingAll;
    displayPublications();

    // Scroll to publications section if expanding
    if (showingAll) {
        document.getElementById('publications').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Search functionality (for future enhancement)
function searchPublications(query) {
    const lowerQuery = query.toLowerCase();
    return allPublications.filter(pub =>
        pub.title.toLowerCase().includes(lowerQuery) ||
        pub.authors.toLowerCase().includes(lowerQuery) ||
        pub.venue.toLowerCase().includes(lowerQuery) ||
        (pub.publisher && pub.publisher.toLowerCase().includes(lowerQuery)) ||
        pub.year.toString().includes(lowerQuery)
    );
}

// Group publications by year (for alternative display)
function groupByYear(publications) {
    return publications.reduce((groups, pub) => {
        const year = pub.year;
        if (!groups[year]) {
            groups[year] = [];
        }
        groups[year].push(pub);
        return groups;
    }, {});
}

// Get publications by type
function getPublicationsByType(type) {
    return allPublications.filter(pub => pub.type === type);
}

// Export for potential external use
window.publicationsAPI = {
    search: searchPublications,
    groupByYear: groupByYear,
    getByType: getPublicationsByType,
    getAll: () => allPublications,
    refresh: loadPublications
};
