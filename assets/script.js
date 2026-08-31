// Q-LAB 360 — interactividad compartida

document.addEventListener('DOMContentLoaded', () => {
  // ---- Línea del tiempo interactiva (semana 2) ----
  const stations = document.querySelectorAll('.station');
  if (stations.length) {
    const progressFill = document.querySelector('.progress-fill');
    const total = stations.length;

    const updateProgress = () => {
      const done = document.querySelectorAll('.station.is-done').length;
      if (progressFill) progressFill.style.width = Math.round((done / total) * 100) + '%';
    };

    stations.forEach(station => {
      const buttons = station.querySelectorAll('.opt-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.opt;

          // marcar botones
          buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
          btn.setAttribute('aria-pressed', 'true');

          // mostrar solo el outcome correspondiente
          station.querySelectorAll('.outcome').forEach(o => o.classList.remove('show'));
          const outcome = station.querySelector(`.outcome[data-for="${key}"]`);
          if (outcome) outcome.classList.add('show');

          const learn = station.querySelector('.learn');
          if (learn) learn.classList.add('show');

          station.classList.add('is-done');
          updateProgress();
        });
      });
    });

    updateProgress();
  }

  // ---- Hoja de verificación editable: limpiar celdas (semana 3) ----
  const resetBtn = document.querySelector('[data-action="reset-hoja"]');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('td.fill[contenteditable="true"]').forEach(td => td.textContent = '');
    });
  }
});
