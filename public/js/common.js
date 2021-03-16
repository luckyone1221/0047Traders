"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			},
			beforeLoad: function beforeLoad() {
				document.querySelector("html").classList.add("fixed");
			},
			afterClose: function afterClose() {
				document.querySelector("html").classList.remove("fixed");
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var toggle = this.btnToggleMenuMobile;
		var menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			var toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(function (el) {
				return el.classList.toggle("on");
			});
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(function (el) {
				return el.classList.toggle("fixed");
			});
		}, {
			passive: true
		});
	},
	closeMenu: function closeMenu() {
		if (!this.menuMobile) return;
		this.btnToggleMenuMobile.forEach(function (element) {
			return element.classList.remove("on");
		});
		this.menuMobile.classList.remove("active");
		[document.body, document.querySelector('html')].forEach(function (el) {
			return el.classList.remove("fixed");
		});
	},
	mobileMenu: function mobileMenu() {
		var _this = this;

		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', function (event) {
			var container = event.target.closest(".menu-mobile--js.active"); // (1)

			if (!container) _this.closeMenu();
		}, {
			passive: true
		});
		window.addEventListener('resize', function () {
			if (window.matchMedia("(min-width: 992px)").matches) _this.closeMenu();
		}, {
			passive: true
		});
	},
	// /mobileMenu
	// tabs  .
	tabscostume: function tabscostume(tab) {
		var tabs = document.querySelectorAll(tab); // const indexOf = element => Array.from(element.parentNode.children).indexOf(element);

		tabs.forEach(function (element) {
			var tabs = element;
			var tabsCaption = tabs.querySelector(".tabs__caption");
			var tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
			var tabsWrap = tabs.querySelector(".tabs__wrap");
			var tabsContent = tabsWrap.querySelectorAll(".tabs__content");
			var random = Math.trunc(Math.random() * 1000);
			tabsBtn.forEach(function (el, index) {
				var data = "tab-content-".concat(random, "-").concat(index);
				el.dataset.tabBtn = data;
				var content = tabsContent[index];
				content.dataset.tabContent = data;
				if (!content.dataset.tabContent == data) return;
				var active = content.classList.contains('active') ? 'active' : '';
				console.log(tabsBtn[index].innerHTML);
				content.insertAdjacentHTML("beforebegin", "<div class=\"tabs__btn-accordion  btn btn-primary d-block mb-1 ".concat(active, "\" data-tab-btn=\"").concat(data, "\">").concat(el.innerHTML, "</div>"));
			});
			tabs.addEventListener('click', function (element) {
				var btn = element.target.closest("[data-tab-btn]:not(.active)");
				if (!btn) return;
				var data = btn.dataset.tabBtn;
				var tabsAllBtn = this.querySelectorAll("[data-tab-btn");
				var content = this.querySelectorAll("[data-tab-content]");
				tabsAllBtn.forEach(function (element) {
					element.dataset.tabBtn == data ? element.classList.add('active') : element.classList.remove('active');
				});
				content.forEach(function (element) {
					element.dataset.tabContent == data ? (element.classList.add('active'), element.previousSibling.classList.add('active')) : element.classList.remove('active');
				});
			});
		}); // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');
		// });
	},
	// /tabs
	inputMask: function inputMask() {
		// mask for input
		var InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			return element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}");
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm: function sendForm() {
		var gets = function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");

			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}

			return b;
		}(); // form


		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			var th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data
			}).done(function (data) {
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				}); // window.location.replace("/thanks.html");

				setTimeout(function () {
					// Done Functions
					th.trigger("reset"); // $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () {});
		});
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(document).on('click', " .top-nav li a, .scroll-link", function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('.tabs--js');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile(); 

	var x = window.location.host;
	var screenName = '01-1920.png';

	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", "<div class=\"pixel-perfect\" style=\"background-image: url(screen/".concat(screenName, ");\"></div>"));
	} // modal window
	//luckyoneJs


	$(".video-box__link").click(function () {
		$(this).addClass("active").html($(this).data("src"));
	}); //sliders

	var sliders = document.querySelectorAll(".carusel-block");

	var _iterator = _createForOfIteratorHelper(sliders),
			_step;

	try {
		for (_iterator.s(); !(_step = _iterator.n()).done;) {
			var el = _step.value;
			var currSlider = new Swiper(el.querySelector('.carusel-block__slider--js'), {
				slidesPerView: 'auto',
				spaceBetween: 30,
				lazy: {
					loadPrevNext: true
				},
				watchOverflow: true,
				navigation: {
					nextEl: el.querySelector('.swiper-next'),
					prevEl: el.querySelector('.swiper-prev')
				},
				pagination: {
					el: el.querySelector('.swiper-pagination'),
					type: 'bullets',
					clickable: true
				}
			});
		}
	} catch (err) {
		_iterator.e(err);
	} finally {
		_iterator.f();
	}

	function makeDDGroup(qSelecorts) {
		var _iterator2 = _createForOfIteratorHelper(qSelecorts),
				_step2;

		try {
			for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
				var parentSelect = _step2.value;
				var parent = document.querySelector(parentSelect);

				if (parent) {
					(function () {
						// childHeads, kind of funny))
						var ChildHeads = parent.querySelectorAll('.dd-head-js');
						$(ChildHeads).click(function () {
							var clickedHead = this;
							$(ChildHeads).each(function () {
								if (this === clickedHead) {
									//parent element gain toggle class, style head change via parent
									$(this.parentElement).toggleClass('active');
									$(this.parentElement).find('.dd-content-js').slideToggle(function () {
										$(this).toggleClass('active');
									});
								} else {
									$(this.parentElement).removeClass('active');
									$(this.parentElement).find('.dd-content-js').slideUp(function () {
										$(this).removeClass('active');
									});
								}
							});
						});
					})();
				}
			}
		} catch (err) {
			_iterator2.e(err);
		} finally {
			_iterator2.f();
		}
	}

	makeDDGroup(['.sQuestions-dd-js']); //end luckyoneJs
	//todo
	//1 clean junk from js
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}