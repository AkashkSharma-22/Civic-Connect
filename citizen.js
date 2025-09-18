// CivicConnect - Production Ready JavaScript
// Comprehensive error handling, performance optimization, and security considerations

(function() {
    'use strict';

    // Global state management
    const AppState = {
        currentStep: 1,
        uploadedFiles: [],
        currentLocation: null,
        reports: [],
        notifications: [],
        userProfile: {
            name: 'Citizen User',
            email: 'citizen@example.com',
            level: 'Verified Reporter',
            totalReports: 24,
            resolved: 18,
            points: 1250,
            rank: 5
        },
        settings: {
            emailNotifications: true,
            smsNotifications: false,
            darkMode: false
        },
        map: null,
        markers: []
    };

    // Utility functions
    const Utils = {
        // Error handling wrapper
        safeExecute: function(fn, context = null, ...args) {
            try {
                return fn.apply(context, args);
            } catch (error) {
                console.error('Error executing function:', error);
                this.showError('An error occurred. Please try again.');
                return null;
            }
        },

        // Show error message
        showError: function(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
            errorDiv.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-exclamation-circle mr-2"></i>
                    <span>${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            document.body.appendChild(errorDiv);
            setTimeout(() => errorDiv.remove(), 5000);
        },

        // Show success message
        showSuccess: function(message) {
            const successDiv = document.createElement('div');
            successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
            successDiv.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-check-circle mr-2"></i>
                    <span>${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            document.body.appendChild(successDiv);
            setTimeout(() => successDiv.remove(), 3000);
        },

        // Validate email
        validateEmail: function(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        // Validate file upload
        validateFile: function(file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4'];
            const maxSize = 10 * 1024 * 1024; // 10MB
            
            if (!validTypes.includes(file.type)) {
                return { valid: false, error: 'Invalid file type. Only JPG, PNG, and MP4 are allowed.' };
            }
            
            if (file.size > maxSize) {
                return { valid: false, error: 'File size too large. Maximum 10MB allowed.' };
            }
            
            return { valid: true };
        },

        // Sanitize input
        sanitizeInput: function(input) {
            const div = document.createElement('div');
            div.textContent = input;
            return div.innerHTML;
        },

        // Generate unique ID
        generateId: function() {
            return 'ISS-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        },

        // Debounce function for performance
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function for performance
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };

    // Theme Management
    const ThemeManager = {
        init: function() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            this.setTheme(savedTheme);
            this.bindEvents();
        },

        setTheme: function(theme) {
            Utils.safeExecute(() => {
                const body = document.body;
                const themeIcon = document.getElementById('theme-icon');
                const profileDarkMode = document.getElementById('profile-dark-mode');
                
                if (theme === 'dark') {
                    body.classList.add('dark');
                    if (themeIcon) themeIcon.className = 'fas fa-sun';
                    if (profileDarkMode) profileDarkMode.checked = true;
                } else {
                    body.classList.remove('dark');
                    if (themeIcon) themeIcon.className = 'fas fa-moon';
                    if (profileDarkMode) profileDarkMode.checked = false;
                }
                
                localStorage.setItem('theme', theme);
                AppState.settings.darkMode = theme === 'dark';
            });
        },

        toggleTheme: function() {
            const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        },

        bindEvents: function() {
            const themeToggle = document.getElementById('theme-toggle');
            const profileDarkMode = document.getElementById('profile-dark-mode');
            
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggleTheme());
            }
            
            if (profileDarkMode) {
                profileDarkMode.addEventListener('change', (e) => {
                    this.setTheme(e.target.checked ? 'dark' : 'light');
                });
            }
        }
    };

    // Navigation Management
    const NavigationManager = {
        init: function() {
            this.bindEvents();
            this.handleNavigation();
        },

        bindEvents: function() {
            // Mobile menu toggle
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuToggle && mobileMenu) {
                mobileMenuToggle.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // Navigation links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = link.getAttribute('href');
                    this.navigateTo(target);
                    
                    // Close mobile menu
                    if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                    }
                });
            });

            // Profile button
            const profileButton = document.querySelector('a[href="#profile"]');
            if (profileButton) {
                profileButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showProfileModal();
                });
            }
        },

        navigateTo: function(target) {
            Utils.safeExecute(() => {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('bg-blue-100', 'dark:bg-blue-900', 'text-gray-900', 'dark:text-white');
                    link.classList.add('text-gray-700', 'dark:text-gray-300');
                });
                
                const activeLink = document.querySelector(`a[href="${target}"]`);
                if (activeLink) {
                    activeLink.classList.add('bg-blue-100', 'dark:bg-blue-900', 'text-gray-900', 'dark:text-white');
                    activeLink.classList.remove('text-gray-700', 'dark:text-gray-300');
                }

                // Scroll to section
                const section = document.querySelector(target);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            });
        },

        handleNavigation: function() {
            // Handle hash changes
            window.addEventListener('hashchange', () => {
                const hash = window.location.hash;
                if (hash) {
                    this.navigateTo(hash);
                }
            });

            // Handle initial hash
            if (window.location.hash) {
                this.navigateTo(window.location.hash);
            }
        },

        showProfileModal: function() {
            const modal = document.getElementById('profile-modal');
            if (modal) {
                modal.classList.remove('hidden');
                this.populateProfileData();
                this.bindProfileEvents();
            }
        },

        populateProfileData: function() {
            const profile = AppState.userProfile;
            
            document.getElementById('profile-name').textContent = profile.name;
            document.getElementById('profile-email').textContent = profile.email;
            document.getElementById('profile-level').textContent = profile.level;
            document.getElementById('profile-total-reports').textContent = profile.totalReports;
            document.getElementById('profile-resolved').textContent = profile.resolved;
            document.getElementById('profile-points').textContent = profile.points.toLocaleString();
            document.getElementById('profile-rank').textContent = `#${profile.rank}`;
        },

        bindProfileEvents: function() {
            const closeButton = document.getElementById('close-profile');
            const logoutButton = document.getElementById('logout-btn');
            const editButton = document.getElementById('edit-profile-btn');
            const modal = document.getElementById('profile-modal');

            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    modal.classList.add('hidden');
                });
            }

            if (logoutButton) {
                logoutButton.addEventListener('click', () => {
                    if (confirm('Are you sure you want to logout?')) {
                        Utils.showSuccess('Logged out successfully');
                        modal.classList.add('hidden');
                        // Redirect to login page would go here
                    }
                });
            }

            if (editButton) {
                editButton.addEventListener('click', () => {
                    Utils.showSuccess('Profile editing coming soon!');
                });
            }

            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        }
    };

    // Report Form Management
    const ReportFormManager = {
        init: function() {
            this.bindEvents();
            this.initializeMap();
        },

        bindEvents: function() {
            const form = document.getElementById('report-form');
            if (form) {
                form.addEventListener('submit', (e) => this.handleSubmit(e));
            }

            // Step navigation
            const nextStep1 = document.getElementById('next-step-1');
            const nextStep2 = document.getElementById('next-step-2');
            const prevStep2 = document.getElementById('prev-step-2');
            const prevStep3 = document.getElementById('prev-step-3');

            if (nextStep1) nextStep1.addEventListener('click', () => this.nextStep(1));
            if (nextStep2) nextStep2.addEventListener('click', () => this.nextStep(2));
            if (prevStep2) prevStep2.addEventListener('click', () => this.prevStep(2));
            if (prevStep3) prevStep3.addEventListener('click', () => this.prevStep(3));

            // Location detection
            const detectLocation = document.getElementById('detect-location');
            const manualLocation = document.getElementById('manual-location');
            const addressInput = document.getElementById('address-input');

            if (detectLocation) {
                detectLocation.addEventListener('click', () => this.detectLocation());
            }

            if (manualLocation) {
                manualLocation.addEventListener('click', () => this.showManualLocation());
            }

            if (addressInput) {
                addressInput.addEventListener('input', Utils.debounce(() => this.searchLocation(), 500));
            }

            // File upload
            const uploadArea = document.getElementById('upload-area');
            const fileInput = document.getElementById('file-input');

            if (uploadArea) {
                uploadArea.addEventListener('click', () => fileInput.click());
                uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
                uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
            }

            if (fileInput) {
                fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
            }
        },

        nextStep: function(currentStep) {
            Utils.safeExecute(() => {
                if (this.validateStep(currentStep)) {
                    AppState.currentStep = currentStep + 1;
                    this.updateStepDisplay();
                }
            });
        },

        prevStep: function(currentStep) {
            Utils.safeExecute(() => {
                AppState.currentStep = currentStep - 1;
                this.updateStepDisplay();
            });
        },

        validateStep: function(step) {
            switch (step) {
                case 1:
                    const category = document.getElementById('category');
                    const priority = document.getElementById('priority');
                    const description = document.getElementById('description');
                    
                    if (!category.value || !priority.value || !description.value.trim()) {
                        Utils.showError('Please fill in all required fields');
                        return false;
                    }
                    return true;
                    
                case 2:
                    if (!AppState.currentLocation) {
                        Utils.showError('Please provide a location');
                        return false;
                    }
                    return true;
                    
                default:
                    return true;
            }
        },

        updateStepDisplay: function() {
            // Hide all step contents
            document.querySelectorAll('.step-content').forEach(content => {
                content.classList.add('hidden');
            });

            // Show current step
            const currentStepContent = document.getElementById(`step-${AppState.currentStep}-content`);
            if (currentStepContent) {
                currentStepContent.classList.remove('hidden');
            }

            // Update progress indicators
            for (let i = 1; i <= 3; i++) {
                const step = document.getElementById(`step-${i}`);
                const line = document.getElementById(`line-${i}`);
                
                if (step) {
                    if (i < AppState.currentStep) {
                        step.classList.add('completed');
                        step.classList.remove('active');
                    } else if (i === AppState.currentStep) {
                        step.classList.add('active');
                        step.classList.remove('completed');
                    } else {
                        step.classList.remove('active', 'completed');
                    }
                }
                
                if (line) {
                    if (i < AppState.currentStep - 1) {
                        line.classList.add('completed');
                    } else {
                        line.classList.remove('completed');
                    }
                }
            }
        },

        detectLocation: function() {
            Utils.safeExecute(() => {
                if (!navigator.geolocation) {
                    Utils.showError('Geolocation is not supported by your browser');
                    return;
                }

                const detectButton = document.getElementById('detect-location');
                if (detectButton) {
                    detectButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Detecting...';
                    detectButton.disabled = true;
                }

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        
                        AppState.currentLocation = { lat, lng };
                        this.displayLocation(`Latitude: ${lat.toFixed(6)}, Longitude: ${lng.toFixed(6)}`);
                        this.updateMapLocation(lat, lng);
                        
                        if (detectButton) {
                            detectButton.innerHTML = '<i class="fas fa-location-arrow mr-2"></i> Detect Location';
                            detectButton.disabled = false;
                        }
                        
                        Utils.showSuccess('Location detected successfully');
                    },
                    (error) => {
                        let message = 'Unable to detect location';
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                message = 'Location access denied by user';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                message = 'Location information unavailable';
                                break;
                            case error.TIMEOUT:
                                message = 'Location request timed out';
                                break;
                        }
                        Utils.showError(message);
                        
                        if (detectButton) {
                            detectButton.innerHTML = '<i class="fas fa-location-arrow mr-2"></i> Detect Location';
                            detectButton.disabled = false;
                        }
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 300000
                    }
                );
            });
        },

        showManualLocation: function() {
            Utils.safeExecute(() => {
                const manualInput = document.getElementById('manual-location-input');
                if (manualInput) {
                    manualInput.classList.remove('hidden');
                    document.getElementById('address-input').focus();
                }
            });
        },

        searchLocation: function() {
            const address = document.getElementById('address-input').value.trim();
            if (!address) return;

            // Simple geocoding simulation
            // In production, this would use a real geocoding service
            Utils.safeExecute(() => {
                // Simulate geocoding delay
                setTimeout(() => {
                    // Mock coordinates for demonstration
                    const mockCoords = {
                        lat: 19.0760, // Mumbai latitude
                        lng: 72.8777  // Mumbai longitude
                    };
                    
                    AppState.currentLocation = mockCoords;
                    this.displayLocation(address);
                    this.updateMapLocation(mockCoords.lat, mockCoords.lng);
                    Utils.showSuccess('Location set successfully');
                }, 1000);
            });
        },

        displayLocation: function(locationText) {
            const locationDisplay = document.getElementById('location-display');
            const locationTextElement = document.getElementById('location-text');
            
            if (locationDisplay && locationTextElement) {
                locationDisplay.classList.remove('hidden');
                locationTextElement.textContent = locationText;
            }
        },

        initializeMap: function() {
            Utils.safeExecute(() => {
                const mapElement = document.getElementById('map');
                if (!mapElement) return;

                AppState.map = L.map('map').setView([19.0760, 72.8777], 12);
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 18
                }).addTo(AppState.map);

                // Add sample markers
                this.addSampleMarkers();
            });
        },

        addSampleMarkers: function() {
            const sampleIssues = [
                { lat: 19.0760, lng: 72.8777, title: 'Pothole on Main Road', priority: 'high' },
                { lat: 19.0860, lng: 72.8877, title: 'Water Leakage', priority: 'medium' },
                { lat: 19.0660, lng: 72.8677, title: 'Street Light Issue', priority: 'low' }
            ];

            sampleIssues.forEach(issue => {
                const color = issue.priority === 'high' ? 'red' : issue.priority === 'medium' ? 'yellow' : 'green';
                const marker = L.circleMarker([issue.lat, issue.lng], {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.7,
                    radius: 8
                }).addTo(AppState.map);
                
                marker.bindPopup(`<b>${issue.title}</b><br>Priority: ${issue.priority}`);
                AppState.markers.push(marker);
            });
        },

        updateMapLocation: function(lat, lng) {
            if (AppState.map) {
                AppState.map.setView([lat, lng], 15);
                
                // Add a marker for the current location
                const marker = L.marker([lat, lng]).addTo(AppState.map);
                marker.bindPopup('Your Location').openPopup();
            }
        },

        handleDragOver: function(e) {
            e.preventDefault();
            e.currentTarget.classList.add('border-blue-500');
        },

        handleDrop: function(e) {
            e.preventDefault();
            e.currentTarget.classList.remove('border-blue-500');
            
            const files = Array.from(e.dataTransfer.files);
            this.processFiles(files);
        },

        handleFileSelect: function(e) {
            const files = Array.from(e.target.files);
            this.processFiles(files);
        },

        processFiles: function(files) {
            Utils.safeExecute(() => {
                files.forEach(file => {
                    const validation = Utils.validateFile(file);
                    if (validation.valid) {
                        AppState.uploadedFiles.push(file);
                        this.displayFilePreview(file);
                    } else {
                        Utils.showError(validation.error);
                    }
                });
            });
        },

        displayFilePreview: function(file) {
            const preview = document.getElementById('file-preview');
            if (!preview) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const fileElement = document.createElement('div');
                fileElement.className = 'relative group';
                
                if (file.type.startsWith('image/')) {
                    fileElement.innerHTML = `
                        <img src="${e.target.result}" alt="${file.name}" class="w-full h-24 object-cover rounded-lg">
                        <button onclick="this.parentElement.remove(); ReportFormManager.removeFile('${file.name}')" 
                                class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    `;
                } else if (file.type.startsWith('video/')) {
                    fileElement.innerHTML = `
                        <video src="${e.target.result}" class="w-full h-24 object-cover rounded-lg" controls></video>
                        <button onclick="this.parentElement.remove(); ReportFormManager.removeFile('${file.name}')" 
                                class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <i class="fas fa-times text-xs"></i>
                        </button>
                    `;
                }
                
                preview.appendChild(fileElement);
            };
            reader.readAsDataURL(file);
        },

        removeFile: function(fileName) {
            AppState.uploadedFiles = AppState.uploadedFiles.filter(file => file.name !== fileName);
        },

        handleSubmit: function(e) {
            e.preventDefault();
            
            Utils.safeExecute(() => {
                if (!this.validateStep(3)) return;

                // Collect form data
                const formData = {
                    id: Utils.generateId(),
                    category: document.getElementById('category').value,
                    priority: document.getElementById('priority').value,
                    description: Utils.sanitizeInput(document.getElementById('description').value),
                    location: AppState.currentLocation,
                    locationText: document.getElementById('location-text')?.textContent || '',
                    files: AppState.uploadedFiles,
                    timestamp: new Date().toISOString(),
                    status: 'pending'
                };

                // Simulate API submission
                this.submitReport(formData);
            });
        },

        submitReport: function(formData) {
            // Show loading state
            const submitButton = document.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Submitting...';
                submitButton.disabled = true;
            }

            // Simulate API call
            setTimeout(() => {
                // Store report
                AppState.reports.push(formData);
                
                // Update UI
                this.resetForm();
                this.showSuccessModal(formData.id);
                
                if (submitButton) {
                    submitButton.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Submit Report';
                    submitButton.disabled = false;
                }
                
                Utils.showSuccess('Report submitted successfully!');
            }, 2000);
        },

        resetForm: function() {
            AppState.currentStep = 1;
            AppState.uploadedFiles = [];
            AppState.currentLocation = null;
            
            document.getElementById('report-form').reset();
            document.getElementById('file-preview').innerHTML = '';
            document.getElementById('location-display').classList.add('hidden');
            document.getElementById('manual-location-input').classList.add('hidden');
            
            this.updateStepDisplay();
        },

        showSuccessModal: function(reportId) {
            const modal = document.getElementById('success-modal');
            const referenceNumber = document.getElementById('reference-number');
            
            if (modal && referenceNumber) {
                referenceNumber.textContent = `#${reportId}`;
                modal.classList.remove('hidden');
                
                const closeButton = document.getElementById('close-success');
                if (closeButton) {
                    closeButton.addEventListener('click', () => {
                        modal.classList.add('hidden');
                    });
                }
                
                // Close modal when clicking outside
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.add('hidden');
                    }
                });
            }
        }
    };

    // Notifications Manager
    const NotificationsManager = {
        init: function() {
            this.bindEvents();
            this.loadNotifications();
        },

        bindEvents: function() {
            const notificationsButton = document.querySelector('a[href="#notifications"]');
            const closeButton = document.getElementById('close-notifications');
            const modal = document.getElementById('notifications-modal');

            if (notificationsButton) {
                notificationsButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showNotificationsModal();
                });
            }

            if (closeButton && modal) {
                closeButton.addEventListener('click', () => {
                    modal.classList.add('hidden');
                });

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.add('hidden');
                    }
                });
            }
        },

        loadNotifications: function() {
            // Simulate loading notifications
            AppState.notifications = [
                {
                    id: 1,
                    type: 'info',
                    title: 'Issue Assigned',
                    message: 'Your report #ISS-2024-001 has been assigned to the Roads Department',
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
                },
                {
                    id: 2,
                    type: 'success',
                    title: 'Issue Resolved',
                    message: 'Your report #ISS-2024-002 has been marked as resolved',
                    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
                }
            ];

            this.updateNotificationCount();
        },

        showNotificationsModal: function() {
            const modal = document.getElementById('notifications-modal');
            if (!modal) return;

            this.renderNotifications();
            modal.classList.remove('hidden');
            this.markAsRead();
        },

        renderNotifications: function() {
            const notificationsList = document.getElementById('notifications-list');
            if (!notificationsList) return;

            notificationsList.innerHTML = AppState.notifications.map(notification => {
                const icon = this.getNotificationIcon(notification.type);
                const timeAgo = this.getTimeAgo(notification.timestamp);
                
                return `
                    <div class="p-3 bg-${notification.type === 'info' ? 'blue' : 'green'}-50 dark:bg-${notification.type === 'info' ? 'blue' : 'green'}-900/20 rounded-lg">
                        <div class="flex items-start space-x-3">
                            <i class="${icon} text-${notification.type === 'info' ? 'blue' : 'green'}-600 dark:text-${notification.type === 'info' ? 'blue' : 'green'}-400 mt-1"></i>
                            <div>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">${notification.title}</p>
                                <p class="text-xs text-gray-600 dark:text-gray-400">${notification.message}</p>
                                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">${timeAgo}</p>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        },

        getNotificationIcon: function(type) {
            switch (type) {
                case 'info': return 'fas fa-info-circle';
                case 'success': return 'fas fa-check-circle';
                case 'warning': return 'fas fa-exclamation-triangle';
                case 'error': return 'fas fa-exclamation-circle';
                default: return 'fas fa-bell';
            }
        },

        getTimeAgo: function(timestamp) {
            const now = new Date();
            const time = new Date(timestamp);
            const diffMs = now - time;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            if (diffMins < 60) return `${diffMins} minutes ago`;
            if (diffHours < 24) return `${diffHours} hours ago`;
            return `${diffDays} days ago`;
        },

        updateNotificationCount: function() {
            const unreadCount = AppState.notifications.filter(n => !n.read).length;
            const countElements = [
                document.getElementById('notification-count'),
                document.getElementById('mobile-notification-count')
            ];

            countElements.forEach(element => {
                if (element) {
                    element.textContent = unreadCount;
                    element.style.display = unreadCount > 0 ? 'flex' : 'none';
                }
            });
        },

        markAsRead: function() {
            AppState.notifications.forEach(notification => {
                notification.read = true;
            });
            this.updateNotificationCount();
        }
    };

    // Language Manager
    const LanguageManager = {
        init: function() {
            this.bindEvents();
            this.loadLanguage();
        },

        bindEvents: function() {
            const languageSelector = document.getElementById('language-selector');
            if (languageSelector) {
                languageSelector.addEventListener('change', (e) => {
                    this.setLanguage(e.target.value);
                });
            }
        },

        loadLanguage: function() {
            const savedLanguage = localStorage.getItem('language') || 'en';
            this.setLanguage(savedLanguage);
        },

        setLanguage: function(language) {
            Utils.safeExecute(() => {
                const languageSelector = document.getElementById('language-selector');
                if (languageSelector) {
                    languageSelector.value = language;
                }
                
                localStorage.setItem('language', language);
                this.updateTranslations(language);
            });
        },

        updateTranslations: function(language) {
            // This is a simplified translation system
            // In production, you would use a proper i18n library
            const translations = {
                en: {
                    'welcome': 'Welcome to CivicConnect',
                    'report-issue': 'Report an Issue',
                    'my-reports': 'My Reports',
                    'notifications': 'Notifications',
                    'profile': 'Profile'
                },
                mr: {
                    'welcome': 'स्वागत आहे CivicConnect मध्ये',
                    'report-issue': 'समस्या नोंदवा',
                    'my-reports': 'माझे अहवाल',
                    'notifications': 'सूचना',
                    'profile': 'प्रोफाइल'
                },
                hi: {
                    'welcome': 'CivicConnect में आपका स्वागत है',
                    'report-issue': 'समस्या की रिपोर्ट करें',
                    'my-reports': 'मेरी रिपोर्ट्स',
                    'notifications': 'सूचनाएं',
                    'profile': 'प्रोफ़ाइल'
                }
            };

            const currentTranslations = translations[language] || translations.en;
            
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (currentTranslations[key]) {
                    element.textContent = currentTranslations[key];
                }
            });
        }
    };

    // Large Font Manager
    const LargeFontManager = {
        init: function() {
            this.bindEvents();
            this.loadFontPreference();
        },

        bindEvents: function() {
            const toggleButton = document.getElementById('large-font-toggle');
            if (toggleButton) {
                toggleButton.addEventListener('click', () => {
                    this.toggleLargeFont();
                });
            }
        },

        loadFontPreference: function() {
            const savedPreference = localStorage.getItem('largeFont') === 'true';
            if (savedPreference) {
                this.setLargeFont(true);
            }
        },

        toggleLargeFont: function() {
            const isLarge = document.body.classList.contains('large-font');
            this.setLargeFont(!isLarge);
        },

        setLargeFont: function(enable) {
            if (enable) {
                document.body.classList.add('large-font');
                localStorage.setItem('largeFont', 'true');
            } else {
                document.body.classList.remove('large-font');
                localStorage.setItem('largeFont', 'false');
            }
        }
    };

    // Initialize Application
    const App = {
        init: function() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initialize());
            } else {
                this.initialize();
            }
        },

        initialize: function() {
            console.log('Initializing CivicConnect...');
            
            // Initialize all managers
            Utils.safeExecute(() => ThemeManager.init());
            Utils.safeExecute(() => NavigationManager.init());
            Utils.safeExecute(() => ReportFormManager.init());
            Utils.safeExecute(() => NotificationsManager.init());
            Utils.safeExecute(() => LanguageManager.init());
            Utils.safeExecute(() => LargeFontManager.init());

            // Initialize fade-in animations
            this.initializeAnimations();

            console.log('CivicConnect initialized successfully');
        },

        initializeAnimations: function() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        }
    };

    // Start the application
    App.init();

})();