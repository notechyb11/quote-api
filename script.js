// ===== Light / Dark Mode Toggle with Memory =====
const themeToggle = document.getElementById('theme-toggle');

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    }
});

// Toggle theme and save preference
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    
    // Update button icon
    themeToggle.textContent = isLightMode ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});

// ===== Editable About Section =====
const editButton = document.getElementById('edit-about');
const aboutText = document.getElementById('about-text');
let isEditing = false;

editButton.addEventListener('click', () => {
    isEditing = !isEditing;
    aboutText.contentEditable = isEditing;
    if (isEditing) {
        aboutText.focus();
    }
    editButton.textContent = isEditing ? '💾 Save' : '✏️ Edit';
});

async function getQuote() {
  const quoteButton = document.getElementById('quote-btn');
  const quoteElement = document.getElementById('quote');
  const authorElement = document.getElementById('author');

  quoteButton.disabled = true;
  quoteButton.textContent = 'Loading...';
  quoteElement.textContent = 'Fetching a quote...';
  authorElement.textContent = '';

  try {
    const response = await fetch("/api/quote");
    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();

    quoteElement.textContent = `"${data.content}"`;
    authorElement.textContent = `— ${data.author || "Unknown"}`;
  } catch (error) {
    quoteElement.textContent = "Failed to load quote.";
    authorElement.textContent = "";
  } finally {
    quoteButton.disabled = false;
    quoteButton.textContent = "New Quote";
  }
}


// Add event listener to quote button
document.getElementById('quote-btn').addEventListener('click', getQuote);

// Load a quote when the page loads
window.addEventListener('DOMContentLoaded', getQuote);

// ===== Additional Feature: Smooth scrolling for anchor links =====
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
async function getQuote() {
  const quoteElement = document.getElementById("quote");
  const authorElement = document.getElementById("author");
  const quoteButton = document.getElementById("quote-btn");

  try {
    quoteButton.disabled = true;
    quoteButton.textContent = "Loading...";
    quoteElement.textContent = "Fetching a quote...";
    authorElement.textContent = "";

    // Fetch from Vercel API
    const response = await fetch("https://quote-proxy-8qt8o1tjk-albacietep-1687s-projects.vercel.app/");
    if (!response.ok) throw new Error("Failed to fetch quote");
    const data = await response.json();

    quoteElement.textContent = `"${data.content}"`;
    authorElement.textContent = `— ${data.author}`;
  } catch (err) {
    quoteElement.textContent = "Error loading quote.";
    authorElement.textContent = "";
  } finally {
    quoteButton.disabled = false;
    quoteButton.textContent = "New Quote";
  }
}

// Event listeners
document.getElementById('quote-btn').addEventListener('click', getQuote);
window.addEventListener('DOMContentLoaded', getQuote);

// ===== Contact form enhancement =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // For demo purposes - in a real site, you'd send this to a server
        alert(`Thank you ${name}! Your message has been received. I'll get back to you at ${email}.`);
        
        // Reset form
        this.reset();
    });

}
