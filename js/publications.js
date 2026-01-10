// Publications management
let allPublications = [];
let showingAll = false;
const MAX_INITIAL_PUBLICATIONS = 5;

// Load publications on page load
document.addEventListener('DOMContentLoaded', loadPublications);

async function loadPublications() {
    try {
        const response = await fetch('data/publications.json');
        allPublications = await response.json();
        
        // Sort by year (descending)
        allPublications.sort((a, b) => b.year - a.year);
        
        displayPublications();
    } catch (error) {
        console.error('Error loading publications:', error);
        document.getElementById('publications-list').innerHTML = 
            '<p class="error">Error loading publications. Please try again later.</p>';
    }
}

function displayPublications() {
    const container = document.getElementById('publications-list');
    
    if (allPublications.length === 0) {
        container.innerHTML = '<p>No publications found.</p>';
        return;
    }
    
    const publicationsToShow = showingAll ? allPublications : allPublications.slice(0, MAX_INITIAL_PUBLICATIONS);
    
    const html = publicationsToShow.map(pub => createPublicationHTML(pub)).join('');
    container.innerHTML = html;
}

function createPublicationHTML(pub) {
    const typeIcon = getTypeIcon(pub.type);
    const featuredBadge = pub.featured ? '<span style="color: #e74c3c; font-weight: bold;">★ Featured</span>' : '';
    
    return `
        <div class="publication-item">
            <div class="publication-title">
                ${typeIcon} ${pub.title}
            </div>
            <div class="publication-authors">
                ${formatAuthors(pub.authors)}
            </div>
            <div class="publication-venue">
                ${pub.venue}
            </div>
            <div class="publication-year">
                ${pub.year} ${featuredBadge}
            </div>
            <div class="publication-links">
                ${pub.doi ? `<a href="https://doi.org/${pub.doi}" target="_blank">DOI</a>` : ''}
                <a href="https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}" target="_blank">Google Scholar</a>
            </div>
        </div>
    `;
}

function formatAuthors(authors) {
    // Bold your own name
    return authors.replace(/László Pál/g, '<strong>László Pál</strong>');
}

function getTypeIcon(type) {
    const icons = {
        'journal': '📄',
        'conference': '🎤',
        'book': '📚',
        'preprint': '📝'
    };
    return icons[type] || '📄';
}

function toggleAllPublications() {
    showingAll = !showingAll;
    displayPublications();
    
    const button = document.querySelector('.view-all .button');
    button.textContent = showingAll ? 'Show Less' : 'View All Publications';
}

// Group publications by year
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

// Search functionality (optional)
function searchPublications(query) {
    const lowerQuery = query.toLowerCase();
    return allPublications.filter(pub => 
        pub.title.toLowerCase().includes(lowerQuery) ||
        pub.authors.toLowerCase().includes(lowerQuery) ||
        pub.venue.toLowerCase().includes(lowerQuery)
    );
}
