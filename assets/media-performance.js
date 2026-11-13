(() => {
  const video = document.querySelector('.hero-bg-video');
  if (!video) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const source = video.querySelector('source[data-src]');
  let loaded = false;
  video.muted = true; video.defaultMuted = true; video.playsInline = true;
  function play() {
    if (reduced.matches || document.hidden) return;
    if (!loaded && source) {
      source.src = matchMedia('(max-width: 900px)').matches || navigator.connection?.saveData
        ? source.dataset.mobileSrc : source.dataset.src;
      video.preload = 'auto'; video.load(); loaded = true;
    }
    video.play().catch(() => { /* Browser power/data policies may require a tap. */ });
  }
  if (reduced.matches) video.pause(); else play();
  video.addEventListener('canplay', play);
  document.addEventListener('pointerdown', play, { once: true, passive: true });
  document.addEventListener('visibilitychange', () => document.hidden ? video.pause() : play());
  reduced.addEventListener('change', () => reduced.matches ? video.pause() : play());
})();
