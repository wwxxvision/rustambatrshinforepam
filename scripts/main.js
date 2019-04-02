window.onload = function() {
//Ajax Request
let xhr = new XMLHttpRequest(); 
xhr.open('GET','https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture',false); //Create GET request
xhr.send(); 
//Check request status
if (xhr.status !=200) {
	console.log('error request');
}
else { console.log('good'); }
//Variables
let usersData = xhr.responseText;  //Get Response Text
let usersInfo  = JSON.parse(usersData); //Get Object
let ul = document.createElement('ul'); // Create DOM element 'ul'
let div	= document.createElement('div');// Create DOM element 'div'
let newli = document.createElement('li');// Create  new DOM element 'li'
let newul = document.createElement('ul');// Create new DOM element 'ul'
let count = 0;//Count for click users
let parag = document.createElement('h1'); //Create not actived field text 
//Functions 
function sliceUsers (data) { // slice array  for display 5 users
	data.splice(0,45);
}
sliceUsers(usersInfo.results);//Call function for slice array
//DOM
document.getElementById('users__list').appendChild(div); // add child for element id ('users__list')
div.setAttribute('class','info__user');// set attribute for div
document.getElementById('users__list').appendChild(ul);// add child for element id ('users__list')
div.appendChild(parag);// add child for element div
parag.innerText = 'Click for more\n information\n about users';  //Not actived field text
usersInfo.results.forEach(function(item) { //to use each element of the array
	//Variables
	let li = document.createElement('li'); // Create  new DOM element 'li'
	let img = document.createElement('img');// Create new DOM element 'img'
	//View on HTML
	li.innerText += (item.name.title  + " : ").toUpperCase();// Added 'li' on HTML
	li.innerText += (item.name.first + "  ").toUpperCase();// Added 'li' on HTML
	li.innerText += (item.name.last + "  ").toUpperCase();// Added 'li' on HTML
	ul.appendChild(li); // Add child in 'ul'
	li.appendChild(img);// Add child in 'li'
	img.setAttribute('src',item.picture.medium);// Set attribute for 'img' 

	  li.onclick = function () { // Events click user
		//Variables
		let newimg = document.createElement('img');
 	    newul.classList.add('active');// Add new 'ul' class active
		newul.appendChild(newli);// Add child in new 'ul'
		div.appendChild(newul);// Add child in 'div
		if (newul.classList.contains('active') && count == 0) {  // Check active class and count value
			  count++; //Count
		      li.classList.add('active-list');//Add for select user class
		      newli.innerText += (item.name.title  + " : " + "\t").toUpperCase();//Added 'li' on HTML
		      newli.innerText += (item.name.first + "  .  ").toUpperCase();//Added 'li' on HTML
		      newli.innerText += (item.name.last + "\n").toUpperCase();//Added 'li' on HTML
		      parag.innerText = ''; // Default string non-active 
		      newli.innerText += (" Gender: " + item.gender + "\n").toUpperCase();//Added 'li' on HTML
		      newli.innerText += (" Street: " + item.location.street + "\n").toUpperCase();//Added 'li' on HTML
		      newli.innerText += (" City: " + item.location.city + "\n").toUpperCase();//Added 'li' on HTML
		      newli.innerText += (" State: " + item.location.state + "\n").toUpperCase();//Added 'li' on HTML
		      newli.innerText += (" Postcode: " + item.location.postcode + "\n").toUpperCase();//Added 'li' on HTML
		      newli.innerText += (" Email:" + item.email + "\n").toUpperCase();//Added 'li' on HTML
		      newli.innerText += (" Phone: " + item.phone + "\n" ).toUpperCase();//Added 'li' on HTML
		      newimg.setAttribute('src',item.picture.large);// Set attribute for 'img'
			  newli.appendChild(newimg); // Add child in 'li'
		}
		else {
			  count = 0; //Count Null
			  newul.classList.remove('active'); // Remove Active Class
			  parag.innerText = 'Click for more\n information\n about users'; //Set non-active Text
			  li.classList.remove('active-list'); //Remove Active-list
			  newli.innerText = ''; //Default info user text
			}
		}
	});	
};