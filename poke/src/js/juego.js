/*jslint bitwise: true, es5: true */
(function (window, undefined) {
    'use strict';
    var KEY_ENTER = 13,
        KEY_LEFT = 37,
        KEY_UP = 38,
        KEY_RIGHT = 39,
        KEY_DOWN = 40,
        
        canvas = null,
        ctx = null,
        lastPress = null,
        pressing = [],
        pause = false,
        gameover = true,
        currentMap = 0,
        worldWidth = 0,
        worldHeight = 0,
        elapsed = 0,
        cam = null,
        player = null,
        wall = [],
          wall1 = [],
          wall2 = [],
          wall3 = [],
          wall4 = [],
          wall5= [],
          wall6 = [],
          wall7= [],
          wall8 = [],
          rock1=[],
        lava = [],
        mazes=[],
        msand1=[],
        msand2=[],
        msand3=[],
        msand4=[],
        msand5=[],
        msand6=[],
        msand7=[],
        msand8=[],
        msand9=[],
        t1r=[],
        t2r=[],
        t3r=[],
        t4r=[],
        enemies = [],
        maps = [],
        spritesheet = new Image(),
        espritesheet= new Image(),
        p1spritesheet= new Image(),
		actualtype=0,
		mtype=[0,1,1,1],
	pspritesheet = new Image();
	
	
	maps[0] = [ [ 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,6, 6, 6, 6, 6, 6, 6, 7], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], 
			[11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13], 
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
			[12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 14], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 8],
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 8],
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 9, 0, 0, 8],
			[ 1, 0, 0, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 9, 9, 9, 0, 0, 8],
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
			[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]];
    maps[1] = [ [ 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,6, 6, 6, 6, 6, 6, 6, 7], 
			[ 1,24,25, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], 
			[ 1,27,28, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 0, 0, 8], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 8], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 8], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0,20,21,22, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 8], 
			[11, 0, 0, 0, 0, 0, 2, 0, 0,23,24,25, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 9, 0, 0, 13], 
			[ 0, 0, 0, 0, 0, 0, 2, 0, 0,23,24,25, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 9, 0, 0, 0], 
			[ 0, 0, 0, 0, 0, 0, 2, 0, 0,23,24,25, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 9, 0, 0, 0], 
			[12, 9, 9, 0, 0, 0, 2, 0, 0,26,27,28, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 9, 0, 0, 14], 
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 8],
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 8],
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 9, 0, 0, 8],
			[ 1, 0, 0, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 9, 9, 9, 0, 0, 8],
			[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
			[ 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
			[ 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
			[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]];
			
    maps[2] = [
        [5, 6, 6, 6, 6, 6, 6,6, 6, 6, 6,6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,  6,  6, 6, 6, 6, 6, 6, 6, 7],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 8],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 8],
        [1, 0, 0, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 9, 9,9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [1, 0, 0, 3, 0, 9, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 9, 2, 2, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 3, 0, 8],
        [1, 0, 0, 0, 0, 9, 0, 0, 0, 9, 9, 9, 9, 9, 2, 0, 2, 9, 9, 9,9, 9, 2, 2, 9, 9, 9, 0, 0, 2, 2, 0, 0, 9, 9, 9, 0, 0, 9, 9, 9, 9, 2, 2, 2, 2, 2, 2, 2, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [1, 0, 0, 9, 9, 9, 0, 0, 9, 9, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 9, 0, 2, 2, 2, 2, 0, 9, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 9, 0, 0, 0, 0, 9, 0, 0, 8],
        [1, 0, 0, 9, 0, 0, 0, 0, 9, 2, 2, 2, 2, 2, 9, 0, 9, 2, 2, 2, 2, 2, 2, 0, 0, 0, 9, 9, 2, 2, 2, 2,9, 9, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 9, 2, 9, 2, 2, 2, 2, 9, 0, 0, 0, 0, 9, 0, 0, 8],
        [11, 9, 9, 9, 0, 0, 0, 0, 9, 2, 2, 2, 2, 9, 9, 0, 9, 9, 2, 2, 2, 2, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 9, 9, 9, 9,9, 2, 2, 2, 9, 0, 0, 0, 0, 9, 9, 9, 13],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [12, 9, 9, 9, 0, 0, 0, 0, 9, 2, 2, 2, 2, 9,9, 0, 9, 9, 2, 2, 2, 2, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 9, 9, 0, 9, 9, 2, 2, 2, 9, 0, 0, 0, 0, 9, 9, 9, 14],
        [1, 0, 0, 9, 0, 0, 0, 0, 9, 2, 2, 2, 2, 2, 9, 0, 9, 2, 2, 2, 2, 2, 2, 0, 0, 0, 9, 9, 2, 2, 2, 2, 9, 9, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 9, 0, 9, 2, 2, 2, 2, 9, 0, 0, 0, 0, 9, 0, 0, 8],
        [1, 0, 0, 9, 9, 9, 0, 0, 9, 9, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 9, 0, 2, 2, 2, 2, 0, 9, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 9, 9, 0, 0, 0, 0, 9, 0, 0, 8],
        [1, 0, 0, 0, 0, 9, 0, 0, 0, 9, 9, 9, 9, 9, 2, 0, 2, 9, 9, 9, 9, 9, 2, 2, 9, 9, 9, 0, 0, 2, 2, 0, 0, 9, 9, 9, 0, 0, 9, 9, 9, 9, 2, 2, 2, 0, 2, 2, 2, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [1, 0, 0, 3, 0, 9, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 9, 2, 2, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 9, 0, 0, 9, 9, 9, 2, 0, 2, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 3, 0, 8],
        [1, 0, 0, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 8],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 8],
        [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10, 10,10,10,10,10,10, 8]
    ];
    maps[3] = [
        [ 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7],
        [ 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [ 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 9, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [ 1, 0, 0, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 9, 9, 9, 0, 0, 0, 0, 8],
        [ 1, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 9, 0, 0, 0, 0, 8],
        [ 1, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 9, 0, 0, 0, 0, 8],
        [11, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 9, 9, 2, 9, 9, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0,13],
        [ 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 9, 9, 9, 2, 2, 2, 9, 9, 9, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 9, 2, 2, 2, 2, 2, 2, 2, 9, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0],
        [12, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 9, 0, 0, 0, 0,14],
        [ 1, 0, 0, 0, 0, 9, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 9, 0, 0, 0, 0, 8],
        [1, 0, 2, 9, 9, 9, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 9, 9, 9, 2, 0, 8],
        [1, 2, 2, 9, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 9, 2, 2, 8],
        [1, 9, 9, 9, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 9, 9, 9, 8],
        [1, 2, 2, 0, 0, 4, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 4, 0, 0, 2, 2, 8],
        [1, 2, 0, 0, 0, 0, 0, 9, 9, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 9, 9, 0, 0, 0, 0, 2, 8],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [1,20,21,21,21,22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [1,23,24,24,24,25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 8],
        [1,23,24,24,24,25, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [1,23,24,24,24,25, 0, 9, 9, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 9, 9, 0, 0, 0, 0, 0, 8],
        [1,23,24,24,24,25, 0, 0, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 8],
        [1,23,24,24,24,25, 0, 0, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 8],
        [1,23,24,24,24,25, 0, 0, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 8],
        [1,26,27,27,27,28, 0, 0, 9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [1, 9, 9, 2, 2, 0, 0, 0, 0, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 9, 9, 8],
        [1, 9, 2, 2, 0, 0, 0, 0, 0, 9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 9, 8],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 9, 9, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 8],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 9, 9, 9, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 8],
        [1, 2, 0, 0, 0, 9, 9, 9, 0, 2, 2, 0, 0, 9, 9, 9, 0, 0, 0, 0, 0, 2, 9, 9, 9, 0, 0, 0, 0, 8],
        [1, 2, 0, 0, 0, 0, 0, 9, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 2, 2, 0, 0, 0, 0, 8],
        [1, 2, 0, 0, 0, 0, 0, 9, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 2, 0, 0, 0, 0, 0, 8],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 8],
        [1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8],
        [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]
    ];

    function Camera() {
        this.x = 0;
        this.y = 0;
    }

    Camera.prototype = {
        constructor: Camera,
        
        focus: function (x, y) {
            this.x = x - canvas.width / 2;
            this.y = y - canvas.height / 2;

            if (this.x < 0) {
                this.x = 0;
            } else if (this.x > worldWidth - canvas.width) {
                this.x = worldWidth - canvas.width;
            }
            if (this.y < 0) {
                this.y = 0;
            } else if (this.y > worldHeight - canvas.height) {
                this.y = worldHeight - canvas.height;
            }
        }
    };
    
    function Rectangle2D(x, y, width, height, createFromTopLeft) {
        this.width = (width === undefined) ? 0 : width;
        this.height = (height === undefined) ? this.width : height;
        if (createFromTopLeft) {
            this.left = (x === undefined) ? 0 : x;
            this.top = (y === undefined) ? 0 : y;
        } else {
            this.x = (x === undefined) ? 0 : x;
            this.y = (y === undefined) ? 0 : y;
        }
    }
    
    Rectangle2D.prototype = {
        constructor: Rectangle2D,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        vx: 0,
        vy: 0,
        dir: 0,
        
        get x() {
            return this.left + this.width / 2;
        },
        set x(value) {
            this.left = value - this.width / 2;
        },
        
        get y() {
            return this.top + this.height / 2;
        },
        set y(value) {
            this.top = value - this.height / 2;
        },
        
        get right() {
            return this.left + this.width;
        },
        set right(value) {
            this.left = value - this.width;
        },
        
        get bottom() {
            return this.top + this.height;
        },
        set bottom(value) {
            this.top = value - this.height;
        },
        
        intersects: function (rect) {
            if (rect !== undefined) {
                return (this.left < rect.right &&
                    this.right > rect.left &&
                    this.top < rect.bottom &&
                    this.bottom > rect.top);
            }
        },
        
        fill: function (ctx) {
            if (ctx !== undefined) {
                if (cam !== undefined) {
                    ctx.fillRect(this.left - cam.x, this.top - cam.y, this.width, this.height);
                } else {
                    ctx.fillRect(this.left, this.top, this.width, this.height);
                }
            }
        },
        
        drawImageArea: function (ctx, cam, img, sx, sy, sw, sh) {
            if (ctx !== undefined) {
                if (cam !== undefined) {
                    if (img.width) {
                        ctx.drawImage(img, sx, sy, sw, sh, this.left - cam.x, this.top - cam.y, this.width, this.height);
                    } else {
                        ctx.strokeRect(this.left - cam.x, this.top - cam.y, this.width, this.height);
                    }
                } else {
                    if (img.width) {
                        ctx.drawImage(img, sx, sy, sw, sh, this.left, this.top, this.width, this.height);
                    } else {
                        ctx.strokeRect(this.left, this.top, this.width, this.height);
                    }
                }
            }
        }
    };
    function Player(x, y, width, height, createFromTopLeft) {
        this.width = (width === undefined) ? 0 : width;
        this.height = (height === undefined) ? this.width : height;
        if (createFromTopLeft) {
            this.left = (x === undefined) ? 0 : x;
            this.top = (y === undefined) ? 0 : y;
        } else {
            this.x = (x === undefined) ? 0 : x;
            this.y = (y === undefined) ? 0 : y;
        }
    }
    
    Player.prototype = {
        constructor: Player,
        left: 0,
        top: 0,
        lastx:100,
        lasty:40,
        width: 0,
        height: 0,
        vx: 0,
        vy: 0,
        dir: 0,
	pokemon:[],
        
        get x() {
            return this.left + this.width / 2;
        },
        set x(value) {
            this.left = value - this.width / 2;
        },
        
        get y() {
            return this.top + this.height / 2;
        },
        set y(value) {
            this.top = value - this.height / 2;
        },
        
        get right() {
            return this.left + this.width;
        },
        set right(value) {
            this.left = value - this.width;
        },
        
        get bottom() {
            return this.top + this.height;
        },
        set bottom(value) {
            this.top = value - this.height;
        },
        
        intersects: function (rect) {
            if (rect !== undefined) {
                return (this.left < rect.right &&
                    this.right > rect.left &&
                    this.top < rect.bottom &&
                    this.bottom > rect.top);
            }
        },
        
        fill: function (ctx) {
            if (ctx !== undefined) {
                if (cam !== undefined) {
                    ctx.fillRect(this.left - cam.x, this.top - cam.y, this.width, this.height);
                } else {
                    ctx.fillRect(this.left, this.top, this.width, this.height);
                }
            }
        },
        
        drawImageArea: function (ctx, cam, img, sx, sy, sw, sh) {
            if (ctx !== undefined) {
                if (cam !== undefined) {
                    if (img.width) {
                        ctx.drawImage(img, sx, sy, sw, sh, this.left - cam.x, this.top - cam.y, this.width, this.height);
                    } else {
                        ctx.strokeRect(this.left - cam.x, this.top - cam.y, this.width, this.height);
                    }
                } else {
                    if (img.width) {
                        ctx.drawImage(img, sx, sy, sw, sh, this.left, this.top, this.width, this.height);
                    } else {
                        ctx.strokeRect(this.left, this.top, this.width, this.height);
                    }
                }
            }
        }
    };
	
    document.addEventListener('keydown', function (evt) {
        lastPress = evt.which;
        pressing[evt.which] = true;

        if (evt.which >= 37 && evt.which <= 40) {
            evt.preventDefault();
        }
    }, false);

    document.addEventListener('keyup', function (evt) {
        pressing[evt.which] = false;
    }, false);

    function setMap(map, blockSize) {
        var col = 0,
            row = 0,
            columns = 0,
            rows = 0,
            enemy = null;
             rock1.length = 0;
         wall.length = 0;
        wall1.length = 0;
         wall2.length = 0;
         wall3.length = 0;
          wall4.length = 0;
           wall5.length = 0;
          wall6.length = 0;
          wall7.length = 0;
          wall8.length = 0;
        mazes.length = 0;
        lava.length = 0;
        t1r.length = 0;
        t2r.length = 0;
        t3r.length = 0;
        t4r.length = 0;
        enemies.length = 0;
        msand1.length=0;
        msand2.length=0;
        msand3.length=0;
        msand4.length=0;
        msand5.length=0;
        msand6.length=0;
        msand7.length=0;
        msand8.length=0;
        msand9.length=0;
        for (row = 0, rows = map.length; row < rows; row += 1) {
            for (col = 0, columns = map[row].length; col < columns; col += 1) {
                if (map[row][col] === 1) {
                    wall1.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                    wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }else if (map[row][col] === 6) {
                    wall2.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                     wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                } else if (map[row][col] === 5) {
                    t1r.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                     wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                } else if (map[row][col] === 7) {
                    t2r.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                     wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                } else if (map[row][col] === 8) {
                    wall3.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                     wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                } 
                else if (map[row][col] === 10) {
                    wall4.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                     wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                } 
                 else if (map[row][col] === 11) {
                    wall5.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                     wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                } 
                 else if (map[row][col] === 12) {
                    wall6.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                     wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                } 
                  else if (map[row][col] === 13) {
                    wall7.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                     wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                } 
                 else if (map[row][col] === 14) {
                    wall8.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                     wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                } 
                else if (map[row][col] === 9) {
                    rock1.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                     wall.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                } 
                 else if (map[row][col] === 2) {
                    lava.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }  
                else if (map[row][col] === 0) {
                    mazes.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }
                else if (map[row][col] === 20) {
                    msand1.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }else if (map[row][col] === 21) {
                    msand2.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }else if (map[row][col] === 22) {
                    msand3.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }else if (map[row][col] === 23) {
                    msand4.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }else if (map[row][col] === 24) {
                    msand5.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }else if (map[row][col] === 25) {
                    msand6.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }else if (map[row][col] === 26) {
                    msand7.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }else if (map[row][col] === 27) {
                    msand8.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }else if (map[row][col] === 28) {
                    msand9.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }
                else if (map[row][col] > 2 && map[row][col] < 5) {
                    enemy = new Player(col * blockSize, row * blockSize, blockSize, blockSize, true);
                    if (map[row][col] === 3) {
                        enemy.vx = 5;
                        enemy.dir = 1;
                    } else if (map[row][col] === 4) {
                        enemy.vy = 5;
                        enemy.dir = 2;
                    }
                    enemies.push(enemy);
                     mazes.push(new Rectangle2D(col * blockSize, row * blockSize, blockSize, blockSize, true));
                }
            }
        }
        worldWidth = columns * blockSize;
        worldHeight = rows * blockSize;
    }

    function reset() {
        player.dir = 1;
        player.left = player.lastx;
        player.top = player.lasty;
        gameover = false;
    }

    function paint(ctx) {
        var i = 0,
            l = 0;
        
        // Clean canvas
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
                // Draw mazes
        ctx.strokeStyle = '#999';
		if(actualtype==0){
			for (i = 0, l = mazes.length; i < l; i += 1) {
				mazes[i].drawImageArea(ctx, cam, espritesheet, 3*17, 3*17, 16, 16);
			} 
			for (i = 0, l = msand1.length; i < l; i += 1) {
				msand1[i].drawImageArea(ctx, cam, espritesheet, 9*17, 16*17, 16, 16);
			}
			for (i = 0, l = msand2.length; i < l; i += 1) {
				msand2[i].drawImageArea(ctx, cam, espritesheet, 10*17, 16*17, 16, 16);
			}
			for (i = 0, l = msand3.length; i < l; i += 1) {
				msand3[i].drawImageArea(ctx, cam, espritesheet, 11*17, 16*17, 16, 16);
			}
			for (i = 0, l = msand4.length; i < l; i += 1) {
				msand4[i].drawImageArea(ctx, cam, espritesheet, 9*17, 17*17, 16, 16);
			}
			for (i = 0, l = msand5.length; i < l; i += 1) {
				msand5[i].drawImageArea(ctx, cam, espritesheet, 10*17, 17*17, 16, 16);
			}
			for (i = 0, l = msand6.length; i < l; i += 1) {
				msand6[i].drawImageArea(ctx, cam, espritesheet, 11*17, 17*17, 16, 16);
			}
			for (i = 0, l = msand7.length; i < l; i += 1) {
				msand7[i].drawImageArea(ctx, cam, espritesheet, 9*17, 18*17, 16, 16);
			}
			for (i = 0, l = msand8.length; i < l; i += 1) {
				msand8[i].drawImageArea(ctx, cam, espritesheet, 10*17, 18*17, 16, 16);
			}
			for (i = 0, l = msand9.length; i < l; i += 1) {
				msand9[i].drawImageArea(ctx, cam, espritesheet, 11*17, 18*17, 16, 16);
			}
			
		  
			for (i = 0, l = t1r.length; i < l; i += 1) {
				t1r[i].drawImageArea(ctx, cam, espritesheet, 8*17, 12*17, 16, 16);
			}
			for (i = 0, l = t2r.length; i < l; i += 1) {
				t2r[i].drawImageArea(ctx, cam, espritesheet, 17*17, 12*17, 16, 16);
			}


			// Draw player
			ctx.strokeStyle = '#0f0';
			player.drawImageArea(ctx, cam, pspritesheet, (~~(elapsed * 17) % 2) * 17, player.dir * 25, 17, 25);
			
			// Draw walls
			ctx.strokeStyle = '#999';
			for (i = 0, l = wall1.length; i < l; i += 1) {
				wall1[i].drawImageArea(ctx, cam, espritesheet, 30*17, 5*17, 16, 16);
			}        for (i = 0, l = wall2.length; i < l; i += 1) {
				wall2[i].drawImageArea(ctx, cam, espritesheet, 28*17, 7*17, 16, 16);
			}  for (i = 0, l = wall3.length; i < l; i += 1) {
				wall3[i].drawImageArea(ctx, cam, espritesheet, 27*17, 5*17, 16, 16);
			}
			for (i = 0, l = wall4.length; i < l; i += 1) {
				wall4[i].drawImageArea(ctx, cam, espritesheet, 20*17, 2*17, 16, 16);
			}
			 for (i = 0, l = wall5.length; i < l; i += 1) {
				wall5[i].drawImageArea(ctx, cam, espritesheet, 30*17, 6*17, 16, 16);
			}
			 for (i = 0, l = wall6.length; i < l; i += 1) {
				wall6[i].drawImageArea(ctx, cam, espritesheet, 30*17, 4*17, 16, 16);
			}
			 for (i = 0, l = wall7.length; i < l; i += 1) {
				wall7[i].drawImageArea(ctx, cam, espritesheet, 27*17, 6*17, 16, 16);
			}
			 for (i = 0, l = wall8.length; i < l; i += 1) {
				wall8[i].drawImageArea(ctx, cam, espritesheet, 27*17, 4*17, 16, 16);
			}
			for (i = 0, l = rock1.length; i < l; i += 1) {
				rock1[i].drawImageArea(ctx, cam, espritesheet, 51*17, 1*17, 16, 16);
			}

			
			// Draw lava
			ctx.strokeStyle = '#f00';
			for (i = 0, l = lava.length; i < l; i += 1) {
				lava[i].drawImageArea(ctx, cam, spritesheet, 20, 10 + (~~(elapsed * 10) % 3) * 10, 10, 10);
			}
			
			// Draw enemies
			ctx.strokeStyle = '#0ff';
			for (i = 0, l = enemies.length; i < l; i += 1) {
				enemies[i].drawImageArea(ctx, cam, p1spritesheet, (~~(elapsed * 22) % 2) * 22, enemies[i].dir * 35, 22, 35);  
			}
			
		}
		if(actualtype==1){
			for (i = 0, l = mazes.length; i < l; i += 1) {
				mazes[i].drawImageArea(ctx, cam, espritesheet, 9*17, 14*17, 16, 16);
			} 
			for (i = 0, l = msand1.length; i < l; i += 1) {
				msand1[i].drawImageArea(ctx, cam, espritesheet, 9*17, 16*17, 16, 16);
			}
			for (i = 0, l = msand2.length; i < l; i += 1) {
				msand2[i].drawImageArea(ctx, cam, espritesheet, 10*17, 16*17, 16, 16);
			}
			for (i = 0, l = msand3.length; i < l; i += 1) {
				msand3[i].drawImageArea(ctx, cam, espritesheet, 11*17, 16*17, 16, 16);
			}
			for (i = 0, l = msand4.length; i < l; i += 1) {
				msand4[i].drawImageArea(ctx, cam, espritesheet, 9*17, 17*17, 16, 16);
			}
			for (i = 0, l = msand5.length; i < l; i += 1) {
				msand5[i].drawImageArea(ctx, cam, espritesheet, 10*17, 17*17, 16, 16);
			}
			for (i = 0, l = msand6.length; i < l; i += 1) {
				msand6[i].drawImageArea(ctx, cam, espritesheet, 11*17, 17*17, 16, 16);
			}
			for (i = 0, l = msand7.length; i < l; i += 1) {
				msand7[i].drawImageArea(ctx, cam, espritesheet, 9*17, 18*17, 16, 16);
			}
			for (i = 0, l = msand8.length; i < l; i += 1) {
				msand8[i].drawImageArea(ctx, cam, espritesheet, 10*17, 18*17, 16, 16);
			}
			for (i = 0, l = msand9.length; i < l; i += 1) {
				msand9[i].drawImageArea(ctx, cam, espritesheet, 11*17, 18*17, 16, 16);
			}
			
		  
			for (i = 0, l = t1r.length; i < l; i += 1) {
				t1r[i].drawImageArea(ctx, cam, espritesheet, 8*17, 12*17, 16, 16);
			}
			for (i = 0, l = t2r.length; i < l; i += 1) {
				t2r[i].drawImageArea(ctx, cam, espritesheet, 17*17, 12*17, 16, 16);
			}


			// Draw player
			ctx.strokeStyle = '#0f0';
			player.drawImageArea(ctx, cam, pspritesheet, (~~(elapsed * 17) % 2) * 17, player.dir * 25, 17, 25);
			
			// Draw walls
			ctx.strokeStyle = '#999';
			for (i = 0, l = wall1.length; i < l; i += 1) {
				wall1[i].drawImageArea(ctx, cam, espritesheet, 8*17, 13*17, 16, 16);
			}        for (i = 0, l = wall2.length; i < l; i += 1) {
				wall2[i].drawImageArea(ctx, cam, espritesheet, 11*17, 12*17, 16, 16);
			}  for (i = 0, l = wall3.length; i < l; i += 1) {
				wall3[i].drawImageArea(ctx, cam, espritesheet, 17*17, 13*17, 16, 16);
			}
			for (i = 0, l = wall4.length; i < l; i += 1) {
				wall4[i].drawImageArea(ctx, cam, espritesheet, 20*17, 2*17, 16, 16);
			}
			 for (i = 0, l = wall5.length; i < l; i += 1) {
				wall5[i].drawImageArea(ctx, cam, espritesheet, 25*17, 10*17, 16, 16);
			}
			 for (i = 0, l = wall6.length; i < l; i += 1) {
				wall6[i].drawImageArea(ctx, cam, espritesheet, 25*17, 7*17, 16, 16);
			}
			 for (i = 0, l = wall7.length; i < l; i += 1) {
				wall7[i].drawImageArea(ctx, cam, espritesheet, 19*17, 10*17, 16, 16);
			}
			 for (i = 0, l = wall8.length; i < l; i += 1) {
				wall8[i].drawImageArea(ctx, cam, espritesheet, 19*17, 7*17, 16, 16);
			}
			for (i = 0, l = rock1.length; i < l; i += 1) {
				rock1[i].drawImageArea(ctx, cam, espritesheet, 9*17, 15*17, 16, 16);
			}

			
			// Draw lava
			ctx.strokeStyle = '#f00';
			for (i = 0, l = lava.length; i < l; i += 1) {
				lava[i].drawImageArea(ctx, cam, spritesheet, 20, 10 + (~~(elapsed * 10) % 3) * 10, 10, 10);
			}
			
			// Draw enemies
			ctx.strokeStyle = '#0ff';
			for (i = 0, l = enemies.length; i < l; i += 1) {
				enemies[i].drawImageArea(ctx, cam, p1spritesheet, (~~(elapsed * 22) % 2) * 22, enemies[i].dir * 35, 22, 35);  
			}
			
		}      

        // Debug last key pressed
        //ctx.fillStyle = '#fff';
        //ctx.fillText('Last Press: ' + lastPress, 0, 20);
        
        // Draw pause
        if (pause) {
            ctx.textAlign = 'center';
            if (gameover) {
                ctx.fillText('GAMEOVER', 150, 100);
            } else {
                ctx.fillText('PAUSE', 150, 100);
            }
            ctx.textAlign = 'left';
        }
    }

    function act(deltaTime) {
        var i = 0,
            l = 0,
            j = 0,
            jl = 0;
        
        if (!pause) {
            // GameOver Reset
            if (gameover) {
                reset();
            }

            // Move Rect
            if (pressing[KEY_UP]) {
                player.dir = 0;
                player.y -= 5;
                for (i = 0, l = wall.length; i < l; i += 1) {
                    if (player.intersects(wall[i])) {
                        player.top = wall[i].bottom;
                    }
                }
            }
            if (pressing[KEY_RIGHT]) {
                player.dir = 1;
                player.x += 5;
                for (i = 0, l = wall.length; i < l; i += 1) {
                    if (player.intersects(wall[i])) {
                        player.right = wall[i].left;
                    }
                }
    
            }
            if (pressing[KEY_DOWN]) {
                player.dir = 2;
                player.y += 5;
                for (i = 0, l = wall.length; i < l; i += 1) {
                    if (player.intersects(wall[i])) {
                        player.bottom = wall[i].top;
                    }
                }

            }
            if (pressing[KEY_LEFT]) {
                player.dir = 3;
                player.x -= 5;
                for (i = 0, l = wall.length; i < l; i += 1) {
                    if (player.intersects(wall[i])) {
                        player.left = wall[i].right;
                    }
                }

                
            }

            // Out Screen
            if (player.x > worldWidth) {
                currentMap += 1;
                if (currentMap > maps.length - 1) {
                    currentMap = 0;
                }
		actualtype=mtype[currentMap];
                setMap(maps[currentMap], 30);
                player.lastx=0;
                player.lasty=player.y-player.height/2;
                player.x = 0;
            }
            if (player.y > worldHeight) {
                player.y = 0;
                player.lasty=0;
                player.lastx=player.x-player.width/2;
            }
            if (player.x < 0) {
                currentMap -= 1;
                if (currentMap < 0) {
                currentMap = maps.length - 1;
                }
                setMap(maps[currentMap], 30);
		actualtype=mtype[currentMap];
                player.x = worldWidth;
                player.lastx=worldWidth-player.width;
                player.lasty=player.y-player.height/2;
            }
            if (player.y < 0) {
                player.y = worldHeight;
                 player.lasty=worldHeight-player.height;
                player.lastx=player.x-player.width/2;
            }

            // Move enemies
            for (i = 0, l = enemies.length; i < l; i += 1) {
                if (enemies[i].vx !== 0) {
                    enemies[i].x += enemies[i].vx;

                    for (j = 0, jl = wall.length; j < jl; j += 1) {
                        if (enemies[i].intersects(wall[j])) {
                            enemies[i].vx *= -1;
                            enemies[i].x += enemies[i].vx;
                            enemies[i].dir += 2;
                            if (enemies[i].dir > 3) {
                                enemies[i].dir -= 4;
                            }
                            break;
                        }
                    }
                }

                if (enemies[i].vy !== 0) {
                    enemies[i].y += enemies[i].vy;

                    for (j = 0, jl = wall.length; j < jl; j += 1) {
                        if (enemies[i].intersects(wall[j])) {
                            enemies[i].vy *= -1;
                            enemies[i].y += enemies[i].vy;
                            enemies[i].dir += 2;
                            if (enemies[i].dir > 3) {
                                enemies[i].dir -= 4;
                            }
                            break;
                        }
                    }
                }

                // Player Intersects Enemy
                if (player.intersects(enemies[i])) {
                    gameover = true;
                    pause = true;
                }
            }

            // Player Intersects Lava
            for (i = 0, l = lava.length; i < l; i += 1) {
                if (player.intersects(lava[i])) {
                    gameover = true;
                    pause = true;
                }
            }

            // Focus player
            cam.focus(player.x, player.y);

            // Elapsed time
            elapsed += deltaTime;
            if (elapsed > 3600) {
                elapsed -= 3600;
            }
        }
        // Pause/Unpause
        if (lastPress === KEY_ENTER) {
            pause = !pause;
            lastPress = null;
        }
    }

    function repaint() {
        window.requestAnimationFrame(repaint);
        paint(ctx);
    }

    function run() {
        setTimeout(run, 50);
        act(0.10);
    }

    function init() {
        // Get canvas and context
        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        canvas.width = 360;
        canvas.height = 240;
        worldWidth = canvas.width;
        worldHeight = canvas.height;
        
        // Load assets
          spritesheet.src = './src/img/maze-sprites.png';
          pspritesheet.src = './src/img/poke-sprites.png';
          espritesheet.src ='./src/img/maze-poke.png';
          p1spritesheet.src ='./src/img/bill-sprites.png';
        // Create camera and player
        cam = new Camera();
        player = new Player(60, 60, 30, 30, true);

        // Set initial map
        setMap(maps[0], 30);
        actualtype=mtype[0];
        // Start game
        run();
        repaint();
    }

    window.addEventListener('load', init, false);
}(window));
