// ------- base api pulls -------

// returns NYTimes API info with given queries
function getNYTimesJSON(queries) {
    return fetch('https://api.nytimes.com/svc/' + queries)
    .then((response)=>response.json())
    .then((responseJson)=>{return responseJson});
};

// returns Youtube API info with given queries
function getYouTubeJSON(queries) {
    return fetch('https://youtube.googleapis.com/youtube/v3/' + queries)
    .then((response)=>response.json())
    .then((responseJson)=>{return responseJson});
};



// ------- NYTimes Functions -------

//returns a usuable iframe link to the most popular article today
async function popularArticle(number){
    const json = await getNYTimesJSON("mostpopular/v2/viewed/1.json?api-key=NbSmqy6RxhsJd8JK3rbJalvWSMsf1mqu");
    var topArticle = json.results[number].url;
    var URL = makeNYIframe(topArticle);
    return URL;
};

// returns a usuable URL to throw into an NYTimes iframe from a normal NYTimes URL.
function makeNYIframe(baseURL){
    var trimURL = baseURL.replace("https://www.nytimes.com/", "");
    
    var array = trimURL.split("/");
    var URL = "https://www.nytimes.com/svc/oembed/html/?url=https%3A%2F%2Fwww.nytimes.com"
    for(var i = 0; i < array.length; i++){
        array[i] = "%2F" + array[i];
        URL += array[i];
    }
    return URL;
}



// ------- Youtube Functions -------

// returns link to the most popular video on youtube today
async function popularVideo() {
    const json = await getYouTubeJSON("videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=4&regionCode=US&key=AIzaSyALijQA6Nkc_HNMR6qFP0T1IN-cAO0Il2o");  // command waits until completion
    var baseLink = "https://www.youtube.com/embed/";
    var id = json.items[0].id;
    baseLink += id;
    return baseLink;
};

// ------------- index functions ----------

var article1 = document.querySelector("#article1");
var article2 = document.querySelector("#article2");
var videoOne = document.querySelector("#video1");

async function createArticlesIndex(){
    var popularArticle1 = await popularArticle(0);
    var popularArticle2 = await popularArticle(1);
    
    article1.setAttribute("src", popularArticle1);
    article2.setAttribute("src", popularArticle2);
}

async function createVideosIndex(){
    var videoURL = await popularVideo();

    videoOne.setAttribute("src", videoURL);
}

createArticlesIndex();
createVideosIndex();

// -------------- politics functions ------------


// -------------- science functions ------------


// -------------- sports functions ------------


// -------------- tech functions ------------


// -------------- finance functions ------------
