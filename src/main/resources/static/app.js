const API = '/api/applications';

const form = document.getElementById('app-form');
const tableBody = document.getElementById('table-body');
const filter = document.getElementById('filter');
const message = document.getElementById('message');
const emptyText = document.getElementById('empty');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');

const fields = {
  id: document.getElementById('app-id'),
  company: document.getElementById('company'),
  role: document.getElementById('role'),
  status: document.getElementById('status'),
  appliedDate: document.getElementById('appliedDate'),
  notes: document.getElementById('notes')
};

async function loadApplications() {
  const status = filter.value;
  const url = status ? `${API}?status=${status}` : API;
  const res = await fetch(url);
  const data = await res.json();
  render(data);
}

function render(applications) {
  tableBody.innerHTML = '';
  emptyText.classList.toggle('hidden', applications.length > 0);

  applications.forEach(app => {
    const row = document.createElement('tr');

    addCell(row, app.company);
    addCell(row, app.role);

    const statusCell = document.createElement('td');
    const badge = document.createElement('span');
    badge.className = 'badge ' + app.status;
    badge.textContent = app.status;
    statusCell.appendChild(badge);
    row.appendChild(statusCell);

    addCell(row, app.appliedDate || '');
    addCell(row, app.notes || '');

    const actionCell = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'small';
    editBtn.onclick = () => startEdit(app);
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'small danger';
    delBtn.onclick = () => deleteApplication(app.id);
    actionCell.append(editBtn, ' ', delBtn);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });
}

function addCell(row, text) {
  const cell = document.createElement('td');
  cell.textContent = text;
  row.appendChild(cell);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = '';

  const body = {
    company: fields.company.value.trim(),
    role: fields.role.value.trim(),
    status: fields.status.value,
    appliedDate: fields.appliedDate.value || null,
    notes: fields.notes.value.trim()
  };

  const id = fields.id.value;
  const res = await fetch(id ? `${API}/${id}` : API, {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    const details = error.errors ? Object.values(error.errors).join(', ') : (error.message || 'Something went wrong');
    message.textContent = details;
    return;
  }

  resetForm();
  loadApplications();
});

function startEdit(app) {
  fields.id.value = app.id;
  fields.company.value = app.company;
  fields.role.value = app.role;
  fields.status.value = app.status;
  fields.appliedDate.value = app.appliedDate || '';
  fields.notes.value = app.notes || '';
  formTitle.textContent = 'Edit application';
  cancelBtn.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteApplication(id) {
  if (!confirm('Delete this application?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadApplications();
}

function resetForm() {
  form.reset();
  fields.id.value = '';
  formTitle.textContent = 'Add application';
  cancelBtn.classList.add('hidden');
  message.textContent = '';
}

cancelBtn.addEventListener('click', resetForm);
filter.addEventListener('change', loadApplications);

loadApplications();