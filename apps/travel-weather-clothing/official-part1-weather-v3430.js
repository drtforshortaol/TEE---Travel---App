"use strict";
// Official Part 1 itinerary overlay (Enchanting Travels, Sep 15-30, 2026).
// Scope is deliberately limited to Part 1. Part 2 weather data is untouched.
try {
  const pula = WEATHER.find(item => item && item.city === 'Pula');
  if (pula) {
    pula.dates = 'Sep 26 day trip';
    pula.sort = '2026-09-26';
  }
  render();
} catch (error) {
  console.warn('TEE official Part 1 weather overlay could not apply:', error);
}
