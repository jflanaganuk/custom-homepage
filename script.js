var clock = document.querySelector('.clock');

function calculateTime() {
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var seconds = date.getSeconds();

  clock.innerHTML =
    sanitizeNumber(hour) +
    ':' +
    sanitizeNumber(minute) +
    ':' +
    sanitizeNumber(seconds);
}

function sanitizeNumber(input) {
  return input > 9 ? input : '0' + input;
}

setInterval(function() {
  calculateTime();
}, 1000);
calculateTime();

var searchEngines = [
  {
    site: 'ecosia.org',
    name: 'Ecosia',
    link: 'https://ecosia.org/search?q='
  },
  {
    site: 'google.com',
    name: 'Google',
    link: 'https://google.com/search?q='
  },
  {
    site: 'duckduckgo.com',
    name: 'DuckDuckGo',
    link: 'https://duckduckgo.com/?q='
  },
  {
    site: 'bing.com',
    name: 'Bing',
    link: 'https://www.bing.com/search?q='
  }
];

var searchText = document.querySelector('#searchText');
searchText.focus();
searchText.select();

searchText.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    searchGoogle();
  }
});

var storedSearchEngine = localStorage.getItem('currentSearchEngine');
if (storedSearchEngine == null) {
  storedSearchEngine = 0;
}

var currentSearchLink = searchEngines[storedSearchEngine].link;
var currentSearchText = searchEngines[storedSearchEngine].name;

function searchGoogle() {
  var searchValue = searchText.value;
  var sanitizedSearchValue = searchValue.replace(/ /g, '+');
  window.location.href = currentSearchLink + sanitizedSearchValue;
}

var searchSelectContainer = document.querySelector('#searchSelectContainer');

var searchEnginesText = '';
for (var i = 0; i < searchEngines.length; i++) {
  searchEnginesText += `<li class="searchEngineChoice" id="${i}">
                            <img class="favicon" src="https://www.google.com/s2/favicons?domain=${
                              searchEngines[i].site
                            }" alt="${searchEngines[i].name}" />
                            ${searchEngines[i].name}
                        </li>`;
}

searchSelectContainer.innerHTML = `<ul>${searchEnginesText}</ul>`;
searchText.placeholder = `Search ${currentSearchText}`;

var searchChoosers = document.querySelectorAll('.searchEngineChoice');
searchChoosers.forEach(function(searchChooser) {
  searchChooser.onclick = function(e) {
    var currentClick = e.target.id;
    localStorage.setItem('currentSearchEngine', currentClick);
    currentSearchLink = searchEngines[currentClick].link;
    currentSearchText = searchEngines[currentClick].name;
    searchText.placeholder = `Search ${currentSearchText}`;
  };
});

var titles = [
  "JFlagg's Custom Homepage",
  "Joshua's Creative Hosepipe",
  'Joking creates Humour',
  'Just catch haddocks',
  'Jumping cats happen',
  'Jousting consumes heroes',
  'Jiggly crayon holder',
  'Juicy carrot house'
];
var chosenTitle = titles[parseInt(Math.random() * titles.length)];

var title = document.querySelector('title');
title.innerHTML = chosenTitle;
var h1title = document.querySelector('#title');
h1title.innerHTML = chosenTitle;

var newsApiSubmit = document.querySelector('.newsApiSubmit');
var newsApiInfo = document.querySelector('.newsApiInfo');
var newsApiKey = localStorage.getItem('newsApiKey');

if (newsApiKey == null) {
    newsApiSubmit.addEventListener('keyup', function(e){
        if(e.keyCode === 13) {
          testNewsApiKey(newsApiSubmit.value);
        }
    });
} else {
    fetchNews(newsApiKey);
}

function fetchNews(apiKey) {
  var url =
    `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${apiKey}`;
  var req = new Request(url);
  fetch(req)
    .then(response => response.json())
    .then(data => {
      if (data.status == 'ok') {
        formatNewsFeed(data);
      } else {
        console.error('Error with returned data:');
        console.error(data);
      }
    })
    .catch(e => console.error(e));
}

function testNewsApiKey(apiKey) {
    var url =
      `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${apiKey}`;
    var req = new Request(url);
    fetch(req)
    .then(response => response.json())
    .then(data => {
      if(data.status != 'error') {
        fetchNews(apiKey);
        localStorage.setItem('newsApiKey', apiKey);
      } else {
        alert('Invalid api key')
      }
    })
    .catch(e => {
      console.error(e);
      alert("Error with api request (check console)")
    })
}

function formatNewsFeed({articles}) {
  var newsFeed = document.querySelector('.newsFeed');
  var newsFeedContent = '';
  articles.map((article, index) => {
    const desc = article.description !== null ? article.description : "";
    newsFeedContent += `<div class="articleContainer">
      <a href="${article.url}">
        <div class="articleImage" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${article.urlToImage})">
            <div id="trigger${index}" class="scroll"></>
            <strong class="articleTitle">${article.title}</strong>
            <p class="articleDescription">${desc}</p>
        </div>
      </a>
    </div>`;
  });
  newsFeed.innerHTML = newsFeedContent;
  newsApiSubmit.className = `${newsApiSubmit.className} hidden`;
  newsApiInfo.className = `${newsApiInfo.className} hidden`;
  bindScrollMagicPins();
}

var controller = new ScrollMagic.Controller();

function bindScrollMagicPins() {

  (function(){
    var elements = document.querySelectorAll('.scroll');

    elements.forEach((element, index) => {
      var duration = 700;
      new ScrollMagic.Scene({triggerElement: `#${element.id}`, duration: duration})
      .setPin(`#trigger${index}`)
      .addTo(controller);
    })
  })();
};
