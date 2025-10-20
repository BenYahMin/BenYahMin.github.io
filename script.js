// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.style.display = 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Preview Todo List Functionality
function addPreviewTask() {
    const input = document.getElementById('previewInput');
    const taskText = input.value.trim();
    
    if (taskText === '') {
        input.value = 'Practice JavaScript!';
        return;
    }
    
    const list = document.getElementById('previewList');
    const newItem = document.createElement('li');
    newItem.textContent = taskText;
    list.appendChild(newItem);
    input.value = '';
    
    // Remove the new item after 2 seconds for demo purposes
    setTimeout(() => {
        newItem.remove();
    }, 2000);
}

// Add click functionality to preview todo items
document.querySelectorAll('#previewList li').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('completed');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.style.background = 'var(--white)';
        nav.style.backdropFilter = 'none';
    }
});