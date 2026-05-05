/**
 * FWStudios API Client
 * Handles all backend communication
 */

// Automatische URL-Erkennung: localhost oder production
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5001'
    : '';

// ============= LEADS API =============

async function getLeads() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads`);
        if (!response.ok) throw new Error('Failed to fetch leads');
        return await response.json();
    } catch (error) {
        console.error('Error fetching leads:', error);
        return [];
    }
}

async function createLead(leadData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData),
        });
        if (!response.ok) throw new Error('Failed to create lead');
        return await response.json();
    } catch (error) {
        console.error('Error creating lead:', error);
        throw error;
    }
}

async function updateLead(timestamp, leadData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads/${timestamp}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData),
        });
        if (!response.ok) throw new Error('Failed to update lead');
        return await response.json();
    } catch (error) {
        console.error('Error updating lead:', error);
        throw error;
    }
}

async function deleteLead(timestamp) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads/${timestamp}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete lead');
        return await response.json();
    } catch (error) {
        console.error('Error deleting lead:', error);
        throw error;
    }
}

async function clearAllLeads() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads/clear`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to clear leads');
        return await response.json();
    } catch (error) {
        console.error('Error clearing leads:', error);
        throw error;
    }
}

// ============= CUSTOMERS API =============

async function getCustomers() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/customers`);
        if (!response.ok) throw new Error('Failed to fetch customers');
        return await response.json();
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
}

async function createCustomer(customerData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });
        if (!response.ok) throw new Error('Failed to create customer');
        return await response.json();
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
}

async function updateCustomer(customerId, customerData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/customers/${customerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData),
        });
        if (!response.ok) throw new Error('Failed to update customer');
        return await response.json();
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
}

async function deleteCustomer(customerId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/customers/${customerId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete customer');
        return await response.json();
    } catch (error) {
        console.error('Error deleting customer:', error);
        throw error;
    }
}

// ============= SETTINGS API =============

async function getSettings() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/settings`);
        if (!response.ok) throw new Error('Failed to fetch settings');
        return await response.json();
    } catch (error) {
        console.error('Error fetching settings:', error);
        return null;
    }
}

async function updateSettings(settingsData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settingsData),
        });
        if (!response.ok) throw new Error('Failed to update settings');
        return await response.json();
    } catch (error) {
        console.error('Error updating settings:', error);
        throw error;
    }
}

async function resetSettings() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/settings/reset`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Failed to reset settings');
        return await response.json();
    } catch (error) {
        console.error('Error resetting settings:', error);
        throw error;
    }
}

// ============= LEGAL PAGES API =============

async function getAllLegal() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/legal`);
        if (!response.ok) throw new Error('Failed to fetch legal pages');
        return await response.json();
    } catch (error) {
        console.error('Error fetching legal pages:', error);
        return null;
    }
}

async function getLegalPage(page) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/legal/${page}`);
        if (!response.ok) throw new Error('Failed to fetch legal page');
        return await response.json();
    } catch (error) {
        console.error('Error fetching legal page:', error);
        return null;
    }
}

async function updateLegalPage(page, pageData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/legal/${page}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pageData),
        });
        if (!response.ok) throw new Error('Failed to update legal page');
        return await response.json();
    } catch (error) {
        console.error('Error updating legal page:', error);
        throw error;
    }
}

async function resetLegal() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/legal/reset`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Failed to reset legal pages');
        return await response.json();
    } catch (error) {
        console.error('Error resetting legal pages:', error);
        throw error;
    }
}
