(function() {

	var player = null;	// r�f�rence au Sprite Player
	var playerState = 'stand';	// �tat du Player
	var keys = [];	// touches clavier

	// Initialisation
	$(document).ready(function() {
		init();
	});

	// Fonction d'initialisation
	this.init = function() {
		prepareStage();
		addRoundRects();
		addCircles();
		addPlayer();

		// Ajouter les listeners d'�v�nements
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		startTicker(20);
	};

	// Pr�parer le stage et instancier EaselJsUtils
	this.prepareStage = function() {
		this.canvas = $('#gipCanvas').get(0);
		this.stage = new createjs.Stage(this.canvas);
		easelJsUtils = new EaselJsUtils(this.stage);
	};

	// Ajouter les formes "rectangles coins arrondis"
	this.addRoundRects = function() {
		easelJsUtils.createRoundRect(750, 100, 100, 400, [65, 136, 178], {opacity: 0.2});
		easelJsUtils.createRoundRect(-20, 210, 100, 290, [106, 10, 171], {opacity: 0.1, radius: 30});
		easelJsUtils.createRoundRect(0, 400, 800, 200, [106, 10, 171], {opacity: 0.1, radius: 10});
	};

	// Ajouter les formes "cercles"
	this.addCircles = function() {
        easelJsUtils.createCircle(500, 100, 90, [212, 106, 106], {opacity: 0.5});
        easelJsUtils.createCircle(240, 300, 50, [212, 106, 106], {opacity: 0.3});
	};

	// Ajouter le Player
	this.addPlayer = function() {
		player = easelJsUtils.createPlayer(0, 400);
	};

	/** Gestion clavier **/
	// appuyer sur une touche
	this.handleKeyDown = function(evt) {
		keys[evt.keyCode] = true;
	};

	// relacher une touche
	this.handleKeyUp = function(evt) {
		keys[evt.keyCode] = false;
	};

	// G�rer les interactions
	this.handleInteractions = function() {
		if (keys[38]){
			player.scaleY = 1;
			if('stand'!=playerState){
				playerState='jump';
				player.gotoAndPlay('jump');

			}
			if (player.y>0){
				player.y -=10;
			}

		}

		// touches "gauche"
		if (keys[37]) {
			player.scaleX = -1;	// retourner le Player vers la gauche
			if ('walk' != playerState) {
				playerState = 'walk';
				player.gotoAndPlay('walk');
			}
			if (player.x > 0) {
				player.x -= 10;
			}

		} else if (keys[39]) {
			// touche "droite"
			player.scaleX = 1;	// retourner le Player vers la droite
			if ('walk' != playerState) {
				playerState = 'walk';
				player.gotoAndPlay('walk');
			}
			if (player.x < 8000) {
				player.x += 10;
			}

		} else if (keys[40]) {
			// touche "bas"
			playerState = 'duck';
			player.gotoAndPlay('duck');
		} else {
			playerState = 'stand';
			player.gotoAndPlay('stand');
		}



	};

	// D�marrer le ticker
	this.startTicker = function(fps) {
		createjs.Ticker.setFPS(fps);
		createjs.Ticker.addEventListener("tick", function(){

			// g�rer les interactions
			handleInteractions();

			this.stage.update();
		});
	};

}());
