async function deleteMovieHandler(event) {
    event.preventDefault();
    
     const id = document.querySelector('#movie_id').innerHTML;
    const response = await fetch(`/api/movies/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.replace('/profile/');
    } else {
      alert(response.statusText);
    }
  }


document.querySelector('#delete').addEventListener('click', deleteMovieHandler);