class GrantsDatabase {
    constructor() {
        this.grants = [];
        this.filteredGrants = [];
        this.currentPage = 1;
        this.pageSize = 20;
        this.sortConfig = { key: null, direction: 'asc' };
        this.filters = { search: '', category: '', status: '', agency: '' };
        this.init();
    }
    
    async init() {
        try {
            await this.loadData();
            this.setupEventListeners();
            this.populateFilters();
            this.applyFilters();
            this.render();
            this.showMainContent();
        } catch (error) {
            this.showError(error);
        }
    }
    
    async loadData() {
        const response = await fetch('./grants_data.json');
        if (!response.ok) throw new Error(`Failed to load data: ${response.status}`);
        this.grants = await response.json();
        
        const totalCountElement = document.getElementById('total-count');
        if (totalCountElement) {
            totalCountElement.textContent = this.grants.length.toLocaleString();
        }
    }
    
    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', this.debounce((e) => {
            this.filters.search = e.target.value;
            this.currentPage = 1;
            this.applyFilters();
            this.render();
        }, 300));
        
        ['categoryFilter', 'statusFilter', 'agencyFilter'].forEach(id => {
            document.getElementById(id).addEventListener('change', (e) => {
                this.filters[id.replace('Filter', '')] = e.target.value;
                this.currentPage = 1;
                this.applyFilters();
                this.render();
            });
        });
        
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadCSV());
        document.getElementById('clearFiltersBtn').addEventListener('click', () => this.clearFilters());
        
        document.querySelectorAll('th[data-sort]').forEach(th => {
            th.addEventListener('click', () => this.handleSort(th.getAttribute('data-sort')));
        });
    }
    
    populateFilters() {
        const getUniqueValues = (field) => [...new Set(this.grants.map(g => g[field]).filter(Boolean).sort())];
        
        this.populateSelect('categoryFilter', getUniqueValues('CATEGORY OF FUNDING ACTIVITY'));
        this.populateSelect('statusFilter', getUniqueValues('OPPORTUNITY STATUS'));
        this.populateSelect('agencyFilter', getUniqueValues('AGENCY NAME'));
    }
    
    populateSelect(selectId, options) {
        const select = document.getElementById(selectId);
        while (select.children.length > 1) select.removeChild(select.lastChild);
        
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option.length > 50 ? option.substring(0, 50) + '...' : option;
            optionElement.title = option;
            select.appendChild(optionElement);
        });
    }
    
    applyFilters() {
        this.filteredGrants = this.grants.filter(grant => {
            const matchesSearch = !this.filters.search || 
                Object.values(grant).some(value => 
                    value && value.toString().toLowerCase().includes(this.filters.search.toLowerCase())
                );
            
            return matchesSearch &&
                   (!this.filters.category || grant['CATEGORY OF FUNDING ACTIVITY'] === this.filters.category) &&
                   (!this.filters.status || grant['OPPORTUNITY STATUS'] === this.filters.status) &&
                   (!this.filters.agency || grant['AGENCY NAME'] === this.filters.agency);
        });
        
        this.applySorting();
        this.updateStats();
    }
    
    applySorting() {
        if (!this.sortConfig.key) return;
        
        this.filteredGrants.sort((a, b) => {
            const aValue = a[this.sortConfig.key];
            const bValue = b[this.sortConfig.key];
            
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;
            
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return this.sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
            }
            
            const aString = aValue.toString().toLowerCase();
            const bString = bValue.toString().toLowerCase();
            
            if (aString < bString) return this.sortConfig.direction === 'asc' ? -1 : 1;
            if (aString > bString) return this.sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }
    
    handleSort(key) {
        if (this.sortConfig.key === key) {
            this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortConfig.key = key;
            this.sortConfig.direction = 'asc';
        }
        
        document.querySelectorAll('th[data-sort]').forEach(th => {
            th.removeAttribute('data-sort-direction');
        });
        
        const currentHeader = document.querySelector(`th[data-sort="${key}"]`);
        if (currentHeader) {
            currentHeader.setAttribute('data-sort-direction', this.sortConfig.direction);
        }
        
        this.applyFilters();
        this.render();
    }
    
    updateStats() {
        const total = this.grants.length;
        const showing = this.filteredGrants.length;
        
        const totalFunding = this.filteredGrants.reduce((sum, grant) => {
            const funding = grant['ESTIMATED TOTAL FUNDING'];
            return sum + (typeof funding === 'number' ? funding : 0);
        }, 0);
        
        let statsText = `Showing ${showing.toLocaleString()} of ${total.toLocaleString()} grants`;
        if (totalFunding > 0) {
            statsText += ` • Total Funding: ${this.formatCurrency(totalFunding)}`;
        }
        
        document.getElementById('stats').textContent = statsText;
    }
    
    render() {
        this.renderTable();
        this.renderPagination();
    }
    
    renderTable() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        const pageGrants = this.filteredGrants.slice(start, end);
        
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = pageGrants.map(grant => `
            <tr role="row">
                <td>${grant['LINK TO ADDITIONAL INFORMATION'] 
                    ? `<a href="${grant['LINK TO ADDITIONAL INFORMATION']}" target="_blank" class="grant-id">${this.escapeHtml(grant['OPPORTUNITY NUMBER'])}</a>`
                    : `<span class="grant-id">${this.escapeHtml(grant['OPPORTUNITY NUMBER'])}</span>`
                }</td>
                <td><div class="grant-title" title="${this.escapeHtml(grant['OPPORTUNITY TITLE'])}">${this.escapeHtml(grant['OPPORTUNITY TITLE'])}</div></td>
                <td><div class="agency-name" title="${this.escapeHtml(grant['AGENCY NAME'])}">${this.escapeHtml(grant['AGENCY NAME'])}</div></td>
                <td><span class="category-badge" title="${this.escapeHtml(grant['CATEGORY OF FUNDING ACTIVITY'])}">${this.escapeHtml(this.truncateText(grant['CATEGORY OF FUNDING ACTIVITY'], 20))}</span></td>
                <td class="currency">${this.formatCurrency(grant['ESTIMATED TOTAL FUNDING'])}</td>
                <td class="currency">${this.formatCurrency(grant['AWARD CEILING'])}</td>
                <td class="date">${this.formatDate(grant['CLOSE DATE'])}</td>
                <td><span class="status-badge ${this.getStatusClass(grant['OPPORTUNITY STATUS'])}">${this.escapeHtml(grant['OPPORTUNITY STATUS'])}</span></td>
            </tr>
        `).join('');
    }
    
    renderPagination() {
        const totalPages = Math.ceil(this.filteredGrants.length / this.pageSize);
        const start = (this.currentPage - 1) * this.pageSize + 1;
        const end = Math.min(this.currentPage * this.pageSize, this.filteredGrants.length);
        
        document.getElementById('paginationInfo').textContent = 
            `Page ${this.currentPage} of ${totalPages} • ${start}-${end} of ${this.filteredGrants.length}`;
        
        const controls = document.getElementById('paginationControls');
        controls.innerHTML = `
            <button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
                    onclick="window.grantsDB.goToPage(${this.currentPage - 1})">‹</button>
            ${this.generatePageButtons(totalPages)}
            <button class="pagination-btn" ${this.currentPage === totalPages || totalPages === 0 ? 'disabled' : ''} 
                    onclick="window.grantsDB.goToPage(${this.currentPage + 1})">›</button>
        `;
    }
    
    generatePageButtons(totalPages) {
        const buttons = [];
        const maxVisible = 5;
        let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        
        for (let i = start; i <= end; i++) {
            buttons.push(`<button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" onclick="window.grantsDB.goToPage(${i})">${i}</button>`);
        }
        
        return buttons.join('');
    }
    
    goToPage(page) {
        const totalPages = Math.ceil(this.filteredGrants.length / this.pageSize);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.render();
            document.querySelector('.table-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    clearFilters() {
        this.filters = { search: '', category: '', status: '', agency: '' };
        
        document.getElementById('searchInput').value = '';
        ['categoryFilter', 'statusFilter', 'agencyFilter'].forEach(id => {
            document.getElementById(id).value = '';
        });
        
        this.currentPage = 1;
        this.sortConfig = { key: null, direction: 'asc' };
        document.querySelectorAll('th[data-sort]').forEach(th => {
            th.removeAttribute('data-sort-direction');
        });
        
        this.applyFilters();
        this.render();
    }
    
    downloadCSV() {
        if (this.filteredGrants.length === 0) {
            alert('No data to download. Please adjust your filters.');
            return;
        }
        
        const headers = Object.keys(this.filteredGrants[0]);
        const csvContent = [
            headers.join(','),
            ...this.filteredGrants.map(grant => 
                headers.map(header => {
                    const value = grant[header] || '';
                    return `"${String(value).replace(/"/g, '""')}"`;
                }).join(',')
            )
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        const timestamp = new Date().toISOString().split('T')[0];
        link.href = url;
        link.download = `federal-grants-${timestamp}.csv`;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
    
    formatCurrency(amount) {
        if (!amount || amount === 0) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    formatDate(dateStr) {
        if (!dateStr) return 'N/A';
        try {
            return new Date(dateStr).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            });
        } catch { return dateStr; }
    }
    
    getStatusClass(status) {
        switch (status) {
            case 'Posted': return 'status-posted';
            case 'Forecasted': return 'status-forecasted';
            case 'Closed': return 'status-closed';
            default: return 'status-default';
        }
    }
    
    truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text || 'N/A';
        return text.substring(0, maxLength) + '...';
    }
    
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    showMainContent() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }
    
    showError(error) {
        console.error('Database error:', error);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.grantsDB = new GrantsDatabase();
});