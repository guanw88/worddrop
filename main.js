/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Tile = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n\nfunction Game() {\n    this.tiles = this.tiles || [];\n}\n\nGame.DIM_X = 600;\nGame.DIM_Y = 600;\n\nGame.prototype.add = function add(object) {\n    if (object instanceof Tile) {\n        this.tiles.push(object);\n    } else {\n        throw new Error(\"unknown type of object\");\n    }\n};\n\nGame.prototype.addTile = function addTile() {\n    const newTile = new Tile();\n    this.add(newTile);\n    return newTile;\n};\n\nGame.prototype.allObjects = function allObjects() {\n    return [].concat(this.tiles);\n};\n\nGame.prototype.checkVerticalCollisions = function checkVerticalCollisions() {\n    console.log(\"Checking vertical collisions\");\n    let lastTile = this.tiles[this.tiles.length - 1];\n    console.log(lastTile.x, lastTile.y);\n    if (lastTile && lastTile.y >= 540) {\n    console.log(\"Collided with floor\");\n    return true;\n    }\n    // debugger;\n    for (let i = 0; i < this.tiles.length - 1; i++) {\n    const obj2 = this.tiles[i];\n    console.log(lastTile, obj2);\n    if (lastTile.isCollidedWithVertically(obj2)) {\n        console.log(\"Collided with tile\");\n        lastTile.movable = false;\n        return true;\n    }\n    }\n    return false;\n};\n\nGame.prototype.draw = function draw(ctx) {\n    this.allObjects().forEach(function (object) {\n        object.draw(ctx);\n    });\n};\n\nGame.prototype.moveObjects = function moveObjects(delta) {\n    this.allObjects().forEach(function (object) {\n        if (object.movable) object.move(delta);\n    });\n};\n\n// Game.prototype.remove = function remove(object) {\n//     if (object instanceof Tile) {\n//         this.tiles.splice(this.tiles.indexOf(object), 1);\n//     } else {\n//         throw new Error(\"unknown type of object\");\n//     }\n// };\n\nGame.prototype.step = function step(delta) {\n    this.moveObjects(delta);\n    // this.checkCollisions();\n};\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function GameView(game, ctx) {\n    this.ctx = ctx;\n    this.game = game;\n    this.tile = this.game.addTile();\n}\n\nGameView.MOVES = {\n    a: -1,\n    d: 1\n};\n\nGameView.prototype.bindKeyHandlers = function bindKeyHandlers(tile) {\n    render = this.render.bind(this);\n\n    function handleKeypress(event) {\n        if (event.keyCode == 97) {\n            tile.shift(-1); // a\n            requestAnimationFrame(render);\n        } else if (event.keyCode == 100) {\n            tile.shift(1); // d\n            requestAnimationFrame(render);\n        } else if (event.keyCode == 119) {\n            tile.toggleLetter();\n            requestAnimationFrame(render);\n        } else {\n            // console.log(\"other key pressed \", event.keyCode);\n        }\n    }\n\n    function handleKeydown(event) {\n        if (event.keyCode == 37) {\n            tile.shift(-1); // left arrow\n            requestAnimationFrame(render);\n        } else if (event.keyCode == 39) {\n            tile.shift(1); // right arrow\n            requestAnimationFrame(render);\n        } else if (event.keyCode == 38) {\n            tile.toggleLetter();\n            requestAnimationFrame(render);\n        } else {\n            //   console.log(\"other key pressed 2 \", event.keyCode);\n        }\n    }\n\n    document.handleKeypress = handleKeypress.bind(tile);\n    document.handleKeydown = handleKeydown.bind(tile);\n\n    document.addEventListener('keypress', document.handleKeypress);\n    document.addEventListener('keydown', document.handleKeydown);\n\n};\n\nGameView.prototype.unbindKeyHandlers = function unbindKeyHandlers(tile) {\n    // console.log(\"Attempting to remove keybinds...\");\n    // debugger;\n    document.removeEventListener('keypress', document.handleKeypress);\n    document.removeEventListener('keydown', document.handleKeydown);\n}\n\nGameView.prototype.start = function start() {\n    this.bindKeyHandlers(this.tile);\n    this.lastTime = 0;\n    // start the animation\n    requestAnimationFrame(this.animate.bind(this));\n};\n\nGameView.prototype.render = function render(time) {\n    const timeDelta = time - this.lastTime;\n    this.ctx.clearRect(0, 0, 600, 600);\n    this.game.draw(this.ctx);\n    this.lastTime = time;\n};\n\nGameView.prototype.animate = async function animate(time) {\n    const timeDelta = time - this.lastTime;\n    this.game.step(timeDelta);\n    if ( this.game.checkVerticalCollisions() ) {\n        // debugger;\n        this.unbindKeyHandlers(this.tile);\n        this.tile = this.game.addTile();\n        this.bindKeyHandlers(this.tile);\n    }\n    this.ctx.clearRect(0, 0, 600, 600);\n    this.game.draw(this.ctx);\n    this.lastTime = time;\n    const sleep = function sleep(ms) {\n        return new Promise(resolve => setTimeout(resolve, ms));\n    }\n    // await sleep(1000);\n    await sleep(400);\n    requestAnimationFrame(this.animate.bind(this));\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tile__WEBPACK_IMPORTED_MODULE_0__);\nconsole.log(\"Webpack is working!\");\nconst Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function (e) {\n    const canvas = document.getElementById(\"game-canvas\");\n    const ctx = canvas.getContext(\"2d\");\n    ctx.fillStyle = \"#ffffff\";\n    ctx.fillRect(0, 0, 150, 75);\n    // const newTile = new Tile(60, 60, \"#D4BAAC\", 240, 0);\n    // newTile.draw(ctx);\n    const game = new Game(ctx);\n    new GameView(game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Tile {\n    constructor(letters = [\"A\", \"B\", \"C\", \"D\"], width = 60, height = 60, color = \"#D4BAAC\", x = 240, y = -60, movable = true) {\n        this.width = width;\n        this.height = height;\n        this.x = x;\n        this.y = y;\n        this.color = color;\n        this.letters = letters;\n        this.currentLetterIdx = 0;\n        this.letter = this.letters[this.currentLetterIdx];\n        this.x = x;\n        this.y = y;\n        this.movable = movable;\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = this.color;\n        ctx.fillRect(this.x, this.y, this.width, this.height);\n        ctx.font = \"30px News Gothic Standard\";\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n        ctx.textBaseline = \"middle\";\n        ctx.fillText(this.letter, this.x + 30, this.y+32);\n    }\n\n    move(delta) {\n        if (this.y <= 480) this.y += 60;\n    }\n\n    shift(units) {\n        const new_x_pos = this.x + units * 60;\n        if (new_x_pos >= 0 && new_x_pos <= 540) this.x += units * 60;\n    }\n\n    toggleLetter() {\n        this.currentLetterIdx = (this.currentLetterIdx + 1) % 4;\n        this.letter = this.letters[this.currentLetterIdx];\n    }\n\n    isCollidedWithVertically(otherObject) {\n        const maxY = this.y + 60;\n        const otherMaxY = otherObject.y + 60;\n        // console.log(\"Moving Object: \", this.y, maxY);\n        // console.log(\"Other Object: \", otherObject.y, otherMaxY);\n        if ( this.x == otherObject.x && (maxY == otherObject.y || this.y == otherMaxY) ) {\n            return true;\n        }\n        return false;\n    };\n\n    // isCollidedWithHorizontally(otherObject) {\n    //     const maxX = this.x + 60;\n    //     const maxY = this.y + 60;\n    //     const otherMaxX = otherObject.x + 60;\n    //     const otherMaxY = otherObject.y + 60;\n    //     console.log(\"Moving Object: \", this.x, this.y, maxX, maxY);\n    //     console.log(\"Other Object: \", otherObject.x, otherObject.y, otherMaxX, otherMaxY);\n    //     if ( maxX == otherObject.x || maxY == otherObject.y || this.x == otherMaxX || this.y == otherMaxY ) {\n    //         return true;\n    //     }\n    //     return false;\n    // };\n\n}\n\nmodule.exports = Tile;\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ })

/******/ });