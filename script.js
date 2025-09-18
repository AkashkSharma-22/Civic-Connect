// CivicConnect JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
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
    
    // Initialize Maharashtra Map
    initializeMaharashtraMap();
    
    // Initialize office map
    initializeOfficeMap();
    
    // Initialize issue form
    initializeIssueForm();
    
    // Initialize contact form
    initializeContactForm();
    
    // Animate stats counter
    animateStatsCounter();
    
    // Initialize theme toggle
    initializeThemeToggle();
});

// Maharashtra Map Functions
function initializeMaharashtraMap() {
    const mapElement = document.getElementById('maharashtra-map');
    if (!mapElement) return;
    
    // Sample Maharashtra districts data
    const maharashtraDistricts = [
        { name: 'Mumbai', lat: 19.0760, lng: 72.8777, reports: 89, priority: 'high' },
        { name: 'Pune', lat: 18.5204, lng: 73.8567, reports: 156, priority: 'critical' },
        { name: 'Nagpur', lat: 21.1458, lng: 79.0882, reports: 67, priority: 'high' },
        { name: 'Nashik', lat: 19.9975, lng: 73.7898, reports: 45, priority: 'medium' },
        { name: 'Aurangabad', lat: 19.8762, lng: 75.3433, reports: 34, priority: 'medium' },
        { name: 'Thane', lat: 19.2183, lng: 72.9781, reports: 78, priority: 'high' },
        { name: 'Solapur', lat: 17.6599, lng: 75.9064, reports: 23, priority: 'low' },
        { name: 'Kolhapur', lat: 16.7050, lng: 74.2433, reports: 29, priority: 'medium' },
        { name: 'Amravati', lat: 20.9374, lng: 77.7796, reports: 18, priority: 'low' },
        { name: 'Jalgaon', lat: 21.0077, lng: 75.5626, reports: 12, priority: 'low' }
    ];
    
    // Initialize map
    const map = L.map('maharashtra-map').setView([19.5, 75.5], 6);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add district markers
    maharashtraDistricts.forEach(district => {
        const color = getPriorityColor(district.priority);
        const marker = L.circleMarker([district.lat, district.lng], {
            radius: getMarkerRadius(district.reports),
            fillColor: color,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);
        
        // Add popup
        marker.bindPopup(`
            <div class="p-2">
                <h4 class="font-bold text-lg">${district.name}</h4>
                <p class="text-gray-600">Reports: ${district.reports}</p>
                <p class="text-sm text-gray-500">Priority: ${district.priority}</p>
            </div>
        `);
        
        // Add hover effect
        marker.on('mouseover', function() {
            this.setStyle({ weight: 4, fillOpacity: 1 });
        });
        
        marker.on('mouseout', function() {
            this.setStyle({ weight: 2, fillOpacity: 0.8 });
        });
    });
    
    // Update top districts
    updateTopDistricts(maharashtraDistricts);
    
    // Update priority counts
    updatePriorityCounts(maharashtraDistricts);
}

function getPriorityColor(priority) {
    const colors = {
        'critical': '#ef4444',
        'high': '#f59e0b',
        'medium': '#3b82f6',
        'low': '#10b981'
    };
    return colors[priority] || '#6b7280';
}

function getMarkerRadius(reports) {
    return Math.max(8, Math.min(25, reports / 5));
}

function updateTopDistricts(districts) {
    const topDistrictsElement = document.getElementById('top-districts');
    if (!topDistrictsElement) return;
    
    const sortedDistricts = districts.sort((a, b) => b.reports - a.reports).slice(0, 5);
    
    topDistrictsElement.innerHTML = sortedDistricts.map(district => `
        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span class="font-medium">${district.name}</span>
            <span class="text-sm text-gray-600">${district.reports} reports</span>
        </div>
    `).join('');
}

function updatePriorityCounts(districts) {
    const counts = {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
    };
    
    districts.forEach(district => {
        counts[district.priority] += district.reports;
    });
    
    // Update UI elements
    const elements = {
        'critical-issues': counts.critical,
        'high-priority-issues': counts.high,
        'medium-priority-issues': counts.medium,
        'low-priority-issues': counts.low
    };
    
    Object.entries(elements).forEach(([id, count]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = count;
        }
    });
}

// Office Map Function
function initializeOfficeMap() {
    const mapElement = document.getElementById('officeMap');
    if (!mapElement) return;
    
    // Initialize a simple map for office location
    const map = L.map('officeMap').setView([28.6139, 77.2090], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add office marker
    L.marker([28.6139, 77.2090]).addTo(map)
        .bindPopup('CivicConnect Office<br>New Delhi, India')
        .openPopup();
}

// Issue Form Functions
function initializeIssueForm() {
    const issueForm = document.getElementById('issueForm');
    if (!issueForm) return;
    
    issueForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(issueForm);
        const issueData = {
            title: formData.get('issue-title'),
            category: formData.get('issue-category'),
            description: formData.get('issue-description'),
            location: formData.get('issue-location'),
            priority: formData.get('issue-priority'),
            photo: formData.get('issue-photo')
        };
        
        // Simulate form submission
        simulateIssueSubmission(issueData);
    });
    
    // Add photo preview functionality
    const photoInput = document.getElementById('issue-photo');
    const photoPreview = document.getElementById('photo-preview');
    
    if (photoInput && photoPreview) {
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    photoPreview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="w-full h-32 object-cover rounded-lg">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function simulateIssueSubmission(issueData) {
    // Show loading state
    const submitButton = document.querySelector('#issueForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success modal
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
        
        // Reset form
        document.getElementById('issueForm').reset();
        document.getElementById('photo-preview').innerHTML = '';
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        console.log('Issue submitted:', issueData);
    }, 2000);
}

// Contact Form Functions
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Simulate form submission
        simulateContactSubmission(contactData);
    });
}

function simulateContactSubmission(contactData) {
    // Show loading state
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        console.log('Contact form submitted:', contactData);
    }, 1500);
}

// Modal Functions
function initializeModalFunctions() {
    const closeModalButton = document.getElementById('closeModal');
    const successModal = document.getElementById('successModal');
    
    if (closeModalButton && successModal) {
        closeModalButton.addEventListener('click', function() {
            successModal.classList.add('hidden');
        });
        
        // Close modal when clicking outside
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.classList.add('hidden');
            }
        });
    }
}

// Stats Counter Animation
function animateStatsCounter() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.classList.toggle('dark', currentTheme === 'dark');
    updateThemeIcon(currentTheme === 'dark');
    
    themeToggle.addEventListener('click', function() {
        const isDark = html.classList.contains('dark');
        html.classList.toggle('dark', !isDark);
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        updateThemeIcon(!isDark);
    });
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = isDark ? 
            '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>' :
            '<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>';
    }
}

// Initialize modal functions
initializeModalFunctions();

// Add some utility functions for better UX
function addScrollEffects() {
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-lg');
                navbar.classList.add('bg-opacity-95');
            } else {
                navbar.classList.remove('shadow-lg');
                navbar.classList.remove('bg-opacity-95');
            }
        });
    }
}

// Initialize scroll effects
addScrollEffects();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Export functions for global access
window.CivicConnect = {
    initializeMaharashtraMap,
    initializeOfficeMap,
    initializeIssueForm,
    initializeContactForm,
    initializeModalFunctions,
    animateStatsCounter,
    initializeThemeToggle,
    updatePriorityCounts,
    updateTopDistricts
};