'use strict';

var dweller = {
	annualSpent: 250000000000,
	daysInYear: 0,
	dateObj: new Date(),
	firstOfYear: 0,
	submitted: false,
	animate: true,
	v: 0,
	init: function init() {
		this.isLeapYear();

		// $( '#mce-EMAIL' ).on( 'keypress', function( e ){
		// 	if( e.keyCode == 13 ){
		// 		$( '#mc-embedded-subscribe-form' ).submit();
		// 		return false;
		// 	}
		// })

		this.betaInit();
	},
	isLeapYear: function isLeapYear() {

		// Get the Current year
		var y = this.dateObj.getFullYear();
		$('footer .currentYear').text(y);
		var leap = y % 4 == 0 && y % 100 != 0 || y % 400 == 0;

		// Get the days in the current year based on whether it is a leap year or not.
		this.daysInYear = leap ? 366 : 365;

		// Get the seconds elapsed between the first of the current year and 01/01/1970
		dweller.firstOfYear = Date.parse('01/01/' + y);

		this.initTicker(true);

		window.setInterval(dweller.initTicker, 900);
	},
	initTicker: function initTicker(first) {

		// Get the seconds elapsed since 01/01/1970
		var d = Date.now();

		// Determine the seconds elapsed in the current year
		var secondsInCurrentYear = d - dweller.firstOfYear;

		// Determine the total number of seconds in any given, normal year.
		var s = dweller.daysInYear * 24 * 60 * 60;

		// Get the amount spent this year.
		var m = Math.round(dweller.annualSpent / s);

		// Determine the dollar amount, then add the commas
		var a = Math.round(m * (secondsInCurrentYear / 1000));
		// let stringVal = a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		if (first) {
			dweller.v = a;
			var stringVal = a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			$('header #ticker .inner h2').text('$' + stringVal);
		} else {

			TweenLite.to(dweller, 1.0, { v: a, onUpdate: function onUpdate() {
					var k = Math.round(dweller.v);
					var stringVal = k.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					$('header #ticker .inner h2').text('$' + stringVal);
				} });
		}
	},
	betaInit: function betaInit() {
		if (Cookies.get('SignedUp') == 'true') {
			dweller.submitted = true;
		}

		// if( this.animate ){
		// 	// $( window ).load( 'assets/imgs/splash-image.gif', () => {
		// 		// $( '#image img' ).attr( 'src', 'assets/imgs/splash-image.gif' );
		// 	// } );
		// }

		var h = $(window).height();

		var inMotion = false;
		$('#sg_SubmitButton').off('click').on('click', function () {
			if (!dweller.submitted) {
				dweller.showBeta();
			}
		});

		$('#dimmer, #beta_container #closeBtn').off('click').on('click', dweller.hideBeta);
		$('#newsletter #form-reveal').off('click').on('click', dweller.showBeta);

		$('#mc-embedded-subscribe').off('click').on('click', function () {
			if ($('#mce-EMAIL').val() != '') {
				// var h = $( '#beta_container' ).height();
				// $( '#beta_container' ).css( 'height', h );
				dweller.submitted = true;
				Cookies.set('SignedUp', 'true', { expires: 30 });
				$(this).css('display', 'none');
				$('#mc_embed_signup .topHalf').css('display', 'none');
			}
		});

		var currURL = window.location.href;
		if (currURL.indexOf('?sg_sessionid') >= 0) {
			$('#openBetaBtn').css({ 'position': 'absolute', 'bottom': '0px', 'left': '0px' });
		}
	},
	hideBeta: function hideBeta() {
		// if( !viy.submitted ){
		// 	TweenLite.to( $( '#openBetaBtn' ), 0.5, { bottom: '0px', ease: Circ.easeOut } );
		// }
		TweenLite.to($('#beta_container'), 0.5, { opacity: 0, marginTop: '+=50px', ease: Back.easeIn, onComplete: function onComplete() {
				$('#beta_container').css('display', 'none');
			} });
		TweenLite.to($('#dimmer'), 0.5, { delay: 0.2, opacity: 0, ease: Back.easeIn, onComplete: function onComplete() {
				$('#dimmer').css('display', 'none');
			} });
	},
	showBeta: function showBeta() {
		// if( !viy.submitted ){
		// TweenLite.to( $( '#openBetaBtn' ), 0.5, { bottom: '-60px', ease: Circ.easeIn } );
		$('#dimmer, #beta_container').css('display', 'block');
		TweenLite.to($('#dimmer'), 0.5, { opacity: 1, ease: Back.easeIn });
		TweenLite.to($('#beta_container'), 0.5, { delay: 0.2, opacity: 1, marginTop: '-=50px', ease: Back.easeOut });
		// }
	},
	fixFooter: function fixFooter(h) {
		$('#beta_container').css('top', h - 60 + 'px');
	}
};

$(document).ready(function () {
	dweller.init();
});
