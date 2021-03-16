const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));

		}, { passive: true });
	},
	closeMenu() {
		if (!this.menuMobile) return;
		this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
		this.menuMobile.classList.remove("active");
		[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			if (!container) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	},
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.mobileMenu();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	// let x = window.location.host;
	// let screenName = '01-1920.png';
	// if (screenName && x.includes("localhost:30")) {
	// 	document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	// }
	// modal window

	//luckyoneJs
	$(".video-box__link").click(function () {
		$(this).addClass("active").html($(this).data("src"))
	})
	//sliders
	let sliders = document.querySelectorAll(".carusel-block");
	for (let el of sliders){
		let currSlider = new Swiper(el.querySelector('.carusel-block__slider--js'), {
			slidesPerView: 'auto',
			spaceBetween: 30,

			lazy: {
				loadPrevNext: true,
			},
			watchOverflow: true,

			navigation: {
				nextEl: el.querySelector('.swiper-next'),
				prevEl: el.querySelector('.swiper-prev'),
			},
			pagination: {
				el: el.querySelector('.swiper-pagination'),
				type: 'bullets',
				clickable: true,
			},
		});
	}
	function makeDDGroup(qSelecorts){
		for (let parentSelect of qSelecorts){
			let parent = document.querySelector(parentSelect);

			if (parent){
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js');

				$(ChildHeads).click(function (){
					let clickedHead = this;

					$(ChildHeads).each(function (){
						if (this === clickedHead){
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function (){
								$(this).toggleClass('active');
							});
						}
						else{
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function (){
								$(this).removeClass('active');
							});
						}
					});
				});

			}

		}
	}
	makeDDGroup(['.sQuestions-dd-js']);
	//end luckyoneJs
	//"jquery": "^3.5.1",
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}