class Asteroid extends React.Component {

	constructor(props){
		super(props);
		this.state ={
				list_of_asteroids: null,
				this_picture: `https://apod.nasa.gov/apod/image/2002/MoonHalo_Mckean_5612.jpg`
					};
	}
		
	render() { 
		if(!this.props.list_of_asteroids){
		return (
			React.createElement("div", {"className": "main"},
				React.createElement("button", {"onClick": this.handleRefresh}, "Asteroids"),
				React.createElement("img", {"src": this.state.this_picture})))
			}
		
			//yes, I know this code is copy/pasted, but I've had some difficulty with this assignment
			
		const asteroids = this.state.list_of_asteroids.map((a) => {
			return (React.createElement("div", {"id": a.id},
				React.createElement("h5", {"className": "name"}, a.name)))})
		
		return (
				React.createElement("div", {"className": "main"},
					React.createElement("button", {"onClick": this.handleRefresh}, "Asteroids"),
					React.createElement("img", {"src": this.props.this_picture}),
					React.createElement("div", {"className": "asteroids"}, this.props.list_of_asteroids),
					React.createElement("div", {"className": "asteroids"}, asteroids)))
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
		 
		 
		 fetch(asteroids_url).then((asteroids) => asteroids.json()).then((data) => {
			console.log(data.near_earth_objects)
			const near_earth = data.near_earth_objects;
			var ast_lst = []
			for (var key in near_earth){ast_lst = ast_lst + near_earth[key];}
			this.setState({list_of_asteroids: ast_lst});
		 });
		 
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
