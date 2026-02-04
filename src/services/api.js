const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://projectfarmbackend.vercel.app/api';

// Helper function to handle fetch requests
const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('adminToken');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, config);

        // Handle 401 Unauthorized
        if (response.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/admin/login';
            throw new Error('Unauthorized');
        }

        // Parse JSON response
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Request failed');
        }

        return data;
    } catch (error) {
        throw error;
    }
};

// ============ AUTH API ============
export const authAPI = {
    login: (credentials) =>
        fetchWithAuth('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        }),

    register: (userData) =>
        fetchWithAuth('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),

    verifyToken: () =>
        fetchWithAuth('/auth/verify', {
            method: 'GET',
        }),
};

// ============ PRODUCTS API ============
export const productsAPI = {
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `/products?${queryString}` : '/products';
        return fetchWithAuth(url, { method: 'GET' });
    },

    getById: (id) =>
        fetchWithAuth(`/products/${id}`, { method: 'GET' }),

    create: (data) =>
        fetchWithAuth('/products', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    update: (id, data) =>
        fetchWithAuth(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: (id) =>
        fetchWithAuth(`/products/${id}`, { method: 'DELETE' }),
};

// ============ VLOGS API ============
export const vlogsAPI = {
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `/vlogs?${queryString}` : '/vlogs';
        return fetchWithAuth(url, { method: 'GET' });
    },

    getById: (id) =>
        fetchWithAuth(`/vlogs/${id}`, { method: 'GET' }),

    create: (data) =>
        fetchWithAuth('/vlogs', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    update: (id, data) =>
        fetchWithAuth(`/vlogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: (id) =>
        fetchWithAuth(`/vlogs/${id}`, { method: 'DELETE' }),
};

// ============ ARTICLES API ============
export const articlesAPI = {
    getAll: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `/articles?${queryString}` : '/articles';
        return fetchWithAuth(url, { method: 'GET' });
    },

    getById: (id) =>
        fetchWithAuth(`/articles/${id}`, { method: 'GET' }),

    create: (data) =>
        fetchWithAuth('/articles', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    update: (id, data) =>
        fetchWithAuth(`/articles/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    delete: (id) =>
        fetchWithAuth(`/articles/${id}`, { method: 'DELETE' }),
};
