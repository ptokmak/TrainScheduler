$(document).ready(function() {

//Link to Firebase
var employeeData = new Firebase("https://burning-torch-3473.firebaseio.com/");

//Button for adding new Schedules
 $("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#employeeNameInput").val().trim();
	var trainDest = $("#destinationInput").val().trim();
	var trainStart = moment($("#startInput").val().trim(), "HH:mm").format("X");
	var trainFreq = $("#frequencyInput").val().trim();

	//Creates local "temporary" object for holding employee data
	var newTrain ={
		tName: trainName,
		tDest: trainDest,
		tStart: trainStart,
		tFreq: trainFreq
	};
	

});


})