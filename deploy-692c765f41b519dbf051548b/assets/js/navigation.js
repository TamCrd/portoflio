// assets/js/navigation.js
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('nav');
    const scrollThreshold = 50;
    
    function updateNavigation() {
        if (window.scrollY > scrollThreshold) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavigation);
    updateNavigation(); // Initial check
});