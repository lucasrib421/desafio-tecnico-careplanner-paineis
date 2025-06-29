document.addEventListener('DOMContentLoaded', () => {
  
  const API_BASE = '/api';

  function getCSRFToken() {
    const cookieValue = document.cookie.split('; ')
      .find(row => row.startsWith('csrftoken='))
      ?.split('=')[1];
    return cookieValue;
  }

  async function fetchBuckets() {
    const res = await fetch(`${API_BASE}/buckets/`);
    return await res.json();
  }

  async function fetchCards() {
    const res = await fetch(`${API_BASE}/cards/`);
    return await res.json();
  }

  async function updateCardBucket(cardId, bucketId) {
    await fetch(`${API_BASE}/cards/${cardId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken()
      },
      body: JSON.stringify({bucket: bucketId})
    });
  }

  function createCardElement(card, buckets) {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    
    const cardHeader = document.createElement('div');
    cardHeader.style.display = 'flex';
    cardHeader.style.justifyContent = 'space-between';
    cardHeader.style.alignItems = 'center';
    
    const cardTitle = document.createElement('span');
    cardTitle.textContent = `${card.name} - ${card.admission_date}`;
    cardTitle.style.fontWeight = '500';
    
    const cardStatus = document.createElement('span');
    cardStatus.textContent = `ID: ${card.id}`;
    cardStatus.style.fontSize = '0.8em';
    cardStatus.style.color = 'var(--dark-gray)';
    
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cardStatus);
    cardEl.appendChild(cardHeader);
    
    const cardActions = document.createElement('div');
    cardActions.className = 'card-actions';
    
    const currentBucketIndex = buckets.findIndex(b => b.id === card.bucket);
    
    if(currentBucketIndex > 0) {
      const btnLeft = document.createElement('button');
      btnLeft.innerHTML = '<i class="fas fa-arrow-left"></i>';
      btnLeft.className = 'move-btn';
      btnLeft.onclick = async (e) => {
        e.stopPropagation();
        await updateCardBucket(card.id, buckets[currentBucketIndex - 1].id);
        loadKanban();
      };
      cardActions.appendChild(btnLeft);
    }
    
    if(currentBucketIndex < buckets.length - 1) {
      const btnRight = document.createElement('button');
      btnRight.innerHTML = '<i class="fas fa-arrow-right"></i>';
      btnRight.className = 'move-btn';
      btnRight.onclick = async (e) => {
        e.stopPropagation();
        await updateCardBucket(card.id, buckets[currentBucketIndex + 1].id);
        loadKanban();
      };
      cardActions.appendChild(btnRight);
    }
    
    cardEl.appendChild(cardActions);
    cardEl.onclick = () => showModal(card);
    return cardEl;
  }

  function showModal(card) {
    const modal = document.getElementById('modal');
    const content = document.getElementById('modal-details');
    content.innerHTML = `
      <p><b><i class="fas fa-user"></i> Nome:</b> ${card.name}</p>
      <p><b><i class="fas fa-heart"></i> Estado Civil:</b> ${card.marital_status}</p>
      <p><b><i class="fas fa-birthday-cake"></i> Idade:</b> ${card.age}</p>
      <p><b><i class="fas fa-venus-mars"></i> Sexo:</b> ${card.gender}</p>
      <p><b><i class="fas fa-calendar-day"></i> Data de Admissão:</b> ${card.admission_date}</p>
      ${card.notes ? `<p><b><i class="fas fa-sticky-note"></i> Observações:</b> ${card.notes}</p>` : ''}
    `;
    modal.classList.add('active');
  }

  document.getElementById('modal-close').onclick = () => {
    document.getElementById('modal').classList.remove('active');
  };

  document.querySelector('.btn-close').onclick = () => {
    document.getElementById('modal').classList.remove('active');
  };

  document.getElementById('refresh-btn').onclick = loadKanban;

  async function loadKanban() {
    try {
      const [buckets, cards] = await Promise.all([
        fetchBuckets(),
        fetchCards()
      ]);

      const kanban = document.getElementById('kanban');
      kanban.innerHTML = '';

      buckets.forEach(bucket => {
        const bucketEl = document.createElement('div');
        bucketEl.className = 'bucket';
        bucketEl.innerHTML = `<h3>${bucket.name}</h3>`;
        const cardsInBucket = cards.filter(c => c.bucket === bucket.id);
        
        if (cardsInBucket.length === 0) {
          const emptyMsg = document.createElement('div');
          emptyMsg.textContent = 'Nenhum paciente';
          emptyMsg.style.color = 'var(--dark-gray)';
          emptyMsg.style.textAlign = 'center';
          emptyMsg.style.padding = '10px';
          bucketEl.appendChild(emptyMsg);
        } else {
          cardsInBucket.forEach(card => {
            bucketEl.appendChild(createCardElement(card, buckets));
          });
        }
        
        kanban.appendChild(bucketEl);
      });
    } catch (error) {
      console.error('Erro ao carregar kanban:', error);
      alert('Erro ao carregar dados. Tente novamente.');
    }
  }

  loadKanban();
});
