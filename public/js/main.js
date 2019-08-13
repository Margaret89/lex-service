$(document).ready(function () {
	// Верхний слайдер
	if ($('.js-top-slider').length) {
		$('.js-top-slider').slick({
			infinite: true,
			arrows: false,
			dots: true,
			slidesToShow: 1,
			slidesToScroll: 1,
		});
	}

	// Слайдер команды
	if ($('.js-team-slider').length) {
		$('.js-team-slider').slick({
			arrows: true,
			dots: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: false,
			prevArrow : '<button type="button" class="slick-prev"><span class="slick-prev-line"></span></button>',
			nextArrow : '<button type="button" class="slick-next"><span class="slick-next-line"></span></button>',
			responsive: [
				{
					breakpoint: 1350,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
					}
				},
			]
		});
	}
		
	// Табуляция
	if ($('.js-tabs-page').length) {
		$('.js-tabs-page-list').each(function(){
			$(this).find('.js-tabs-page-item:first').addClass("active");
		});

		$('.js-tabs-page-content').each(function(){
			$(this).find('.js-tabs-page-content-item:first').fadeIn();
		});

		$('.js-tabs-page-item').click(function(e) {
			e.preventDefault();
			var $parent = $(this).parents('.js-tabs-page');

			$parent.find('.js-tabs-page-content-item').hide();
			$parent.find('.js-tabs-page-item').removeClass('active');

			$(this).addClass("active");
			$parent.find('#' + $(this).attr('data-item')).fadeIn();
		});
	}

	// Вертикальная табуляция
	if ($('.js-tabs-page-vert').length) {
		$('.js-tabs-page-vert-list').each(function(){
			$(this).find('.js-tabs-page-vert-item:first').addClass("active");
		});

		$('.js-tabs-page-vert-content').each(function(){
			$(this).find('.js-tabs-page-vert-content-item:first').fadeIn();
		});

		$('.js-tabs-page-vert-item').click(function(e) {
			e.preventDefault();
			var $parent = $(this).parents('.js-tabs-page-vert');

			$parent.find('.js-tabs-page-vert-content-item').hide();
			$parent.find('.js-tabs-page-vert-item').removeClass('active');

			$(this).addClass("active");
			$parent.find('#' + $(this).attr('data-item')).fadeIn();
		});
	}

	// Стилизация скроллбара
	if ($('.js-scroll-content').length) {
		$(".js-scroll-content").each(function(indx){
			var widthContent = $(this).data('width');
			var heightContent = $(this).data('height');

			$(this).slimScroll({
				width: widthContent,
				height: heightContent,
				size: '1px',
				color: '#E6B775',
				alwaysVisible: false,
				railVisible: true,
				railColor: '#e4e4e4',
				railOpacity: 1,
				wheelStep: 5,
			});
		});
	}

	// Обрезание многострочного текста
	if ($('.js-short-text').length) {
		var $newsContent= $('.js-short-text'),
		newsText = $newsContent.html(),
		size = $newsContent.data('count');

		function sliceText() {
			if(newsText.length > size){
				$newsContent.html(newsText.slice(0, size) + ' ...');
			}
		}

		sliceText();

		$(window).resize(function(){
			sliceText();
		});
	}

	// Вывод сообщения об успешной отправке в попапе
	$('.js-valid-form').each(function(){
		$(this).on('submit',function(e){
			$.fancybox.close();
			$.fancybox.open({
				src  : '#msg-success',
				type : 'inline',
				opts : {
					
				}
			});
			$(this)[0].reset();
			e.preventDefault();
		});
	});

	// Плавный переход к ссылке
	if ($('.js-link-move').length) {
		$('body').on('click','.js-link-move', function (event) {
			event.preventDefault();
			var id  = $(this).attr('href'),
				top = $(id).offset().top;
			$('body,html').animate({scrollTop: top}, 1000);

			// Проверка наличия анимации
			productAnim(1);
		});
	}

	// Раскрывающийся блок
	$(".js-unwrap-block").on('click','.js-unwrap-head',function(event){
		event.preventDefault();
		$(this).parent().toggleClass("opened");
		if($(this).parent().hasClass("opened")){
			$(this).parent().children(".js-unwrap-content").slideDown(400);
		}
		else{
			$(this).parent().children(".js-unwrap-content").slideUp(400);
		}
	});

	// Выравнивание блока новостей
	var windowWidth = $(window).width();

	resizeNews();

	$(window).resize(function(){
		windowWidth = $(window).width();
		resizeNews();
	});

	function resizeNews() {
		if (windowWidth > 767) {
			var countItem = 0;
			var heightTop = 0;
			var countNews = $('.js-news-item').length;

			$('.js-news-item').each(function(index){
				var $newsTop = $(this).find('.js-news-top');
				var heightTopTemp = $newsTop.outerHeight();

				if (windowWidth > 991) {
					var countColumn = 3;
				}else{
					var countColumn = 2;
				}

				countItem++;
				$newsTop.addClass('js-resize-top');


				if (heightTop < heightTopTemp) {
					heightTop = heightTopTemp;
				}

				if ((countItem == countColumn) || (index == countNews-1)) {
					$('.js-resize-top').css('height', heightTop);
					$('.js-resize-top').removeClass('js-resize-top');
					countItem = 0;
					heightTop = 0;
				}

			});
		}
	}

	// Маска для телефона
	$.mask.definitions['~'] = "[+-]";
	$(".js-phone").mask("+7 (999) 999-9999");

	// Yandex карта
	if ($('#map').length) {
		// Иницилизация карты
		ymaps.ready(init);

		function init(){
			var myMap;

			myMap = new ymaps.Map("map", {
				center: [55.778, 37.65],
				zoom: 16,
				controls: []
			});

			var myPlacemark = new ymaps.Placemark([55.777998, 37.648236] , {},
				{ iconLayout: 'default#image',
				iconImageHref: 'img/mark-map.png',
				iconImageSize: [112, 130],
				iconImageOffset: [-29, -82] });

				myMap.geoObjects.add(myPlacemark);
		}
	}

	// Открыть/Закрыть поиск на телефоне
	$('.js-ic-search').click(function(e) {
		e.preventDefault();
		$('.js-search-form').slideToggle(200);
	});

	$(document).click(function(event) {
		if ($(event.target).closest(".js-search-form").length) return;
		if ($(event.target).closest(".js-ic-search").length) return;
		$('.js-search-form').slideUp(200);
	});

	// Добавление пункта "Еще" в меню
	var windowWidth = $(window).width();
	var arrWidthMenu = [];
	var moreMenu = false;

	$('.js-menu-menu-item').each(function(index){
		var itemWidth = $(this).outerWidth();
		arrWidthMenu.push($(this).outerWidth());
	});

	addItemMenu();

	$('.js-menu-menu').addClass('is-visible');

	$(window).resize(function(){
		windowWidth = $(window).width();
		addItemMenu();
	});

	function addItemMenu() {
		if (windowWidth >767) {
			var moreItemMenu = 100;
			var menuWidth = $('.js-menu-menu').width() - moreItemMenu;
			var sumItemMenu = 0;

			for (var i = 0; i < arrWidthMenu.length; i++) {
				var $curItem = $('.js-menu-menu-item[data-item='+ i +']');
				sumItemMenu = sumItemMenu + arrWidthMenu[i];

				// Добавляем пункт Еще и его подпункты
				if(sumItemMenu > menuWidth){
					$curItem.addClass('no-active');

					if (moreMenu == false) {
						$('.js-menu-menu').append('<li class="main-menu__item js-menu-more">Еще<ul class="main-menu__more js-menu-more-sub"></ul></li>');
						moreMenu = true;
					}

					if (!$('.main-menu__more-item[data-item='+i+']').length) {
						$('.main-menu__more-item').attr('data-item')
						var $clone = $curItem.clone().appendTo(".js-menu-more-sub");
						$clone.removeClass('main-menu__item js-menu-menu-item no-active');
						$clone.addClass('main-menu__more-item js-menu-more-item');
					}
				}else{
					$curItem.removeClass('no-active');
					$('.main-menu__more-item[data-item='+i+']').remove();
				}
			}

			// Удаляем пункт Еще, если все пункты вмещаются
			if ($('.js-menu-more-item').length == 0) {
				$('.js-menu-more').remove();
				moreMenu = false;
			}
		}else{
			if ($('.js-menu-more').length) {
				$('.js-menu-menu-item').removeClass('no-active');
				$('.js-menu-more').remove();
				moreMenu = false;
			}
		}
	}

	// Создание мобильного меню
	var arrMobileMenu = [];
	$('.js-add-mm').each(function(){
		var indexItem = $(this).attr('data-order');
		arrMobileMenu[indexItem] = $(this);
	});

	for (var i = 0; i < arrMobileMenu.length; i++) {
		$(arrMobileMenu[i]).clone().appendTo('.js-mobile-menu-content');
	}
	
	// Открыть/Закрыть мобильное меню
	$('.js-open-menu').click(function(){
		$('.js-shadow').addClass('is-visible');
		$('.js-mobile-menu').addClass('open');
		$('.js-body').addClass('no-scroll');
	});

	$('.js-close-menu').click(function(){
		 closeCatMenu();
	});

	$('.js-shadow').click(function(){
		closeCatMenu();
	});

	function closeCatMenu() {
		$('.js-shadow').removeClass('is-visible');
		$('.js-mobile-menu').removeClass('open');
		$('.js-body').removeClass('no-scroll');
	}

});