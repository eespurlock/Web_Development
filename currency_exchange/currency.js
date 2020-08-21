class currency extends React.Component {

	constructor(props){
		super(props);
		this.state = {currencies: null}
	}
		
	render() { 
		if(!this.state.currencies){
		return (
			React.createElement("div", {"className": "main"}, "See USD to EU",
			React.createElement("button", {"onClick": this.handleLoad}, "See Currency"))
		)}
		
		return(React.createElement("div", {"className": "main"}, "See USD to EU:", this.state.currencies,
			React.createElement("button", {"onClick": this.handleLoad}, "Refresh Currency"))
		)
			
}
	handleLoad= (e) =>{
		e.preventDefault()
		const url = 'https://api.exchangeratesapi.io/latest'
		fetch(url).then((curr) => curr.json().then((data) => {
			if (data.hasOwnProperty('rates')) {
				this.setState({currencies: data.rates.USD})
			}
		}))
		console.log("this not is me")
		
		console.log(this.state.currencies)
	}
}

//I got this code from https://reactjs.org/docs/add-react-to-a-website.html
//
const e = React.createElement;
const domContainer = document.querySelector('#root');
ReactDOM.render(e(currency), domContainer);
