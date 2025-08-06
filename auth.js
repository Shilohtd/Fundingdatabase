/**
 * Netlify Identity Authentication for NVCA Grants Database
 * Handles login, logout, and access control
 */

class AuthManager {
    constructor() {
        this.user = null;
        this.isAuthenticated = false;
        this.init();
    }
    
    init() {
        // Initialize Netlify Identity
        if (window.netlifyIdentity) {
            window.netlifyIdentity.on('init', user => {
                this.handleAuthState(user);
            });
            
            window.netlifyIdentity.on('login', user => {
                this.handleLogin(user);
                window.netlifyIdentity.close();
            });
            
            window.netlifyIdentity.on('logout', () => {
                this.handleLogout();
            });
            
            window.netlifyIdentity.on('error', err => {
                console.error('Netlify Identity error:', err);
                this.showError('Authentication error. Please try again.');
            });
            
            // Initialize the widget
            window.netlifyIdentity.init();
        } else {
            console.error('Netlify Identity not loaded');
            this.showError('Authentication system not available.');
        }
        
        // Setup event listeners
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const logoutBtn = document.getElementById('logout-btn');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                window.netlifyIdentity.open();
            });
        }
        
        if (signupBtn) {
            signupBtn.addEventListener('click', () => {
                window.netlifyIdentity.open('signup');
            });
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                window.netlifyIdentity.logout();
            });
        }
    }
    
    handleAuthState(user) {
        this.user = user;
        this.isAuthenticated = !!user;
        
        console.log('Auth state:', this.isAuthenticated ? 'Logged in' : 'Not logged in');
        
        if (this.isAuthenticated) {
            this.showAuthenticatedContent();
            this.updateUserInfo();
        } else {
            this.showLoginRequired();
        }
        
        // Hide auth loading
        this.hideAuthLoading();
    }
    
    handleLogin(user) {
        console.log('User logged in:', user.email);
        this.user = user;
        this.isAuthenticated = true;
        
        // Show success message
        this.showSuccessMessage(`Welcome, ${user.user_metadata?.full_name || user.email}!`);
        
        // Load the main application
        this.showAuthenticatedContent();
        this.updateUserInfo();
        
        // Initialize the grants database
        if (window.grantsDB) {
            window.grantsDB.init();
        }
    }
    
    handleLogout() {
        console.log('User logged out');
        this.user = null;
        this.isAuthenticated = false;
        
        // Show logout message
        this.showSuccessMessage('Successfully logged out.');
        
        // Show login screen
        this.showLoginRequired();
        
        // Clear any cached data
        if (window.grantsDB) {
            window.grantsDB.clearData();
        }
    }
    
    showAuthenticatedContent() {
        document.getElementById('auth-loading').style.display = 'none';
        document.getElementById('login-required').style.display = 'none';
        document.getElementById('authenticated-content').style.display = 'block';
    }
    
    showLoginRequired() {
        document.getElementById('auth-loading').style.display = 'none';
        document.getElementById('authenticated-content').style.display = 'none';
        document.getElementById('login-required').style.display = 'block';
    }
    
    hideAuthLoading() {
        document.getElementById('auth-loading').style.display = 'none';
    }
    
    updateUserInfo() {
        const userInfoElement = document.getElementById('user-info');
        if (userInfoElement && this.user) {
            const displayName = this.user.user_metadata?.full_name || this.user.email;
            userInfoElement.innerHTML = `
                <span class="user-greeting">Welcome, <strong>${this.escapeHtml(displayName)}</strong></span>
                <small class="user-email">${this.escapeHtml(this.user.email)}</small>
            `;
        }
    }
    
    showSuccessMessage(message) {
        this.showTemporaryMessage(message, 'success');
    }
    
    showError(message) {
        this.showTemporaryMessage(message, 'error');
    }
    
    showTemporaryMessage(message, type = 'info') {
        // Remove any existing messages
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `auth-message auth-message-${type}`;
        messageElement.innerHTML = `
            <p>${this.escapeHtml(message)}</p>
            <button class="message-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add to page
        document.body.insertBefore(messageElement, document.body.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentElement) {
                messageElement.remove();
            }
        }, 5000);
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Public API
    getCurrentUser() {
        return this.user;
    }
    
    isUserAuthenticated() {
        return this.isAuthenticated;
    }
    
    requireAuth() {
        if (!this.isAuthenticated) {
            this.showLoginRequired();
            return false;
        }
        return true;
    }
}

// Initialize authentication when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});