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

    dots.forEach(function (dot, n) {
      dot.addEventListener('click', function () {
        show(n);
        start();
      });
    });

    wheel.addEventListener('mouseenter', stop);
    wheel.addEventListener('mouseleave', start);
    wheel.addEventListener('focusin', stop);
    wheel.addEventListener('focusout', start);

    show(0);
    start();
  });
});
