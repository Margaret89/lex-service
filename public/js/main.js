$(document).ready(function () {
	// Верхний слайдер
	if ($('.js-top-slider').length) {
		$('.js-top-slider').slick({
			infinite: true,
			arrows: false,
			dots: true,
			slidesToShow: 1,
			slidesToScroll: 1
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
			nextArrow : '<button type="button" class="slick-next"><span class="slick-next-line"></span></button>'
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

	// // Вызов функции подгрузки изображений
	// loadBigImg();
	// loadBigBacground();

	
});

// // Загрузка больших изображений
// function loadBigImg() {
// 	var $imgDefer = $('[data-src]');

// 	$imgDefer.each(function(indx, element){
// 		var urlImgBig = $(this).attr("data-src");
// 		$(this).attr("src", urlImgBig);
// 	});
// }

// function loadBigBacground() {
// 	var $imgDefer = $('[data-background]');

// 	$imgDefer.each(function(indx, element){
// 		var urlBackgroundBig = $(this).attr("data-background");
// 		$(this).css("background-image", "url("+ urlBackgroundBig +")");
// 	});
// }