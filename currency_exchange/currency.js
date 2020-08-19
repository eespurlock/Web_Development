class Asteroid extends React.Component {

	constructor(props){
		super(props);
		this.state ={
				potentially_dangerous_asteroids: null,
				non_dangerous_asteroids: null,
				this_picture: `https://apod.nasa.gov/apod/image/2002/MoonHalo_Mckean_5612.jpg`
					};
	}
		
	render() { 
		if(!this.state.potentially_dangerous_asteroids){
		return (
			React.createElement("div", {"className": "main"},
				React.createElement("button", {"onClick": this.handleRefresh}, "See Asteroids"),
				React.createElement("img", {"src": this.state.this_picture})))
			}
		
			//yes, I know this code is copy/pasted, but I've had some difficulty with this assignment
		
		const dangerous_ast = this.handleMapping(this.state.potentially_dangerous_asteroids);
		const non_dangerous_ast =  this.handleMapping(this.state.non_dangerous_asteroids);
		
		return (
				React.createElement("div", {"className": "main"},
					React.createElement("button", {"onClick": this.handleRefresh}, "Asteroids"),
					React.createElement("img", {"src": this.state.this_picture}),
					React.createElement("div", {"className": "asteroids"}, 
							React.createElement("h2", {"className": "potentially_dangerous"}, "Potentially Dangerous Asteroids"),
							dangerous_ast),
					React.createElement("div", {"className": "asteroids"}, 
							React.createElement("h2", {"className": "not_potentially_dangerous"}, "Not Potentially Dangerous Asteroids"),
							non_dangerous_ast)
					)
				)//end return
	 }
	
	handleMapping = (lst) => {
		
		var return_lst = []
		for (var a of lst){
			return_lst.push( React.createElement("div", {"id": a.id},
					React.createElement("h5", {"className": "name"}, "Name: ", a.name),
					React.createElement("p", {"className": "min_diameter"}, "Minimum estimated diameter in feet: " ,a.estimated_diameter.feet.estimated_diameter_min),
					React.createElement("p", {"className": "max_diameter"}, "Maximum estimated diameter in feet: ", a.estimated_diameter.feet.estimated_diameter_max),
					React.createElement("p", {"className": "approach_date"}, "Approach date: ",a.close_approach_data[0].close_approach_date),
					React.createElement("p", {"className": "velocity"}, "Relative velocity in miles per hour: ",a.close_approach_data[0].relative_velocity.miles_per_hour),
					React.createElement("p", {"className": "orbiting"}, "Orbiting body: ", a.close_approach_data[0].orbiting_body))
				)}
		return (return_lst)
	}
	
	handleRefresh = (e) =>{		 
		 
		 e.preventDefault()
		 const picture_url = 'https://api.nasa.gov/planetary/apod?api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA'

		 //I got this code from https://stackoverflow.com/questions/1296358/subtract-days-from-a-date-in-javascript
		 //and from https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
		 var start_date = new Date(); 
		 start_date.setDate(start_date.getDate()-7);
		 var days = String(start_date.getDate()).padStart(2, '0');
		 var month = String(start_date.getMonth() + 1).padStart(2, '0');
		 var year = start_date.getFullYear();
		 start_date = year + '-' + month + '-' + days;
		 
		 const asteroids_url = this.urlForAsteroids(start_date)
		 
		//refreshes the picture
		fetch(picture_url).then((picture) => picture.json()).then((data) => {
			console.log(data)
			this.setState({ this_picture: data.hdurl })
		 });
		 
		 var dangerous = []
		 var not_dangerous = []
		 var ast_lst = []
		 
		 fetch(asteroids_url).then((asteroids) => asteroids.json()).then((data) => {
			console.log(data.near_earth_objects)
			const near_earth = data.near_earth_objects;
			for (var key in near_earth){
				let ast_lst = near_earth[key];
				for (var a of ast_lst){
					//check to see if "is_potentially_hazardous_asteroid" is true
					if (a.is_potentially_hazardous_asteroid){dangerous.push(a);}
					else{not_dangerous.push(a)}
				}} //end the two for loops
		 	}); //end the 2nd.then
		 this.state.potentially_dangerous_asteroids = dangerous;
		 this.state.non_dangerous_asteroids = not_dangerous;
	 }
	
	urlForAsteroids = (start_date) => {
		 const api_key = "api_key=evUzRTFfYwSdaOpjdvSVIv4c0mv0Z9VsuIKibQEA"
		 const base_url = "https://api.nasa.gov/neo/rest/v1/feed?"
		 start_date = "start_date=" + start_date
		 const api_url = `${base_url}${start_date}&${api_key}`
		 return api_url
	 }
	
}

//I got this code from https://reactjs.org/docs/add-react-to-a-website.html
const e = React.createElement;
const domContainer = document.querySelector('#root');
ReactDOM.render(e(Asteroid), domContainer);
