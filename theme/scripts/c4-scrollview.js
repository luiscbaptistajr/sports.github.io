/**
	TODO:
		
	@events: willScroll, didScroll, index
	@touchEnabled: boolean
	@move:

*/

var ScrollView = function(defaults){

	// PRIVATE
	var mode = defaults.mode ? defaults.mode : "horizontal";
	var cycle = defaults.cycle ? defaults.cycle : true;
	var speed = defaults.speed ? defaults.speed : 500;
	var pages = mode == "horizontal" ? Math.ceil(defaults.contentSize.width / defaults.scrollOffset) : Math.ceil(defaults.contentSize.height / defaults.scrollOffset);
	var pageIndex = 0;
	var autoScroll = defaults.autoScroll ? defaults.autoScroll : false;
	var scrollInterval = defaults.scrollInterval ? defaults.scrollInterval : 3000;
	var animationInterval;

	function play(){
		if(autoScroll && !animationInterval){
			animationInterval = setInterval(next, scrollInterval);
		}
	}

	function pause(){
		clearInterval(animationInterval);
	}

	function go(){
		if(mode == "horizontal"){
			var leftOffset = -pageIndex * defaults.scrollOffset;
			var topOffset = 0;
		}else if(mode == "vertical"){
			var leftOffset = 0;
			var topOffset = -pageIndex * defaults.scrollOffset;
		}

		defaults.contentView.stop().animate({
			left: leftOffset,
			top: topOffset
		}, speed, "easeOutQuad");
	}

	function next(){
		if(cycle){
			pageIndex = (pageIndex + 1) % pages;
		}else{
			if(pageIndex + 1 < pages){
				pageIndex++;
			}else{
				return;
			}
		}

		go();
	}

	function previous(){
		if(cycle){
			pageIndex = (pageIndex - 1 + pages) % pages;
		}else{
			if(pageIndex - 1 > -1){
				pageIndex--;
			}else{
				return;
			}
		}

		go();
	}

	function skip(index){
		if(index < 0){
			pageIndex = 0;
		}else if(index >= pages){
			pageIndex = pages - 1;
		}else{
			pageIndex = index;
		}

		go();
	}

	function move(){

	}

	// PUBLIC
	return {
		previous: previous,
		next: next,
		skip: skip,
		play: play,
		pause: pause
	};
};