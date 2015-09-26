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
						colors:['#FD887A','#99CCCC']
					});

				}).done(function(res) 
					{
						var data = google.visualization.arrayToDataTable(
						[
							['Label', 'Value'],
							['Deg. F', parseFloat(res[0].temp)],
						]);
					
                        var options = 
                        {
                            width: 250,
                            height: 250,
							yellowFrom: 75,
							yellowTo: 80,
							redFrom: 80,
							redTo: 100,
							yellowColor: ['#F4E76E'],
							redColor: ['#FD887A'],
                            majorTicks: ["0", "10", " 20", "30", "40", "50", "60", "70", "80", "90", "100"]
                        }; // end options

                        var chart = new google.visualization.Gauge(document.getElementById('temp_gauge'));
        
                        chart.draw(data, options); //gauge
						
									
					}).done(function(res) 
					{
						var data = google.visualization.arrayToDataTable(
						[
							['Label', 'Value'],
							['% RH', parseFloat(res[0].rh)],
						]);
					
                        var options = 
                        {
                            width: 250,
                            height: 250,
                            greenFrom: 60,
                            greenTo: 72,
							greenColor: ['#79B791'],
                            majorTicks: ["0", "10", " 20", "30", "40", "50", "60", "70", "80", "90", "100"]
                        }; // end options

                        var chart = new google.visualization.Gauge(document.getElementById('rh_gauge'));
        
                        chart.draw(data, options); //gauge
															
					});

		} // end drawChart

        // load chart lib
        google.load('visualization', '1', 
		{
            packages: ['corechart', 'gauge']
        });

        // call drawChart once google charts is loaded
        google.setOnLoadCallback(drawChart);
