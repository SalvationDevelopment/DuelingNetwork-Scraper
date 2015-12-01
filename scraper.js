var dnImageHost = "http://duel.duelingnetwork.com",
    dnImagePort = 8080,
    dnImagePathBase = "Dueling_Network/images/cards/",
    timeStampBegin = 1290000000000, // empirically selected begin for cards that use time stamps... fuck DN
    regularIDEnd = 7800, // just assume DN has ~7800 cards (390 * 20 based on their current deck editor)
    imageDirLocation = "C:/Users/root/Documents/DN Images/";
    
function scrapeDNImage (cardID, timeStamp) {
    var currentURL = dnImagePathBase + cardID + ((timeStamp && "_" + timeStamp) || "");
    http.get({
        host: dnImageHost,
        port: dnImagePort
        path: currentURL
    }, function (result) {
        var imageData = "";
        result.setEncoding("binary");
        result.on('data', function (chunk) {
            console.log('Received data chunk...');
            imageData += chunk;
        });
        result.on('end', function () {
            fs.writeFile(imageDirLocation + cardID + ((timeStamp && "_" + timeStamp) || "") + ".jpg", imageData, "binary", function (error) {
                if (error) {
                    throw error;
                } else {
                    console.log("Saved card: " + cardID);
                }
            });
        });
    });
}

function urlExists (urlObject, callback) {
    http.request(urlObject, callback(r.statusCode));
}
