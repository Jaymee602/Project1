var array;

var test = function(){
    fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=AIzaSyALijQA6Nkc_HNMR6qFP0T1IN-cAO0Il2o").then(function(response){
        response.json().then(function(data){
            console.log(data);
            array = data.items;
            console.log(array);
        })
    })
}

test();
