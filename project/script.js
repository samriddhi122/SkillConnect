// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all tutor cards and category cards
    document.querySelectorAll('.tutor-card, .category-card, .dashboard-card').forEach(card => {
        observer.observe(card);
    });
});

// WhatsApp contact functionality
function contactWhatsApp(phoneNumber) {
    const message = encodeURIComponent("Hi! I'm interested in learning from you through SkillConnect. Can we discuss the details?");
    const whatsappURL = `https://wa.me/91${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
}

// // Search functionality
// function performSearch() {
//     const searchInput = document.querySelector('.search-input');
//     const skillFilter = document.querySelector('.filter-select');
//     const locationFilter = document.querySelector('.filter-input');
    
//     if (searchInput) {
//         const searchTerm = searchInput.value.toLowerCase().trim();
//         const selectedSkill = skillFilter ? skillFilter.value : '';
//         const location = locationFilter ? locationFilter.value.toLowerCase().trim() : '';
        
//         // Get all tutor cards
//         const tutorCards = document.querySelectorAll('.tutor-card');
        
//         tutorCards.forEach(card => {
//             const tutorName = card.querySelector('.tutor-name').textContent.toLowerCase();
//             const skillTags = Array.from(card.querySelectorAll('.skill-tag')).map(tag => tag.textContent.toLowerCase());
//             const tutorLocation = card.querySelector('.tutor-location').textContent.toLowerCase();
            
//             let matchesSearch = !searchTerm || tutorName.includes(searchTerm) || skillTags.some(skill => skill.includes(searchTerm));
//             let matchesSkill = !selectedSkill || skillTags.some(skill => skill.includes(selectedSkill.toLowerCase()));
//             let matchesLocation = !location || tutorLocation.includes(location);
            
//             if (matchesSearch && matchesSkill && matchesLocation) {
//                 card.style.display = 'block';
//                 card.classList.add('fade-in');
//             } else {
//                 card.style.display = 'none';
//             }
//         });
//     }
// }

// // Add search event listeners
// document.addEventListener('DOMContentLoaded', function() {
//     const searchBtn = document.querySelector('.search-btn');
//     const searchInput = document.querySelector('.search-input');
//     const filterSelects = document.querySelectorAll('.filter-select');
//     const filterInputs = document.querySelectorAll('.filter-input');

//     if (searchBtn) {
//         searchBtn.addEventListener('click', performSearch);
//     }

//     if (searchInput) {
//         searchInput.addEventListener('keypress', function(e) {
//             if (e.key === 'Enter') {
//                 performSearch();
//             }
//         });
//     }

//     // Add event listeners to filters
//     filterSelects.forEach(select => {
//         select.addEventListener('change', performSearch);
//     });

//     filterInputs.forEach(input => {
//         input.addEventListener('input', debounce(performSearch, 300));
//     });
// });

// // Debounce function for search
// function debounce(func, wait) {
//     let timeout;
//     return function executedFunction(...args) {
//         const later = () => {
//             clearTimeout(timeout);
//             func(...args);
//         };
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//     };
// }
function show(el, on) {
  if (!el) return;
  el.style.display = on ? 'block' : 'none';
}

async function performSearch() {
  const loader = document.getElementById('loader');
  const error  = document.getElementById('error');
  const empty  = document.getElementById('empty');

  show(loader, true);
  show(error, false);
  show(empty, false);

  // Read from the hero fields (by id)
  const q          = (document.getElementById('q')?.value || '').trim();
  const skill      = (document.getElementById('skill')?.value || '').trim();
  const location   = (document.getElementById('location')?.value || '').trim();
  const priceRange = (document.getElementById('priceRange')?.value || '').trim();
  const rating     = (document.getElementById('rating')?.value || '').trim();

  try {
    const tutors = [
  {
    id: 1,
    name: "Priya Sharma",
    photo: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.8,
    skills: ["Cooking", "Baking"],
    city: "Mumbai",
    pincode: "400001",
    pricePerSession: 800,
    whatsapp: "9876543210"
  },
  {
    id: 2,
    name: "Anjali Patel",
    photo: "https://images.pexels.com/photos/3768146/pexels-photo-3768146.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.9,
    skills: ["Mehendi", "Dance"],
    city: "Delhi",
    pincode: "110001",
    pricePerSession: 600,
    whatsapp: "9876543211"
  },
];

    // const { data } = await axios.get('/api/tutors/search', {
    //   params: { q, skill, location, priceRange, rating }
    // });
    //uncomment these lines to fetch from backend


    // const tutors = data.tutors || [];
    renderTutors(tutors);

    if (tutors.length === 0) show(empty, true);

    // Smooth scroll to the tutors list
    const findTutorsSection = document.getElementById('find-tutors');
    if (findTutorsSection) {
      findTutorsSection.scrollIntoView({ behavior: 'smooth' });
    }
  } catch (e) {
    error.textContent = e?.response?.data?.message || e.message;
    show(error, true);
  } finally {
    show(loader, false);
  }
}


function renderTutors(tutors) {
  const container = document.getElementById('tutors-container');
  container.innerHTML = '';

  tutors.forEach(t => {
    const el = document.createElement('div');
    el.className = 'tutor-card';
    el.innerHTML = `
      <div class="tutor-image">
        <img src="${escapeHTML(t.photo)}" alt="${escapeHTML(t.name)}">
        <div class="rating-badge">
          <i class="fas fa-star"></i>
          <span>${t.rating}</span>
        </div>
      </div>
      <div class="tutor-info">
        <h3 class="tutor-name">${escapeHTML(t.name)}</h3>
        <div class="skill-tags">
          ${t.skills.map(s => `<span class="skill-tag">${escapeHTML(s)}</span>`).join('')}
        </div>
        <p class="tutor-location">
          <i class="fas fa-map-marker-alt"></i> ${escapeHTML(t.city)} (${escapeHTML(t.pincode)})
        </p>
        <div class="tutor-pricing">
          <span class="price">₹${t.pricePerSession}/session</span>
        </div>
        <button class="whatsapp-btn" onclick="contactWhatsApp('${t.whatsapp}')">
          <i class="fab fa-whatsapp"></i> Contact via WhatsApp
        </button>
      </div>
    `;
    container.appendChild(el);
  });
}


function escapeHTML(str = '') {
  return str.replace(/[&<>"']/g, m => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[m]));
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
document.addEventListener('DOMContentLoaded', () => {
  fetchTutors();          // <-- runs every time you refresh / load the page
});

async function fetchTutors(page = 1, limit = 20) {

  try {
    const { data } = await axios.get('http://localhost:8000/api/tutors', {
      params: { page, limit }
    });
        // after you get the response
    const rawTutors = data.data || [];

    // If your files are /public/images/pic1.jpg, pic2.jpg, ...
    const tutors = rawTutors.map((t, i) => ({
    ...t,
    photo: `/p${i + 1}.jpg`
    }));

    console.log('Fetched tutors:', tutors);
      renderTutors(tutors);

    if (tutors.length === 0) show(empty, true);

    // Smooth scroll to the tutors list
    const findTutorsSection = document.getElementById('find-tutors');
    if (findTutorsSection) {
      findTutorsSection.scrollIntoView({ behavior: 'smooth' });
    }
    } catch (e) {
        error.textContent = e?.response?.data?.message || e.message;
        show(error, true);
    } finally {
        show(loader, false);
    }
}
// document.addEventListener('DOMContentLoaded', () => {
//   const searchBtn = document.getElementById('searchBtn');
//   const qInput = document.getElementById('q');
//   const skill = document.getElementById('skill');
//   const location = document.getElementById('location');
//   const priceRange = document.getElementById('priceRange');
//   const rating = document.getElementById('rating');

//   const debounced = debounce(performSearch, 300);

//   searchBtn?.addEventListener('click', performSearch);
//   qInput?.addEventListener('keypress', e => { if (e.key === 'Enter') performSearch(); });

//   // Live filtering as user types/selects
//   qInput?.addEventListener('input', debounced);
//   skill?.addEventListener('change', performSearch);
//   location?.addEventListener('input', debounced);
//   priceRange?.addEventListener('change', performSearch);
//   rating?.addEventListener('change', performSearch);

//   // Optionally load initial featured tutors from backend
//   performSearch();
// });


// Form validation and submission
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#FF6B9D';
            isValid = false;
        } else {
            input.style.borderColor = '#E8E8E8';
        }
    });

    return isValid;
}

// Handle form submissions
// document.addEventListener('DOMContentLoaded', function() {
//     const forms = document.querySelectorAll('form');
    
//     forms.forEach(form => {
//         form.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             if (validateForm(this)) {
//                 // Show loading state
//                 const submitBtn = this.querySelector('button[type="submit"]');
//                 if (submitBtn) {
//                     const originalText = submitBtn.textContent;
//                     submitBtn.textContent = 'Submitting...';
//                     submitBtn.disabled = true;
                    
//                     // Simulate form submission
//                     setTimeout(() => {
//                         alert('Form submitted successfully!');
//                         submitBtn.textContent = originalText;
//                         submitBtn.disabled = false;
//                         this.reset();
//                     }, 2000);
//                 }
//             } else {
//                 alert('Please fill in all required fields.');
//             }
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tutorRegistrationForm');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      fullName: form.fullName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      location: form.location.value.trim(),
      pincode: form.pincode.value.trim(),
      skills: [...form.querySelectorAll('input[name="skills"]:checked')].map(c => c.value),
      pricing: Number(form.pricing.value),
      experience: form.experience.value,
      bio: form.bio.value.trim(),
      days: [...form.querySelectorAll('input[name="days"]:checked')].map(c => c.value),
      timeSlots: form.timeSlots.value
    };

    const originalText = submitBtn.textContent;
    setLoading(submitBtn, true);

    try {
      const { data,status } = await axios.post(
        'http://localhost:8000/api/tutors/register',
        payload,
        { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
      );

      // expect backend to return: { success: true, message: "Tutor registered successfully!" }
      if (status !== 201) {
        throw new Error(data?.message || 'Backend reported failure.');
    }

      alert(data.message || 'Tutor registered successfully!');
      form.reset();
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        alert('Request timed out. Please try again.');
      } else if (err.response) {
        alert(`Server error: ${err.response.data?.message || err.response.statusText}`);
      } else {
        alert(`Submission failed: ${err.message}`);
      }
    } finally {
      setLoading(submitBtn, false, originalText);
    }
  });

  function validateForm(form) {
    const requiredIds = ['fullName', 'email', 'phone', 'location', 'pincode', 'pricing', 'bio'];
    return requiredIds.every(id => form[id] && form[id].value.trim());
  }

  function setLoading(btn, isLoading, originalText = 'Submit') {
    if (!btn) return;
    if (isLoading) {
      btn.textContent = 'Submitting...';
      btn.disabled = true;
    } else {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  }
});


// Image preview functionality for file uploads
function previewImage(input, previewElement) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            if (previewElement) {
                previewElement.src = e.target.result;
                previewElement.style.display = 'block';
            }
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

// Add image preview listeners
document.addEventListener('DOMContentLoaded', function() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const preview = document.querySelector(`#${this.id}-preview`);
            previewImage(this, preview);
        });
    });
});

// Rating functionality
function setRating(rating, tutorId) {
    const stars = document.querySelectorAll(`[data-tutor="${tutorId}"] .star`);
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    // Store rating (in a real app, this would be sent to a server)
    console.log(`Rating ${rating} stars for tutor ${tutorId}`);
}

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#25D366' : '#FF6B9D'};
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Local storage utilities
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation to page
    document.body.classList.add('fade-in');
    
    // Initialize any saved user preferences
    const savedPreferences = getFromLocalStorage('userPreferences');
    if (savedPreferences) {
        // Apply saved preferences like theme, language, etc.
        console.log('Loaded user preferences:', savedPreferences);
    }
    
    // Add click tracking for analytics (placeholder)
    document.addEventListener('click', function(e) {
        if (e.target.matches('.tutor-card, .category-card, .cta-btn')) {
            console.log('User interacted with:', e.target.className);
        }
    });
});