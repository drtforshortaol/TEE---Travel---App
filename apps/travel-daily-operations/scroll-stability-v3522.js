"use strict";
(() => {
  let lastY = window.scrollY || 0;
  let highestY = lastY;
  let downwardIntentUntil = 0;
  let touchY = null;
  let restoring = false;

  const now = () => performance.now();
  const markDownwardIntent = () => { downwardIntentUntil = now() + 900; };

  addEventListener('touchstart', e => {
    touchY = e.touches && e.touches[0] ? e.touches[0].clientY : null;
    highestY = Math.max(highestY, window.scrollY || 0);
  }, {passive:true});

  addEventListener('touchmove', e => {
    const y = e.touches && e.touches[0] ? e.touches[0].clientY : null;
    if (touchY != null && y != null) {
      if (y < touchY - 2) markDownwardIntent();
      else if (y > touchY + 6) downwardIntentUntil = 0;
      touchY = y;
    }
  }, {passive:true});

  addEventListener('wheel', e => {
    if (e.deltaY > 0) markDownwardIntent();
    else if (e.deltaY < 0) downwardIntentUntil = 0;
  }, {passive:true});

  addEventListener('scroll', () => {
    if (restoring) return;
    const y = window.scrollY || 0;
    if (y >= lastY) highestY = Math.max(highestY, y);

    const unintendedUpJump = now() < downwardIntentUntil && highestY > 500 && y < highestY - 140;
    if (unintendedUpJump) {
      restoring = true;
      requestAnimationFrame(() => {
        window.scrollTo({top: highestY, left:0, behavior:'auto'});
        lastY = highestY;
        restoring = false;
      });
      return;
    }

    if (now() >= downwardIntentUntil && y < lastY - 20) highestY = y;
    lastY = y;
  }, {passive:true});

  addEventListener('pageshow', () => {
    lastY = window.scrollY || 0;
    highestY = lastY;
    downwardIntentUntil = 0;
  });
})();
