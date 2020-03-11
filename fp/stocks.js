//API Token: pk_5591320e20294a44b410b573874e5ccb 
//Account No. 5748966bc5cf3fd142d0018e1f06355e 

class stocks extends React.Component{
	
	constructor (props) {
		localStorage.setItem("dummy", 0)
		console.log("Just set")
		super(props);
		this.state = {
			my_stocks: JSON.parse(localStorage.getItem("my_stocks")) || {},
			sort_by : "symbol",
			ascending: true
		};
	}
	
	render () {
		this.refreshStocks();
		const portfolio = this.stockPortfolio();
		return (React.createElement("div", {"className": "main"},
					React.createElement("form", {"className": "buyStocks"},
						React.createElement("input", {"className": "buyStocks", "id": "sym", "type": "text", "placeholder": "Stock Symbol"}),
						React.createElement("input", {"className": "buyStocks", "id": "num","type": "text", "placeholder": "Number to Buy"}),
						React.createElement('button', {"clasName": "buyStocks", "onClick": this.submitStocks}, "Buy Stocks!")
						),
					React.createElement("button", {"className": "buyStocks", "onClick": this.clearStocks}, "Clear Your Portfolio"),
					React.createElement("div",{"className": "portfolio"},
							React.createElement("h2", {"className": "portfolio"}, "Your Portfolio"),
							portfolio))
				)
		
	}
	
	stockPortfolio () {
		const sorted_lst = this.sort_lst()
		var return_lst = []
		return_lst.push( React.createElement("ul", {"id": "portfolio"},
				React.createElement("li", {"className": "symbol"}, React.createElement("button", {"className": "symbol", "onClick": this.sort}, "Symbol")),
				React.createElement("li", {"className": "number_bought"}, React.createElement("button", {"className": "number_bought", "onClick": this.sort}, "Number Owned")),
				React.createElement("li", {"className": "total_worth"}, React.createElement("button", {"className": "worth", "onClick": this.sort}, "Total Worth")),
				React.createElement("li", {"className": "individual_worth"}, React.createElement("button", {"className": "latestPrice", "onClick": this.sort}, "Individual Worth")),
				React.createElement("li", {"className": "last_update"}, React.createElement("button", {"className": "latestTime", "onClick": this.sort}, "Last Price Update"))
			))
		for (var stock_dict of sorted_lst){
			//var stock_dict = this.state.my_stocks[sym]
			return_lst.push( React.createElement("ul", {"id": stock_dict.symbol},
					React.createElement("li", {"className": "symbol"}, React.createElement("p", {"className": "symbol"}, stock_dict.symbol)),
					React.createElement("li", {"className": "number_bought"}, React.createElement("p", {"className": "number_bought"}, stock_dict.number_bought)),
					React.createElement("li", {"className": "total_worth"}, React.createElement("p", {"className": "total_worth"}, "$", stock_dict.worth)),
					React.createElement("li", {"className": "individual_worth"}, React.createElement("p", {"className": "individual_worth"}, "$",stock_dict.latestPrice)),
					React.createElement("li", {"className": "last_update"}, React.createElement("p", {"className": "last_update"}, stock_dict.latestTime))
				))
		}
		return (return_lst);
	}
	
	sort_lst () {
		var stocks_lst = []
		var sort_key = this.state.sort_by
		for (var sym in this.state.my_stocks){
			stocks_lst.push(this.state.my_stocks[sym])
		}
		var asc = this.state.ascending
		return (stocks_lst.sort(function(a, b){
			var first = a
			var second = b
			if (asc) {
				first = b
				second = a
			}
			if (first[sort_key] < second[sort_key]){return -1}
			else{return 1}
		}))
	}
	
	sort = (event) =>{
		event.preventDefault()
		const class_name = event.target.className;
		var ascending_now = true;
		if (class_name === this.state.sort_by){
			if (this.state.ascending){ascending_now = false;}
		}
		this.setState({sort_by : class_name});
		this.setState({ascending : ascending_now});

	}
	
	refreshStocks () {
		for (var sym in this.state.my_stocks){
			this.buyStocks(sym, 0);
		}
	}
	
	buyStocks = (sym, num) =>{
		const stock_url = this.findStockURL(sym);
		fetch(stock_url).then((stock) => stock.json().then((data) => {
			if (data.hasOwnProperty("symbol")){
				if (this.state.my_stocks.hasOwnProperty(data.symbol)){
					num = this.state.my_stocks[data.symbol].number_bought + num				
				}
				var set_state = this.state.my_stocks
				var current_stock = data
				if (num < 1){
					num = 0;
				}
				current_stock.number_bought = num
				current_stock.worth = num * current_stock.latestPrice
				set_state[data.symbol] = current_stock
				this.setState({my_stocks: set_state})
				localStorage.setItem("my_stocks", JSON.stringify(set_state));
				console.log(localStorage.getItem("my_stocks"))
			}
		}))
	}
	
	findStockURL = (sym) =>{		
		const productionAPI = 'https://sandbox.iexapis.com/stable/stock/'
		const symbol = sym
		const queries = '/quote?token=Tpk_5953e6c8e8dd43708130bc6a7d960376'
		const api_url = `${productionAPI}${symbol}${queries}`
		return api_url
	}
	
	submitStocks = (event) => {
		event.preventDefault()
		var sym = document.querySelector('#sym').value;
		var num = document.querySelector('#num').value;
		num = parseInt(num)
		this.buyStocks(sym, num);
	}
	
	clearStocks = (event) => {
		event.preventDefault();
		this.setState({my_stocks: {}});
		localStorage.clear();
	}

}

//I got this code from https://reactjs.org/docs/add-react-to-a-website.html
const e = React.createElement;
const domContainer = document.querySelector('#root');
ReactDOM.render(e(stocks), domContainer);
