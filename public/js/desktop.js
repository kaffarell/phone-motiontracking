function updateData(){
	console.log('updateData get');
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
		    document.getElementById('demo').innerHTML = this.responseText;
		}
	};
	xhttp.open('GET', 'get');
	xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhttp.send();
}
