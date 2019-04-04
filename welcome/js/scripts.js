	const menuicon = document.querySelector("#menuextend");
	const menulist = document.querySelector("#menulist");
	
	var iconcheck = 0;
	
	var photoActionIn = function(){
        menuicon.classList.add("extended");
		menulist.classList.remove("inactive");
    }
	
	var photoActionClick = function(){
        
		if (iconcheck == 0){
		menuicon.classList.add("extended");
		menulist.classList.remove("inactive");
		iconcheck = 1;
		}
		else {
		menuicon.classList.remove("extended");
		menulist.classList.add("inactive");
		iconcheck = 0;
		}
    }
	 
    var photoActionOut = function(){
        if (iconcheck == 0){
		menuicon.classList.remove("extended");
		menulist.classList.add("inactive");
		}
	}
	
	menuicon.addEventListener("mouseover", photoActionIn);
	menuicon.addEventListener("click", photoActionClick);
	menuicon.addEventListener("mouseout", photoActionOut);
	
	menulist.addEventListener("mouseover", photoActionIn);
	menulist.addEventListener("click", photoActionClick);
	menulist.addEventListener("mouseout", photoActionOut);


