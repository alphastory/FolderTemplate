const dweller = {
	annualSpent: 250000000000,
	daysInYear: 0,
	dateObj: new Date(),
	firstOfYear: 0,
	submitted: false,
	animate: true,
	v: 0,
	init(){
		this.isLeapYear();

		// $( '#mce-EMAIL' ).on( 'keypress', function( e ){
		// 	if( e.keyCode == 13 ){
		// 		$( '#mc-embedded-subscribe-form' ).submit();
		// 		return false;
		// 	}
		// })

		this.betaInit();

	},

	isLeapYear(){

		// Get the Current year
		let y = this.dateObj.getFullYear();
		$( 'footer .currentYear' ).text( y );
		let leap = ( ( y % 4 == 0 ) && ( y % 100 != 0 ) ) || ( y % 400 == 0 );

		// Get the days in the current year based on whether it is a leap year or not.
		this.daysInYear = ( leap ) ? 366 : 365;

		// Get the seconds elapsed between the first of the current year and 01/01/1970
		dweller.firstOfYear = Date.parse( `01/01/${y}` );


		this.initTicker( true );

		window.setInterval( dweller.initTicker, 900 );


	},

	initTicker( first ){

		// Get the seconds elapsed since 01/01/1970
		let d = Date.now();

		// Determine the seconds elapsed in the current year
		let secondsInCurrentYear = d - dweller.firstOfYear;

		// Determine the total number of seconds in any given, normal year.
		const s = dweller.daysInYear * 24 * 60 * 60;

		// Get the amount spent this year.
		let m = Math.round( dweller.annualSpent / s );

		// Determine the dollar amount, then add the commas
		let a = Math.round( ( m * ( secondsInCurrentYear / 1000 ) ) );
		// let stringVal = a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		
		if( first ){
			dweller.v = a;
			let stringVal = a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			$( 'header #ticker .inner h2' ).text( `$${stringVal}` );
		} else {

			TweenLite.to( dweller, 1.0, { v: a, onUpdate: function(){
				let k = Math.round( dweller.v );
				let stringVal = k.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				$( 'header #ticker .inner h2' ).text( `$${stringVal}` );
			} } );
		}

	},

	betaInit(){
		if( Cookies.get('SignedUp') == 'true' ){
			dweller.submitted = true;
		}

		// if( this.animate ){
		// 	// $( window ).load( 'assets/imgs/splash-image.gif', () => {
		// 		// $( '#image img' ).attr( 'src', 'assets/imgs/splash-image.gif' );
		// 	// } );
		// }

		let h = $( window ).height();

		let inMotion = false;
		$( '#sg_SubmitButton' ).off( 'click' ).on( 'click', () => {
			if( !dweller.submitted ){
				dweller.showBeta();
			}
		} );

		$( '#dimmer, #beta_container #closeBtn' ).off( 'click' ).on( 'click', dweller.hideBeta );
		$( '#newsletter #form-reveal' ).off( 'click' ).on( 'click', dweller.showBeta );

		$( '#mc-embedded-subscribe' ).off( 'click' ).on( 'click', function(){
			if( $( '#mce-EMAIL' ).val() != '' ){
				// var h = $( '#beta_container' ).height();
				// $( '#beta_container' ).css( 'height', h );
				dweller.submitted = true;
				Cookies.set('SignedUp', 'true', { expires: 30 });
				$( this ).css( 'display', 'none' );
				$( '#mc_embed_signup .topHalf' ).css( 'display', 'none' );
			}
		} );


		let currURL = window.location.href;
	    if(currURL.indexOf('?sg_sessionid')>=0){
	      $('#openBetaBtn').css({'position':'absolute','bottom':'0px','left':'0px'});
	    }
	},

	hideBeta(){
		// if( !viy.submitted ){
		// 	TweenLite.to( $( '#openBetaBtn' ), 0.5, { bottom: '0px', ease: Circ.easeOut } );
		// }
		TweenLite.to( $( '#beta_container' ), 0.5, { opacity: 0, marginTop: '+=50px', ease: Back.easeIn, onComplete: function(){
			$( '#beta_container' ).css( 'display', 'none' );
		} } );
		TweenLite.to( $( '#dimmer' ), 0.5, { delay: 0.2, opacity: 0, ease: Back.easeIn, onComplete: function(){
			$( '#dimmer' ).css( 'display', 'none' );
		} } );
	},

	showBeta(){
		// if( !viy.submitted ){
			// TweenLite.to( $( '#openBetaBtn' ), 0.5, { bottom: '-60px', ease: Circ.easeIn } );
			$( '#dimmer, #beta_container' ).css( 'display', 'block' );
			TweenLite.to( $( '#dimmer' ), 0.5, { opacity: 1, ease: Back.easeIn } );
			TweenLite.to( $( '#beta_container' ), 0.5, { delay: 0.2, opacity: 1, marginTop: '-=50px', ease: Back.easeOut } );
		// }
	},

	fixFooter( h ){
		$( '#beta_container' ).css( 'top', ( h - 60 ) + 'px' );
	}
}

$( document ).ready( () => {
	dweller.init();
} )