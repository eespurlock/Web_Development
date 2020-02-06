//Esther Edith Spurlock
//JavaScript for HW 3

const link = document.querySelector("tbody");
const select = document.querySelector("select");
const list = document.querySelector("#favorites")

function heartClick(event)
{
	event.preventDefault();
	//we save the text of the item we clicked
	let heart = event.target.innerHTML;
	//we need to keep track of the "favorites" list
	const list = document.querySelector("#favorites");
	
	/*If you are wondering why I copy-pasted the actual hearts in here, it is because I couldn't get my code to work.
	 * After completing the assignment, I believe I could have changed this, but I like that my js file has hearts in it.
	 */
	if (heart == '♡') {
		//we change the heart value
		event.target.innerHTML = "&#9829;";
		//we create a new list item
		let trItem = document.createElement("tr");
		let tdItem = document.createElement("td");
		//we get the station name
		let newStation = document.createTextNode(event.target.parentNode.nextElementSibling.innerText);
		//we add the new station to the favorites list
		tdItem.appendChild(newStation);
		trItem.appendChild(tdItem);
		list.appendChild(trItem);
		}
	else if (heart == '♥'){
		//we change the heart value
		event.target.innerHTML = "&#9825;";
		//we get the station name
		let toRemove = event.target.parentNode.nextElementSibling.innerText;
		//we get a list of all children in the list of favorites
		let favorites = list.children;
		//we loop through all of the children
		for (fave of favorites) {
				//we remove the child that has the old favorite station
				let current = fave.lastChild.innerText;
				if(current == toRemove){
					list.removeChild(fave);
				}
			}
		}
}

function filterStations(event)
{
	event.preventDefault();
	//we get the value of the event
	let option = event.target.value;
	//we create the variable "filter" based on the value of the event
	/*You may notice that in my html file, I gave all my objects classes that are equal to this, 
	 * however, I could not figure out how to get the class name from the selected object.
	 * I would love it if you could direct me to this information if you have time.
	 */
	var filter = "";
	switch(option){
		case "All":
			filter = "all";
			break;
		case "University of Chicago":
			filter = "uchicago";
			break;
		case "Loop":
			filter = "loop";
			break;
		case "North":
			filter = "north";
			break;
	}
	//we get a list of all the stations
	let stations = link.children;
	//we loop through the stations
	for (s of stations){
		//we make sure that when the filter is set to "all" everything is shown	
		if (filter == "all"){
				s.style.display = "table-row";
			}
			else {
				//we get the class name of the current child element
				let area = s.className;
				//we see if the class name matches the filter and set its display to "none" if it does not
				if (area == filter) {
					s.style.display = "table-row";
				}
				else {
					s.style.display = "none";
				}
			}
		}
}

//we listen for someone to click on a heart
link.addEventListener("click", heartClick)
//we listen for the select element to change
select.addEventListener("change", filterStations)
