/* ==========================================================================
   SUNDARAM — CINEMATOGRAPHER PORTFOLIO INTERACTIVE SCRIPT
   ========================================================================== */

/* --------------------------------------------------------------------------
   EMAILJS CREDENTIALS & INITIALIZATION
   -------------------------------------------------------------------------- */
const EMAILJS_SERVICE_ID = 'service_qx0h4io';
const EMAILJS_TEMPLATE_ID = 'template_dka8yln';
const EMAILJS_PUBLIC_KEY = 'igquxE4RWoc2b7b6W';

// Auto-initialize EmailJS if SDK is loaded
if (typeof emailjs !== 'undefined') {
  try {
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY
    });
  } catch (err) {
    console.warn('EmailJS initialization notice:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Project Database for Lightbox Modal
  const projectsData = typeof PROJECTS_DATA !== 'undefined' ? PROJECTS_DATA : {
    'surf-excel': {
      title: 'Bombaywala MODAK ADFILM ',
      category: 'FESTIVE COMMERCIAL / PRODUCT',
      location: '📍 2026, Nagpur',
      desc: 'Rich culinary and festive ad film celebrating the authentic sweetness, artisanal preparation, and heritage presentation of BMB Modaks.',
      camera: 'ZV-E10 Mark II ',
      lens: 'Sony FE 50mm F1.8',
      client: 'Bombaywala Confectionery (BMB)',
      poster: 'assets/video3_bg.png',
      video: 'assets/BMB MODAK ADFILM FINAL RENDER GTG.mp4'
    },
    'property-app': {
      title: 'MODEL SHOOT ',
      category: 'REAL ESTATE AD',
      location: '📍 2026, Nagpur',
      desc: 'Architectural motion shoot emphasizing pristine indoor lighting, spatial aesthetic flow, high-end property walk-throughs, and luxury home vibes.',
      camera: 'ZV-E10 Mark II',
      lens: 'Sony FE 24mm F1.4',
      client: 'Tanushri Sur',
      poster: 'assets/hero_2.jpg',
      video: 'assets/tanu finallll relllll ready to go 22 august.mp4'
    },
    'fitness-brand': {
      title: 'TRIUMPH MOTORCYCLE SHOOT',
      category: 'COMMERCIAL / ATHLETIC',
      location: '📍 2025, Nagpur',
      desc: 'Intense workout and motorcycle cinematography featuring moody shadowplay, high frame rate slow-motion, and aggressive edit pacing.',
      camera: 'ZV-E10 Mark II ',
      lens: 'Sony E PZ 16-50mm',
      client: 'Triumph Delivery',
      poster: 'assets/triumph.png',
      video: 'assets/prathmesh triumph delivery.mp4'
    },
    'recipes-work': {
      title: 'AMRUTCHA SUPER GOLD — PRODUCT FILM',
      category: 'FOOD & BEVERAGE',
      location: '📍 2026, Nagpur',
      desc: 'Warm, cinematic product visuals crafted to highlight the premium packaging, rich details, and traditional essence of AmrutCha Super Gold.',
      camera: 'Sony α6700 ',
      lens: 'Sony E PZ 18-105mm f/4 G OSS',
      client: 'AmruutCha (The Best Tea of India)',
      poster: 'assets/recipes.jpg',
      video: 'assets/The secret ingredient to a perfect day isnt just time—it’s the right blend. From the first spar (1) (1).mp4'
    },
    'chemistors-collab': {
      title: 'CHEMISTORS REEL COLLABORATION',
      category: 'COMMERCIAL / REEL',
      location: '📍 2026, Nagpur',
      desc: 'High-energy brand collaboration reel featuring dynamic transitions, premium grading, and modern rhythm-driven visual storytelling.',
      camera: 'ZV-E10 Mark II',
      lens: 'Sony FE 24-70mm F2.8',
      client: 'Chemistors',
      poster: 'assets/Yellow and Blue Simple Brand Proposal Presentation.png',
      video: 'assets/FINAL CHEMISTORS REEL COLLABORATION 2026.mp4'
    },
    'bmb-adfilm': {
      title: 'HAR SUBAH EK NAI KAHANI HOTI HAI',
      category: 'CORPORATE FILM',
      location: '📍 2026, Nagpur',
      desc: 'A heartfelt corporate storytelling film exploring everyday journeys, aspirations, and dedication — Har Subah Ek Nayi Kahani Hoti Hai.',
      camera: 'ZV-E10 Mark II ',
      lens: 'Sony FE 24-70mm F2.8',
      client: 'Corporate Brand Story',
      video: 'assets/Har subah ek nayi kahani hoti hai—kisi ke liye sapno ki daud, toh kisi ke liye zimmedariyon ki s.mp4'
    },
    'bmb-modak': {
      title: 'BIKE KHARAB HONE PAR PANIC MAT KARO!',
      category: 'COMMERCIAL / AD FILM',
      location: '📍 2026, Nagpur',
      desc: 'A dynamic, relatable automotive service commercial emphasizing reliability, instant assistance, and modern roadside care — Bike Kharab Hone Par Panic Mat Karo!',
      camera: 'ZV-E10 Mark II ',
      lens: 'Sony E PZ 18-105mm f/4 G OSS',
      client: 'Automotive Assistance Commercial',
      video: 'assets/Bike kharab hone par panic mat karo! 🤫 No more rushing to random roadside mechanics and getting.mp4'
    },
    'hotel-restaurant-shoots': {
      title: 'HOTEL & RESTAURANT SHOOTS',
      category: 'HOSPITALITY / INTERIOR',
      location: '📍 2026, Amravati',
      desc: 'Cinematic hospitality and restaurant film capturing ambience, plating detail, mood lighting, and smooth camera movement through the space.',
      camera: 'ZV-E10 Mark II ',
      lens: 'Sony FE 24–70mm F2.8',
      client: 'First Man In Creative',
      video: 'assets/first man in creative line 1 final.mp4'
    },
    'travel-experience': {
      title: 'THE PURPOSE OF LIFE IS TO EXPERIENCE',
      category: 'TRAVEL DOCUMENTARY',
      location: '📍 2026, Visual Storytelling',
      desc: 'A reflective and cinematic travel documentary exploring life experiences, personal perspectives, and the art of seeing the world through visual storytelling.',
      camera: 'ZV-E10 Mark II ',
      lens: 'Sony FE 24–70mm F2.8',
      client: 'Filmy Fankaar Original',
      poster: 'assets/travel_video1_poster.jpg',
      video: 'assets/travel_purpose_of_life.mp4'
    },
    'travel-stories': {
      title: 'NOT CHASING DESTINATIONS, CHASING STORIES',
      category: 'TRAVEL DOCUMENTARY',
      location: '📍 2026, Visual Storytelling',
      desc: 'An evocative travel visual story about wandering beyond conventional tourist trails to discover intimate local stories, spontaneous encounters, and untold perspectives.',
      camera: 'ZV-E10 Mark II ',
      lens: 'Sony FE 24–70mm F2.8',
      client: 'Visual Travel Series',
      poster: 'assets/travel_video2_poster.jpg',
      video: 'assets/travel_chasing_stories.mp4'
    },
    'bridal-shoots': {
      title: 'THE NATH DES.CO — REEL 01',
      category: 'CORPORATE REEL',
      location: '📍 2026, Nagpur',
      desc: 'High-fashion aesthetic reel crafted for The Nath Des.Co showcasing elegant styling, rich textures, dynamic transitions, and cinematic color grading.',
      camera: 'ZV-E10 Mark II ',
      lens: 'Sony FE 50mm F1.8',
      client: 'The Nath Des.Co',
      video: 'assets/the nath des.co. reel 01 final grade.mp4'
    },
    'influencer-shoot': {
      title: 'THE NATH DES.CO — REEL 02',
      category: 'CORPORATE REEL',
      location: '📍 2026, Nagpur',
      desc: 'Dynamic fashion visual storytelling and portrait cinematography crafted for The Nath Des.Co.',
      camera: 'ZV-E10 Mark II ',
      lens: 'Sony FE 85mm F1.4 GM',
      client: 'The Nath Des.Co',
      video: 'assets/the nath des.co reel 02 final grade.mp4'
    },
    'model-shoot': {
      title: 'THE NATH DES.CO — REEL 03',
      category: 'CORPORATE REEL',
      location: '📍 2026, Nagpur',
      desc: 'Editorial commercial fashion reel for The Nath Des.Co highlighting contemporary aesthetics, fluid motion, and luxury grading.',
      camera: 'ZV-E10 Mark II ',
      lens: 'Sony FE 35mm F1.4 GM',
      client: 'The Nath Des.Co',
      video: 'assets/THE NATH DES.CO REEL 003 FINAL 15 AUG X1.mp4'
    }
  };

  /* ------------------------------------------------------------------------
     LIGHTBOX VIDEO & PROJECT DETAILS MODAL (AUDIO ENABLED)
     ------------------------------------------------------------------------ */
  const projectModal = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const projectTriggers = document.querySelectorAll('[data-project-id]');

  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalLocation = document.getElementById('modalLocation');
  const modalDesc = document.getElementById('modalDesc');
  const modalCamera = document.getElementById('modalCamera');
  const modalLens = document.getElementById('modalLens');
  const modalClient = document.getElementById('modalClient');
  const modalRole = document.getElementById('modalRole');
  const modalVideoPoster = document.getElementById('modalVideoPoster');
  const modalVideoElement = document.getElementById('modalVideoElement');
  const modalFakeControls = document.getElementById('modalFakeControls');
  const modalContainer = projectModal ? projectModal.querySelector('.modal-container') : null;

  /* Landscape clips get a wider media column; portrait clips keep the
     original narrow column. Decided once the video reports its size. */
  const applyMediaOrientation = () => {
    if (!modalContainer || !modalVideoElement) return;
    const w = modalVideoElement.videoWidth;
    const h = modalVideoElement.videoHeight;
    if (!w || !h) return;
    modalContainer.classList.toggle('modal-wide-media', w >= h);
  };

  const closeActiveModal = () => {
    if (projectModal) {
      projectModal.classList.remove('active');
    }
    if (modalVideoElement) {
      modalVideoElement.pause();
      modalVideoElement.removeAttribute('src');
      modalVideoElement.load();
      modalVideoElement.style.display = 'none';
    }
    if (modalContainer) {
      modalContainer.classList.remove('modal-wide-media');
    }
  };

  projectTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const projectId = trigger.getAttribute('data-project-id');
      const data = projectsData[projectId];

      if (data && projectModal) {
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalCategory) modalCategory.textContent = data.category;
        if (modalLocation) modalLocation.textContent = data.location ? (data.location.startsWith('📍') ? data.location : `📍 ${data.location}`) : '';
        if (modalDesc) modalDesc.textContent = data.desc;
        if (modalCamera) modalCamera.textContent = data.camera;
        if (modalLens) modalLens.textContent = data.lens;
        if (modalClient) modalClient.textContent = data.client;
        if (modalRole) modalRole.textContent = data.role || 'Cinematographer';

        if (data.video && modalVideoElement) {
          // Attach before setting src so cached metadata is still caught.
          modalVideoElement.onloadedmetadata = applyMediaOrientation;
          modalVideoElement.src = data.video;
          modalVideoElement.muted = false; // AUDIO ENABLED ON CLICK
          modalVideoElement.style.display = 'block';
          if (modalVideoPoster) modalVideoPoster.style.display = 'none';
          if (modalFakeControls) modalFakeControls.style.display = 'none';

          // Pause all page preview videos
          document.querySelectorAll('main video').forEach(v => {
            if (v !== modalVideoElement) v.pause();
          });

          modalVideoElement.play().catch(err => console.log('Autoplay error:', err));
        } else {
          if (modalVideoElement) {
            modalVideoElement.pause();
            modalVideoElement.style.display = 'none';
          }
          if (modalContainer) {
            modalContainer.classList.remove('modal-wide-media');
          }
          if (modalVideoPoster) {
            modalVideoPoster.src = data.poster || 'assets/hero_1.jpg';
            modalVideoPoster.style.display = 'block';
          }
          if (modalFakeControls) modalFakeControls.style.display = 'flex';
        }

        projectModal.classList.add('active');
      }
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeActiveModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeActiveModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeActiveModal();
      }
    });
  }

  /* ------------------------------------------------------------------------
     HOSPITALITY BANNER BACKGROUND — AUTOPLAY FALLBACK
     The banner is the section's background, so a blocked autoplay would
     leave a black hole. Retry on the first real user gesture.
     ------------------------------------------------------------------------ */
  const bannerBgVideo = document.querySelector('.media-banner-video');
  if (bannerBgVideo) {
    bannerBgVideo.muted = true;
    const startBanner = () => {
      if (bannerBgVideo.paused) {
        bannerBgVideo.play().catch(() => { });
      }
    };
    startBanner();
    window.addEventListener('scroll', startBanner, { once: true, passive: true });
    window.addEventListener('pointerdown', startBanner, { once: true, passive: true });
    window.addEventListener('touchstart', startBanner, { once: true, passive: true });
  }

  /* ------------------------------------------------------------------------
     EMAILJS CONFIGURATION & CONTACT ENQUIRY FORM
     Credentials are declared once at the top of this file, where the SDK is
     already initialized.
     ------------------------------------------------------------------------ */
  const contactModal = document.getElementById('contactModal');
  const openContactBtn = document.getElementById('openContactFormBtn');
  const closeContactBtn = document.getElementById('closeContactBtn');
  const contactForm = document.getElementById('contactForm');
  const contactStatusMsg = document.getElementById('contactStatusMsg');
  const contactFallbackLink = document.getElementById('contactFallbackLink');

  // Where a failed enquiry should be redirected to.
  const CONTACT_EMAIL = 'workwithsundaram@gmail.com';

  const cf = {
    name: document.getElementById('cfName'),
    email: document.getElementById('cfEmail'),
    phone: document.getElementById('cfPhone'),
    type: document.getElementById('cfType'),
    budget: document.getElementById('cfBudget'),
    timeline: document.getElementById('cfTimeline'),
    message: document.getElementById('cfMessage')
  };

  let lastFocusedContactEl = null;

  const setFieldError = (input, errId, message) => {
    const errEl = document.getElementById(errId);
    const field = input.closest('.contact-field');
    if (field) field.classList.toggle('has-error', !!message);
    if (errEl) errEl.textContent = message || '';
  };

  const showStatusMessage = (message, type) => {
    if (!contactStatusMsg) return;
    contactStatusMsg.textContent = message;
    contactStatusMsg.className = 'contact-status-msg ' + (type === 'success' ? 'status-success' : 'status-error');
    contactStatusMsg.style.display = 'block';
  };

  const hideStatusMessage = () => {
    if (!contactStatusMsg) return;
    contactStatusMsg.textContent = '';
    contactStatusMsg.className = 'contact-status-msg';
    contactStatusMsg.style.display = 'none';
    hideFallbackLink();
  };

  const hideFallbackLink = () => {
    if (!contactFallbackLink) return;
    contactFallbackLink.style.display = 'none';
    contactFallbackLink.removeAttribute('href');
  };

  /* EmailJS failures are mostly backend/account problems that a visitor cannot
     fix, and their raw strings ("Gmail_API: Invalid grant...") mean nothing to
     anyone. Translate them, and always leave a working way to reach Sundaram. */
  const friendlySendError = (error) => {
    const text = ((error && error.text) || '').toLowerCase();
    const status = (error && error.status) || 0;

    if (!text && !status) {
      return "Couldn't reach the mail service. Check your connection and try again.";
    }
    if (text.includes('invalid_grant') || text.includes('invalid grant') || text.includes('reconnect')) {
      return "The contact form is being reconnected right now. Please email me directly below instead.";
    }
    if (text.includes('quota') || text.includes('daily') || text.includes('limit') || status === 429) {
      return "The form has hit its sending limit for today. Please email me directly below instead.";
    }
    if (text.includes('not found') || text.includes('failed to fetch') || text.includes('network') || status === 0) {
      return "Couldn't reach the mail service. Check your connection, or email me directly below.";
    }
    return "Something went wrong sending that. Please email me directly below instead.";
  };

  // Point the backup link at the visitor's own mail client with the enquiry pre-filled.
  const showFallbackLink = (params) => {
    if (!contactFallbackLink) return;
    const subject = 'Project enquiry — ' + params.project_type;
    const body = [
      'Name: ' + params.name,
      'Email: ' + params.email,
      'Phone: ' + params.phone,
      'Project type: ' + params.project_type,
      'Budget: ' + params.budget,
      'Timeline: ' + params.timeline,
      '',
      'Details:',
      params.message
    ].join('\n');

    contactFallbackLink.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    contactFallbackLink.style.display = 'block';
  };

  const openContactModal = () => {
    if (!contactModal) return;
    hideStatusMessage();
    lastFocusedContactEl = document.activeElement;
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus the first field so keyboard/phone users land inside the form.
    if (cf.name) window.setTimeout(() => cf.name.focus(), 120);
  };

  const closeContactModal = () => {
    if (!contactModal) return;
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocusedContactEl && lastFocusedContactEl.focus) lastFocusedContactEl.focus();
  };

  if (openContactBtn) openContactBtn.addEventListener('click', openContactModal);
  if (closeContactBtn) closeContactBtn.addEventListener('click', closeContactModal);

  // The big CONTACT heading is a second trigger, operable by keyboard too.
  const contactHeadingTrigger = document.getElementById('contactHeadingTrigger');
  if (contactHeadingTrigger) {
    contactHeadingTrigger.addEventListener('click', openContactModal);
    contactHeadingTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openContactModal();
      }
    });
  }

  if (contactModal) {
    // Click on the dimmed backdrop closes it.
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeContactModal();
    });

    // Keep Tab focus inside the dialog while it is open.
    contactModal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeContactModal();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = contactModal.querySelectorAll(
        'button, input, select, textarea, a[href]'
      );
      const visible = Array.from(focusables).filter(el => el.offsetParent !== null);
      if (!visible.length) return;

      const first = visible[0];
      const last = visible[visible.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  if (contactForm) {
    // Clear the error styling as soon as the visitor starts fixing a field.
    ['cfName', 'cfEmail', 'cfType', 'cfMessage'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => {
        const map = {
          cfName: 'cfNameErr',
          cfEmail: 'cfEmailErr',
          cfType: 'cfTypeErr',
          cfMessage: 'cfMessageErr'
        };
        setFieldError(el, map[id], '');
        hideStatusMessage();
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (cf.name.value || '').trim();
      const email = (cf.email.value || '').trim();
      const phone = (cf.phone.value || '').trim();
      const type = cf.type.value;
      const budget = cf.budget.value;
      const timeline = cf.timeline.value;
      const message = (cf.message.value || '').trim();

      let firstBad = null;

      if (!name) {
        setFieldError(cf.name, 'cfNameErr', 'Please enter your name.');
        firstBad = firstBad || cf.name;
      }

      // Accept a plain address; require something@something.tld
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        setFieldError(cf.email, 'cfEmailErr', 'Please enter a valid email address.');
        firstBad = firstBad || cf.email;
      }

      if (!type) {
        setFieldError(cf.type, 'cfTypeErr', 'Please pick a project type.');
        firstBad = firstBad || cf.type;
      }

      if (message.length < 10) {
        setFieldError(cf.message, 'cfMessageErr', 'Please add a few more details (10+ characters).');
        firstBad = firstBad || cf.message;
      }

      if (firstBad) {
        firstBad.focus();
        return;
      }

      const submit = document.getElementById('cfSubmit');
      const originalSubmitText = submit ? submit.textContent : 'SEND MESSAGE →';

      if (submit) {
        submit.textContent = 'SENDING MESSAGE…';
        submit.disabled = true;
      }
      hideStatusMessage();

      // Standard EmailJS parameter format mapping to template fields
      const templateParams = {
        name: name,
        from_name: name,
        user_name: name,

        email: email,
        from_email: email,
        user_email: email,
        reply_to: email,

        phone: phone || 'Not provided',
        user_phone: phone || 'Not provided',
        phone_number: phone || 'Not provided',

        project_type: type,
        type: type,
        service: type,

        budget: budget || 'Prefer not to say',
        timeline: timeline || 'Flexible',

        message: message,
        details: message,
        project_details: message,

        to_name: 'Sundaram'
      };

      if (typeof emailjs !== 'undefined') {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
          .then((response) => {
            console.log('EmailJS SUCCESS!', response.status, response.text);
            hideFallbackLink();
            showStatusMessage('✓ Thank you, ' + name + '! Your message has been sent successfully. I will get back to you shortly.', 'success');
            contactForm.reset();
            if (submit) {
              submit.textContent = 'MESSAGE SENT ✓';
              setTimeout(() => {
                submit.textContent = originalSubmitText;
                submit.disabled = false;
              }, 4000);
            }
          })
          .catch((error) => {
            console.error('EmailJS Error:', error);
            showStatusMessage('✕ ' + friendlySendError(error), 'error');
            showFallbackLink(templateParams);
            if (submit) {
              submit.textContent = originalSubmitText;
              submit.disabled = false;
            }
          });
      } else {
        showStatusMessage('✕ Email service is loading. Please check your internet connection, or email me directly below.', 'error');
        showFallbackLink(templateParams);
        if (submit) {
          submit.textContent = originalSubmitText;
          submit.disabled = false;
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     INSTANT HOVER-TO-PLAY PREVIEW (MUTED, ZERO AUDIO)
     ------------------------------------------------------------------------ */
  const previewCards = document.querySelectorAll(
    '.surf-excel-video-col, .project-media-col, .canva-banner-frame, .film-card-item, .portrait-canva-card, .travel-canva-card'
  );

  previewCards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    // Ensure all previews are always strictly muted
    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    const pauseVideo = () => {
      if (!video.paused) {
        video.pause();
      }
    };

    // Mouse events
    card.addEventListener('mouseenter', playVideo);
    card.addEventListener('mousemove', () => {
      if (video.paused) playVideo();
    });
    card.addEventListener('mouseleave', pauseVideo);
  });

  // Brand Marquee Navigation & Interaction
  const marqueeTrack = document.getElementById('brandMarqueeTrack');
  const prevBtn = document.getElementById('marqueePrevBtn');
  const nextBtn = document.getElementById('marqueeNextBtn');

  if (marqueeTrack && prevBtn && nextBtn) {
    let resetTimer = null;
    const baseDuration = '38s';

    nextBtn.addEventListener('click', () => {
      clearTimeout(resetTimer);
      marqueeTrack.style.animationDirection = 'normal';
      marqueeTrack.style.animationDuration = '10s';
      resetTimer = setTimeout(() => {
        marqueeTrack.style.animationDuration = baseDuration;
      }, 1600);
    });

    prevBtn.addEventListener('click', () => {
      clearTimeout(resetTimer);
      marqueeTrack.style.animationDirection = 'reverse';
      marqueeTrack.style.animationDuration = '12s';
      resetTimer = setTimeout(() => {
        marqueeTrack.style.animationDirection = 'normal';
        marqueeTrack.style.animationDuration = baseDuration;
      }, 1800);
    });
  }
});
