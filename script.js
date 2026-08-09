// Fit Life Physiotherapy JS Functions

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Preloader
  // ==========================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    });
    // Fallback if load event doesn't fire
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 1500);
  }

  // ==========================================
  // 2. Dark Mode Toggle
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

  // Change the icons inside button based on previous settings
  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
    themeToggleDarkIcon.classList.add('hidden');
    document.documentElement.classList.add('dark');
  } else {
    themeToggleDarkIcon.classList.remove('hidden');
    themeToggleLightIcon.classList.add('hidden');
    document.documentElement.classList.remove('dark');
  }

  themeToggleBtn.addEventListener('click', function() {
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }
    // if not set via local storage previously
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
  });

  // ==========================================
  // 3. Mobile Responsive Menu
  // ==========================================
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', toggleMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
      }
    });
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  });

  // ==========================================
  // 4. Sticky Header, Shrinking Navbar & Scroll Spy
  // ==========================================
  const header = document.getElementById('header');
  const logoContainer = document.getElementById('header-logo-container');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Sticky header shadow & padding adjustments
    if (window.scrollY > 40) {
      header.classList.add('shadow-md', 'backdrop-blur-md', 'bg-white/90', 'dark:bg-slate-900/90', 'py-2');
      header.classList.remove('bg-transparent', 'py-4');
      
      // Shrink logo container size
      if (logoContainer) {
        logoContainer.classList.remove('h-16', 'md:h-20', 'lg:h-24');
        logoContainer.classList.add('h-12', 'md:h-15', 'lg:h-18');
      }
    } else {
      header.classList.remove('shadow-md', 'backdrop-blur-md', 'bg-white/90', 'dark:bg-slate-900/90', 'py-2');
      header.classList.add('bg-transparent', 'py-4');

      // Restore logo container size
      if (logoContainer) {
        logoContainer.classList.remove('h-12', 'md:h-15', 'lg:h-18');
        logoContainer.classList.add('h-16', 'md:h-20', 'lg:h-24');
      }
    }

    // Scroll spy for active indicator
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 125;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active', 'text-teal-600', 'dark:text-teal-400');
      link.classList.add('text-slate-600', 'dark:text-slate-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active', 'text-teal-600', 'dark:text-teal-400');
        link.classList.remove('text-slate-600', 'dark:text-slate-300');
      }
    });
  });

  // ==========================================
  // 5. Scroll Reveals and Timeline Animation
  // ==========================================
  const scrollElements = document.querySelectorAll('.scroll-reveal');

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('revealed');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.1)) {
        displayScrollElement(el);
      }
    });

    // Timeline bar animate
    const timeline = document.querySelector('.timeline-progress-bar');
    const timelineSection = document.getElementById('process');
    if (timeline && timelineSection && elementInView(timelineSection, 1.2)) {
      timeline.style.width = '100%';
    }
  };

  window.addEventListener('scroll', handleScrollAnimation);
  // Trigger once on load
  setTimeout(handleScrollAnimation, 300);

  // ==========================================
  // 6. Statistics Counters
  // ==========================================
  const statsCounters = document.querySelectorAll('.counter-num');
  let countersAnimated = false;

  const animateCounters = () => {
    statsCounters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // ~60fps
      let currentVal = 0;

      const updateCounter = () => {
        currentVal += increment;
        if (currentVal < target) {
          counter.textContent = Math.floor(currentVal);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      updateCounter();
    });
  };

  const statsSection = document.getElementById('about');
  if (statsSection && statsCounters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          animateCounters();
          countersAnimated = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // ==========================================
  // 7. Testimonials Carousel
  // ==========================================
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextButton = document.getElementById('carousel-btn-next');
  const prevButton = document.getElementById('carousel-btn-prev');
  const dotNav = document.querySelector('.carousel-dots');
  
  if (track && slides.length > 0) {
    let dots = [];
    let activeIndex = 0;
    let slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange slides side by side
    const setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    window.addEventListener('resize', () => {
      slideWidth = slides[0].getBoundingClientRect().width;
      slides.forEach(setSlidePosition);
      moveToSlide(track, slides[activeIndex]);
    });

    // Create dot pagination
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-teal-600 scale-125' : 'bg-slate-300 dark:bg-slate-700'}`;
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
      dotNav.appendChild(dot);
      dots.push(dot);

      dot.addEventListener('click', () => {
        moveToSlide(track, slides[index]);
        updateDots(index);
        activeIndex = index;
      });
    });

    const moveToSlide = (track, targetSlide) => {
      track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    };

    const updateDots = (targetIndex) => {
      dots.forEach((dot, index) => {
        if (index === targetIndex) {
          dot.classList.add('bg-teal-600', 'scale-125');
          dot.classList.remove('bg-slate-300', 'dark:bg-slate-700');
        } else {
          dot.classList.remove('bg-teal-600', 'scale-125');
          dot.classList.add('bg-slate-300', 'dark:bg-slate-700');
        }
      });
    };

    const slideNext = () => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= slides.length) {
        nextIndex = 0;
      }
      moveToSlide(track, slides[nextIndex]);
      updateDots(nextIndex);
      activeIndex = nextIndex;
    };

    const slidePrev = () => {
      let prevIndex = activeIndex - 1;
      if (prevIndex < 0) {
        prevIndex = slides.length - 1;
      }
      moveToSlide(track, slides[prevIndex]);
      updateDots(prevIndex);
      activeIndex = prevIndex;
    };

    if (nextButton) nextButton.addEventListener('click', slideNext);
    if (prevButton) prevButton.addEventListener('click', slidePrev);

    // Auto play
    let carouselInterval = setInterval(slideNext, 5000);

    const resetInterval = () => {
      clearInterval(carouselInterval);
      carouselInterval = setInterval(slideNext, 5000);
    };

    if (nextButton) nextButton.addEventListener('click', resetInterval);
    if (prevButton) prevButton.addEventListener('click', resetInterval);
    dots.forEach(dot => dot.addEventListener('click', resetInterval));
  }

  // ==========================================
  // 8. Gallery Masonry Lightbox
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxVideo = lightbox ? lightbox.querySelector('video') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  if (galleryItems && lightbox) {
    galleryItems.forEach(item => {
      // Hover play/pause behavior for video elements
      const video = item.querySelector('video');
      if (video) {
        item.addEventListener('mouseenter', () => {
          video.play().catch(() => {});
        });
        item.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = 0;
        });
      }

      // Lightbox click handler
      item.addEventListener('click', () => {
        const videoSrc = item.getAttribute('data-video-src');
        if (videoSrc) {
          // Play video in lightbox
          if (lightboxImg) lightboxImg.classList.add('hidden');
          if (lightboxVideo) {
            lightboxVideo.classList.remove('hidden');
            lightboxVideo.setAttribute('src', videoSrc);
            lightboxVideo.play().catch(() => {});
          }
        } else {
          // Show image in lightbox
          const img = item.querySelector('img');
          if (img) {
            const imgSrc = img.getAttribute('src');
            if (lightboxVideo) {
              lightboxVideo.pause();
              lightboxVideo.classList.add('hidden');
            }
            if (lightboxImg) {
              lightboxImg.classList.remove('hidden');
              lightboxImg.setAttribute('src', imgSrc);
            }
          }
        }
        lightbox.classList.add('open');
        document.body.classList.add('overflow-hidden');
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.classList.remove('overflow-hidden');
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.removeAttribute('src');
      }
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // ==========================================
  // 9. FAQ Accordion
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-btn');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other FAQs
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-content').style.maxHeight = '0';
          otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current FAQ
      if (isOpen) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // ==========================================
  // 10. Floating Widgets (Scroll-to-top)
  // ==========================================
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.remove('translate-y-24', 'opacity-0');
      scrollTopBtn.classList.add('translate-y-0', 'opacity-100');
    } else {
      scrollTopBtn.classList.add('translate-y-24', 'opacity-0');
      scrollTopBtn.classList.remove('translate-y-0', 'opacity-100');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 11. Custom Toast Notifications
  // ==========================================
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  function showToast(message, duration = 4000) {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // ==========================================
  // 12. Appointment Modal Popup
  // ==========================================
  const appointmentModal = document.getElementById('appointment-modal');
  const openModalBtns = document.querySelectorAll('.open-appointment-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const appointmentForm = document.getElementById('appointment-form');

  function openModal() {
    appointmentModal.classList.remove('hidden');
    appointmentModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  }

  function closeModal() {
    appointmentModal.classList.add('hidden');
    appointmentModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Optional: Prefill service name if clicked from a service card
      const serviceTitle = btn.getAttribute('data-service');
      const selectService = document.getElementById('modal-service');
      if (serviceTitle && selectService) {
        selectService.value = serviceTitle;
      }
      openModal();
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (appointmentModal) {
    appointmentModal.addEventListener('click', (e) => {
      if (e.target === appointmentModal) {
        closeModal();
      }
    });
  }

  // Helper functions for Custom Success Popup
  function showSuccessPopup(message) {
    const popup = document.getElementById('success-popup');
    const card = document.getElementById('success-popup-card');
    const msgEl = document.getElementById('success-popup-message');
    if (popup && card && msgEl) {
      msgEl.textContent = message;
      popup.classList.remove('hidden');
      setTimeout(() => {
        card.classList.remove('scale-95', 'opacity-0');
        card.classList.add('scale-100', 'opacity-100');
      }, 50);
    }
  }

  function closeSuccessPopup() {
    const popup = document.getElementById('success-popup');
    const card = document.getElementById('success-popup-card');
    if (popup && card) {
      card.classList.remove('scale-100', 'opacity-100');
      card.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        popup.classList.add('hidden');
      }, 300);
    }
  }

  const popupClose = document.getElementById('success-popup-close');
  if (popupClose) {
    popupClose.addEventListener('click', closeSuccessPopup);
  }

  const popupModal = document.getElementById('success-popup');
  if (popupModal) {
    popupModal.addEventListener('click', (e) => {
      if (e.target === popupModal) {
        closeSuccessPopup();
      }
    });
  }

  // Helper functions for Choose Call Number Modal
  const callModalTriggers = document.querySelectorAll('.open-call-modal');
  const callModal = document.getElementById('call-modal');
  const callModalCard = document.getElementById('call-modal-card');
  const callModalClose = document.getElementById('call-modal-close');

  if (callModalTriggers && callModal && callModalCard) {
    const openCallModal = (e) => {
      e.preventDefault();
      callModal.classList.remove('hidden');
      setTimeout(() => {
        callModalCard.classList.remove('scale-95', 'opacity-0');
        callModalCard.classList.add('scale-100', 'opacity-100');
      }, 50);
    };

    const closeCallModal = () => {
      callModalCard.classList.remove('scale-100', 'opacity-100');
      callModalCard.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        callModal.classList.add('hidden');
      }, 300);
    };

    callModalTriggers.forEach(trigger => {
      trigger.addEventListener('click', openCallModal);
    });

    if (callModalClose) {
      callModalClose.addEventListener('click', closeCallModal);
    }

    callModal.addEventListener('click', (e) => {
      if (e.target === callModal) {
        closeCallModal();
      }
    });
  }

  // Handle Form Submission
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = appointmentForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Booking...
      `;

      // Get input values
      const name = document.getElementById('modal-name')?.value || '';
      const phone = document.getElementById('modal-phone')?.value || '';
      const service = document.getElementById('modal-service')?.value || '';
      const date = document.getElementById('modal-date')?.value || '';
      const time = document.getElementById('modal-time')?.value || '';
      const notes = document.getElementById('modal-notes')?.value || '';

      // Format WhatsApp Message
      const messageText = `Fit Life Physiotherapy - New Appointment Request\n` +
                          `------------------------------------------\n` +
                          `Name: ${name}\n` +
                          `Phone: ${phone}\n` +
                          `Therapy: ${service}\n` +
                          `Date: ${date}\n` +
                          `Time Slot: ${time}\n` +
                          `Brief Symptoms: ${notes}`;

      // Simulate API submit delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
        
        // Reset and close
        appointmentForm.reset();
        closeModal();

        // Redirect to WhatsApp
        window.open('https://wa.me/918758100991?text=' + encodeURIComponent(messageText), '_blank');
        
        // Show custom popup box
        showSuccessPopup("Your appointment request has been submitted successfully! We are redirecting you to WhatsApp to complete your slot booking.");
      }, 1200);
    });
  }

  // ==========================================
  // 13. Service Card Learn More Popup Links
  // ==========================================
  const learnMoreBtns = document.querySelectorAll('.service-learn-more');
  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-service');
      
      const selectService = document.getElementById('modal-service');
      if (selectService) {
        selectService.value = title;
      }
      openModal();
    });
  });

  // ==========================================
  // 14. Contact Form Validation
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Sending...
      `;

      // Get contact values
      const cName = document.getElementById('name')?.value || '';
      const cPhone = document.getElementById('phone')?.value || '';
      const cEmail = document.getElementById('email')?.value || '';
      const cMessage = document.getElementById('message')?.value || '';

      // Format WhatsApp Message
      const messageText = `Fit Life Physiotherapy - New Contact Message\n` +
                          `------------------------------------------\n` +
                          `Name: ${cName}\n` +
                          `Phone: ${cPhone}\n` +
                          `Email: ${cEmail}\n` +
                          `Message: ${cMessage}`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
        
        contactForm.reset();

        // Redirect to WhatsApp
        window.open('https://wa.me/918758100991?text=' + encodeURIComponent(messageText), '_blank');

        // Show custom popup box
        showSuccessPopup("Your message has been sent successfully! We are redirecting you to WhatsApp to connect with Dr. Miloni Shah.");
      }, 1200);
    });
  }

});
