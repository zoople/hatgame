


function random (low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}


//Get a weighted random value based on a two arrays, the values and their weights
var getRandomWeightedValue = function (weights, values)
{
    var outputValue = null;

    var weight = 0;
    for (var weightIndex = 0; weightIndex < weights.length; ++weightIndex)
    {
        weight += weights[weightIndex];
    }

    var randomRange = random(0, weight);

    weight = 0;
    for (var valueIndex = 0; valueIndex < weights.length; ++valueIndex)
    {
        weight += weights[valueIndex];
        if (randomRange <= weight)
        {
            outputValue = values[valueIndex];
            break;
        }
    }

    return outputValue;
};


//Split a prize or "offer" into 3 portions
function split (curOffers, curTotalOffer)
{
	console.log("("+curTotalOffer+")");
	var firstSplit;
	var secondSplit


	firstSplit = random(0, curTotalOffer-1);
	secondSplit = random(firstSplit+1, curTotalOffer+1);

	curOffers[0] = firstSplit;
	curOffers[1] = secondSplit-firstSplit;
	curOffers[2] = curTotalOffer-curOffers[1]-curOffers[0];
}


//Get the prize of "offer"
function getOffer()
{
	var prizes = [25,30,35,40,45,50,60]
	var prizeWeight = [120, 80, 30,8,4,2,1]

	return getRandomWeightedValue(prizeWeight, prizes);
}

function gameRound(carryOver)
{
	
	var playerBids = [0,0,0];
	var offerBids = [0,0,0];
	var sharedPrizes = [0,0,0];
	var playerPrizes = [0,0,0];


	


	//TODO create real bids
	playerBids[0] = 0;
	playerBids[1] = 0;
	playerBids[2] = 1;

	//Record how many bids are made on each offer
	for (var playerID =0; playerID <3; playerID++)
	{
		offerBids[ playerBids[playerID] ] ++;
	}


	//Give out the prizes bidded for
	for (prize=0; prize<3; prize++){

		if (offerBids[prize] == 0) sharedPrizes[prize] = 0; else 
		{
			sharedPrizes[prize] = Math.floor(offers[prize]/offerBids[prize]);
			totalOffer -= (sharedPrizes[prize]*offerBids[prize]);
		}
	}

	console.log(sharedPrizes);
	
	return playerPrizes;
}

//Lets require/import the HTTP module
var http = require('http');
var util = require('util');

//Lets define a port we want to listen to
const PORT=8080; 

var potAmount = 0;
var state = 1;
var offers = [0,0,0];


function showAmounts(res)
{
	res.write("<style>");
	res.write(".button {padding: 15px 32px; font-size: 16px;}");
	res.write(".button0 {background-color: #4CAF50;} /* Green */");
	res.write(".button1 {background-color: #008CBA;} /* Blue */");
	res.write(".button2 {background-color: #f44336;} /* Red */");
	res.write("</style>");

	res.write("<form metod=\"post\">");
		
		for (var amt = 0; amt<3; amt++)
		{
			res.write("<input type=\"submit\" name=\"p"+amt+"\" action=\"/\" class=\"button button"+amt+"\" onclick=\"a\" value=\""+offers[amt]+" \"> ");
		}

		res.write("</form>");

	

}

function nextGame(carryOver, offers)
{

	var totalOffer = 0;
	totalOffer = getOffer()+carryOver; 

	split(offers, totalOffer); //Split the offer into 3 peices
	console.log(offers); //DB
}



//We need a function which handles requests and send response
function handleRequest(req, res){
    try {
        //log the request on console
        console.log(req.url);
			if (req.method.toLowerCase() == 'get') { 

							res.writeHead(200, {
			            'content-type': 'text/html'
			        });
						//nextGame();
						res.write("<H2>Player "+state+ " - Select a box: </H2>");
			        	
						showAmounts(res);
						res.end();

			} else if (req.method.toLowerCase() == 'post') {
				//console.log(req.blah);
				console.log("POST");
				state++;
				
				//res.writeHead(302, {'Location': './'});


			}
			res.end();


    } catch(err) {
        console.log(err);
        console.log("FCU");
    }
}


//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
    potAmount = 0;
    nextGame(0, offers);

});




	
	// var t = 0

	// t= gameRound(t);
	// console.log(t);





