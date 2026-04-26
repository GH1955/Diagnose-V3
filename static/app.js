const form = document.getElementById('chatForm');
const textarea = document.getElementById('question');
const messages = document.getElementById('messages');
const statusEl = document.getElementById('status');
const sendBtn = document.getElementById('sendBtn');

const history = [];

function addMessage(role, text) {
  const article = document.createElement('article');
  article.className = `message ${role}`;
  article.innerHTML = `
    <div class="message-role">${role === 'user' ? 'Du' : 'Assistenz'}</div>
    <div class="message-body"></div>
  `;
  article.querySelector('.message-body').textContent = text;
  messages.appendChild(article);
  messages.scrollTop = messages.scrollHeight;
}

async function ask(question) {
  addMessage('user', question);
  history.push({ role: 'user', content: question });
  statusEl.textContent = 'Antwort wird geladen ...';
  sendBtn.disabled = true;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Unbekannter Fehler');
    addMessage('assistant', data.answer);
    history.push({ role: 'assistant', content: data.answer });
    statusEl.textContent = 'Bereit';
  } catch (error) {
    addMessage('assistant', 'Es gab ein Problem beim Laden der Antwort: ' + error.message);
    statusEl.textContent = 'Fehler';
  } finally {
    sendBtn.disabled = false;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = textarea.value.trim();
  if (!question) return;
  textarea.value = '';
  ask(question);
});

document.querySelectorAll('.example-btn').forEach((button) => {
  button.addEventListener('click', () => {
    textarea.value = button.dataset.question;
    form.requestSubmit();
  });
});
