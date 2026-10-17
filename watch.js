/* ==========================================================================
   SUNDARAM CINEMA WATCH PAGE LOGIC (watch.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const cinemaVideo = document.getElementById('cinemaVideo');
  const videoFrameContainer = document.getElementById('videoFrameContainer');
  const ambientGlow = document.getElementById('ambientGlow');
  const centerPlayOverlay = document.getElementById('centerPlayOverlay');
  const bigPlayBtn = document.getElementById('bigPlayBtn');
  const bufferingSpinner = document.getElementById('bufferingSpinner');
  const controlsBar = document.getElementById('controlsBar');

  // Control buttons
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const rewindBtn = document.getElementById('rewindBtn');
  const volumeBtn = document.getElementById('volumeBtn');
  const volumeHighIcon = document.getElementById('volumeHighIcon');
  const volumeMuteIcon = document.getElementById('volumeMuteIcon');
  const volumeSlider = document.getElementById('volumeSlider');
  const currentTimeEl = document.getElementById('currentTime');
  const totalDurationEl = document.getElementById('totalDuration');
  const speedBtn = document.getElementById('speedBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const fsEnterIcon = document.getElementById('fsEnterIcon');
  const fsExitIcon = document.getElementById('fsExitIcon');

  // Scrubber elements
  const progressArea = document.getElementById('progressArea');
  const progressFill = document.getElementById('progressFill');
  const progressBuffer = document.getElementById('progressBuffer');
  const progressHandle = document.getElementById('progressHandle');

  // Metadata elements
  const pageTitle = document.getElementById('pageTitle');
  const projectTitle = document.getElementById('projectTitle');
  const metaCategory = document.getElementById('metaCategory');
  const metaYear = document.getElementById('metaYear');
  const metaLocation = document.getElementById('metaLocation');
  const projectDescription = document.getElementById('projectDescription');
  const projectTags = document.getElementById('projectTags');
  const specClient = document.getElementById('specClient');
  const specRole = document.getElementById('specRole');
  const specCamera = document.getElementById('specCamera');
  const specLens = document.getElementById('specLens');
  const specFormat = document.getElementById('specFormat');
  const specAspect = document.getElementById('specAspect');
  const prevProjectBtn = document.getElementById('prevProjectBtn');
  const nextProjectBtn = document.getElementById('nextProjectBtn');
  const playlistGrid = document.getElementById('playlistGrid');
  const shareBtn = document.getElementById('shareBtn');
  const shareBtnText = document.getElementById('shareBtnText');

  // Project keys array
  const projectKeys = Object.keys(PROJECTS_DATA);

  // 1. Get current project ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  let currentId = urlParams.get('id');

  if (!currentId || !PROJECTS_DATA[currentId]) {
    currentId = projectKeys[0]; // default to first project
  }

  const project = PROJECTS_DATA[currentId];
  const currentIndex = projectKeys.indexOf(currentId);

  // 2. Populate Page Data
  document.title = `${project.title} — films by SUNDARAM`;
  projectTitle.textContent = project.title;
  metaCategory.textContent = project.category;
  metaYear.textContent = project.year || '2026';
  metaLocation.textContent = project.location ? `📍 ${project.location}` : '📍 Nagpur';
  projectDescription.textContent = project.desc;

  if (specClient) specClient.textContent = project.client || 'Sundaram Original';
  if (specRole) specRole.textContent = project.role || 'Director of Photography & Editor';
  if (specCamera) specCamera.textContent = project.camera || 'Sony FX3 Cinema Line';
  if (specLens) specLens.textContent = project.lens || 'Sony G Master Primes';
  if (specFormat) specFormat.textContent = project.fps || '4K DCI / S-Log3 Grade';
  if (specAspect) specAspect.textContent = project.aspectRatio || '16:9 Scope';

  // Tags
  if (projectTags && project.tags) {
    projectTags.innerHTML = project.tags.map(t => `<span class="cinema-film-tag">#${t}</span>`).join('');
  }

  // Adjust aspect ratio styling
  if (project.aspectRatio && project.aspectRatio.includes('9:16')) {
    videoFrameContainer.classList.add('vertical-aspect');
  } else {
    videoFrameContainer.classList.remove('vertical-aspect');
  }

  // Video Source & Poster
  if (project.poster) {
    cinemaVideo.poster = project.poster;
  }
  if (project.video) {
    cinemaVideo.src = project.video;
    cinemaVideo.load();
  }

  // Prev / Next Navigation
  const prevIndex = (currentIndex - 1 + projectKeys.length) % projectKeys.length;
  const nextIndex = (currentIndex + 1) % projectKeys.length;

  prevProjectBtn.addEventListener('click', () => {
    window.location.href = `watch.html?id=${projectKeys[prevIndex]}`;
  });

  nextProjectBtn.addEventListener('click', () => {
    window.location.href = `watch.html?id=${projectKeys[nextIndex]}`;
  });

  // Populate Up Next Playlist
  if (playlistGrid) {
    playlistGrid.innerHTML = projectKeys.map(k => {
      const p = PROJECTS_DATA[k];
      const isActive = k === currentId;
      const thumbImg = p.poster || 'assets/hero_1.jpg';
      return `
        <a href="watch.html?id=${p.id}" class="playlist-card ${isActive ? 'active-card' : ''}">
          <div class="playlist-card-thumb">
            <img src="${thumbImg}" alt="${p.title}" class="playlist-card-img" loading="lazy">
            <div class="playlist-play-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
          <div class="playlist-card-body">
            <span class="playlist-card-cat">${p.category}</span>
            <h4 class="playlist-card-title">${p.title}</h4>
            <span class="playlist-card-meta">${p.year} • ${p.camera}</span>
          </div>
        </a>
      `;
    }).join('');
  }

  // 3. Playback Controls Logic
  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function togglePlay() {
    if (cinemaVideo.paused || cinemaVideo.ended) {
      cinemaVideo.play().then(() => {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        centerPlayOverlay.classList.add('hidden');
      }).catch(err => console.log('Play failed:', err));
    } else {
      cinemaVideo.pause();
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
      centerPlayOverlay.classList.remove('hidden');
    }
  }

  bigPlayBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlay();
  });

  centerPlayOverlay.addEventListener('click', togglePlay);
  playPauseBtn.addEventListener('click', togglePlay);

  rewindBtn.addEventListener('click', () => {
    cinemaVideo.currentTime = Math.max(0, cinemaVideo.currentTime - 5);
  });

  // Time update & Scrubber
  cinemaVideo.addEventListener('timeupdate', () => {
    if (!cinemaVideo.duration) return;
    const progressPercent = (cinemaVideo.currentTime / cinemaVideo.duration) * 100;
    progressFill.style.width = `${progressPercent}%`;
    progressHandle.style.left = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(cinemaVideo.currentTime);
  });

  cinemaVideo.addEventListener('loadedmetadata', () => {
    totalDurationEl.textContent = formatTime(cinemaVideo.duration);
  });

  // Buffered progress
  cinemaVideo.addEventListener('progress', () => {
    if (cinemaVideo.buffered.length > 0 && cinemaVideo.duration) {
      const bufferedEnd = cinemaVideo.buffered.end(cinemaVideo.buffered.length - 1);
      const bufferPercent = (bufferedEnd / cinemaVideo.duration) * 100;
      progressBuffer.style.width = `${bufferPercent}%`;
    }
  });

  // Buffering indicator
  cinemaVideo.addEventListener('waiting', () => {
    bufferingSpinner.classList.add('active');
  });

  cinemaVideo.addEventListener('playing', () => {
    bufferingSpinner.classList.remove('active');
  });

  cinemaVideo.addEventListener('canplay', () => {
    bufferingSpinner.classList.remove('active');
  });

  // Scrubber drag / click
  let isDragging = false;

  function updateScrubber(e) {
    const rect = progressArea.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    cinemaVideo.currentTime = pos * cinemaVideo.duration;
  }

  progressArea.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateScrubber(e);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) updateScrubber(e);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Volume
  volumeSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    cinemaVideo.volume = val;
    cinemaVideo.muted = (val === 0);
    updateVolumeIcon();
  });

  volumeBtn.addEventListener('click', () => {
    cinemaVideo.muted = !cinemaVideo.muted;
    if (cinemaVideo.muted) {
      volumeHighIcon.style.display = 'none';
      volumeMuteIcon.style.display = 'block';
    } else {
      updateVolumeIcon();
    }
  });

  function updateVolumeIcon() {
    if (cinemaVideo.muted || cinemaVideo.volume === 0) {
      volumeHighIcon.style.display = 'none';
      volumeMuteIcon.style.display = 'block';
    } else {
      volumeHighIcon.style.display = 'block';
      volumeMuteIcon.style.display = 'none';
    }
  }

  // Playback speeds
  const speeds = [1.0, 1.25, 1.5, 2.0, 0.75];
  let speedIdx = 0;
  speedBtn.addEventListener('click', () => {
    speedIdx = (speedIdx + 1) % speeds.length;
    const s = speeds[speedIdx];
    cinemaVideo.playbackRate = s;
    speedBtn.textContent = `${s.toFixed(1)}x`;
  });

  // Fullscreen
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      if (videoFrameContainer.requestFullscreen) {
        videoFrameContainer.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      fsEnterIcon.style.display = 'none';
      fsExitIcon.style.display = 'block';
    } else {
      fsEnterIcon.style.display = 'block';
      fsExitIcon.style.display = 'none';
    }
  });

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      cinemaVideo.currentTime = Math.max(0, cinemaVideo.currentTime - 5);
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      cinemaVideo.currentTime = Math.min(cinemaVideo.duration || 0, cinemaVideo.currentTime + 5);
    } else if (e.code === 'KeyF') {
      fullscreenBtn.click();
    } else if (e.code === 'KeyM') {
      volumeBtn.click();
    }
  });

  // Share button
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          shareBtnText.textContent = 'LINK COPIED! ✓';
          setTimeout(() => {
            shareBtnText.textContent = 'SHARE PROJECT';
          }, 2500);
        });
      }
    });
  }
});
