,
					React.createElement("p", {"className": "min_diameter"}, a.Estimated_diameter.feet.estimated_diameter_min),
					React.createElement("p", {"className": "max_diameter"}, a.Estimated_diameter.feet.estimated_diameter_max),
					React.createElement("p", {"className": "hazardous"}, a.Is_potentially_hazardous_asteroid),
					React.createElement("p", {"className": "approach_date"}, a.Close_approach_data[0].close_approach_date),
					React.createElement("p", {"className": "velocity"}, a.Close_approach_data[0].Relative_velocity.Miles_per_hour),
					React.createElement("p", {"className": "orbiting"}, a.Close_approach_data[0].orbiting_body),
					React.createElement("p", {"className": "sentry"}, a.is_sentry_object))})})


//API key: evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA
//API example: https://api.nasa.gov/planetary/apod?api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA
//astronomu picture of the day: https://apod.nasa.gov/apod/
//https://apod.nasa.gov/apod/?api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA

//import React, { Component } from 'react';
//import './NASA.css';
//import jQuery;

class Asteroid extends Component {

	constructor(props){
		super(props);
		this.state ={"asteroid": 
						{"links":
							{"self":"http://www.neowsapp.com/rest/v1/neo/54000956?api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA"},
						"Id":"54000956",
						"Neo_reference_id":"54000956",
						"name":"(2020 DC3)",
						"nasa_jpl_url":"http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=54000956",
						"Absolute_magnitude_h":21.927,
						"Estimated_diameter":
							{"kilometers": 
								{"estimated_diameter_min":0.1094346811,
								"Estimated_diameter_max":0.244703386},
							"Meters":
								{"estimated_diameter_min":109.4346810788,
								"Estimated_diameter_max":244.7033859881},
							"Miles":
								{"estimated_diameter_min":0.0679995372,
								"Estimated_diameter_max":0.1520515877},
							"Feet":
								{"estimated_diameter_min":359.0376790705,
								"Estimated_diameter_max":802.8326568853}},
						"Is_potentially_hazardous_asteroid":true,
						"Close_approach_data":
							[{"close_approach_date":"2020-02-20",
								"close_approach_date_full":"2020-Feb-20 10:51",
								"Epoch_date_close_approach":1582195860000,
								"Relative_velocity":
									{"kilometers_per_second":"26.4748886287",
									"Kilometers_per_hour":"95309.5990634734",
									"Miles_per_hour":"59221.6783736343"},
								"Miss_distance":
									{"astronomical":"0.0859195372",
									"Lunar":"33.4226999708",
									"Kilometers":"12853379.756505764",
									"Miles":"7986719.8315729832"},
									"orbiting_body":"Earth"}],
						"is_sentry_object":false,},
				"this_picture": `https://apod.nasa.gov/apod/image/2002/MoonHalo_Mckean_5612.jpg`};
	}
		
	render(){ 
		
		return(
			<div>
				<button onClick={this.handleRefresh}>View Asteroids</button>
				<img src={this.props.this_picture}></img>
				<div>
					<h5>{this.props.asteroid.name}</h5>
					<p>Diameter</p>
					<p>Min: <p>{this.props.asteroid.Estimated_diameter.feet.estimated_diameter_min}</p></p>
					<p>Max: <p>{this.props.asteroid.Estimated_diameter.feet.estimated_diameter_max}</p></p>
					<p>Is potentially hazardous: <p>{this.props.asteroid.Is_potentially_hazardous_asteroid}</p></p>
					<p>Approach date: <p>{this.props.asteroid.Close_approach_data[0].close_approach_date}</p></p>
					<p>Relative Velocity (mph): <p>{this.props.asteroid.Close_approach_data[0].Relative_velocity.Miles_per_hour}</p></p>
					<p>Orbiting Body: <p>{this.props.asteroid.Close_approach_data[0].orbiting_body}</p></p>
					<p>Is Sentry Object: <p>{this.props.asteroid.is_sentry_object}</p></p>
				</div>
		</div>
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
		 
		 fetch(url_asteroid).then((p) => p.json).then((data) => {
				console.log(data)
				this.setState({asteroid: data.results})
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