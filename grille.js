/* Ouverture des photos en plein ecran, navigation clavier et tactile. */
(function () {
  var liens = [].slice.call(document.querySelectorAll('.grille a[data-plein]'));
  if (!liens.length) return;

  var vue = document.createElement('div');
  vue.className = 'visionneuse';
  vue.innerHTML =
    '<button class="fermer" aria-label="Fermer">×</button>' +
    '<button class="precedent" aria-label="Photo précédente">‹</button>' +
    '<button class="suivant" aria-label="Photo suivante">›</button>' +
    '<img alt=""><figcaption></figcaption><div class="compteur"></div>';
  document.body.appendChild(vue);

  var image = vue.querySelector('img');
  var legende = vue.querySelector('figcaption');
  var compteur = vue.querySelector('.compteur');
  var index = 0;

  function afficher(i) {
    index = (i + liens.length) % liens.length;
    var lien = liens[index];
    image.src = lien.getAttribute('data-plein');
    var texte = lien.getAttribute('data-legende') || '';
    legende.textContent = texte;
    legende.style.display = texte ? '' : 'none';
    compteur.textContent = (index + 1) + ' / ' + liens.length;
  }

  function ouvrir(i) { afficher(i); vue.setAttribute('data-ouverte', 'oui'); document.body.style.overflow = 'hidden'; }
  function fermer() { vue.removeAttribute('data-ouverte'); document.body.style.overflow = ''; }

  liens.forEach(function (lien, i) {
    lien.addEventListener('click', function (e) { e.preventDefault(); ouvrir(i); });
  });

  vue.querySelector('.fermer').addEventListener('click', fermer);
  vue.querySelector('.precedent').addEventListener('click', function (e) { e.stopPropagation(); afficher(index - 1); });
  vue.querySelector('.suivant').addEventListener('click', function (e) { e.stopPropagation(); afficher(index + 1); });
  vue.addEventListener('click', function (e) { if (e.target === vue) fermer(); });

  document.addEventListener('keydown', function (e) {
    if (vue.getAttribute('data-ouverte') !== 'oui') return;
    if (e.key === 'Escape') fermer();
    else if (e.key === 'ArrowLeft') afficher(index - 1);
    else if (e.key === 'ArrowRight') afficher(index + 1);
  });

  var depart = null;
  vue.addEventListener('touchstart', function (e) { depart = e.touches[0].clientX; }, { passive: true });
  vue.addEventListener('touchend', function (e) {
    if (depart === null) return;
    var ecart = e.changedTouches[0].clientX - depart;
    if (Math.abs(ecart) > 45) afficher(index + (ecart < 0 ? 1 : -1));
    depart = null;
  }, { passive: true });
})();
