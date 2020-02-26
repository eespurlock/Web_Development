//API key: evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA
//API example: https://api.nasa.gov/planetary/apod?api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA
//astronomu picture of the day: https://apod.nasa.gov/apod/
//https://apod.nasa.gov/apod/?api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA

//import React, { Component } from 'react';
//import './NASA.css';
//import jQuery;

class Asteroid extends Component {

	constructor(props){
		super(props)
		this.state ={
				"this_picture": `https://apod.nasa.gov/apod/image/2002/MoonHalo_Mckean_5612.jpg`};
	}
		
	render(){
		 return(
				<button onClick={this.handleRefresh}>View Asteroids</button>
				<img src={this.props.this_picture}>
				);
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
	 }
}