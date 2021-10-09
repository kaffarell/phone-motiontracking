function updateData(){

	const options = { frequency: 50, referenceFrame: 'device' };
    const sensor = new RelativeOrientationSensor(options);
    let alpha;
    let beta;
    let gamma;
    
    
    sensor.addEventListener('reading', () => {
    	// Pitch
    	alpha = sensor.quaternion[0];
        // Roll
        beta = sensor.quaternion[1];
        // Yaw
        gamma = sensor.quaternion[2];
        //console.log(`${alpha}    ${beta}    ${gamma}`);
   		coordinates = {
    		'alpha': alpha,
        	'beta': beta,
        	'gamma': gamma 
    	};
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				console.log(this.responseText);
			}
		};
		xhttp.open('POST', 'send');
		xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		//console.log(coordinates)
		xhttp.send(JSON.stringify(coordinates));
    });
    

	sensor.addEventListener('error', error => {
    	if (event.error.name == 'NotReadableError') {
    		console.log('Sensor is not available.');
    	}
	});


    // Check for permissions then start sensor
    Promise.all([navigator.permissions.query({ name: 'accelerometer' }),
    	navigator.permissions.query({ name: 'gyroscope' })])
        	.then(results => {
         		if (results.every(result => result.state === 'granted')) {
					 console.log('Starting RelativeOrientationSensor')
           			sensor.start();
         		} else {
           			console.log('No permissions to use RelativeOrientationSensor.');
         		}
        	}); 

}
