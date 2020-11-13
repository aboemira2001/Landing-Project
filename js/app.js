/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
//Invoke all functions after dom is ready
document.addEventListener("DOMContentLoaded", function(){
	navBuild();
	scroll();
	activeSection();
});
//function for navbar-menu responsive button
function buttonclick() {
  let x = document.getElementById("navbar__list");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

	

//Determine active section function
function activeSection(){
		let sections=document.querySelectorAll("section");
		let navs=document.querySelectorAll(".menu__link");
		sections.forEach((section)=>{
			const callBackFunction=function(entries){
				if (entries[0].isIntersecting==true) {
					entries[0].target.className="active-section";
					let linkText=entries[0].target.dataset.nav;
					//Style the the related navbar
						navs.forEach((nav)=>{
							console.log(nav);
						if (linkText==nav.textContent) {
							nav.classList.add("active");
						}
						else{
							nav.classList.remove("active");
						}
						})
				}
				else{
					entries[0].target.className="";
				}
			}
		let observer = new IntersectionObserver(callBackFunction,{threshold:1.0});
		observer.observe(section);
	});
}

//function for helping in acitve nav link
function deActive(){
	    let navs = document.querySelectorAll("a");
	    for(nav of navs) {
	    	if (nav.classList.contains("active")) {
   			nav.classList.remove("active");
  			}
	    }
}

//Smooth scroll function
function scroll(){
	let links=document.querySelectorAll(".menu__link");
	links.forEach((link)=>{
		link.addEventListener('click', function (e){
		e.preventDefault();
		var section=document.querySelector(this.getAttribute('href'));
		section.scrollIntoView({behavior:"smooth"});
		console.log(section.getBoundingClientRect().top);
		});
	});
}

//Finally nav build function
	function navBuild(){
		let nav=document.getElementById('navbar__list');
		let sections=document.querySelectorAll("section");
		let btn=document.createElement("li");
		btn.innerHTML= `<a href="javascript:void(0);" class="icon" onclick="buttonclick()">
    	<i class="fa fa-bars"></i>
  		</a>`;
	    for (const section of sections) {
	    let Name=section.getAttribute("data-nav");
    	let li=document.createElement("li");
    	let link= document.createElement("a");
    	link.className="menu__link";
    	link.textContent=(Name);
    	link.setAttribute("href",`#${section.id}`);
    	li.appendChild(link);
    	nav.appendChild(li);
    }
    nav.appendChild(btn);
}



