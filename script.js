// Banco de dados simulado usando localStorage
const db = {
    leads: JSON.parse(localStorage.getItem('leads')) || [],
    addLead(lead) {
        lead.id = this.leads.length + 1;
        this.leads.push(lead);
        localStorage.setItem('leads', JSON.stringify(this.leads));
        return lead;
    }
};

// Função para mostrar notificações
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Função para rolar até o formulário
function scrollToForm() {
    document.getElementById('lead-form').scrollIntoView({ behavior: 'smooth' });
}

// Manipulação do formulário
document.getElementById('leadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const lead = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    db.addLead(lead);
    showToast('Obrigado pelo seu interesse!');
    this.reset();

    // Log para debug
    console.log('Novo lead adicionado:', lead);
    console.log('Total de leads:', db.leads.length);
});

// Validação de telefone
document.getElementById('phone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 9) {
        value = `${value.slice(0, 9)}-${value.slice(9)}`;
    }

    e.target.value = value;
});