
$(document).ready(function() {
	$('#errorAlert').hide();
	$('#successAlert').hide();
	$('#resultResponse').hide();
	$('form').on('submit', function(event) {
		var form_data = new FormData();
		form_data.append('text_file', $('#text_file')[0].files[0]);


		$.ajax({
			data: form_data,
			type : 'POST',
			url : '/predict',
			processData: false,
   			contentType: false,
			async: false,
      		cache: false,
			error   : console.log('error'),
            success : console.log('success'),
		})
		.done(function(data) {

			if (data.error) {
				$('#errorAlert').text(data.error).show();
				$('#successAlert').hide();
				$('#resultResponse').hide();
			}
			else {
				$('#successAlert').text(data.filename).show();
				$('#resultResponse').text(data.result).show();
				$('#errorAlert').hide();
			}
		});
		event.preventDefault();
	});
});

// $(document).ready(function() {
//     $('#btable').on('click', function(event) {
//             $.ajax({
// 			// data: form_data,
// 			type : 'POST',
// 			url : '/readdatabase',
// 			processData: false,
//    			contentType: false,
// 			async: false,
//       		cache: false,
// 			error   : console.log('error'),
//             success : console.log('success'),
// 		});
//             return false;
//           });
// });

$(document).ready(function() {

	var ctx = document.getElementsByTagName('canvas');
	// ctx.canvas.width = 300;
	// ctx.canvas.height = 300;
	var tar;
	var url_folder_first;
	var cht;
	var delay = function () {};
	var first_id;
	var url_folder = [];
	var button_state = [0,0,0,0,0,0,0,0,0];
	var config_chart = {
				type: 'line',
				data: {
					labels: [],
					datasets: [{
						label: 'Bearing Acceleration',
						data: [],
						backgroundColor: 'rgba(0,216,185,0.3)',
						borderColor: 'rgb(255,0,12)',
						borderWidth: 0.5,
						pointBackgroundColor: 'rgb(152,152,154)',
						pointBorderColor: 'rgb(0,0,0)',
					}]
				},
				options: {
					legend: {
						display: true
					},
					title: {
						display: true,
						text: 'Graph',
						position: 'top',
						fontSize: 16,
						padding: 5,
					},
					maintainAspectRatio: false,
        			responsive: true,
					// showScale: true,
					scales: {
						yAxes: [{
							ticks: {
								// min: -0.04,
								// beginAtZero: true,
								// steps: 10,
								stepSize: 0.02,
								max: 0.07,
							}
						}],
					}
				}};

    $("*[id^=btcard]").on('click', function() {
    	$(this).toggleClass("clicked");
    	// tar = $(this).text();
		tar = $(this).attr('id');
    	if(tar==="btcard0"){
    		if (button_state[0]===0) {button_state[0] = 1;
    		url_folder.push('data_file/machine_1/bearing_1/');
    		url_folder_first = 'data_file/machine_1/bearing_1/';
			first_chart(url_folder_first);
			first_bar(url_folder_first, 'bar110', 'bar111');
    		}
    		else {
    			button_state[0] = 0;
    			// url_folder.pop('data_file/machine_1/bearing_1/');
				url_folder = url_folder.filter(v => v !== 'data_file/machine_1/bearing_1/');
    		}}
		else if (tar==="btcard1"){
    		if (button_state[1]===0) {button_state[1] = 1;
    		url_folder.push('data_file/machine_1/bearing_2/');
			url_folder_first = 'data_file/machine_1/bearing_2/';
			first_chart(url_folder_first);
			first_bar(url_folder_first, "bar120", "bar121");
    		}
    		else {
    			button_state[1] = 0;
    			// url_folder.pop('data_file/machine_1/bearing_1/');
				url_folder = url_folder.filter(v => v !== 'data_file/machine_1/bearing_2/');
			}}
		else if (tar==="btcard2"){
    		if (button_state[2]===0) {button_state[2] = 1;
    		url_folder.push('data_file/machine_1/bearing_3/');
			url_folder_first = 'data_file/machine_1/bearing_3/';
			first_chart(url_folder_first);
			first_bar(url_folder_first, "bar130", "bar131");
    		}
    		else {
    			button_state[2] = 0;
    			// url_folder.pop('data_file/machine_1/bearing_1/');
				url_folder = url_folder.filter(v => v !== 'data_file/machine_1/bearing_3/');
			}}
		else if(tar==="btcard10"){
    		if (button_state[3]===0) {button_state[3] = 1;
    		url_folder.push('data_file/machine_2/bearing_1/');
			url_folder_first = 'data_file/machine_2/bearing_1/';
			first_chart(url_folder_first);
			first_bar(url_folder_first, "bar210", "bar211");
    		}
    		else {
    			button_state[3] = 0;
    			// url_folder.pop('data_file/machine_1/bearing_1/');
				url_folder = url_folder.filter(v => v !== 'data_file/machine_2/bearing_1/');
    		}}
		else if (tar==="btcard11"){
    		if (button_state[4]===0) {button_state[4] = 1;
    		url_folder.push('data_file/machine_2/bearing_2/');
			url_folder_first = 'data_file/machine_2/bearing_2/';
			first_chart(url_folder_first);
			first_bar(url_folder_first, "bar220", "bar221");
    		}
    		else {
    			button_state[4] = 0;
    			// url_folder.pop('data_file/machine_1/bearing_1/');
				url_folder = url_folder.filter(v => v !== 'data_file/machine_2/bearing_2/');
			}}
		else if (tar==="btcard12"){
    		if (button_state[5]===0) {button_state[5] = 1;
    		url_folder.push('data_file/machine_2/bearing_3/');
			url_folder_first = 'data_file/machine_2/bearing_3/';
			first_chart(url_folder_first);
			first_bar(url_folder_first, "bar230", "bar231");
    		}
    		else {
    			button_state[5] = 0;
    			// url_folder.pop('data_file/machine_1/bearing_1/');
				url_folder = url_folder.filter(v => v !== 'data_file/machine_2/bearing_3/');
			}}
		else if(tar==="btcard20"){
    		if (button_state[6]===0) {button_state[6] = 1;
    		url_folder.push('data_file/machine_3/bearing_1/');
			url_folder_first = 'data_file/machine_3/bearing_1/';
			first_chart(url_folder_first);
			first_bar(url_folder_first, "bar310", "bar311");
    		}
    		else {
    			button_state[6] = 0;
    			// url_folder.pop('data_file/machine_1/bearing_1/');
				url_folder = url_folder.filter(v => v !== 'data_file/machine_3/bearing_1/');
    		}}
		else if (tar==="btcard21"){
    		if (button_state[7]===0) {button_state[7] = 1;
    		url_folder.push('data_file/machine_3/bearing_2/');
			url_folder_first = 'data_file/machine_3/bearing_2/';
			first_chart(url_folder_first);
			first_bar(url_folder_first, "bar320", "bar321");
    		}
    		else {
    			button_state[7] = 0;
    			// url_folder.pop('data_file/machine_1/bearing_1/');
				url_folder = url_folder.filter(v => v !== 'data_file/machine_3/bearing_2/');
			}}
		else if (tar==="btcard22"){
    		if (button_state[8]===0) {button_state[8] = 1;
    		url_folder.push('data_file/machine_3/bearing_3/');
			url_folder_first = 'data_file/machine_3/bearing_3/';
			first_chart(url_folder_first);
			first_bar(url_folder_first, "bar330", "bar331");
    		}
    		else {
    			button_state[8] = 0;
    			// url_folder.pop('data_file/machine_1/bearing_1/');
				url_folder = url_folder.filter(v => v !== 'data_file/machine_3/bearing_3/');
			}}


		// cht = ctx[0].getContext('2d');



		if(url_folder.length>0){
		var data_new = new FormData();
		data_new.append("url_folder", url_folder);

		var refreshBar = setInterval(function () {
		if (url_folder.length===0) clearInterval(refreshBar);
				$.ajax({
					data: data_new,
					type : 'POST',
					url : '/lifebar',
					processData: false,
		   			contentType: false,
					async: false,
		      		cache: false,
					}).done(function(data_life){
						for (i=0; i< data_life.length; i++) {
						document.getElementById("bar" + data_life[i]["id"] + "0").style.width = 100 - data_life[i]['life_percent'] + "%";
						document.getElementById("bar" + data_life[i]["id"] + "1").style.width = data_life[i]['life_percent'] + "%";

						// document.getElementById("bar" + data_life[i]["id"] + "0").innerHTML = data_life[i]['life_past'];
						document.getElementById("bar" + data_life[i]["id"] + "1").innerHTML = data_life[i]['life'];
						}
						delay( function(){
							}, 100 );
					});
		}, 5000);
		var myChart = null;
		var refreshId = setInterval(function () {
		if (url_folder.length===0) {
			clearInterval(refreshId);
		}
            $.ajax({
			data: data_new,
			type : 'POST',
			url : '/linechart',
			processData: false,
   			contentType: false,
			async: false,
      		cache: false,
		}).done(function(data) {
			for (i=0; i< data.length; i++) {
				var ctx = document.getElementsByTagName('canvas');
				cht = ctx[parseInt(data[i]['id'])].getContext('2d');
				myChart = new Chart(cht, config_chart);
				addData(myChart, data[i]['ar_values'][0]['values'], data[i]['ar_values'][0]['labels'], data[i]['ar_values'][0]['max']);
				if (data[i]['ar_values'][0]['state'].toString()==='NORMAL'){
					document.getElementById("state" + data[i]['id'].toString()).className = "notify_normal";
					// $('#state' + data[i]['id'].toString()).addClass('notify_normal');
				}
				else if (data[i]['ar_values'][0]['state'].toString()!=='NORMAL'){
					document.getElementById("state" + data[i]['id'].toString()).className = "notify_alert";
					// $('#state' + data[i]['id'].toString()).addClass('notify_alert');
				}
				$('#state' + data[i]['id'].toString()).text(data[i]['ar_values'][0]['state']).show();
				delay( function(){

				}, 100 );
			}
			});

		}, 4000);
		}

		function first_bar(url_folder_first, name_bar0, name_bar1) {
			var data_new = new FormData();
			data_new.append("url_folder", url_folder_first);


			$.ajax({
				data: data_new,
				type: 'POST',
				url: '/lifebar',
				processData: false,
				contentType: false,
				async: false,
				cache: false,
			}).done(function (data_life) {
					// document.getElementById(name_bar0).innerHTML = data_life[0]['life_past'];
					document.getElementById(name_bar1).innerHTML = data_life[0]['life'];
					document.getElementById(name_bar0).style.width = 100 - data_life[0]['life_percent'] + "%";
					document.getElementById(name_bar1).style.width = data_life[0]['life_percent'] + "%";

			});
		}


		function addData(chart, data, label, data_max) {
		chart.data.datasets[0].data = data;
		chart.data.labels = label;
		chart.options.scales.yAxes[0].ticks.max = data_max;
		// chart.option.title.text = title;
		chart.update();
		}

		function first_chart(url_folder_first) {

		var data_first = new FormData();
		data_first.append("url_folder", url_folder_first);
            $.ajax({
			data: data_first,
			type : 'POST',
			url : '/linechart',
			processData: false,
   			contentType: false,
			async: false,
      		cache: false,
		}).done(function(data) {
				data = data[0];
				var ctx_first = document.getElementsByTagName('canvas');
				var cht_first = ctx_first[parseInt(data['id'])].getContext('2d');
				var myChart_first = new Chart(cht_first, {
				type: 'line',
				data: {
					labels: data['ar_values'][0]['labels'],
					datasets: [{
						label: 'Bearing Acceleration',
						data: data['ar_values'][0]['values'],
						backgroundColor: 'rgba(0,216,185,0.3)',
						borderColor: 'rgb(255,0,12)',
						borderWidth: 0.5,
						pointBackgroundColor: 'rgb(152,152,154)',
						pointBorderColor: 'rgb(0,0,0)',
					}]
				},
				options: {
					legend: {
						display: true
					},
					title: {
						display: true,
						text: 'Graph',
						position: 'top',
						fontSize: 16,
						padding: 5,
					},
					responsive: true,
					maintainAspectRatio: false,
					// showScale: true,
					scales: {
						yAxes: [{
							ticks: {
								// min: -0.04,
								// beginAtZero: true,
								// steps: 10,
								stepSize: 0.02,
								max: data['ar_values'][0]['max'],
							}
						}],
					}
				}});
				if (data['ar_values'][0]['state'].toString()==='NORMAL'){
					document.getElementById("state" + data['id'].toString()).className = "notify_normal";
					// $('#state' + data[i]['id'].toString()).addClass('notify_normal');
				}
				else if (data['ar_values'][0]['state'].toString()!=='NORMAL'){
					document.getElementById("state" + data['id'].toString()).className = "notify_alert";
					// $('#state' + data[i]['id'].toString()).addClass('notify_alert');
				}
				$('#state' + data['id'].toString()).text(data['ar_values'][0]['state']).show();
				});
            }

    });

});










// $(document).ready(function() {
//
// 	var tar = document.getElementById('barChart').getContext("2d");
//
// 	var myChart = new Chart(tar, {
// 		type: 'line',
// 		data: {
// 			labels: [],
// 			datasets: [{
// 				label: 'Bearing Acceleration',
// 				data: [],
// 				backgroundColor: 'rgba(0,216,185,0.3)',
// 				borderColor: 'rgb(255,0,12)',
// 				borderWidth: 0.5,
// 				pointBackgroundColor: 'rgb(152,152,154)',
// 				pointBorderColor: 'rgb(0,0,0)',
// 			}]
// 		},
// 		options: {
// 			legend: {
// 				display: true
// 			},
// 			title: {
// 				display: true,
// 				text: 'Graph',
// 				position: 'top',
// 				fontSize: 16,
// 				padding: 5,
// 			},
// 			scales: {
// 				yAxes: [{
// 					ticks: {
// 						// min: -0.04,
// 						beginAtZero: true,
// 						// steps: 10,
// 						stepSize: 0.005,
// 						max: 0.07,
// 					}
// 				}],
// 			}
// 		}});
//
// 	setInterval(function () {
// 		var url_folder = 'data_file/machine_1/bearing_1/';
// 		var data_new = new FormData();
// 		data_new.append("url_folder", url_folder);
//             $.ajax({
// 			data: data_new,
// 			type : 'POST',
// 			url : '/linechart',
// 			processData: false,
// 				//dataType: "json",
//    			contentType: false,
// 			async: false,
//       		cache: false,
// 		}).done(function(data) {
// 		addData(myChart, data.values, data.labels, data.max);
// 	})}, 5000);
//
// 	function addData(chart, data, label, data_max) {
// 		chart.data.datasets[0].data = data;
// 		chart.data.labels = label;
// 		chart.options.scales.yAxes[0].ticks.max = data_max;
// 		// chart.option.title.text = title;
// 		chart.update();
// 	}
// });



