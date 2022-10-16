const loader = document.querySelector('#loader');

const displayLoading = () => {
  loader.classList.add('display');
};

const removeLoading = () => {
  loader.classList.remove('display');
};

async function addMovie(title) {

  const user_id = document.querySelector('#user_id').innerHTML.trim();

  const response = await fetch('/api/movies', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      user_id
    })
  });

  if (response.ok) {
    console.log('success!');
  } else {
    document.location.replace('/login');
  }
}

async function homeFormHandler(event) {
  event.preventDefault();

  document.querySelector('#suggestions').innerHTML = '';

  displayLoading();

  const amount = document.querySelector('#amount').value.trim();
  const type = document.querySelector('#type').value.trim();
  const genre = document.querySelector('#genre').value.trim();
  const era = document.querySelector('#era').value.trim();

  const response = await fetch('/api/generate', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: amount.toLowerCase(),
      type: type.toLowerCase(),
      genre: genre.toLowerCase(),
      era
    })
  });

  if (response.ok) {
    removeLoading();
  } else {
    removeLoading();
    alert('Error while loading suggestion');
  }

  const data = await response.json();
  const suggestions = document.getElementById('suggestions');

  if (amount != 'One') {
    const arr = data.result[0].text.split('\n');
    arr.splice(0,2);
  
    arr.forEach(item => {
      const listItemEl = document.createElement('li');
      const buttonEl = document.createElement('button');
      buttonEl.innerText = item.substring(3);
      buttonEl.addEventListener('click', (event) => {
        event.preventDefault();
        addMovie(item.substring(3));
      });
      listItemEl.appendChild(buttonEl);
      suggestions.appendChild(listItemEl);
    });
  } else {
    const result = data.result[0].text.trim();

    const listItemEl = document.createElement('li');
    const buttonEl = document.createElement('button');
    buttonEl.innerText = result;
    buttonEl.addEventListener('click', (event) => {
      event.preventDefault();
      addMovie(result);
    });

    listItemEl.appendChild(buttonEl);
    suggestions.appendChild(listItemEl);
  }
};

document.querySelector('#home-form').addEventListener('submit', homeFormHandler);