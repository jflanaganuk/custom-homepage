var clock = document.querySelector('.clock');

function calculateTime() {

    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    
    clock.innerHTML = sanitizeNumber(hour) + ':' + sanitizeNumber(minute) + ':' + sanitizeNumber(seconds);
}

function sanitizeNumber(input) {
    return (input > 9) ? input : '0' + input;
}

setInterval(function() {calculateTime()}, 1000);
calculateTime();

var searchEngines = [
    {
        site:"ecosia.org",
        name:"Ecosia",
        link:"https://ecosia.org/search?q=",
    },
    {
        site:"google.com",
        name:"Google",
        link:"https://google.com/search?q="
    },
    {
        site:"duckduckgo.com",
        name:"DuckDuckGo",
        link:"https://duckduckgo.com/?q="
    },
    {
        site:"bing.com",
        name:"Bing",
        link:"https://www.bing.com/search?q="
    }
];

var searchText = document.querySelector('#searchText');
searchText.focus();
searchText.select();

searchText.addEventListener("keyup", function(e){
    if(e.keyCode === 13) {
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

function searchGoogle(){
    var searchValue = searchText.value;
    var sanitizedSearchValue = searchValue.replace(/ /g, '+');
    window.location.href = currentSearchLink + sanitizedSearchValue;
}

var searchSelectContainer = document.querySelector('#searchSelectContainer');

var searchEnginesText = '';
for(var i = 0; i < searchEngines.length; i++) {
    searchEnginesText += `<li class="searchEngineChoice" id="${i}">
                            <img class="favicon" src="https://www.google.com/s2/favicons?domain=${searchEngines[i].site}" alt="${searchEngines[i].name}" />
                            ${searchEngines[i].name}
                        </li>`;
}

searchSelectContainer.innerHTML = `<ul>${searchEnginesText}</ul>`;
searchText.placeholder = `Search ${currentSearchText}`;

var searchChoosers = document.querySelectorAll('.searchEngineChoice');
searchChoosers.forEach(function(searchChooser){
    searchChooser.onclick = function(e) {
        var currentClick = e.target.id;
        localStorage.setItem('currentSearchEngine', currentClick);
        currentSearchLink = searchEngines[currentClick].link;
        currentSearchText = searchEngines[currentClick].name;
        searchText.placeholder = `Search ${currentSearchText}`;
    }
});

var titles = [
    "JFlagg's Custom Homepage",
    "Joshua's Creative Hosepipe",
    "Joking creates Humour",
    "Just catch haddocks",
    "Jumping cats happen",
    "Jousting consumes heroes",
    "Jiggly crayon holder",
    "Juicy carrot house"
];
var chosenTitle = titles[parseInt(Math.random() * titles.length)];

var title = document.querySelector('title');
title.innerHTML = chosenTitle;
var h1title = document.querySelector('#title');
h1title.innerHTML = chosenTitle;

var bookmarks =  [
    {
        site:"youtube.com",
        name:"Youtube - Subscriptions",
        link:"http://www.youtube.com/feed/subscriptions",
    },
    {
        site:"reddit.com/",
        name:"Reddit",
        link:"http://old.reddit.com",
    },
    {
        site:"halifax.co.uk",
        name:"Halifax",
        link:"https://www.halifax-online.co.uk/personal/logon/login.jsp",
    },
    {
        site:"deathbulge.com",
        name:"Deathbulge",
        link:"http://www.deathbulge.com/index.php/",
    },
    {
        site:"howtogeek.com",
        name:"HowToGeek",
        link:"http://www.howtogeek.com/",
    },
    {
        site:"9gag.com",
        name:"9gag",
        link:"http://9gag.com/",
    },
    {
        site:"amazon.co.uk",
        name:"Amazon - Shopping",
        link:"http://smile.amazon.co.uk/",
    },
    {
        site:"uploadr.co.uk",
        name:"Uploadr",
        link:"http://uploadr.co.uk/",
    },
    {
        site:"assets/sonarr.png",
        name:"Sonarr",
        link:"http://www.uploadr.co.uk:38082/",
        custom:true,
    },
    {
        site:"assets/radarr.png",
        name:"Radarr",
        link:"http://www.uploadr.co.uk:38083/",
        custom:true,
    },
    {
        site:"assets/plex.png",
        name:"Plex",
        link:"http://www.uploadr.co.uk:32401/web/index.html",
        custom:true,
    },
    {
        site:"nzbplanet.net",
        name:"NzbPlanet",
        link:"http://nzbplanet.net/",
    },
    {
        site:"facebook.com",
        name:"Facebook",
        link:"https://www.facebook.com/",
    },
    {
        site:"spotify.com",
        name:"Spotify",
        link:"https://open.spotify.com/browse/featured",
    },
    {
        site:"mcdee.net",
        name:"Elite Dangerous - bindings",
        link:"https://www.mcdee.net/elite/binds/pinthz?replay=pinthz",
    },
    {
        site:"phaser.io",
        name:"Phaser - JS Game Library",
        link:"http://phaser.io/tutorials/coding-tips-007",
    },
    {
        site:"npmjs.com",
        name:"Patchwire",
        link:"https://www.npmjs.com/package/patchwire",
    },
    {
        site:"github.com",
        name:"Patchwire - wiki",
        link:"https://github.com/twisterghost/patchwire/wiki",
    },
    {
        site:"nctx.co.uk",
        name:"NCTX Transport",
        link:"https://www.nctx.co.uk/my/login",
    },
    {
        site:"scrollmagic.io",
        name:"Scrollmagic",
        link:"http://scrollmagic.io/",
    },
    {
        site:"stackexchange.com",
        name:"Stackexchange",
        link:"https://gamedev.stackexchange.com/questions/47557/when-and-where-should-i-calculate-collision-response-with-multiplayer-physics",
    },
    {
        site:"github.com",
        name:"Rust lang",
        link:"https://github.com/rust-lang/book/tree/master/src",
    },
    {
        site:"slack.com",
        name:"JH - Slack",
        link:"https://jh.slack.com/messages",
    },
    {
        site:"myanimelist.net",
        name:"Watch Naruto without filler",
        link:"https://myanimelist.net/forum/?topicid=350747",
    },
    {
        site:"whatshouldisteam.com",
        name:"What should I play on steam?",
        link:"https://whatshouldisteam.com/play/76561198004838769",
    },
    {
        site:"rtorr.com",
        name:"Vim Shortcuts",
        link:"https://vim.rtorr.com/",
    },
    {
        site:"github.io",
        name:"Service Worker Basics",
        link:"https://googlechrome.github.io/samples/service-worker/basic/",
    }
];

var bookmarksContainer = document.querySelector('#bookmarkContainer');

var bookmarksList = '';

for(var i = 0; i < bookmarks.length; i++) {
    bookmarksList += `<li>
                        <a href="${bookmarks[i].link}">
                            <img class="favicon" src="https://www.google.com/s2/favicons?domain=${bookmarks[i].site}" alt="${bookmarks[i].name}"/>
                            ${bookmarks[i].name}
                        </a>
                    </li>`;
}

bookmarksContainer.innerHTML = '<ul>' + bookmarksList + '</ul>';
