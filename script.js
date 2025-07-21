document.querySelectorAll('h3').forEach(header => {
  header.addEventListener('click', () => {
    const ul = header.nextElementSibling;
    ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
  });
});
