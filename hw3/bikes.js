//Esther Edith Spurlock
//JavaScript for HW 3

const link = document.querySelector("tbody");

function heartClick(event)
{
	event.preventDefault();
	//we save the text of the item we clicked
	let heart = event.target.innerHTML;
	//we need to keep track of the "favorites" list
	const list = document.querySelector("#favorites");
	
	//If you are wondering why I copy-pasted the actual hearts in here, it is because I couldn't get my code to work otherwise
	if (heart == '♡') {
		//we change the heart value
		event.target.innerHTML = "&#9829;";
		//we create a new list item
		let trItem = document.createElement("tr");
		let tdItem = document.createElement("td");
		//we get the station name
		let newStation = document.createTextNode(event.target.parentNode.nextElementSibling.innerHTML);
		//let newStation = newStation.replace('&amp;', "&");
		//we add the new station to the favorites list
		tdItem.appendChild(newStation);
		trItem.appendChild(tdItem);
		list.appendChild(trItem);
		}
	else if (heart == '♥'){
		//we change the heart value
		event.target.innerHTML = "&#9825;";
		//we get the station name
		let toRemove = event.target.parentNode.nextElementSibling.innerHTML;
		//we get a list of all children in the list of favorites
		favorites = list.children;
		//we loop through all of the children
		for (fave of favorites) {
				//we remove the child that has the old favorite station
				let current = fave.firstChild.innerHTML;
				if(current == toRemove){
					list.removeChild(fave);
				}
			}
		}
}

link.addEventListener("click", heartClick)