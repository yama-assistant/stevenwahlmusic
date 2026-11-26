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
