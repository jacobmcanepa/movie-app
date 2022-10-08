async function homeFormHandler(event) {
  event.preventDefault();

  const genre = document.querySelector('#genre').value.trim();
  const era = document.querySelector('#era').value.trim();

  const response = await fetch('/api/generate', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      genre,
      era
    })
  });

  //console.log(genre, era);

  const data = await response.json();
  console.log(data.result[0].text);

  const suggestions = document.getElementById('suggestions');
  suggestions.innerHTML = '';
  suggestions.innerHTML = data.result[0].text;
};

document.querySelector('#home-form').addEventListener('submit', homeFormHandler);