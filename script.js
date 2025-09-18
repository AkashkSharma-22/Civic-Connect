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
    
    // Enhanced Maharashtra districts data with proper coordinates and additional info
    const maharashtraDistricts = [
        { 
            name: 'Mumbai', 
            lat: 19.0760, 
            lng: 72.8777, 
            reports: 89, 
            priority: 'high',
            population: '20.4M',
            area: '603.4 km²',
            lastUpdated: '2024-01-20'
        },
        { 
            name: 'Pune', 
            lat: 18.5204, 
            lng: 73.8567, 
            reports: 156, 
            priority: 'critical',
            population: '7.4M',
            area: '331.3 km²',
            lastUpdated: '2024-01-20'
        },
        { 
            name: 'Nagpur', 
            lat: 21.1458, 
            lng: 79.0882, 
            reports: 67, 
            priority: 'high',
            population: '2.9M',
            area: '227.8 km²',
            lastUpdated: '2024-01-20'
        },
        { 
            name: 'Nashik', 
            lat: 19.9975, 
            lng: 73.7898, 
            reports: 45, 
            priority: 'medium',
            population: '1.9M',
            area: '259.1 km²',
            lastUpdated: '2024-01-20'
        },
        { 
            name: 'Aurangabad', 
            lat: 19.8762, 
            lng: 75.3433, 
            reports: 34, 
            priority: 'medium',
            population: '1.8M',
            area: '328.0 km²',
            lastUpdated: '2024-01-20'
        },
        { 
            name: 'Thane', 
            lat: 19.2183, 
            lng: 72.9781, 
            reports: 78, 
            priority: 'high',
            population: '1.8M',
            area: '147.0 km²',
            lastUpdated: '2024-01-20'
        },
        { 
            name: 'Solapur', 
            lat: 17.6599, 
            lng: 75.9064, 
            reports: 23, 
            priority: 'low',
            population: '1.2M',
            area: '178.6 km²',
            lastUpdated: '2024-01-20'
        },
        { 
            name: 'Kolhapur', 
            lat: 16.7050, 
            lng: 74.2433, 
            reports: 29, 
            priority: 'medium',
            population: '1.1M',
            area: '66.8 km²',
            lastUpdated: '2024-01-20'
        },
        { 
            name: 'Amravati', 
            lat: 20.9374, 
            lng: 77.7796, 
            reports: 18, 
            priority: 'low',
            population: '0.8M',
            area: '121.6 km²',
            lastUpdated: '2024-01-20'
        },
        { 
            name: 'Jalgaon', 
            lat: 21.0077, 
            lng: 75.5626, 
            reports: 12, 
            priority: 'low',
            population: '0.7M',
            area: '117.8 km²',
            lastUpdated: '2024-01-20'
        }
    ];
    
    // Initialize map with better centering and zoom
    const map = L.map('maharashtra-map', {
        center: [19.5, 75.5],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true
    });
    
    // Add enhanced tile layer with better styling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors | CivicConnect Maharashtra',
        maxZoom: 18,
        minZoom: 5
    }).addTo(map);
    
    // Add district markers with enhanced styling and data
    maharashtraDistricts.forEach(district => {
        const color = getPriorityColor(district.priority);
        const radius = getMarkerRadius(district.reports);
        
        const marker = L.circleMarker([district.lat, district.lng], {
            radius: radius,
            fillColor: color,
            color: '#ffffff',
            weight: 3,
            opacity: 1,
            fillOpacity: 0.8,
            className: 'district-marker'
        }).addTo(map);
        
        // Enhanced popup with more detailed information
        const popupContent = `
            <div class="p-3 min-w-[200px]">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-bold text-lg text-gray-900">${district.name}</h4>
                    <span class="px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadgeClass(district.priority)}">
                        ${district.priority.toUpperCase()}
                    </span>
                </div>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Reports:</span>
                        <span class="font-semibold">${district.reports}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Population:</span>
                        <span class="font-semibold">${district.population}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Area:</span>
                        <span class="font-semibold">${district.area}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Last Updated:</span>
                        <span class="font-semibold">${district.lastUpdated}</span>
                    </div>
                </div>
                <div class="mt-3 pt-2 border-t border-gray-200">
                    <button onclick="viewDistrictDetails('${district.name}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        `;
        
        marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: 'custom-popup'
        });
        
        // Enhanced hover effects
        marker.on('mouseover', function() {
            this.setStyle({ 
                weight: 4, 
                fillOpacity: 1,
                radius: radius + 2
            });
            this.bringToFront();
        });
        
        marker.on('mouseout', function() {
            this.setStyle({ 
                weight: 3, 
                fillOpacity: 0.8,
                radius: radius
            });
        });
        
        // Add click event for detailed view
        marker.on('click', function() {
            highlightDistrict(district.name);
            updateDistrictDetails(district);
        });
    });
    
    // Add custom controls
    addCustomMapControls(map);
    
    // Update top districts with enhanced data
    updateTopDistricts(maharashtraDistricts);
    
    // Update priority counts
    updatePriorityCounts(maharashtraDistricts);
    
    // Add map legend
    addMapLegend(map);
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

function getPriorityBadgeClass(priority) {
    switch (priority) {
        case 'critical': return 'bg-red-100 text-red-800';
        case 'high': return 'bg-orange-100 text-orange-800';
        case 'medium': return 'bg-yellow-100 text-yellow-800';
        case 'low': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function getMarkerRadius(reports) {
    return Math.max(8, Math.min(25, reports / 5));
}

function addCustomMapControls(map) {
    const resetControl = L.Control.extend({
        options: { position: 'topleft' },
        onAdd: function(map) {
            const container = L.DomUtil.create('div', 'leaflet-control-reset');
            container.innerHTML = `
                <button onclick="resetMapView()" class="bg-white hover:bg-gray-50 text-gray-700 p-2 rounded shadow-lg border border-gray-200 transition-colors" title="Reset Map View">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                </button>
            `;
            return container;
        }
    });
    map.addControl(new resetControl());
}

function resetMapView() {
    const map = L.map('maharashtra-map');
    map.setView([19.5, 75.5], 6);
}

function highlightDistrict(districtName) {
    document.querySelectorAll('.district-highlight').forEach(el => {
        el.classList.remove('district-highlight');
    });
    const districtElements = document.querySelectorAll(`[data-district="${districtName}"]`);
    districtElements.forEach(el => {
        el.classList.add('district-highlight', 'bg-blue-50', 'border-blue-200');
    });
}

function updateDistrictDetails(district) {
    const detailsPanel = document.getElementById('district-details');
    if (!detailsPanel) return;
    detailsPanel.innerHTML = `
        <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 class="text-lg font-bold text-gray-900 mb-3">${district.name} Details</h3>
            <div class="space-y-3">
                <div class="flex justify-between items-center">
                    <span class="text-gray-600">Total Reports:</span>
                    <span class="font-semibold text-lg">${district.reports}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-600">Priority Level:</span>
                    <span class="px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadgeClass(district.priority)}">
                        ${district.priority.toUpperCase()}
                    </span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-600">Population:</span>
                    <span class="font-semibold">${district.population}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-600">Area:</span>
                    <span class="font-semibold">${district.area}</span>
                </div>
                <div class="flex justify-between items-center">
                    <span class="text-gray-600">Last Updated:</span>
                    <span class="font-semibold text-sm">${district.lastUpdated}</span>
                </div>
            </div>
            <div class="mt-4 pt-3 border-t border-gray-200">
                <button onclick="viewDistrictReports('${district.name}')" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                    View All Reports
                </button>
            </div>
        </div>
    `;
}

function viewDistrictDetails(districtName) {
    const districts = [
        { name: 'Mumbai', reports: 89, priority: 'high' },
        { name: 'Pune', reports: 156, priority: 'critical' },
        { name: 'Nagpur', reports: 67, priority: 'high' },
        { name: 'Nashik', reports: 45, priority: 'medium' },
        { name: 'Aurangabad', reports: 34, priority: 'medium' },
        { name: 'Thane', reports: 78, priority: 'high' },
        { name: 'Solapur', reports: 23, priority: 'low' },
        { name: 'Kolhapur', reports: 29, priority: 'medium' },
        { name: 'Amravati', reports: 18, priority: 'low' },
        { name: 'Jalgaon', reports: 12, priority: 'low' }
    ];
    const district = districts.find(d => d.name === districtName);
    if (district) {
        showNotification(`Opening detailed view for ${districtName}...`, 'info');
        setTimeout(() => {
            showNotification(`District details for ${districtName} loaded successfully!`, 'success');
        }, 1000);
    }
}

function viewDistrictReports(districtName) {
    showNotification(`Loading reports for ${districtName}...`, 'info');
    setTimeout(() => {
        showNotification(`Reports for ${districtName} loaded successfully!`, 'success');
    }, 1500);
}

function addMapLegend(map) {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'map-legend bg-white p-3 rounded-lg shadow-lg border border-gray-200');
        div.innerHTML = `
            <h4 class="text-sm font-bold text-gray-900 mb-2">Priority Legend</h4>
            <div class="space-y-2 text-xs">
                <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                    <span>Critical</span>
                </div>
                <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full bg-orange-600 mr-2"></div>
                    <span>High</span>
                </div>
                <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full bg-yellow-600 mr-2"></div>
                    <span>Medium</span>
                </div>
                <div class="flex items-center">
                    <div class="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
                    <span>Low</span>
                </div>
            </div>
            <div class="mt-3 pt-2 border-t border-gray-200">
                <p class="text-xs text-gray-500">Marker size indicates report volume</p>
            </div>
        `;
        return div;
    };
    legend.addTo(map);
}

function updateTopDistricts(districts) {
    const topDistrictsElement = document.getElementById('top-districts');
    if (!topDistrictsElement) return;
    
    // Sort by reports (descending) and take top 5
    const topDistricts = districts
        .sort((a, b) => b.reports - a.reports)
        .slice(0, 5);
    
    topDistrictsElement.innerHTML = topDistricts.map((district, index) => `
        <div class="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors rounded-lg px-2" data-district="${district.name}">
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-800">
                    ${index + 1}
                </div>
                <div>
                    <p class="font-semibold text-gray-900">${district.name}</p>
                    <div class="flex items-center space-x-2 text-sm text-gray-500">
                        <span>${district.reports} reports</span>
                        <span>•</span>
                        <span>${district.population}</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full border-2 border-white shadow-sm" style="background-color: ${getPriorityColor(district.priority)}"></div>
                <span class="px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadgeClass(district.priority)}">
                    ${district.priority.toUpperCase()}
                </span>
            </div>
        </div>
    `).join('');
}

function updatePriorityCounts(districts) {
    const priorityCounts = {
        critical: districts.filter(d => d.priority === 'critical').length,
        high: districts.filter(d => d.priority === 'high').length,
        medium: districts.filter(d => d.priority === 'medium').length,
        low: districts.filter(d => d.priority === 'low').length
    };
    
    // Update priority count elements with enhanced styling
    Object.keys(priorityCounts).forEach(priority => {
        const element = document.getElementById(`${priority}-count`);
        if (element) {
            element.textContent = priorityCounts[priority];
            element.className = `text-2xl font-bold ${getPriorityTextColor(priority)}`;
        }
        
        // Update district count badges
        const badgeElement = document.getElementById(`${priority}-badge`);
        if (badgeElement) {
            badgeElement.textContent = priorityCounts[priority];
            badgeElement.className = `px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadgeClass(priority)}`;
        }
    });
}

// Helper function to get priority text color
function getPriorityTextColor(priority) {
    switch (priority) {
        case 'critical': return 'text-red-600';
        case 'high': return 'text-orange-600';
        case 'medium': return 'text-yellow-600';
        case 'low': return 'text-green-600';
        default: return 'text-gray-600';
    }
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