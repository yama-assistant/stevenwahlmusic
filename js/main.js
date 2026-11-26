// Genre switcher: each .genre button carries data-embed = a YouTube embed URL
// (single video: https://www.youtube-nocookie.com/embed/VIDEO_ID,
//  playlist:     https://www.youtube-nocookie.com/embed/videoseries?list=PLAYLIST_ID).
// Buttons without data-embed show a placeholder until a playlist is added.
// Privacy (two-click): nothing is loaded from YouTube until the visitor clicks
// "Load YouTube video". After that, switching genres loads players directly
// for the rest of the visit (consent is kept in memory only, not stored).
(function () {
  var buttons = document.querySelectorAll('.genre');
  var player = document.getElementById('player');
  if (!buttons.length || !player) return;
  var ytAllowed = false;

  function show(btn) {
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
    var url = btn.getAttribute('data-embed');
    var name = btn.textContent.trim();
    player.textContent = '';
    if (url && !ytAllowed) {
      var gate = document.createElement('div');
      gate.className = 'yt-gate';
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn btn-primary';
      b.textContent = 'Load YouTube video';
      b.addEventListener('click', function () { ytAllowed = true; show(btn); });
      var note = document.createElement('p');
      note.innerHTML = 'Loading the video connects to YouTube (Google), which receives your IP address and may set cookies. See the <a href="privacy.html#youtube">privacy policy</a>.';
      gate.appendChild(b);
      gate.appendChild(note);
      player.appendChild(gate);
    } else if (url) {
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
// Auto-advances every 10 s until the visitor navigates manually (then it stops for good);
// it also pauses while hovered or focused so a quote isn't swapped mid-read.
// Without JS all quotes simply show stacked.
(function () {
  var root = document.querySelector('.carousel');
  if (!root) return;
  var slides = root.querySelectorAll('.slide');
  var dotsBox = root.querySelector('.carousel-dots');
  if (slides.length < 2) return;
  var current = 0, dots = [];
  var AUTO_MS = 10000, timer = null, stopped = false, paused = false;

  slides.forEach(function (s, i) {
    var d = document.createElement('button');
    d.type = 'button';
    d.className = 'carousel-dot';
    d.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
    d.addEventListener('click', function () { manual(i); });
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
    b.addEventListener('click', function () { manual(current + Number(b.getAttribute('data-dir'))); });
  });

  var startX = null;
  root.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) manual(current + (dx < 0 ? 1 : -1));
    startX = null;
  });

  function manual(i) { stopped = true; clearInterval(timer); go(i); }
  function tick() { if (!stopped && !paused && !document.hidden) go(current + 1); }
  root.addEventListener('mouseenter', function () { paused = true; });
  root.addEventListener('mouseleave', function () { paused = false; });
  root.addEventListener('focusin', function () { paused = true; });
  root.addEventListener('focusout', function () { paused = false; });

  root.classList.add('is-ready');
  go(0);
  timer = setInterval(tick, AUTO_MS);
})();

// Dynamic age in the About intro, calculated from data-birthday (YYYY-MM-DD).
// Without JS the span stays hidden and the sentence reads "a composer and…".
(function () {
  var el = document.querySelector('.age[data-birthday]');
  if (!el) return;
  var p = el.getAttribute('data-birthday').split('-').map(Number);
  var now = new Date();
  var age = now.getFullYear() - p[0];
  if (now.getMonth() + 1 < p[1] || (now.getMonth() + 1 === p[1] && now.getDate() < p[2])) age--;
  el.textContent = age + '-year-old ';
  el.hidden = false;
})();
