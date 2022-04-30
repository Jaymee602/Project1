// returns NYTimes API info with given queries
function getNYTimesJSON(queries) {
    return fetch('https://api.nytimes.com/svc/' + queries)
    .then((response)=>response.json())
    .then((responseJson)=>{return responseJson});
};

//returns a link to the most popular article today
async function popularArticle(){
    const json = await getNYTimesJSON("mostpopular/v2/viewed/1.json?api-key=NbSmqy6RxhsJd8JK3rbJalvWSMsf1mqu");
    var topArticle = json.results[1].url;
    makeNYIframe(topArticle);
    
};

// returns Youtube API info with given queries
function getYouTubeJSON(queries) {
    return fetch('https://youtube.googleapis.com/youtube/v3/' + queries)
    .then((response)=>response.json())
    .then((responseJson)=>{return responseJson});
};

// returns link to the most popular video on youtube today
async function popularVideo() {
    const json = await getYouTubeJSON("videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=1&regionCode=US&key=AIzaSyALijQA6Nkc_HNMR6qFP0T1IN-cAO0Il2o");  // command waits until completion
    var baseLink = "https://www.youtube.com/watch?v=";
    var id = json.items[0].id;
    baseLink += id;
    console.log(baseLink);            // hello is now available
};

//creates a usable iframe for an NYTimes Article
function makeNYIframe(baseURL){
    var trimURL = baseURL.replace("https://www.nytimes.com/", "");
    console.log(trimURL);
    
    var array = trimURL.split("/");
    var URL = "https://www.nytimes.com/svc/oembed/html/?url=https%3A%2F%2Fwww.nytimes.com"
    for(var i = 0; i < array.length; i++){
        array[i] = "%2F" + array[i];
        URL += array[i];
    }
    console.log(URL);
    var iframe = document.querySelector("#iframe");
    iframe.setAttribute("src", URL);
}



popularArticle();