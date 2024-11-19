// Credenciais do admin (em produção, isso deveria estar no backend)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'password'
};

// Função para fazer login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('leadsTable').classList.remove('hidden');
        loadLeads();
        showToast('Login realizado com sucesso!');
    } else {
        showToast('Credenciais inválidas!');
    }
}

// Função para fazer logout
function logout() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('leadsTable').classList.add('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    showToast('Logout realizado com sucesso!');
}

// Função para carregar os leads na tabela
function loadLeads() {
    const leads = JSON.parse(localStorage.getItem('leads')) || [];
    const tableBody = document.getElementById('leadsTableBody');
    tableBody.innerHTML = '';

    leads.forEach(lead => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lead.id}</td>
            <td>${lead.firstName}</td>
            <td>${lead.lastName}</td>
            <td>${lead.email}</td>
            <td>${lead.phone}</td>
        `;
        tableBody.appendChild(row);
    });

    // Log para debug
    console.log('Leads carregados:', leads.length);
}

// Função para mostrar notificações
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}