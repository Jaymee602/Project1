// handling current time formatting

var now = moment();
var nowArray = [
    now.get('year'),
    now.get('month') + 1,
    now.get('date') - 1
];
if(nowArray[1] < 10){
    nowArray[1] = "0" + nowArray[1];
}
if(nowArray[2] < 10){
    nowArray[2] = "0" + nowArray[2];
}

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

async function NYTimesSearch(topic, search, startdate, enddate){
    var queries = "search/v2/articlesearch.json?";
    
    if(startdate){
        queries += "begin_date=" + startdate;
    }
    if(enddate){
        if(startdate){
            queries += "&";
        }
        queries += "end_date=";
    }

    if(queries){
        if(startdate || enddate){
            queries+="&"
        };
        queries += "fl=web_url";
    }

    if(topic){
        queries += "&fq=section_name%3A%20(%22" + topic + "%22)";
    }

    if(search){
        var array = search.split(" ");
        queries += "&q=" + array[0];
        for(var i = 1; i < array.length; i++){
            queries += "%2B" + array[i];
        }
    }
    queries += "&api-key=NbSmqy6RxhsJd8JK3rbJalvWSMsf1mqu";

    const json = await getNYTimesJSON(queries);
    var links = json.response.docs;
    return links;
};

// ------- Youtube Functions -------

// returns link to the most popular video on youtube today
async function popularVideo() {
    const json = await getYouTubeJSON("videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=4&regionCode=US&key=AIzaSyALijQA6Nkc_HNMR6qFP0T1IN-cAO0Il2o");  // command waits until completion
    var baseLink = "https://www.youtube.com/embed/";
    var id = json.items[0].id;
    baseLink += id;
    return baseLink;
};

async function searchYoutube(topic, search){
    var link = "search?part=snippet&maxResults=5&order=relevance&publishedAfter=" + nowArray[0] + "-" + nowArray[1] + "-" + nowArray[2] + "T00%3A00%3A00Z&q=";
    
    link += topic;
    if(search){
        var array = search.split(" ");
        for(var i = 1; i < array.length; i++){
            link += "%20" + array[i];
        };
    };
    
    link += "&type=video&videoDuration=short&videoEmbeddable=true&key=AIzaSyALijQA6Nkc_HNMR6qFP0T1IN-cAO0Il2o";
    const json = await getYouTubeJSON(link);
    console.log(json);
    var baseLink = "https://www.youtube.com/embed/";
    var id = json.items[0].id.videoId;
    baseLink += id;
    console.log(baseLink);
    return baseLink;
};
searchYoutube("Finance%20News", "");

// ------------- index functions ----------

var time = "" + nowArray[0] + nowArray[1] + nowArray[2];
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
if(article1){
    createArticlesIndex();
    createVideosIndex();
};


// -------------- politics functions ------------
var politicsArticle1 = document.querySelector("#article1Politics");
var politicsArticle2 = document.querySelector("#article2Politics");


async function createArticlesPolitics(){
    var json = await NYTimesSearch("World", "", time, "");
    var article1 = json[0].web_url;
    var article2 = json[1].web_url;

    article1 = makeNYIframe(article1);
    article2 = makeNYIframe(article2);
    
    politicsArticle1.setAttribute("src", article1);
    politicsArticle2.setAttribute("src", article2);
}
if(politicsArticle1){
    createArticlesPolitics();
};

// -------------- science functions ------------
var scienceArticle1 = document.querySelector("#article1Science");
var scienceArticle2 = document.querySelector("#article2Science");


async function createArticlesScience(){
    var json = await NYTimesSearch("Science", "", time, "");
    var article1 = json[0].web_url;
    var article2 = json[1].web_url;

    article1 = makeNYIframe(article1);
    article2 = makeNYIframe(article2);
    
    scienceArticle1.setAttribute("src", article1);
    scienceArticle2.setAttribute("src", article2);
}
if(scienceArticle1){
    createArticlesScience();
};


// -------------- sports functions ------------
var sportsArticle1 = document.querySelector("#article1Sports");
var sportsArticle2 = document.querySelector("#article2Sports");


async function createArticlesSports(){
    var json = await NYTimesSearch("Sports", "", time, "");
    var article1 = json[0].web_url;
    var article2 = json[1].web_url;

    article1 = makeNYIframe(article1);
    article2 = makeNYIframe(article2);
    
    sportsArticle1.setAttribute("src", article1);
    sportsArticle2.setAttribute("src", article2);
}
if(sportsArticle1){
    createArticlesSports();
};


// -------------- tech functions ------------
var techArticle1 = document.querySelector("#article1Tech");
var techArticle2 = document.querySelector("#article2Tech");
var techVideo = document.querySelector("#trending-tech");


async function createArticlesTech(){
    var json = await NYTimesSearch("Technology", "", time, "");
    var article1 = json[0].web_url;
    var article2 = json[1].web_url;

    article1 = makeNYIframe(article1);
    article2 = makeNYIframe(article2);
    
    techArticle1.setAttribute("src", article1);
    techArticle2.setAttribute("src", article2);

    var YTlink = await searchYoutube("Technology%20News", "");
    techVideo.setAttribute("src", YTlink);
}

if(techArticle1){
    createArticlesTech();

}

// -------------- finance functions ------------
var financeArticle1 = document.querySelector("#article1Finance");
var financeArticle2 = document.querySelector("#article2Finance");
var financeVideo = document.querySelector("#trending-finance");

async function createArticlesFinance(){
    var json = await NYTimesSearch("Your%20Money", "", time, "");
    console.log(json);
    var article1 = json[0].web_url;
    if(json[1]){
        var article2 = json[1].web_url;
        article2 = makeNYIframe(article2);
        financeArticle2.setAttribute("src", article2);
    };
    
    article1 = makeNYIframe(article1);
    financeArticle1.setAttribute("src", article1);

    var YTlink = await searchYoutube("Finance%20News", "");
    financeVideo.setAttribute("src", YTlink);
    
};
if(financeArticle1){
    createArticlesFinance();
};
