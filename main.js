var score = [0,0,0,0];

var convertTime = function (time) {
	var timeSec = 0;
	var timeMin = 0;

	if (time > 999) {
  		timeSec = Math.round(time / 1000);
  		if (timeSec > 59) {
  			timeMin = Math.round(timeSec / 60);
  			timeSec = timeSec % 60;
  		}
  	}
  	if (timeSec < 10) {
  		timeSec = '0' + timeSec;
  	}
  	return (timeMin + ":" + timeSec);
};

var output = function(data) {
	var place = $(document).find('#metric-data');
	place.empty();

	place.append('<li>Percentage of Page Viewed: ' + data[0] + '%</li>');
	place.append('<li>Total Distance Scrolled: ' + data[1] + '%</li>');
	place.append('<li>Time Before Clicking Sign Up: ' + data[2] + '</li>');
	place.append('<li>Time Spent on Page: ' + data[3] + '</li>')
	place.append('<li>Time Spent on Each Section: ' + data[4] + '</li>');
};

var checkOne = function(group) {
	group.on('change',function(){
   		group.not(this).prop('checked',false);
	});
};

var whichGod = function(god) {
	if (god === "ammy") {
		score[0] = score[0] + 1;
	}
	else if (god === "susano") {
		score[1] = score[1] + 1;
	}
	else if (god === 'tsuku') {
		score[2] = score[2] + 1;
	}
	else {
		score[3] = score[3] + 1;
	}
}

var results = function() {
	if (score[0] >= (score[1] || score[2] || score[3])) {
		$('#winAmmy').show();
	}
	else if (score[1] >= (score[2] || score[3] || score[0])) {
		$('#winSusano').show();
	}
	else if (score[3] >= (score[2] || score[1] || score[0])) {
		$('#winUzume').show();
	}
	else {
		$('#winTsuku').show();
	}
}


$(document).on('ready', function() {
	var scrollPercent = 0;
	var data = [0,0,0,0,0];
	var last = new Date().getTime();
	var timeDiff = 0;
	var metricOn = 0;
	var metricOff = 0;
	var onOff = 0;
	var metricTime = 0;

	$('.metric').on('click', 'button', function() {
  		$(this).closest('.container').find('.metric-info').fadeToggle();
  		$('body').find('.grayout').fadeToggle();

  		if (onOff === 0) {
  			onOff = 1;
  			metricOn = new Date().getTime();
  		}
  		else {
  			onOff = 0;
  			metricOff = new Date().getTime();
  			metricTime = metricTime + (metricOff - metricOn);
  		}
  		console.log(metricTime);

  		newScrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
  		if (newScrollPercent > scrollPercent) {
  			scrollPercent = newScrollPercent;
  		}


  		var now = new Date().getTime();
  		timeDiff = (now - last) - metricTime;

  		var totalTime = convertTime(timeDiff);

  		data = [scrollPercent.toFixed(2), newScrollPercent.toFixed(2), 0, totalTime, 0];
  		console.log(data);
  		
  		output(data);
  	});
	
	
	var radio1 = $('.group1 :radio');
	var radio2 = $('.group2 :radio');
	var radio3 = $('.group3 :radio');
	var radio4 = $('.group4 :radio');
	
	radio1.on('change',function(){
   		checkOne(radio1);
	});
	radio2.on('change', function() {
		checkOne(radio2);
	});
	radio3.on('change', function() {
		checkOne(radio3);
	});
	radio4.on('change', function() {
		checkOne(radio4);
	});


	/*$( ".group1" ).on( "click", 'input', function() {
  		console.log( $( "input:checked" ).val() + " is checked!" );
	});*/


	$('.poll').on('click', 'button', function(e) {
		e.preventDefault();
		var uzumeTot = 0;
		var ammyTot = 0;
		var tsukuTot = 0;
		var susanoTot = 0;
		var place = 1;

  		whichGod( $( ".group1 input:checked" ).val());
  		whichGod( $( ".group2 input:checked" ).val());
  		whichGod( $( ".group3 input:checked" ).val());
  		whichGod( $( ".group4 input:checked" ).val());
 		console.log( $( ".group1 input:checked" ).val() + " is checked!" );
  		console.log( $( ".group2 input:checked" ).val() + " is checked!" );
  		console.log( $( ".group3 input:checked" ).val() + " is checked!" );
  		console.log( $( ".group4 input:checked" ).val() + " is checked!" );
	
  		console.log(score);
  		results();

/*
	$( ".group1" ).on( "click", 'input', function() {
  		console.log( $( "input:checked" ).val() + " is checked!" );
	});*/
	/*	var stuff = $(this).closest('.poll').find('.group1').find('.uzume');
		console.log(stuff.checked;
		var groupTest = $('.group1'); */
		// console.log(document.getElementById('group1').getElementsByClassName("uzume"));
	});
});