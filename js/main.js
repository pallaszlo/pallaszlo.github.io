// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (window.innerWidth < 968) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
