// Pet Care Platform JavaScript

// Application Data
const appData = {
  serviceProviders: [
    {
      id: 1,
      name: "Happy Paws Veterinary Clinic",
      type: "veterinary",
      rating: 4.8,
      address: "123 Pet Street, Halifax, NS",
      phone: "(902) 123-4567",
      lat: 44.6488,
      lng: -63.5752,
      services: ["checkups", "emergency", "surgery", "dental"],
      price_range: "$$$",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop",
      description: "Full-service veterinary clinic with experienced doctors and state-of-the-art equipment"
    },
    {
      id: 2,
      name: "Furry Friends Grooming",
      type: "grooming",
      rating: 4.6,
      address: "456 Bark Avenue, Halifax, NS",
      phone: "(902) 234-5678",
      lat: 44.6548,
      lng: -63.5912,
      services: ["full_grooming", "nail_trimming", "teeth_cleaning"],
      price_range: "$$",
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=300&fit=crop",
      description: "Professional grooming services for all breeds with gentle care"
    },
    {
      id: 3,
      name: "PetWalk Pro",
      type: "walking",
      rating: 4.9,
      address: "789 Tail Lane, Halifax, NS",
      phone: "(902) 345-6789",
      lat: 44.6388,
      lng: -63.5652,
      services: ["dog_walking", "pet_sitting", "overnight_care"],
      price_range: "$",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      description: "Trusted pet walking and sitting services with GPS tracking"
    },
    {
      id: 4,
      name: "All Pets Boarding",
      type: "boarding",
      rating: 4.7,
      address: "321 Woof Way, Halifax, NS",
      phone: "(902) 456-7890",
      lat: 44.6588,
      lng: -63.5852,
      services: ["day_boarding", "overnight_boarding", "playtime"],
      price_range: "$$",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
      description: "Safe and fun boarding facility with 24/7 supervision"
    }
  ],
  forumPosts: [
    {
      id: 1,
      title: "Best Dog Food for Senior Dogs?",
      author: "PetLover123",
      category: "nutrition",
      timestamp: "2 hours ago",
      replies: 12,
      likes: 8,
      content: "My 10-year-old Golden Retriever is getting picky with food. Any recommendations for senior dog food brands?"
    },
    {
      id: 2,
      title: "Training Tips for Rescue Cats",
      author: "CatWhisperer",
      category: "training",
      timestamp: "5 hours ago",
      replies: 7,
      likes: 15,
      content: "Just adopted a 2-year-old rescue cat. She's very shy and hides under the bed. How can I help her adjust?"
    },
    {
      id: 3,
      title: "Emergency Vet Recommendations in Halifax",
      author: "DogDad2023",
      category: "health",
      timestamp: "1 day ago",
      replies: 18,
      likes: 22,
      content: "Looking for a reliable 24-hour emergency vet clinic. My dog ate something he shouldn't have."
    },
    {
      id: 4,
      title: "Puppy Socialization Classes",
      author: "NewPupMom",
      category: "training",
      timestamp: "2 days ago",
      replies: 5,
      likes: 12,
      content: "My 12-week-old puppy needs socialization. What are the best puppy classes in the Halifax area?"
    }
  ],
  petProfiles: [
    {
      id: 1,
      name: "Buddy",
      type: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      weight: "30 kg",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop",
      owner: "John Smith",
      special_needs: "None",
      vaccinations: "Up to date"
    },
    {
      id: 2,
      name: "Whiskers",
      type: "Cat",
      breed: "Maine Coon",
      age: "2 years",
      weight: "5 kg",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop",
      owner: "Sarah Johnson",
      special_needs: "Indoor only",
      vaccinations: "Up to date"
    }
  ],
  bookings: [
    {
      id: 1,
      pet_id: 1,
      service_provider_id: 1,
      service_type: "checkup",
      date: "2025-06-10",
      time: "10:00 AM",
      status: "confirmed",
      notes: "Regular wellness checkup"
    },
    {
      id: 2,
      pet_id: 2,
      service_provider_id: 2,
      service_type: "full_grooming",
      date: "2025-06-12",
      time: "2:00 PM",
      status: "pending",
      notes: "Full grooming with nail trim"
    }
  ]
};

// Application State
let currentSection = 'home';
let currentFilter = 'all';
let selectedProvider = null;

// Global functions for inline event handlers
window.openBookingModal = openBookingModal;
window.viewProviderDetails = viewProviderDetails;
window.showProviderInfo = showProviderInfo;
window.likePost = likePost;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeQuickActions();
  initializeServiceProviders();
  initializeMap();
  initializeForum();
  initializePetProfiles();
  initializeBookingSystem();
  renderDashboard();
  setTodayDate();
});

// Navigation System
function initializeNavigation() {
  const navItems = document.querySelectorAll('.nav__item');
  const sections = document.querySelectorAll('.section');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetSection = item.dataset.section;
      
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('nav__item--active'));
      item.classList.add('nav__item--active');
      
      // Update active section
      sections.forEach(section => section.classList.remove('section--active'));
      document.getElementById(targetSection).classList.add('section--active');
      
      currentSection = targetSection;
      
      // Refresh content if needed
      if (targetSection === 'map') {
        renderMap();
      }
    });
  });
}

// Quick Actions
function initializeQuickActions() {
  const actionCards = document.querySelectorAll('.action-card');
  
  actionCards.forEach(card => {
    card.addEventListener('click', () => {
      const action = card.dataset.action;
      
      switch(action) {
        case 'book-vet':
          navigateToSection('booking');
          filterServices('veterinary');
          break;
        case 'find-groomer':
          navigateToSection('map');
          document.getElementById('map-filter').value = 'grooming';
          renderMap();
          break;
        case 'join-discussion':
          navigateToSection('community');
          break;
      }
    });
  });
}

function navigateToSection(section) {
  document.querySelector(`[data-section="${section}"]`).click();
}

// Service Providers
function initializeServiceProviders() {
  renderServiceProviders();
  
  const categoryFilters = document.querySelectorAll('.category-filter');
  categoryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.category;
      
      categoryFilters.forEach(f => f.classList.remove('category-filter--active'));
      filter.classList.add('category-filter--active');
      
      currentFilter = category;
      renderServiceProviders();
    });
  });
}

function renderServiceProviders() {
  const container = document.getElementById('service-providers');
  const providers = currentFilter === 'all' 
    ? appData.serviceProviders 
    : appData.serviceProviders.filter(p => p.type === currentFilter);
  
  container.innerHTML = providers.map(provider => `
    <div class="provider-card fade-in">
      <img src="${provider.image}" alt="${provider.name}" class="provider-card__image">
      <div class="provider-card__content">
        <div class="provider-card__header">
          <h3 class="provider-card__title">${provider.name}</h3>
          <div class="provider-card__rating">
            <span>⭐</span>
            <span>${provider.rating}</span>
          </div>
        </div>
        <div class="provider-card__address">${provider.address}</div>
        <div class="provider-card__description">${provider.description}</div>
        <div class="provider-card__services">
          ${provider.services.map(service => `
            <span class="service-tag">${formatServiceName(service)}</span>
          `).join('')}
        </div>
        <div class="provider-card__actions">
          <button class="btn btn--primary book-now-btn" data-provider-id="${provider.id}">Book Now</button>
          <button class="btn btn--outline view-details-btn" data-provider-id="${provider.id}">View Details</button>
        </div>
      </div>
    </div>
  `).join('');
  
  // Add event listeners to buttons after rendering
  container.querySelectorAll('.book-now-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const providerId = parseInt(btn.dataset.providerId);
      openBookingModal(providerId);
    });
  });
  
  container.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const providerId = parseInt(btn.dataset.providerId);
      viewProviderDetails(providerId);
    });
  });
}

function formatServiceName(service) {
  return service.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function filterServices(category) {
  document.querySelector(`[data-category="${category}"]`).click();
}

// Map System
function initializeMap() {
  const mapFilter = document.getElementById('map-filter');
  mapFilter.addEventListener('change', renderMap);
  renderMap();
}

function renderMap() {
  const mapContainer = document.getElementById('map-markers');
  const serviceList = document.getElementById('map-service-list');
  const filter = document.getElementById('map-filter').value;
  
  const providers = filter === 'all' 
    ? appData.serviceProviders 
    : appData.serviceProviders.filter(p => p.type === filter);
  
  // Render map markers
  mapContainer.innerHTML = providers.map((provider, index) => {
    const left = 20 + (index * 25) % 60;
    const top = 20 + (index * 15) % 50;
    
    return `
      <div class="map-marker map-marker--${provider.type}" 
           style="left: ${left}%; top: ${top}%;"
           data-provider-id="${provider.id}"
           title="${provider.name}">
        ${getServiceIcon(provider.type)}
      </div>
    `;
  }).join('');
  
  // Add event listeners to markers
  mapContainer.querySelectorAll('.map-marker').forEach(marker => {
    marker.addEventListener('click', () => {
      const providerId = parseInt(marker.dataset.providerId);
      showProviderInfo(providerId);
    });
  });
  
  // Render service list
  serviceList.innerHTML = providers.map(provider => `
    <div class="map-service-item" data-provider-id="${provider.id}">
      <h4>${provider.name}</h4>
      <p>${provider.address}</p>
      <div class="provider-card__rating">
        <span>⭐</span>
        <span>${provider.rating}</span>
      </div>
    </div>
  `).join('');
  
  // Add event listeners to service list items
  serviceList.querySelectorAll('.map-service-item').forEach(item => {
    item.addEventListener('click', () => {
      const providerId = parseInt(item.dataset.providerId);
      showProviderInfo(providerId);
    });
  });
}

function getServiceIcon(type) {
  const icons = {
    veterinary: '🏥',
    grooming: '✂️',
    walking: '🚶',
    boarding: '🏠',
    training: '🎓'
  };
  return icons[type] || '🐾';
}

function showProviderInfo(providerId) {
  const provider = appData.serviceProviders.find(p => p.id === providerId);
  if (provider) {
    alert(`${provider.name}\n${provider.address}\n${provider.phone}\nRating: ${provider.rating}/5`);
  }
}

// Forum System
function initializeForum() {
  renderForumPosts();
  
  const forumCategories = document.querySelectorAll('.forum-category');
  forumCategories.forEach(category => {
    category.addEventListener('click', () => {
      const categoryType = category.dataset.category;
      
      forumCategories.forEach(c => c.classList.remove('forum-category--active'));
      category.classList.add('forum-category--active');
      
      renderForumPosts(categoryType);
    });
  });
  
  // New post button
  document.getElementById('new-post-btn').addEventListener('click', () => {
    openModal('post-modal');
  });
  
  // Post form
  document.getElementById('post-form').addEventListener('submit', handleNewPost);
}

function renderForumPosts(categoryFilter = 'all') {
  const container = document.getElementById('forum-posts');
  const posts = categoryFilter === 'all' 
    ? appData.forumPosts 
    : appData.forumPosts.filter(p => p.category === categoryFilter);
  
  container.innerHTML = posts.map(post => `
    <div class="forum-post fade-in">
      <div class="forum-post__header">
        <h3 class="forum-post__title">${post.title}</h3>
        <span class="forum-post__category" style="background-color: ${getCategoryColor(post.category)}">
          ${formatCategoryName(post.category)}
        </span>
      </div>
      <div class="forum-post__meta">
        <span>By ${post.author}</span>
        <span>${post.timestamp}</span>
      </div>
      <div class="forum-post__content">${post.content}</div>
      <div class="forum-post__actions">
        <button class="forum-post__action like-btn" data-post-id="${post.id}">
          👍 ${post.likes}
        </button>
        <button class="forum-post__action">
          💬 ${post.replies} replies
        </button>
      </div>
    </div>
  `).join('');
  
  // Add event listeners to like buttons
  container.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = parseInt(btn.dataset.postId);
      likePost(postId);
    });
  });
}

function getCategoryColor(category) {
  const colors = {
    health: '#e74c3c',
    nutrition: '#27ae60',
    training: '#3498db',
    general: '#9b59b6'
  };
  return colors[category] || '#9b59b6';
}

function formatCategoryName(category) {
  const names = {
    health: 'Health & Wellness',
    nutrition: 'Nutrition',
    training: 'Training & Behavior',
    general: 'General Discussion'
  };
  return names[category] || category;
}

function likePost(postId) {
  const post = appData.forumPosts.find(p => p.id === postId);
  if (post) {
    post.likes++;
    renderForumPosts();
  }
}

function handleNewPost(e) {
  e.preventDefault();
  
  const title = document.getElementById('post-title').value;
  const category = document.getElementById('post-category').value;
  const content = document.getElementById('post-content').value;
  
  const newPost = {
    id: appData.forumPosts.length + 1,
    title,
    category,
    content,
    author: 'You',
    timestamp: 'Just now',
    replies: 0,
    likes: 0
  };
  
  appData.forumPosts.unshift(newPost);
  renderForumPosts();
  closeModal('post-modal');
  e.target.reset();
}

// Pet Profiles
function initializePetProfiles() {
  renderPetProfiles();
  renderBookingHistory();
  
  document.getElementById('add-pet-btn').addEventListener('click', () => {
    alert('Add Pet functionality would be implemented here');
  });
}

function renderPetProfiles() {
  const container = document.getElementById('pet-profiles');
  
  container.innerHTML = appData.petProfiles.map(pet => `
    <div class="pet-card fade-in">
      <img src="${pet.image}" alt="${pet.name}" class="pet-card__image">
      <div class="pet-card__content">
        <h3 class="pet-card__name">${pet.name}</h3>
        <div class="pet-card__details">
          <p><strong>Type:</strong> ${pet.type}</p>
          <p><strong>Breed:</strong> ${pet.breed}</p>
          <p><strong>Age:</strong> ${pet.age}</p>
          <p><strong>Weight:</strong> ${pet.weight}</p>
          <p><strong>Vaccinations:</strong> ${pet.vaccinations}</p>
          ${pet.special_needs !== 'None' ? `<p><strong>Special Needs:</strong> ${pet.special_needs}</p>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function renderBookingHistory() {
  const container = document.getElementById('booking-history');
  
  container.innerHTML = appData.bookings.map(booking => {
    const pet = appData.petProfiles.find(p => p.id === booking.pet_id);
    const provider = appData.serviceProviders.find(p => p.id === booking.service_provider_id);
    
    return `
      <div class="booking-item fade-in">
        <div class="booking-item__details">
          <h4>${formatServiceName(booking.service_type)} for ${pet.name}</h4>
          <p>${provider.name} • ${booking.date} at ${booking.time}</p>
          ${booking.notes ? `<p>Notes: ${booking.notes}</p>` : ''}
        </div>
        <span class="status status--${booking.status === 'confirmed' ? 'success' : 'warning'}">
          ${booking.status.toUpperCase()}
        </span>
      </div>
    `;
  }).join('');
}

// Booking System
function initializeBookingSystem() {
  // Populate pet dropdown
  const petSelect = document.getElementById('booking-pet');
  petSelect.innerHTML = '<option value="">Choose your pet</option>' + 
    appData.petProfiles.map(pet => `<option value="${pet.id}">${pet.name}</option>`).join('');
  
  // Handle booking form
  document.getElementById('booking-form').addEventListener('submit', handleBooking);
  
  // Modal controls
  initializeModals();
}

function openBookingModal(providerId) {
  selectedProvider = appData.serviceProviders.find(p => p.id === providerId);
  
  if (selectedProvider) {
    // Populate service dropdown
    const serviceSelect = document.getElementById('booking-service');
    serviceSelect.innerHTML = '<option value="">Choose service</option>' + 
      selectedProvider.services.map(service => 
        `<option value="${service}">${formatServiceName(service)}</option>`
      ).join('');
    
    openModal('booking-modal');
  }
}

function handleBooking(e) {
  e.preventDefault();
  
  const petId = parseInt(document.getElementById('booking-pet').value);
  const service = document.getElementById('booking-service').value;
  const date = document.getElementById('booking-date').value;
  const time = document.getElementById('booking-time').value;
  const notes = document.getElementById('booking-notes').value;
  
  const newBooking = {
    id: appData.bookings.length + 1,
    pet_id: petId,
    service_provider_id: selectedProvider.id,
    service_type: service,
    date,
    time,
    status: 'pending',
    notes
  };
  
  appData.bookings.push(newBooking);
  renderBookingHistory();
  renderDashboard();
  closeModal('booking-modal');
  e.target.reset();
  
  alert('Booking confirmed! You can view it in your booking history.');
}

// Modal System
function initializeModals() {
  const modals = document.querySelectorAll('.modal');
  
  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal__close');
    
    closeBtn.addEventListener('click', () => {
      closeModal(modal.id);
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal.id);
      }
    });
  });
}

function openModal(modalId) {
  document.getElementById(modalId).classList.add('modal--active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('modal--active');
}

// Dashboard
function renderDashboard() {
  renderRecentBookings();
  renderRecentForum();
}

function renderRecentBookings() {
  const container = document.getElementById('recent-bookings');
  const recentBookings = appData.bookings.slice(-3);
  
  container.innerHTML = recentBookings.map(booking => {
    const pet = appData.petProfiles.find(p => p.id === booking.pet_id);
    const provider = appData.serviceProviders.find(p => p.id === booking.service_provider_id);
    
    return `
      <div class="booking-item">
        <div class="booking-item__details">
          <h5>${formatServiceName(booking.service_type)} for ${pet.name}</h5>
          <p>${provider.name} • ${booking.date}</p>
        </div>
        <span class="status status--${booking.status === 'confirmed' ? 'success' : 'warning'}">
          ${booking.status.toUpperCase()}
        </span>
      </div>
    `;
  }).join('');
}

function renderRecentForum() {
  const container = document.getElementById('recent-forum');
  const recentPosts = appData.forumPosts.slice(0, 3);
  
  container.innerHTML = recentPosts.map(post => `
    <div class="forum-post__item" style="padding: 12px 0; border-bottom: 1px solid var(--color-border);">
      <h5 style="margin: 0 0 4px 0; font-size: 14px;">${post.title}</h5>
      <p style="margin: 0; font-size: 12px; color: var(--color-text-secondary);">
        ${post.author} • ${post.timestamp} • ${post.replies} replies
      </p>
    </div>
  `).join('');
}

// Utility Functions
function setTodayDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dateInput = document.getElementById('booking-date');
  dateInput.min = tomorrow.toISOString().split('T')[0];
  dateInput.value = tomorrow.toISOString().split('T')[0];
}

function viewProviderDetails(providerId) {
  const provider = appData.serviceProviders.find(p => p.id === providerId);
  if (provider) {
    alert(`${provider.name}\n\n${provider.description}\n\nServices: ${provider.services.map(formatServiceName).join(', ')}\n\nAddress: ${provider.address}\nPhone: ${provider.phone}\nRating: ${provider.rating}/5\nPrice Range: ${provider.price_range}`);
  }
}