

//Link to Firebase
var trainData = new Firebase("https://burning-torch-3473.firebaseio.com/");

//Button for adding new Schedules
 $("#addTrainBtn").on("click", function(){

		// Grabs user input
		var trainName = $("#trainNameInput").val().trim();
		var trainDest = $("#destinationInput").val().trim();
		var trainStart = $("#startInput").val().trim();
		var trainFreq = $("#frequencyInput").val().trim();

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
		alert("New Train Schedulesuccessfully added");

		// Clears all of the text-boxes
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#startInput").val("");
		$("#frequencyInput").val("");

		// Prevents moving to new page
		return false;
});


