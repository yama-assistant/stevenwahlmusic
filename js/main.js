// Genre switcher: each .genre button carries data-embed = a YouTube embed URL
// (single video: https://www.youtube-nocookie.com/embed/VIDEO_ID,
//  playlist:     https://www.youtube-nocookie.com/embed/videoseries?list=PLAYLIST_ID).
// Buttons without data-embed show a placeholder until a playlist is added.
(function () {
  var buttons = document.querySelectorAll('.genre');
  var player = document.getElementById('player');
  if (!buttons.length || !player) return;

  function show(btn) {
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
    var url = btn.getAttribute('data-embed');
    var name = btn.textContent.trim();
    player.textContent = '';
    if (url) {
      var frame = document.createElement('iframe');
      frame.src = url;
      frame.title = name + ' – YouTube player';
      frame.loading = 'lazy';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      player.appendChild(frame);
    } else {
      player.textContent = name + ' playlist coming soon';
    }
  }

  buttons.forEach(function (b) { b.addEventListener('click', function () { show(b); }); });
  show(buttons[0]);
})();

// Testimonial carousel: one quote at a time, arrows + dots + swipe.
// Without JS all quotes simply show stacked.
(function () {
  var root = document.querySelector('.carousel');
  if (!root) return;
  var slides = root.querySelectorAll('.slide');
  var dotsBox = root.querySelector('.carousel-dots');
  if (slides.length < 2) return;
  var current = 0, dots = [];

  slides.forEach(function (s, i) {
    var d = document.createElement('button');
    d.type = 'button';
    d.className = 'carousel-dot';
    d.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
    d.addEventListener('click', function () { go(i); });
    dotsBox.appendChild(d);
    dots.push(d);
  });

  function go(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) {
      var on = k === current;
      s.classList.toggle('is-active', on);
      s.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    dots.forEach(function (d, k) {
      if (k === current) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
  }

  root.querySelectorAll('.carousel-btn').forEach(function (b) {
    b.addEventListener('click', function () { go(current + Number(b.getAttribute('data-dir'))); });
  });

  var startX = null;
  root.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
    startX = null;
  });

  root.classList.add('is-ready');
  go(0);
})();
