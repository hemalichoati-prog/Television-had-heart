// Click-to-load playlist iframe
document.addEventListener('click', function (e) {
  const placeholder = e.target.closest && e.target.closest('.video-placeholder');
  if (!placeholder) return;

  const playlistId = placeholder.getAttribute('data-playlist');
  if (!playlistId) return;

  // Build iframe URL
  const iframeUrl = 'https://www.youtube.com/embed/videoseries?list='
    + encodeURIComponent(playlistId)
    + '&rel=0&controls=1';

  // Create responsive wrapper + iframe
  const wrapper = document.createElement('div');
  wrapper.className = 'video-container';
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', iframeUrl);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('loading', 'lazy');
  wrapper.appendChild(iframe);

  const target = document.getElementById('video-target');
  if (target) {
    target.innerHTML = ''; // clear
    target.appendChild(wrapper);
    placeholder.style.display = 'none';
    wrapper.scrollIntoView({ behavior: 'smooth' });
  }
});
