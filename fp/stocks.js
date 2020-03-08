//API Token: pk_5591320e20294a44b410b573874e5ccb 
//Account No. 5748966bc5cf3fd142d0018e1f06355e 

class stocks extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {};
	}
	
	render () {
		this.refreshStocks
		portfolio = this.stockPortfolio
		return (React.createElement("div", {"className": "main"},
					React.createElement("p", {"className": "main"}, "a thing"),
					React.createElement("form", {"className": "buyStocks"},
						React.createElement("input", {"className": "buyStocks", "id": "sym"}, "What stocks would you like to buy?"),
						React.createElement("input", {"className": "buyStocks", "id": "num"}, "How many stocks would you like to buy?")
						), 
					React.createElement("div",{"className": "portfolio"},"Your Portfolio: ",portfolio))
				)
		
	}
	
	stockPortfolio {
		var return_lst = []
		return_lst.push( React.createElement("ul", {"id": sym},
				React.createElement("li", {"className": "symbol"}, React.createElement("button", {"className": "symbol", "onClick": this.sort("symbol")}, "Symbol")),
				React.createElement("li", {"className": "number_bought"}, React.createElement("button", {"className": "number_bought", "onClick": this.sort("number_bought")}, "Number you own")),
				React.createElement("li", {"className": "total_worth"}, React.createElement("button", {"className": "total_worth", "onClick": this.sort("worth")}, "Worth of your stocks")),
				React.createElement("li", {"className": "individual_worth"}, React.createElement("button", {"className": "individual_worth", "onClick": this.sort("latestPrice")}, "Individual Stock Worth")),
				React.createElement("li", {"className": "last_update"}, React.createElement("button", {"className": "last_update", "onClick": this.sort("latestTime")}, "Last Price Update"))
			)
		for (var sym in this.state){
			stock_dict = this.state[sym]
			return_lst.push( React.createElement("ul", {"id": sym},
					React.createElement("li", {"className": "symbol"}, React.createElement("p", {"className": "symbol"}, stock_dict.symbol)),
					React.createElement("li", {"className": "number_bought"}, React.createElement("p", {"className": "number_bought"}, stock_dict.number_bought)),
					React.createElement("li", {"className": "total_worth"}, React.createElement("p", {"className": "total_worth"}, "$", stock_dict.worth)),
					React.createElement("li", {"className": "individual_worth"}, React.createElement("p", {"className": "individual_worth"}, "$",stock_dict.latestPrice)),
					React.createElement("li", {"className": "last_update"}, React.createElement("p", {"className": "last_update"}, stock_dict.latestTime))
				)
		}
	}
	
	sort = (sort_by) =>{
		this.refreshStocks
		var return_lst = []
		var this_val = ''
		for (var sym in this.state){
			//will this even work?
			this_val = sym.sort_by
		}
	}
	
	refreshStocks {
		for (var sym in this.state){
			buyStocks(sym, this.state[sym].number_bought)
		}
	}
	
	buyStocks = (sym, num) =>{
		const stock_url = this.findStockURL(sym);
		fetch(stock_url).then((stock) => stock.json().then((data) => {
			console.log(data.quote)
			//will this even work???
			if this.state.hasOwnProperty(sym){
				this.state.sym.number_bought += num
				this.state.sym.worth += num * data.quote.latestPrice
			}
			else{
				this.state[sym] = data.quote
				this.state[sym].number_bought = num
				this.state[sym].worth = num * data.quote.latestPrice
			}
			
		}))
	}
	
	findStockURL = (sym) =>{		
		const productionAPI = 'https://sandbox.iexapis.com/stable/stock/'
		const symbol = sym
		const queries = '/batch?types=quote&token=pk_5591320e20294a44b410b573874e5ccb'
		const api_url = `${productionAPI}${symbol}${queries}`
		return api_url
	}
	
}
