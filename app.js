window.addEventListener('hashchange', () => {
  const route = location.hash.slice(1); // z. B. #rf-web → "rf-web"
  if (route === 'rf-web') {
    fetch('https://network.github.io') // Holt die HTML-Seite
      .then(res => res.text())         // Wandelt sie in Text um
      .then(html => {
        document.getElementById('main-view').innerHTML = html; // Zeigt sie im Container
      });
  }
});
