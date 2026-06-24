// Equiatude Foundation — Photo Wheel (auto-fade carousel)
// Works for any number of .photo-wheel sections on a page.
document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.photo-wheel').forEach(function (wheel) {
    var slides = wheel.querySelectorAll('.photo-wheel-slides img');
    var dots = wheel.querySelectorAll('.photo-wheel-dots .dot');
    if (slides.length < 2) return;

    var index = 0;
    var interval = parseInt(wheel.getAttribute('data-interval'), 10) || 5000;
    var timer = null;

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (img, n) { img.classList.toggle('active', n === index); });
      dots.forEach(function (dot, n) { dot.classList.toggle('active', n === index); });
    }

    function start() {
      if (reduceMotion) return;
      stop();
      timer = setInterval(function () { show(index + 1); }, interval);
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    // Dot navigation
    dots.forEach(function (dot, n) {
      dot.addEventListener('click', function () { show(n); start(); });
    });

    // Arrow buttons (injected dynamically)
    var prevBtn = document.createElement('button');
    prevBtn.className = 'photo-wheel-arrow photo-wheel-prev';
    prevBtn.setAttribute('aria-label', 'Previous photo');
    prevBtn.innerHTML = '&#8249;';
    prevBtn.addEventListener('click', function () { show(index - 1); start(); });

    var nextBtn = document.createElement('button');
    nextBtn.className = 'photo-wheel-arrow photo-wheel-next';
    nextBtn.setAttribute('aria-label', 'Next photo');
    nextBtn.innerHTML = '&#8250;';
    nextBtn.addEventListener('click', function () { show(index + 1); start(); });

    wheel.appendChild(prevBtn);
    wheel.appendChild(nextBtn);

    // Swipe support (touch)
    var touchStartX = null;
    wheel.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    wheel.addEventListener('touchend', function (e) {
      if (touchStartX === null) return;
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        show(diff > 0 ? index + 1 : index - 1);
        start();
      }
      touchStartX = null;
    }, { passive: true });

    // Pause on hover/focus
    wheel.addEventListener('mouseenter', stop);
    wheel.addEventListener('mouseleave', start);
    wheel.addEventListener('focusin', stop);
    wheel.addEventListener('focusout', start);

    show(0);
    start();
  });
});
