(function ($) {

	var pullSlider 		= $('.tally-slider');
		tallyContainer 	= $('.tally-block-container');

	// To pull up the fixed score board
	$(pullSlider).on('click', function(e) {
		e.preventDefault();
		pullSlider.toggleClass('arrow-changed');
		tallyContainer.slideToggle();
	});

	// Create the dropdown base
	$("<select data-role=responsive-select />").appendTo(".sort-column-block");

	// Create default option "Go to..."
	$("<option />", {
		"value"   : "",
		"text"    : "Filter By"
	}).appendTo(".sort-column-block select");

	// Populate dropdown with menu items
	$(".sort-column-block > .sort-column__item > ul > li").each(function() {
		var el = $(this);

		var hasChildren = el.find("ul"),
	    	children    = el.find("li");

	    if (hasChildren.length) {
	    	$("<optgroup />", {
	    	  "label": el.find("> a").text()
	    	}).appendTo(".sort-column-block select");

	    	children.each(function() {
	          			
		    	$("<option />", {
		    		"text": $(this).text()
		    	}).appendTo("optgroup:last");
	    
	    	});

	    } else {
    			$("<option />", {
    		      "value"   : el.attr("href"),
    		      "text"    : el.text()
	    	    }).appendTo(".sort-column-block select");
	    }

	});

	$('[data-role="responsive-select"]').each(function(){
		var $select = $(this);
		$select.wrap('<div data-role="responsive-select-wrapper" class="sort-column__item-select" />')
			.parent()
			.prepend('<span class="select-value icon" data-icon="&#x25bc;">' + $(this).find('option:selected').text() + '</span>');
	});

	$('body').on('change', '.sort-column__item-select select', function () {
		$(this).parent().find('.select-value').text($(this).find('option:selected').text());
	})

	// To make dropdown actually work
	$("sort-column-block select").change(function() {
		window.location = $(this).find("option:selected").val();
	});

	var checkInProgress = false;

	var createMobileFunctions = function() {
	    return window.mobileFunctions || function() {

			var loginBlock = $('.social-media__universal ul > li:last-child').html(),
				searchBlock = $('div.search-container').html(),
				mainMenuBlock = $('.group__block--responsive').html();
			
			$('.mobile-login').html(loginBlock);
			$('.search-container.search-menu').html(searchBlock);
			$('.cloned_group__block--responsive').html(mainMenuBlock);


	    	// Clone the main menu link and place it as its first child
			$('.tier__level-sub > a').each(function(){
				
				var $this = $(this);
				
				$this.next('.tier__first').find('.tier__first-cloned').remove();

				$newLI = $('<li class="tier__first-level tier__first-cloned" />').prepend($this.clone());
				
				$newLI.insertBefore($this.next('.tier__first').find(':eq(0)'));

			});

	    	// Add text for additional link
	    	$('.tier__first > li:first-child').find('a').prepend('ALL ').css('text');

	    	var childPanel = $('.tier__level-sub > .tier__first').hide();

	    	$('.tier__level-sub > a').click(function(){
				childPanel.slideUp();
				$(this).next().stop().slideDown('fast');
				return false;
			});
	    }
	};

	var detectViewPort = function(){
		var viewPortWidth = $(window).width(),
			channelBlock = $('div.channels-block').html();

		/* cache dom references */ 
		var $body = $('body'); 

		mobileFunctions = createMobileFunctions();

		if (viewPortWidth <= 479){

			breakPoint = viewPortWidth;

            console.log('Screen width is less than or equal to 479px. This is for mobile. Width is currently: ' + viewPortWidth + 'px.');

            $('.footer-block.channels-block').html(channelBlock);
            

    		if (Modernizr.touch) {
    			
        		/* bind events */
        		$(document)
    	    		.on('focus', 'select', function(e) {
    	    		    $body.addClass('fix-fixed');
    	    		})
    	    		.on('blur', 'select', function(e) {
    	    		    $body.removeClass('fix-fixed');
        		});

        	}
        	
        	mobileFunctions();



	    } else if (viewPortWidth <= 767) {

        	breakPoint = viewPortWidth;

            console.log('Screen width is between 480px and 767px. This is for tablet or mobile landscape. Width is currently: ' + viewPortWidth + 'px.');
            mobileFunctions();


        } else if (viewPortWidth <= 959){

        	breakPoint = viewPortWidth;

            console.log('Screen width is between 768px and 959px. This is for small desktop. Width is currently: ' + viewPortWidth + 'px.');

            $('.right-channel.channels-block').html(channelBlock);
            $('.header__main--fixed').removeAttr('style');
            $('header.header__main').removeClass('header__main--fixed');
            $('.tally-block-container').hide();

            mobileFunctions();

        } else if (viewPortWidth <= 1024) {

        	console.log('Screen width is between 959px and 1024px. This is for small desktop. Width is currently: ' + viewPortWidth + 'px.');

            $('.tally-block-container').show();

	    } else {

            console.log('Screen width is greater than 1024px. Width is currently: ' + viewPortWidth + 'px.');

        }

        checkInProgress = false;

	};

	/* CALL THE FUNCTION TO DETECT THE VIEWPORT */ 
	detectViewPort();

	/* CHECK THE VIEWPORT IF SUCCESSFULL */ 
	$(window).resize(function () {
		var viewPortWidth = $(window).width();
		
		if (checkInProgress === false) {
	        checkInProgress = true;
	        setTimeout(detectViewPort, 1000);
	    }

	    if (viewPortWidth >= 960) {
	    	$('.tally-block-container').show();
			$('.group__block--responsive').removeAttr('style');
			$('.tier__level-sub > .tier__first').removeAttr('style');
			$('.tier__first-cloned').hide();
	    }

	});

	// Trigger to open left side menu
	$('.show-left').on('click', function () {

		detectViewPort();

		var body = $('body'),
			$nav_menu = $('body, .group__block--responsive'),
			navInitWidth = 250,
			navWidthComp = ((navInitWidth / breakPoint) * 100) + '%';

		val = $nav_menu[0].style.left === navWidthComp ? '0' : navWidthComp;

		body.toggleClass('nav-open');

		if (body.hasClass('nav-open')) {
		    $nav_menu.animate({
		    	left: val,
		    }, 500, function(){
		    	body.css({
		    		'position': 'fixed',
		    		'width' : '100%',
		    	});
		    });
	    } else {
	        $nav_menu.animate({
		    	left: 0,
		    }, 500, function(){
				body.css('position','relative');
		    });
	    }  

	    $('.group__block--responsive').css({
	    	'margin-left': '-' + navWidthComp,
	    	'width': navWidthComp
	    });

		$('.tally-block').slideToggle();
	});

}(jQuery));