//Link to Firebase
var trainData = new Firebase("https://burning-torch-3473.firebaseio.com/");

//Button for adding new Schedules
 $("#addTrainBtn").on("click", function(){

		// Grabs user input
		var trainName = $("#trainNameInput").val().trim();
		var trainDest = $("#destinationInput").val().trim();
		// var trainStart = $("#startInput").val().trim();

		var trainStart =  moment($("#startInput").val().trim(), "HH:mm").format("X");
		var trainFreq = moment($("#frequencyInput").val().trim(), "minutes").format("mm");
		console.log(trainFreq);

		//Creates local "temporary" object for holding employee data
		var newTrain ={
			tName: trainName,
			tDest: trainDest,
			tStart: trainStart,
			tFreq: trainFreq
		};

		//Uploading entered data to database
		trainData.push(newTrain); 

		//Logging user input to console
		console.log(newTrain.tName);
		console.log(newTrain.tDest);
		console.log(newTrain.tStart);
		console.log(newTrain.tFreq);

		// Alert
		alert("New Train Schedule successfully added");

		// Clears all of the text-boxes
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#startInput").val("");
		$("#frequencyInput").val("");

		// Prevents moving to new page
		return false;
});

//Create Firebase event for adding new schedule to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().tName;
	var trainDest = childSnapshot.val().tDest;
	var trainStart = childSnapshot.val().tStart;
	var trainFreq = childSnapshot.val().tFreq;

	// Log new variables
	console.log(trainName);
	console.log(trainDest);
	console.log(trainStart);
	console.log(trainFreq);


	//DTime difference between "now" and first train schedule
	var tDiff = moment().diff(moment.unix(trainStart, 'X'), "minutes");
	console.log(tDiff);

	//Format the entered frequency
	var trainFreqFormatted = moment.unix(trainFreq, 'minutes');
	console.log(trainFreqFormatted);

	//Find time remainder 
	var timeRemainder = tDiff % trainFreqFormatted; 
		console.log(timeRemainder);

	//Minutes Away from next train
	var minsAway = trainFreqFormatted - timeRemainder;
	console.log( minsAway);

	//Format the minutes away
	var minsAwayFormatted = moment.unix(minsAway).format("mm");
		console.log( minsAwayFormatted);

	//Time for next train 
	var nextTrain = moment().add(minsAway, "minutes");
		
	//Next Arrival time in military time format
	var nextArrival = moment(nextTrain).format("HH:mm");

	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" 
		+ trainName + "</td><td>" 
		+ trainDest + "</td><td>" 
		+ trainFreq + "</td><td>" 
		+ nextArrival + "</td><td>" 
		+ minsAwayFormatted + "</td></tr>");
	
});
