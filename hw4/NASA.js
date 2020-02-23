import React, { Component } from 'react';
import './NASA.css';
import jQuery;

class Asteroid extends Component {
	
	constructor(){//I'm not 100% sure what is supposed to be here	
	}
	 render(){
		 return(
		<div>
			<button onClick={this.handleRefresh}>View Asteroids</button>
			//In here, I also need to get the APOD
		</div>
		 )
	 }
	 
	 handleRefresh = (e) =>{
		 e.preventDefault()
		 const url_asteroid = this.urlForAsteroids()
		 const json_picture = 'https://api.nasa.gov/planetary/apod?api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA'
		 //get the JSON from this url
		 .getJSON(json_picture, function(apod){})
		 //get the "url" for this picture from the JSON
		 const apod = json_picture.parse(data)
		 const apod = apod["url"]
	 }
	 
	 urlForAsteroids = () => {
		 const api_key = "api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA"
		 const base_url = "https://api.nasa.gov/api.html#NeoWS"
		 const api_url = "${base_url}?${api_key}"
		 return api_url
	 }
	
}