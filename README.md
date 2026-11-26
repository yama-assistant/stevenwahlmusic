# stevenwahlmusic – redesign workspace

Hand-coded replacement for the Nicepage site at https://sfrancisw.github.io/stevenwahlmusic/.
Development happens here (yama-assistant); Steven copies the finished files into `sfrancisw/stevenwahlmusic` himself.

## Structure
- `index.html` – home: hero/contact CTA → music → testimonials → about → credits → contact
- `blog/` – blog index + one HTML file per post
- `css/style.css` – all styles (colors/spacing as CSS variables at the top)
- `js/main.js` – genre switcher for the YouTube player
- `imprint.html`, `privacy.html` – legal pages (fill in the `[placeholders]` before going live)
- `fonts/` – self-hosted Manrope (no Google Fonts requests)
- `images/`, `files/` – screenshots, avatar, favicon, CV
- `Blogs/…`, `Music-Blog.html`, `Steven-Wahl---Music-Composer.html` – redirects from old Nicepage URLs

## How to update
- **Credit:** copy one `<a class="credit">` block in `index.html`, set `href`, image, title, description.
- **Playlist:** add a `<button class="genre" data-embed="https://www.youtube-nocookie.com/embed/videoseries?list=PLAYLIST_ID">Genre</button>`.
- **Blog post:** copy `blog/writing-good-vs-fitting-music.html`, change the content, add an `<li>` to `blog/index.html`.

Open TODOs are marked `TODO` / `[brackets]` in the HTML.
