// JavaScript for Google Charts functions

// onload callback
function drawChart()
{
	var tmp = null;
	var public_key = 'wpKwzOZaVotqOz0XJq6p';
	// JSONP request
	var jsonData = $.ajax
	({
		url: 'https://data.sparkfun.com/output/' + public_key + '.json',
		data: {page: 1},
		dataType: 'jsonp',
	}).done(function(results) 
		{
			var data = new google.visualization.DataTable();

			data.addColumn('datetime', 'Time');
			data.addColumn('number', 'Temp');
			data.addColumn('number', '% RH');

			$.each(results, function(i, row)
			{
				data.addRow([
					(new Date(row.timestamp)),
					parseFloat(row.temp),
					parseFloat(row.rh)
				]);
			});

			var chart = new google.visualization.LineChart($('#chart_line').get(0));

			chart.draw(data, // line
			{
				//title: 'Chart Test'
				hAxis:
				{
					gridlines: 
					{
						count: 9,
					} 
				},
				curveType: 'function',
				colors:['#F66','#006699']
			});
		}).done(function(res) 
			{
				var data = google.visualization.arrayToDataTable(
				[
					['Label', 'Value'],
					['Deg. F', parseFloat(res[0].temp)],
					['% RH', parseFloat(res[0].rh)],
				]);
			
				var options = 
				{
					width: 400,
					height: 200,
					greenFrom: 60,
					greenTo: 72,
					//minorTicks: 5,
					majorTicks: ["0", "10", " 20", "30", "40", "50", "60", "70", "80", "90", "100"]
				}; // end options
				var chart = new google.visualization.Gauge(document.getElementById('chart_gauge'));

				chart.draw(data, options); //gauge
				
				/*setInterval(function() 
				{
					data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
					chart.draw(data, options);
				}, 1000);*/
							
			});
} // end drawChart
// load chart lib
google.load('visualization', '1', 
{
	packages: ['corechart', 'gauge']
});
// call drawChart once google charts is loaded
google.setOnLoadCallback(drawChart);
