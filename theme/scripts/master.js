/*
* ABS-CBN Sports 2014
*/

// Easing
jQuery.extend(jQuery.easing, {
  easeInExpo: function (x, t, b, c, d) {
    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
  }
});

(function ($) {

  "use strict";

  var fluidity, pager, tally, tabs, sorter, accordion, blinds, ticker, search, carousel, gallery, featured, share, currentTop = $('.header__main').offset().top;

  // Carousel - Set Fluid Width
  fluidity = (function () {

    function setFluidWidths(container, groupClassName, listContainer, fluidWidth, totalItem, itemWidth, itemMargin) {

      if ($(container).length > 0) {

        // Set container width
        $(listContainer, container).width(fluidWidth + '%');

        // Create fluid carousel
        if (groupClassName !== '') {
          var i;
          for (i = totalItem - 1; i >= 0; i -= 1) {
            if (i === 0) {
              $(groupClassName + ':eq(' + i + ')', container).css({
                'width': (itemWidth + '%')
              });
            } else {
              $(groupClassName + ':eq(' + i + ')', container).css({
                'marginLeft': (itemMargin + '%'),
                'width': (itemWidth + '%')
              });
            }
          }
        }

      }

    }

    return {
      render: setFluidWidths
    };

  }());

  // Carousel - Pager
  pager = (function () {

    function buildPager(container, pagerContainer, pagerItemName, totalItem) {

      if ($(container).length > 0) {

        // Create carousel pager
        var i;
        for (i = 0; i < totalItem; i += 1) {
          if (i === 0) {
            $(pagerContainer, container).append('<a class="' + pagerItemName + ' ' + pagerItemName + '--' + i + ' active" href="#"></a>');
          } else {
            $(pagerContainer, container).append('<a class="' + pagerItemName + ' ' + pagerItemName + '--' + i + '" href="#"></a>');
          }
        }

      }

    }

    return {
      render: buildPager
    };

  }());

  // Tally
  tally = (function () {

    function tabularBoard(el) {

      var bid = 0;

      $('.tally-block__category select', el).unbind('change').on('change', function () {
        bid = $(this).val();
        $('.tally-block__board-item', el).hide();
        $('.tally-block__board-item--' + bid, el).show();
        return false;
      });

      $('.tally-block__board .board__tabs a', el).unbind('click').on('click', function () {
        var bcid = $(this).data('board'),
          currentBoard = '.tally-block__board-item--' + bid;
        $('.board__tabs li', currentBoard).removeClass('active');
        $(this).parent().addClass('active');
        $('.board__content-item', currentBoard).hide();
        $('.board__content-item--' + bcid, currentBoard).show();
        return false;
      });

    }

    function backToDefault(el) {
      $('.tally-block__board-item', el).removeAttr('style');
    }

    return {
      build: tabularBoard,
      reset: backToDefault
    };

  }());

  // Tabs
  tabs = (function () {

    function startTabs(container, menu, content) {

      var bid = 0;

      $(menu + ' a', container).unbind('click').on('click', function () {

        var bcid = $(this).data('board');

        $(menu + ' li').removeClass('active');
        $(this).parent().addClass('active');
        $(content, container).hide();
        $(content + '--' + bcid, container).show();

        return false;
      });

    }

    function backToDefault(el) {
      $('sr__content-board', el).removeAttr('style');
    }

    return {
      init: startTabs,
      reset: backToDefault
    };

  }());

  // Sort
  sorter = (function () {

    function sorter(el) {

      var items, timer, itemHeight = 15;

      // Init menu item height
      $('.sort-column__item ul > li > ul > li', el).height(0);

      // Main sort - Hover
      $('.sort-column__item ul > li', el).unbind('mouseenter mouseleave').hover(function () {
        items = $('ul > li', this).length;
        $('ul > li', this).each(function (i) {
          var self = $(this),
            delay = 400;
          timer = setTimeout(function () {
            self.stop(true).animate({
              height: itemHeight
            }, delay, 'easeOutBack').css('visibility', 'visible');
          });
        });
      }, function () {
        $('ul > li', this).each(function (i) {
          var self = $(this),
            delay = 400;
          timer = setTimeout(function () {
            self.stop(true).animate({
              height: 0
            }, delay, 'easeInBack', function () {
              clearTimeout(timer);
            }).css('visibility', 'hidden');
          });
        });
      });

      $('.sort-column-block a', el).unbind('click').on('click', function () {

        var mcid = $(this).data('category'),
          currentMediaList = '.grid-block__media-list--' + mcid;

        $('.sort-column__item li', el).removeClass('active');
        $(this).parent().addClass('active');
        $('.media-gallery-block--content .grid-block__media-list', el).hide();
        $('.media-gallery-block--content ' + currentMediaList, el).show();

        return false;

      });

    }

    function backToDefault(el) {
      $('.sort-column__item ul > li', el).unbind('mouseenter mouseleave');
      $('.sort-column-block a', el).unbind('click')
      $('.sort-column__item ul > li > ul > li', el).removeAttr('style');
    }

    return {
      build: sorter,
      reset: backToDefault
    };

  }());

  // Accordion
  accordion = (function () {

    function accordBoard(el) {

      var i, accordions = $('ul.list-articles', el),
        initHeights = [];

      for (i = 0; i < accordions.length; i += 1) {
        initHeights.push($(accordions[i]).height());
      }

      $('.accordion-arrow', el).on('click', function () {

        var currAccordion = ($(this).parents(el).index() - 1);

        if ($(this).hasClass('arrow--up')) {

          $(el + ':eq(' + currAccordion + ')').find('ul.list-articles').stop(true).animate({
            height: 0
          }, 'slow', 'easeInOutExpo', function () {
            $(el + ':eq(' + currAccordion + ')').find('.arrow--up').removeClass('arrow--up').addClass('arrow--down');
            $(this).addClass('not--active');
          });

        } else if ($(this).hasClass('arrow--down')) {

          $(el + ':eq(' + currAccordion + ')').find('ul.list-articles').removeClass('not--active').stop(true).animate({
            height: initHeights[currAccordion]
          }, 'slow', 'easeInOutExpo', function () {
            $(el + ':eq(' + currAccordion + ')').find('.arrow--down').removeClass('arrow--down').addClass('arrow--up');
          });

        }

        return false;
      });

      // Hide on load
      $('.accordion-arrow.arrow--up', el).trigger('click');

    }

    return {
      build: accordBoard
    };

  }());

  // Menu hover
  blinds = (function () {

    function dropEffect(el) {

      var items, timer, itemHeight = 40;

      // Init menu item height
      $('.tier__first-level', el).height(0);

      // Tier Lvl 1 - Hover
      $('.tier__level', el).unbind('mouseenter mouseleave').hover(function () {
        items = $('.tier__first-level', this).length;
        $('.tier__first-level', this).each(function (i) {
          var self = $(this),
            delay = 400;
          timer = setTimeout(function () {
            self.stop(true).animate({
              height: itemHeight
            }, delay, 'easeOutBack').css('visibility', 'visible');
          });
        });
      }, function () {
        $('.tier__first-level', this).each(function (i) {
          var self = $(this),
            delay = 400;
          timer = setTimeout(function () {
            self.stop(true).animate({
              height: 0
            }, delay, 'easeInBack', function () {
              clearTimeout(timer);
            }).css('visibility', 'hidden');
          });
        });
      });

      // Tier Lvl 2 - Hover
      $('.tier__first-level', el).unbind('mouseenter mouseleave').hover(function () {
        items = $('.tier__second-level', this).length;
        $(this).stop(true).animate({
          height: (itemHeight * (items + 1)) + items
        });
        $('.tier__second-level', this).each(function (i) {
          var self = $(this),
            delay = 400;
          timer = setTimeout(function () {
            self.stop(true).animate({
              height: itemHeight
            }, delay, 'easeOutBack');
          });
        });

      }, function () {
        $(this).stop(true).animate({
          height: itemHeight
        });
        $('.tier__second-level', this).each(function (i) {
          var self = $(this),
            delay = 400;
          timer = setTimeout(function () {
            self.stop(true).animate({
              height: 0
            }, delay, 'easeInBack');
          });
        });
      });
    }

    function backToDefault(el) {
      $('.tier__level, .tier__first-level', el).unbind('mouseenter mouseleave').removeAttr('style');
      $('.tier__first-level, .tier__second-level', el).removeAttr('style');
    }

    return {
      drop: dropEffect,
      reset: backToDefault
    };

  }());

  // Ticker
  ticker = (function () {

    var timer, first, delay;

    function tickerThem(el) {

      resetTicker();

      delay = 4000;

      timer = setInterval(function () {

        first = $('ul', el).children('li').eq(0);

        first.animate({
          marginTop: -(18)
        }, 300, 'easeInBack', function () {
          first.detach().css('marginTop', '0').appendTo($('ul', el));
        });


      }, delay);

      $('ul', el).unbind('mouseenter mouseleave').hover(function () {
        clearInterval(timer);
      }, function () {
        tickerThem(el);
      });

    }

    function resetTicker() {
      clearInterval(timer);
    }

    return {
      roll: tickerThem
    };

  }());

  // Search
  search = (function () {

    function backToDefault(el) {
      $('.search-container, ' + el).unbind('mouseenter mouseleave');
    }

    function displaySearch(el) {

      var fieldWidth;

      $('.search-container, ' + el).unbind('mouseenter mouseleave').hover(function () {

        if ($('.header__main').hasClass('header__main--fixed')) {
          fieldWidth = 150;
        } else {
          fieldWidth = 225;
        }

        $('.search-block__field', el).show().stop(true).animate({
          width: fieldWidth
        }, 'fast', 'easeOutBack');

        $(el).css('backgroundColor', '#FFF');

      }, function () {

        $('.search-block__field', el).blur().stop(true).animate({
          width: 0
        }, 'fast', 'easeInBack', function () {
          $(this).hide();
          $(el).removeAttr('style');
        });

      });

    }

    return {
      stretch: displaySearch,
      reset: backToDefault
    };

  }());

  // Carousel
  carousel = (function () {

    var containerWidth, totalItem, marginWidth, totalMargin, wrapperWidth, itemWidth, itemMargin, itemPush, fluidWidth;

    function backToDefault(el) {

      var i;

      // $(el).css('visibility', 'hidden');

      $('.misc-block__item-container', el).removeAttr('style');
      $('.misc-block__item-group', el).removeAttr('style');

      for (i = 0; i < totalItem; i += 1) {
        $('li.misc-block__item-group:eq(' + i + ')', el).removeAttr('style');
        $('ul.misc-block__item-container', el).append($('li.misc-block__item-group:eq(' + i + ') ul', el).html());
      }

      $('li.misc-block__item-group', el).removeAttr('style').remove();
      $('li.misc-block__item').removeAttr('style');
      $('.carousel__pager-item').unbind('click');
      $('.carousel__pager a').remove();

      $(el).off('swipeleft').off('swiperight');

    }

    function initialize(el, reset) {

      if (reset === true) {
        backToDefault(el);
      }

      var a, b, c = 0,
        groupBy;

      // Group items
      if ($('.misc-block__item').length !== 0) {

        a = $('li', el);
        groupBy = 3;

        do {
          $(a.slice(0, groupBy)).wrapAll('<li class="misc-block__item-group" />').wrapAll('<ul/>');
        } while ((a = a.slice(groupBy)).length > 0);
      }

      b = $('.misc-block__item-group', el);

      containerWidth = 1240;
      totalItem = b.length;
      marginWidth = 20;
      totalMargin = marginWidth * (totalItem - 1);
      wrapperWidth = (containerWidth * totalItem) + totalMargin;
      fluidWidth = (wrapperWidth / containerWidth) * 100;
      itemWidth = (containerWidth / wrapperWidth) * 100;
      itemMargin = (marginWidth / wrapperWidth) * 100;
      itemPush = fluidWidth / totalItem;

      fluidity.render(el, '.misc-block__item-group', 'ul.misc-block__item-container', fluidWidth, totalItem, itemWidth, itemMargin);
      pager.render(el, '.carousel__pager', 'carousel__pager-item', totalItem);

      // Pager click event
      $('.carousel__pager-item').on('click', function () {

        c = $(this).index();

        $('.carousel__pager-item').removeClass('active');
        $(this).addClass('active');

        $('ul.misc-block__item-container', el).stop(true).animate({
          'left': -(itemPush * c) + '%'
        }, 600, 'easeOutExpo');

        return false;

      });

      // Swipe function
      $(el).on('swipeleft', function (e) {
        c += 1;
        (c > (totalItem - 1)) ? c = 0 : c;
        swipeAnimate(c);
      })
        .on('swiperight', function (e) {
          c -= 1;
          (c < 0) ? c = (totalItem - 1) : c;
          swipeAnimate(c);
        });

      function swipeAnimate(c) {
        $('.carousel__pager-item').removeClass('active');
        $('.carousel__pager-item').eq(c).addClass('active');

        $('ul.misc-block__item-container', el).stop(true).animate({
          'left': -(itemPush * c) + '%'
        }, 600, 'easeOutExpo');
      }

      // Carousel ready! Flap that majestic wings!
      $(el).css('visibility', 'visible');

    }

    return {
      start: initialize,
      reset: backToDefault
    };

  }());

  // Photo Gallery
  gallery = (function () {

    var containerWidth, totalItem, marginWidth, totalMargin, wrapperWidth, itemWidth, itemMargin, fluidWidth, direction = 0, itemCurrent = 0;

    function backToDefault(el) {

      var i, topCarousel = '.hero-media-block__photos .item__top-container';

      // $(topCarousel).css('visibility', 'hidden');
      // $(el).css('visibility', 'hidden');

      $('ul.hero-media__content', topCarousel).removeAttr('style');
      $('ul.thumbnail__content-list', el).removeAttr('style');
      $('.hero-media__item', topCarousel).removeAttr('style');

      for (i = 0; i < totalItem; i += 1) {
        $('li.thumbnail__item-group:eq(' + i + ')', el).removeAttr('style');
        $('ul.thumbnail__content-list', el).append($('li.thumbnail__item-group:eq(' + i + ') ul', el).html());
      }

      $('li.thumbnail__item-group', el).remove();
      $('.thumbnail__controls .control__buttons').unbind('click');
      $('.thumbnail__item-group .thumbnail__item a').unbind('click');

    }

    function initialize(el, reset) {

      if (reset === true) {
        backToDefault(el);
      }

      var a, b, c, groupBy, topCarousel = '.hero-media-block__photos .item__top-container';

      // Group items
      if ($('.thumbnail__item').length !== 0) {

        a = $('li', el);
        groupBy = 9;

        do {
          $(a.slice(0, groupBy)).wrapAll('<li class="thumbnail__item-group" />').wrapAll('<ul/>');
        } while ((a = a.slice(groupBy)).length > 0);
      }

      b = $('.thumbnail__item-group', el);
      c = $('.hero-media__item', topCarousel);

      containerWidth = 1239;
      totalItem = b.length;
      marginWidth = 4;
      totalMargin = marginWidth * (totalItem - 1);
      wrapperWidth = (containerWidth * totalItem) + totalMargin;
      fluidWidth = (wrapperWidth / containerWidth) * 100;
      itemWidth = (containerWidth / wrapperWidth) * 100;
      itemMargin = (marginWidth / wrapperWidth) * 100;

      fluidity.render('.hero-media-block__photos .item__top-container', '.hero-media__item', 'ul.hero-media__content', ((1240 * c.length) / 1240) * 100, c.length, (1240 / (1240 * c.length)) * 100, 0);
      fluidity.render(el, '.thumbnail__item-group', 'ul.thumbnail__content-list', fluidWidth, totalItem, itemWidth, itemMargin);

      // Thumbnails Controls click event
      $('.thumbnail__controls .control__buttons').on('click', function () {

        if ($(this).hasClass('controls--previous')) {
          direction -= 1;
          (direction < 0) ? direction = (totalItem - 1) : direction;
        }
        if ($(this).hasClass('controls--next')) {
          direction += 1;
          (direction > (totalItem - 1)) ? direction = 0 : direction;
        }

        var itemPush = fluidWidth / totalItem;

        $('ul.thumbnail__content-list', el).stop(true).animate({
          'left': -(itemPush * direction) + '%'
        }, 600, 'easeOutExpo');

        return false;

      });

      // Pager click event
      $('.thumbnail__item-group .thumbnail__item a').on('click', function () {

        $('.thumbnail__item-group .thumbnail__item').removeClass('active');
        $(this).parent().addClass('active');

        var itemPush = (((1240 * c.length) / 1240) * 100) / c.length;
        
        itemCurrent = $(this).parent().data('order');

        $('ul.hero-media__content', topCarousel).stop(true).animate({
          'left': -(itemPush * itemCurrent) + '%'
        }, 600, 'easeOutExpo');

        return false;

      });

      // Content Controls click event
      $('.hero-media-block__photos .hero-media__controls .control__buttons').on('click', function () {

        if ($(this).hasClass('controls--previous')) {
          itemCurrent -= 1;
          (itemCurrent < 0) ? itemCurrent = (c.length - 1) : itemCurrent;
        } else if ($(this).hasClass('controls--next')) {
          itemCurrent += 1;
          (itemCurrent > (c.length - 1)) ? itemCurrent = 0 : itemCurrent;
        }

        $('.thumbnail__item-group .thumbnail__item').removeClass('active');
        $('.thumbnail__item-group .thumbnail__item[data-order="' + itemCurrent + '"]').addClass('active');

        var itemPush = (((1240 * c.length) / 1240) * 100) / c.length;

        $('ul.hero-media__content', topCarousel).stop(true).animate({
          'left': -(itemPush * itemCurrent) + '%'
        }, 600, 'easeOutExpo');

        return false;

      });

      // Carousel ready! Flap that majestic wings!
      $(topCarousel).css('visibility', 'visible');
      $(el).css('visibility', 'visible');

    }

    return {
      start: initialize,
      reset: backToDefault
    };

  }());

  // Featured Media
  featured = (function () {

    var containerWidth, totalItem, wrapperWidth, fluidWidth, itemWidth, direction = 0;

    function backToDefault(el) {

      var i;

      // $(el).css('visibility', 'hidden');

      $('.gradient-container > ul', el).removeAttr('style');
      $('.featured-block__item', el).removeAttr('style');

      for (i = 0; i < totalItem; i += 1) {
        $('li.featured__item-group:eq(' + i + ')', el).removeAttr('style');
        $('.gradient-container > ul', el).append($('li.featured__item-group:eq(' + i + ') ul', el).html());
      }

      $('li.featured__item-group', el).remove();
      $('.buttons-block .buttons', el).unbind('click');

    }

    function initialize(el, reset) {

      if (reset === true) {
        backToDefault(el);
      }

      var a, b, c, groupBy, newGroupBy;

      // Group items
      if ($('.featured-block__item').length !== 0) {

        a = $('li.featured-block__item', el);
        groupBy = 5;

        do {
          $(a.slice(0, groupBy)).wrapAll('<li class="featured__item-group" />').wrapAll('<ul/>');
        } while ((a = a.slice(groupBy)).length < groupBy);

        // Group next set
        b = $('.gradient-container > ul > li.featured-block__item', el);
        newGroupBy = 8;

        do {
          $(b.slice(0, newGroupBy)).wrapAll('<li class="featured__item-group" />').wrapAll('<ul/>');
        } while ((b = b.slice(newGroupBy)).length > 0);
      }

      c = $('.featured__item-group', el);

      containerWidth = 1259;
      totalItem = c.length;
      wrapperWidth = (1314 * totalItem);
      fluidWidth = (wrapperWidth / containerWidth) * 100;
      itemWidth = (1314 / wrapperWidth) * 100;

      fluidity.render(el, '.featured__item-group', '.gradient-container > ul', fluidWidth, totalItem, itemWidth, 0);

      // Featured controls
      $('.buttons-block a', el).on('click', function () {

        if ($(this).hasClass('button--previous')) {
          direction -= 1;
          (direction < 0) ? direction = (totalItem - 1) : direction;
        } else if ($(this).hasClass('button--next')) {
          direction += 1;
          (direction > (totalItem - 1)) ? direction = 0 : direction;
        }

        var itemPush = fluidWidth / totalItem;

        $('.gradient-container > ul', el).stop(true).animate({
          'left': -(itemPush * direction) + '%'
        }, 600, 'easeOutExpo');

        return false;

      });

      // Carousel ready! Flap that majestic wings!
      $(el).css('visibility', 'visible');
    }

    return {
      start: initialize,
      reset: backToDefault
    };

  }());

  // Share Popup
  share = (function () {

    function popup(container) {

      var share,
        winWidth = (screen.width / 2),
        winHeight = (screen.height / 2),
        winTop = (screen.height / 2) - (winHeight / 2),
        winLeft = (screen.width / 2) - (winWidth / 2);

      $('.icons', container).on('click', function () {
        if ($(this).hasClass('icon__fbk')) {
          share = 'https://facebook.com/sharer.php?u=' + $(this).data('url');
        }
        if ($(this).hasClass('icon__twt')) {
          share = 'https://twitter.com/intent/tweet?text=' + $(this).data('text') + '&via=' + $(this).data('via') + '&url=' + $(this).data('url');
        }
        if ($(this).hasClass('icon__gpl')) {
          share = 'https://plus.google.com/share?url=' + $(this).data('url');
        }
        window.open(share, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
        return false;
      });
    }

    return {
      popup: popup
    };

  }());

  // Start Header snap
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > currentTop) {
      $('.header__main').css({
        position: 'fixed',
        top: '0px'
      }).addClass('header__main--fixed');
    } else {
      $('.header__main').css({
        position: 'relative',
        top: '0px'
      }).removeClass('header__main--fixed');
    }
  });

  // IE Placeholder fix
  var placeholder = ('placeholder' in document.createElement('input'));

  if (!placeholder) {
    $('[placeholder]').focus(function () {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function () {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur().parents('form').submit(function () {
      $(this).find('[placeholder]').each(function () {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      })
    });
  }

  // Start Menu Blinds
  if ($('.main-menu-block').length !== 0) {
    blinds.drop('.main-menu-block');
  }

  // Start Breaking News ticker
  if ($('.breaking-news-block').length !== 0) {
    ticker.roll('.breaking-news-block');
  }

  // Start Search display
  if ($('.search-block').length !== 0) {
    search.stretch('.search-block');
  }

  // Start Carousels
  if ($('.misc-block__carousel').length !== 0) {
    carousel.start('.misc-block__carousel');
  }
  if ($('.hero-media-block__photos .item__bottom').length !== 0) {
    gallery.start('.hero-media-block__photos .item__bottom');
  }
  if ($('.featured-block--media').length !== 0) {
    featured.start('.featured-block--media');
  }

  // Start Tally Board
  if ($('.tally-block').length !== 0) {
    // Custom select
    $('.tally-block .tally-block__category select').selecter();
    tally.build('.tally-block');
  }

  // Start Standings & Rankings Table
  if ($('.standings-rankings-block').length !== 0) {
    tabs.init('.standings-rankings-block', '.sr__tabs', '.sr__content');
  }

  // Start Accordion
  if ($('.listing-block--accordion').length !== 0) {
    accordion.build('.listing-block--accordion');
  }

  // Start Sorter
  if ($('.media-gallery-block').length !== 0) {
    sorter.build('.media-gallery-block');
  }

  // Start Social Media Sharer
  if ($('.social-media-block').length !== 0) {
    // Article Teaser share
    share.popup('.article-teaser-block');
    // Article Content share
    share.popup('.article-content-block');
    // Livestream / Players Indvd / Video Inner share
    share.popup('.share-block');
  }

  // Enquire Media Query
  enquire
    .register("only screen and (min-width: 1px) and (max-width: 767px)", {
      match: function () {
        // Resets
        if ($('.main-menu-block').length !== 0) {
          blinds.reset('.main-menu-block');
        }
        if ($('.misc-block__carousel').length !== 0) {
          carousel.reset('.misc-block__carousel');
        }
        if ($('.hero-media-block__photos .item__bottom').length !== 0) {
          gallery.reset('.hero-media-block__photos .item__bottom');
        }
        if ($('.featured-block--media').length !== 0) {
          featured.reset('.featured-block--media');
        }
        if ($('.tally-block').length !== 0) {
          tally.reset('.tally-block');
          $('.tally-block .tally-block__category select').selecter('destroy');
        }
        if ($('.media-gallery-block').length !== 0) {
          sorter.reset('.media-gallery-block');
        }

        // Initialize Swipe
        var timer;

        function init() {
          window.slider = new Swipe(document.getElementById('slider'));
          clearTimeout(timer);
        }

        timer = setTimeout(init, 10);

      },
      unmatch: function () {
        // Destroy Swipe
        if ($.isEmptyObject(window.slider) !== true) {
          window.slider.kill();
        }

        // Resets
        if ($('.main-menu-block').length !== 0) {
          blinds.reset('.main-menu-block');
        }
        if ($('.misc-block__carousel').length !== 0) {
          carousel.reset('.misc-block__carousel');
        }
        if ($('.hero-media-block__photos .item__bottom').length !== 0) {
          gallery.reset('.hero-media-block__photos .item__bottom');
        }
        if ($('.featured-block--media').length !== 0) {
          featured.reset('.featured-block--media');
        }
        if ($('.tally-block').length !== 0) {
          tally.reset('.tally-block');
          $('.tally-block .tally-block__category select').selecter('destroy');
        }
        if ($('.media-gallery-block').length !== 0) {
          sorter.reset('.media-gallery-block');
        }

        // Re-init functions
        var timer;

        function init() {
          if ($('.main-menu-block').length !== 0) {
            blinds.drop('.main-menu-block');
          }
          if ($('.misc-block__carousel').length !== 0) {
            carousel.start('.misc-block__carousel', true);
          }
          if ($('.hero-media-block__photos .item__bottom').length !== 0) {
            gallery.start('.hero-media-block__photos .item__bottom', true);
          }
          if ($('.featured-block--media').length !== 0) {
            featured.start('.featured-block--media', true);
          }
          if ($('.tally-block').length !== 0) {
            $('.tally-block .tally-block__category select').selecter('destroy');
            $('.tally-block .tally-block__category select').selecter();
          }
          if ($('.media-gallery-block').length !== 0) {
            sorter.build('.media-gallery-block');
          }

          clearTimeout(timer);

        }

        timer = setTimeout(init, 10);

      }

    }, true)
    .register("only screen and (max-width: 959px)", {
      match: function () {
        // Resets
        $(window).off('scroll');
        if ($('.search-block').length !== 0) {
          search.reset('.search-block');
        }
        if ($('.main-menu-block').length !== 0) {
          blinds.reset('.main-menu-block');
        }
        if ($('.tally-block').length !== 0) {
          tally.reset('.tally-block');
          $('.tally-block .tally-block__category select').selecter('destroy');
        }
      },
      unmatch: function () {
        // Resets
        $(window).off('scroll');
        if ($('.search-block').length !== 0) {
          search.reset('.search-block');
        }
        if ($('.main-menu-block').length !== 0) {
          blinds.reset('.main-menu-block');
        }
        if ($('.tally-block').length !== 0) {
          tally.reset('.tally-block');
          $('.tally-block .tally-block__category select').selecter('destroy');
        }

        // Re-init functions
        var timer;

        function init() {

          // Start Header snap
          $(window).on('scroll', function () {
            if ($(window).scrollTop() > currentTop) {
              $('.header__main').css({
                position: 'fixed',
                top: '0px'
              }).addClass('header__main--fixed');
            } else {
              $('.header__main').css({
                position: 'relative',
                top: '0px'
              }).removeClass('header__main--fixed');
            }
          });

          if ($('.search-block').length !== 0) {
            search.stretch('.search-block');
          }
          if ($('.main-menu-block').length !== 0) {
            blinds.drop('.main-menu-block');
          }
          if ($('.tally-block').length !== 0) {
            $('.tally-block .tally-block__category select').selecter('destroy');
            $('.tally-block .tally-block__category select').selecter();
          }

          clearTimeout(timer);
        }

        timer = setTimeout(init, 10);

      }

    }, true);

}(jQuery));