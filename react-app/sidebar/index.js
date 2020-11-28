
window.addEventListener('DOMContentLoaded', () => {
  const client = window.parent.bookmanager.getClient();
  
  client.getDirectories()
    .then(dirs => {
      const el = document.getElementById("contents").textContent = JSON.stringify(dirs);
    });
});

