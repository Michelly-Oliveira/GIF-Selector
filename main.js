const input = document.querySelector('input[type=text]');
const searchBtn = document.querySelector('.btn-search');
const loadBtn = document.querySelector('.btn-load');
const displayGIF = document.querySelector('.gif-container');

const apiKey = 'm4gEHSj5ByTR61ZGm3BMN7LYGBM6be4k';
let word = 'trending';
let startGIFPosition = 0;
const MAX_GIF_LIMIT = 9;

function queryAPI(wordToSearch) {
  const url = `https://api.giphy.com/v1/gifs/search?q=${wordToSearch}&api_key=${apiKey}&limit=${MAX_GIF_LIMIT}&offset=${startGIFPosition}`;

  fetch(url)
    .then(response => response.json())
    .then(objData => {
      const data = objData['data'];
      data.forEach(gif => {
        displayGIF.innerHTML += `
        <img class='gif' src='${gif.images.original.url}'></img>`;
      });
    })
    .catch(error => console.error());
}

function getInputAndDisplayGIF(e) {
  e.preventDefault();

  word = input.value;
  // Clear display
  displayGIF.innerHTML = '';

  queryAPI(word);
}

function showMoreGIF() {
  startGIFPosition += MAX_GIF_LIMIT;

  queryAPI(word);
}

searchBtn.addEventListener('click', getInputAndDisplayGIF);
loadBtn.addEventListener('click', showMoreGIF);

// Start with trending GIFs
queryAPI(word);
