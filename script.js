// Travel recommendation data
const recommendations = {
  beaches: [
    {
      name: 'Maldives',
      description: 'Crystal-clear water and white sand make the Maldives a tropical paradise.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
    },
    {
      name: 'Bora Bora',
      description: 'Overwater bungalows and turquoise lagoons in French Polynesia.',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600',
    },
  ],
  temples: [
    {
      name: 'Angkor Wat, Cambodia',
      description: 'The largest religious monument in the world, a Khmer architectural marvel.',
      image: 'https://images.unsplash.com/photo-1532186651327-6ac23687d189?w=600',
    },
    {
      name: 'Kinkaku-ji, Kyoto',
      description: 'The Golden Pavilion, a Zen Buddhist temple covered in gold leaf.',
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600',
    },
  ],
  countries: [
    {
      name: 'Mount Fuji',
      description: "Japan's iconic snow-capped peak, perfect for hiking and photography.",
      image: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?w=600',
      country: 'japan',
    },
    {
      name: 'Tokyo Skyline',
      description: 'A neon-lit metropolis blending tradition with cutting-edge modernity.',
      image: 'https://images.unsplash.com/photo-1545569310-15c45fa18a3c?w=600',
      country: 'japan',
    },
  ],
};

function renderCards(items, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = items
    .map(
      (item) => `
    <article class="card">
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    </article>
  `
    )
    .join('');
}

function showSearchResults(term) {
  const sections = document.querySelectorAll('.recommendations');
  const lower = term.toLowerCase().trim();

  if (!lower) {
    sections.forEach((s) => (s.style.display = ''));
    return;
  }

  let matched = false;
  sections.forEach((s) => {
    const dataType = s.dataset.type;
    if (lower.includes('beach') && dataType === 'beaches') {
      s.style.display = '';
      matched = true;
    } else if (lower.includes('temple') && dataType === 'temples') {
      s.style.display = '';
      matched = true;
    } else if ((lower.includes('country') || lower.includes('japan')) && dataType === 'countries') {
      s.style.display = '';
      matched = true;
    } else {
      s.style.display = 'none';
    }
  });

  if (!matched) {
    sections.forEach((s) => (s.style.display = ''));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Render recommendations on home page
  renderCards(recommendations.beaches, 'beach-cards');
  renderCards(recommendations.temples, 'temple-cards');
  renderCards(recommendations.countries, 'country-cards');

  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const clearBtn = document.getElementById('clear-btn');

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      showSearchResults(searchInput.value);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      showSearchResults('');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        showSearchResults(searchInput.value);
      }
    });
  }

  // Apply ?q= query param if present
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q && searchInput) {
    searchInput.value = q;
    showSearchResults(q);
  }

  // Contact form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const data = new FormData(form);
      const name = data.get('name');
      status.textContent = `Thanks ${name}! Your message has been received.`;
      form.reset();
    });
  }
});
