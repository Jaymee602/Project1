// returns NYTimes API info with given queries
function getNYTimesJSON(queries) {
    return fetch('https://api.nytimes.com/svc/' + queries)
    .then((response)=>response.json())
    .then((responseJson)=>{return responseJson});
};

async function popularArticles(numberArticle){
    const json = await getNYTimesJSON("mostpopular/v2/viewed/1.json?api-key=NbSmqy6RxhsJd8JK3rbJalvWSMsf1mqu");
    var topArticle = json.results[numberArticle].url;
    console.log(json);
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

function makeNYIframe(){
    var array = popularArticles(0);
    var URL = "https://www.nytimes.com/svc/oembed/html/?url=https%3A%2F%2Fwww.nytimes.com%2F2022%2F04%2F27%2Fscience%2Fnasa-mars-wreckage-photo.html"
    
}


popularArticles(0);
// makeNYIframe();