/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CanvasCollection.ts":
/*!*********************************!*\
  !*** ./src/CanvasCollection.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.ts\");\n\r\nvar CanvasCollection = /** @class */ (function () {\r\n    function CanvasCollection(x, y, isTemplate) {\r\n        this.array = [];\r\n        this.rawArray = [];\r\n        var image = new Image();\r\n        image.src = \"./sprites.png\";\r\n        this.image = image;\r\n        console.log(\"Image:\", this.image);\r\n        if (isTemplate) {\r\n            for (var i = 0; i < y; i++) {\r\n                var rawRow = [];\r\n                var row = [];\r\n                for (var j = 0; j < x / 2; j++) {\r\n                    rawRow.push(this.generateCanvas(j, i, x, y));\r\n                    row.push(this.generateInsideCanvas(x, y, j, i));\r\n                }\r\n                this.rawArray.push(rawRow);\r\n                this.array.push(row);\r\n            }\r\n            for (var i = 0; i < y; i++) {\r\n                var row = [];\r\n                var rawRow = [];\r\n                for (var j = x / 2; j < x; j++) {\r\n                    rawRow.push(this.generateCanvas(j, i, x, y));\r\n                    row.push(this.generateInsideCanvas(x, y, j, i));\r\n                }\r\n                this.array.push(row);\r\n                this.rawArray.push(rawRow);\r\n            }\r\n        }\r\n        else {\r\n            for (var i = 0; i < y; i++) {\r\n                var rawRow = [];\r\n                var row = [];\r\n                for (var j = 0; j < x / 2; j++) {\r\n                    rawRow.push(this.generateCanvas(j, i, x, y));\r\n                    row.push(this.generateInsideCanvas(x, y, j, i));\r\n                }\r\n                this.rawArray.push(rawRow);\r\n                this.array.push(row);\r\n            }\r\n            for (var i = 0; i < y; i++) {\r\n                var row = [];\r\n                var rawRow = [];\r\n                for (var j = x / 2; j < x; j++) {\r\n                    rawRow.push(this.generateCanvas(j - 16, i + y, x, y));\r\n                    row.push(this.generateInsideCanvas(x, y, j - 16, i + y));\r\n                }\r\n                this.array.push(row);\r\n                this.rawArray.push(rawRow);\r\n            }\r\n        }\r\n    }\r\n    CanvasCollection.prototype.generateCanvas = function (x, y, totalx, totaly) {\r\n        return new _canvas__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y, totalx, totaly);\r\n    };\r\n    CanvasCollection.prototype.generateInsideCanvas = function (totalx, totaly, x, y) {\r\n        var canvas = new _canvas__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y, totalx, totaly);\r\n        var finishedCanvas = canvas.backgroundCanvasGenerator(this.image, canvas.element, x, y);\r\n        return finishedCanvas;\r\n    };\r\n    return CanvasCollection;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasCollection);\r\n\n\n//# sourceURL=webpack://typen-scripten/./src/CanvasCollection.ts?");

/***/ }),

/***/ "./src/canvas.ts":
/*!***********************!*\
  !*** ./src/canvas.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar Canvas = /** @class */ (function () {\r\n    function Canvas(x, y, totalx, totaly) {\r\n        this.isSelected = false;\r\n        this.x = x;\r\n        this.y = y;\r\n        this.element = document.createElement(\"canvas\");\r\n        //(totaly*2)\r\n        this.element.style.width = \"calc(\" + (100 / (totalx / 2)) + \"%\" + \" - 1px\" + \")\"; //x + y rebalance to fit longer\r\n        this.element.style.height = \"calc(\" + (100 / (totaly * 2)) + \"%\" + \" - 1px\" + \")\";\r\n        this.element.style.margin = \"0px\";\r\n        this.element.classList.add(x.toString());\r\n        this.element.classList.add(y.toString());\r\n    }\r\n    Canvas.prototype.getImageCoordinates = function () {\r\n        return [this.x, this.y];\r\n    };\r\n    Canvas.prototype.setBaseLook = function () {\r\n        this.element.addEventListener(\"contextmenu\", function (event) {\r\n            event.preventDefault();\r\n        });\r\n        this.element.style.borderColor = \"grey\";\r\n        this.element.style.borderWidth = \"1px\";\r\n        this.element.style.margin = \"-1px\";\r\n        this.element.style.borderStyle = \"solid\";\r\n        this.element.style.backgroundColor = \"black\";\r\n        this.isSelected = false;\r\n    };\r\n    Canvas.prototype.setBackground = function (tokens) {\r\n        var backgroundimage = new Image();\r\n        backgroundimage.src = \"./sprites.png\";\r\n        var canvasElement = this.element;\r\n        var ctx = canvasElement.getContext(\"2d\");\r\n        ctx.drawImage(backgroundimage, tokens[0] * 48, tokens[1] * 48, 49, 49, 0, 0, 350, 150);\r\n        this.element = canvasElement;\r\n        this.isSelected = false;\r\n    };\r\n    Canvas.prototype.backgroundFlare = function () {\r\n        this.isSelected = true;\r\n        this.element.style.backgroundColor = \"lime\";\r\n        this.element.style.border = \"1px solid green\";\r\n    };\r\n    Canvas.prototype.backgroundCanvasGenerator = function (image, canvas, x, y) {\r\n        var backgroundimage = new Image();\r\n        backgroundimage.src = \"./sprites.png\";\r\n        console.log(\"Working on canvas at pos:\", x, y);\r\n        var canvasElement = canvas;\r\n        var ctx = canvasElement.getContext(\"2d\");\r\n        //rawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)\r\n        ctx.drawImage(backgroundimage, x * 48, y * 48, 49, 49, 0, 0, 350, 150);\r\n        return canvasElement;\r\n    };\r\n    return Canvas;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Canvas);\r\n\n\n//# sourceURL=webpack://typen-scripten/./src/canvas.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CanvasCollection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanvasCollection */ \"./src/CanvasCollection.ts\");\n\r\nvar advancedSelection = false;\r\nvar image = new Image();\r\nvar imgageSliceData;\r\nvar operativeStart;\r\nvar operativeEnd;\r\nvar operativeFieldsContents = [];\r\nvar globalCollectionCanvas;\r\nvar editsList = [];\r\nimage.src = \"./sprites.png\";\r\nwindow.onload = function () {\r\n    loader();\r\n    init(32, 20); //size of second page\r\n    initCanvas(32, 20);\r\n};\r\nfunction loader() {\r\n    console.log(\"load\");\r\n    var baseCanvas = document.getElementById(\"baseImage\");\r\n    if (baseCanvas != null) {\r\n        baseCanvas.style.backgroundImage = \"url(\" + image.src + \")\";\r\n        // baseCanvas.style.width = image.width/2 + \"px\";\r\n        // baseCanvas.style.height = image.height/2 + \"px\";\r\n        baseCanvas.style.backgroundSize = \"cover\";\r\n        baseCanvas.style.backgroundRepeat = \"round\"; //enough for styles\r\n    }\r\n}\r\nfunction init(x, y) {\r\n    var collection = new _CanvasCollection__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y, true); //two dimensional array entity\r\n    console.log(\"init\");\r\n    var canvasPage = document.getElementById(\"canvasGallery\");\r\n    collection.array.map(function (e, i) {\r\n        e.map(function (f) {\r\n            f.addEventListener(\"click\", function () {\r\n                console.log(this.classList); //single digit for same coord\r\n                var res;\r\n                if (this.classList.length == 1) {\r\n                    res = [this.classList[0], this.classList[0]];\r\n                }\r\n                else {\r\n                    res = this.classList;\r\n                }\r\n                imgageSliceData = res; //set image properties\r\n                console.log(\"set image of cords:\", imgageSliceData);\r\n                // changeBackgroundDrag(globalCollectionCanvas) //canvas changed to work\r\n                commitChangingBackground();\r\n            });\r\n            canvasPage.appendChild(f);\r\n        });\r\n    });\r\n}\r\nfunction searchOperative(x, y) {\r\n    var temp = null;\r\n    operativeFieldsContents.map(function (a, i) {\r\n        if (a[0] == x && a[1] == y) {\r\n            console.log(a[0], x, a[1], y);\r\n            console.log(\"found intersect\", i);\r\n            temp = i;\r\n        }\r\n    });\r\n    return temp;\r\n}\r\nfunction numberCheck(a, b) {\r\n    if (Number(a) >= Number(b)) {\r\n        return true;\r\n    }\r\n    else {\r\n        return false;\r\n    }\r\n}\r\nfunction checkCanvasArea(cords, operativeOne, operativeTwo, advancedSelection) {\r\n    //x\r\n    var xChecked = false;\r\n    var yChecked = false;\r\n    if (numberCheck(operativeTwo[0], operativeOne[0])) {\r\n        if (numberCheck(cords[0], operativeOne[0]) && numberCheck(operativeTwo[0], cords[0])) {\r\n            xChecked = true;\r\n        }\r\n    }\r\n    else {\r\n        if (numberCheck(operativeOne[0], cords[0]) && numberCheck(cords[0], operativeTwo[0])) {\r\n            xChecked = true;\r\n        }\r\n    }\r\n    //y\r\n    if (numberCheck(operativeTwo[1], operativeOne[1])) {\r\n        if (numberCheck(cords[1], operativeOne[1]) && numberCheck(operativeTwo[1], cords[1])) {\r\n            yChecked = true;\r\n        }\r\n    }\r\n    else {\r\n        if (numberCheck(operativeOne[1], cords[1]) && numberCheck(cords[1], operativeTwo[1])) {\r\n            yChecked = true;\r\n        }\r\n    }\r\n    if (xChecked && yChecked) {\r\n        // console.log(\"Dev debug\")\r\n        // console.log(operativeOne, cords, operativeTwo)\r\n        //fields list\r\n        //if not advanced selection\r\n        if (!advancedSelection) {\r\n            operativeFieldsContents.push([cords[0], cords[1]]);\r\n            globalCollectionCanvas.rawArray.map(function (e) {\r\n                e.map(function (c) {\r\n                    var list = c.element.classList;\r\n                    if (list.length == 1) {\r\n                        list = [list[0], list[0]];\r\n                    }\r\n                    var values = [cords[0], cords[1]];\r\n                    if (list[0] == values[0] && list[1] == values[1]) {\r\n                        c.backgroundFlare();\r\n                    }\r\n                });\r\n            });\r\n        }\r\n        else {\r\n            var res = searchOperative(cords[0], cords[1]); //why is null there\r\n            console.log(\"result\", res);\r\n            if (res !== null) {\r\n                console.log(\"amogius\");\r\n                var key = Number(res);\r\n                console.log(operativeFieldsContents[key]);\r\n                operativeFieldsContents.splice(key, 1);\r\n                globalCollectionCanvas.rawArray.map(function (e) {\r\n                    e.map(function (c) {\r\n                        var list = c.element.classList;\r\n                        if (list.length == 1) {\r\n                            list = [list[0], list[0]];\r\n                        }\r\n                        var values = [cords[0], cords[1]];\r\n                        if (list[0] == values[0] && list[1] == values[1]) {\r\n                            c.setBaseLook();\r\n                        }\r\n                    });\r\n                });\r\n            }\r\n            else {\r\n                console.log(\"adding\");\r\n                operativeFieldsContents.push([cords[0], cords[1]]);\r\n                globalCollectionCanvas.rawArray.map(function (e) {\r\n                    e.map(function (c) {\r\n                        var list = c.element.classList;\r\n                        if (list.length == 1) {\r\n                            list = [list[0], list[0]];\r\n                        }\r\n                        var values = [cords[0], cords[1]];\r\n                        if (list[0] == values[0] && list[1] == values[1]) {\r\n                            c.backgroundFlare();\r\n                        }\r\n                    });\r\n                });\r\n            }\r\n        }\r\n        // console.log(operativeFieldsContents)\r\n        return true;\r\n    }\r\n    else {\r\n        return false;\r\n    }\r\n}\r\nfunction commitChangingBackground() {\r\n    editsList.push(globalCollectionCanvas);\r\n    //popup\r\n    globalCollectionCanvas.rawArray.map(function (r) {\r\n        r.map(function (c) {\r\n            operativeFieldsContents.map(function (cords) {\r\n                var classList = c.element.classList;\r\n                if (classList.length == 1) {\r\n                    classList = [Number(classList[0]), Number(classList[0])];\r\n                }\r\n                else {\r\n                    classList = [Number(classList[0]), Number(classList[1])];\r\n                }\r\n                //console.log(\"COMMIT BG CHANGE stgr\")\r\n                if (cords[0] == classList[0] && cords[1] == classList[1]) {\r\n                    //console.log(\"COMMIT BG CHANGE\")\r\n                    c.setBackground(imgageSliceData);\r\n                }\r\n            });\r\n        });\r\n    });\r\n    operativeFieldsContents = [];\r\n}\r\nfunction changeBackgroundDrag(coll) {\r\n    coll.rawArray.map(function (e) {\r\n        e.map(function (q) {\r\n            var cords = q.element.classList;\r\n            var operativeOne = operativeStart;\r\n            var operativeTwo = operativeEnd;\r\n            //check length\r\n            if (cords.length == 1) {\r\n                cords = [cords[0], cords[0]];\r\n            }\r\n            if (!advancedSelection) {\r\n                //operativeFieldsContents = []\r\n            }\r\n            checkCanvasArea(cords, operativeOne, operativeTwo, advancedSelection);\r\n        });\r\n    });\r\n    return \"Finished\";\r\n}\r\nfunction initCanvas(x, y) {\r\n    var collection = new _CanvasCollection__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y, false);\r\n    editsList.push(collection);\r\n    globalCollectionCanvas = collection;\r\n    var secondCanvasPage = document.getElementById(\"canvasCollections\");\r\n    collection.rawArray.map(function (e, i) {\r\n        e.map(function (canvas, j) {\r\n            canvas.setBaseLook();\r\n            secondCanvasPage.appendChild(canvas.element);\r\n            document.addEventListener('keydown', function (key) {\r\n                //console.log(key)\r\n                if ([224, 17].includes(Number(key.keyCode))) {\r\n                    //doznaczanie/odznaczanie\r\n                    advancedSelection = true;\r\n                }\r\n            });\r\n            document.addEventListener(\"keydown\", function (key) {\r\n                if (key.keyCode == 46) {\r\n                    operativeFieldsContents = [];\r\n                    globalCollectionCanvas.rawArray.map(function (c) {\r\n                        c.map(function (e) {\r\n                            if (e.isSelected) {\r\n                                e.setBaseLook();\r\n                            }\r\n                        });\r\n                    });\r\n                }\r\n            });\r\n            document.addEventListener(\"keyup\", function (key) {\r\n                if ([224, 17].includes(key.keyCode)) {\r\n                    //doznaczanie/odznaczanie\r\n                    advancedSelection = false;\r\n                    console.log(\"ended selection mode\");\r\n                }\r\n            });\r\n            canvas.element.addEventListener('mousedown', function (ev) {\r\n                //starting to drag dn\r\n                console.log(\"dragging\");\r\n                operativeStart = canvas.element.classList;\r\n                if (canvas.element.classList.length == 1) {\r\n                    operativeStart = [canvas.element.classList[0], canvas.element.classList[0]];\r\n                }\r\n            });\r\n            canvas.element.addEventListener(\"mouseup\", function (ev) {\r\n                console.log(\"release\");\r\n                operativeEnd = canvas.element.classList;\r\n                if (canvas.element.classList.length == 1) {\r\n                    operativeEnd = [canvas.element.classList[0], canvas.element.classList[0]];\r\n                }\r\n                //trigger of function\r\n                changeBackgroundDrag(collection); // changing dragged field\r\n            });\r\n            canvas.element.addEventListener('click', function (ev) {\r\n                canvas.setBackground(imgageSliceData);\r\n            });\r\n        });\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://typen-scripten/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;