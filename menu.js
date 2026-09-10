/* Ouverture du deroulant des pays : clic, clavier, clic exterieur. */
(function () {
  var bouton = document.querySelector('.menu-deroulant button');
  var panneau = document.querySelector('.menu-panneau');
  if (!bouton || !panneau) return;

  function ouvrir(oui) {
    if (oui) panneau.setAttribute('data-ouvert', 'oui');
    else panneau.removeAttribute('data-ouvert');
    bouton.setAttribute('aria-expanded', oui ? 'true' : 'false');
  }

  bouton.addEventListener('click', function (e) {
    e.stopPropagation();
    ouvrir(bouton.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('click', function (e) {
    if (!panneau.contains(e.target)) ouvrir(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') ouvrir(false);
  });
})();
