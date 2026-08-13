// Simple HTML5 playlist player
document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('player');
  const playlistEl = document.getElementById('playlist');
  const currentTrackEl = document.getElementById('current-track');

  if (!player || !playlistEl) return;

  const tracks = Array.from(playlistEl.querySelectorAll('li')).map((li, i) => ({
    title: li.textContent.trim(),
    src: li.getAttribute('data-src'),
    el: li,
    index: i
  }));

  let currentIndex = -1;

  function loadTrack(index, autoplay = true) {
    if (index < 0 || index >= tracks.length) return;
    const track = tracks[index];
    if (!track.src) return;
    // Update UI
    tracks.forEach(t => t.el.classList.toggle('playing', t.index === index));
    currentTrackEl.textContent = track.title;
    player.src = track.src;
    currentIndex = index;
    if (autoplay) {
      // Play will only work after a user gesture on most mobile browsers.
      player.play().catch(() => {
        // Autoplay blocked — leave controls visible for manual play.
      });
    }
  }

  // Click to play a track
  tracks.forEach(track => {
    track.el.addEventListener('click', () => {
      loadTrack(track.index, true);
    });
  });

  // Next track on end
  player.addEventListener('ended', () => {
    const next = currentIndex + 1;
    if (next < tracks.length) loadTrack(next, true);
    else {
      // optionally loop:
      // loadTrack(0, false);
    }
  });

  // Keyboard: space toggles play/pause when focus not in input
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (player.paused) player.play(); else player.pause();
    }
  });

  // Optionally load the first track as a default (commented out)
  // loadTrack(0, false);
});
