//API key: evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA
//API example: https://api.nasa.gov/planetary/apod?api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA
//astronomu picture of the day: https://apod.nasa.gov/apod/
//https://apod.nasa.gov/apod/?api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA

import React, { Component } from 'react';
import './NASA.css';
import jQuery;

class Asteroid extends Component {

	constructor(props){
		constructor(props){
			super(props)
			this.state ={this_asteroid: null,
				this_picture = 'https://apod.nasa.gov/apod/image/2002/MoonHalo_Mckean_5612.jpg'}
		}
	} 
	
	render(){
		 return(
		<div>
			<button onClick={this.handleRefresh}>View Asteroids</button>
			//In here, I also need to get the APOD
			<img src={this.props.this_picture}/>
		</div>
		 )
	 }
	 
	 handleRefresh = (e) =>{
		 
		 //first, I need to find the date
		 
		 e.preventDefault()
		 const url_asteroid = this.urlForAsteroids(start_date)
		 const picture_url = 'https://api.nasa.gov/planetary/apod?api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA'
		
		//refreshes the picture
		fetch(picture_url).then((p) => p.json).then((data) => {
			console.log(data)
			this.setState({this_picture: data.results.hdurl})
		 });
		 
		 fetch(picture_url).then((p) => p.json).then((data) => {
				console.log(data)
				this.setState({this_picture: data.results})
			 });
	 }
	 
	 urlForAsteroids = (start_date) => {
		 const api_key = "api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA"
		 const base_url = "https://api.nasa.gov/neo/rest/v1/feed?"
		 const start_date = "start_date=" + start_date
		 const api_url = "${base_url}?${start_date}?${api_key}"
		 return api_url
	 }
	
}