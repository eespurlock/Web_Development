//API Token: pk_5591320e20294a44b410b573874e5ccb 
//Account No. 5748966bc5cf3fd142d0018e1f06355e 

class stocks extends React.Component{
	
	constructor (props) {
		super(props);
		this.state = {
			my_stocks: {"AAPL": {"number_bought": 10}, "MSFT": {"number_bought": 1}},
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
					React.createElement("div",{"className": "portfolio"},
							React.createElement("h2", {"className": "portfolio"}),
							portfolio))
				)
		
	}
	
	stockPortfolio () {
		var return_lst = []
		return_lst.push( React.createElement("ul", {"id": sym},
				React.createElement("li", {"className": "symbol"}, React.createElement("button", {"className": "symbol", "onClick": this.sort}, "Symbol")),
				React.createElement("li", {"className": "number_bought"}, React.createElement("button", {"className": "number_bought", "onClick": this.sort}, "Number Owned")),
				React.createElement("li", {"className": "total_worth"}, React.createElement("button", {"className": "total_worth", "onClick": this.sort}, "Total Worth")),
				React.createElement("li", {"className": "individual_worth"}, React.createElement("button", {"className": "individual_worth", "onClick": this.sort}, "Individual Worth")),
				React.createElement("li", {"className": "last_update"}, React.createElement("button", {"className": "last_update", "onClick": this.sort}, "Last Price Update"))
			))
		for (var sym in this.state.my_stocks){
			var stock_dict = this.state.my_stocks[sym]
			return_lst.push( React.createElement("ul", {"id": sym},
					React.createElement("li", {"className": "symbol"}, React.createElement("p", {"className": "symbol"}, stock_dict.symbol)),
					React.createElement("li", {"className": "number_bought"}, React.createElement("p", {"className": "number_bought"}, stock_dict.number_bought)),
					React.createElement("li", {"className": "total_worth"}, React.createElement("p", {"className": "total_worth"}, "$", stock_dict.worth)),
					React.createElement("li", {"className": "individual_worth"}, React.createElement("p", {"className": "individual_worth"}, "$",stock_dict.latestPrice)),
					React.createElement("li", {"className": "last_update"}, React.createElement("p", {"className": "last_update"}, stock_dict.latestTime))
				))
		}
		return (return_lst);
	}
	
	sort = (event) =>{
		event.preventDefault()
		const class_name = event.target.className
		var ascending_now = true
		if (class_name == this.state.sort_by){
			if (this.state.ascending){ascending_now = false}
		}
		this.setState({sort_by : class_name, ascending: ascending_now})

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
				if (this.state.my_stocks.hasOwnProperty(sym)){
					num = this.state.my_stocks[sym].number_bought + num				
				}
				var set_state = this.state.my_stocks
				var current_stock = data
				if (num < 1){
					num = 0;
				}
				current_stock.number_bought = num
				current_stock.worth = num * current_stock.latestPrice
				set_state[sym] = current_stock
				this.setState({my_stocks: set_state})
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

}

//I got this code from https://reactjs.org/docs/add-react-to-a-website.html
const e = React.createElement;
const domContainer = document.querySelector('#root');
ReactDOM.render(e(stocks), domContainer);
