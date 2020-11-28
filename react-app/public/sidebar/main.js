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
/******/ 	return __webpack_require__(__webpack_require__.s = "./sidebar/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzP2YyOGMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVSIsImZpbGUiOiIuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/process/browser.js\n");

/***/ }),

/***/ "./sidebar/index.js":
/*!**************************!*\
  !*** ./sidebar/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const getClient = __webpack_require__(/*! ../src/client */ \"./src/client/index.js\").default;\nconsole.log(\"hoge\");\n\nwindow.addEventListener('DOMContentLoaded', () => {\n  const client = getClient();\n  console.log(window.parent.document);\n  \n  client.getDirectories()\n    .then(dirs => {\n      const el = document.getElementById(\"contents\").textContent = JSON.stringify(dirs);\n    });\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zaWRlYmFyL2luZGV4LmpzPzE0ZmIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0JBQWtCLG1CQUFPLENBQUMsNENBQWU7QUFDekM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDIiwiZmlsZSI6Ii4vc2lkZWJhci9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGdldENsaWVudCA9IHJlcXVpcmUoJy4uL3NyYy9jbGllbnQnKS5kZWZhdWx0O1xuY29uc29sZS5sb2coXCJob2dlXCIpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3QgY2xpZW50ID0gZ2V0Q2xpZW50KCk7XG4gIGNvbnNvbGUubG9nKHdpbmRvdy5wYXJlbnQuZG9jdW1lbnQpO1xuICBcbiAgY2xpZW50LmdldERpcmVjdG9yaWVzKClcbiAgICAudGhlbihkaXJzID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50c1wiKS50ZXh0Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KGRpcnMpO1xuICAgIH0pO1xufSk7XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./sidebar/index.js\n");

/***/ }),

/***/ "./src/client/index.js":
/*!*****************************!*\
  !*** ./src/client/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return getClient; });\n/* harmony import */ var _ipc_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ipc-client */ \"./src/client/ipc-client.js\");\n/* harmony import */ var _webrpc_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./webrpc-client */ \"./src/client/webrpc-client.js\");\n//import OaClient from './openapi-client';\n\n\n\nfunction getClient() {\n  if (isInElectron()) {\n    return new _ipc_client__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  } else {\n    //return new OaClient();\n    return new _webrpc_client__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  }\n}\n\nfunction isInElectron() {\n  // Renderer process\n  if (typeof window !== 'undefined'\n      && typeof window.process === 'object'\n      && window.process.type === 'renderer') {\n    return true;\n  }\n\n  // Main process\n  if (typeof process !== 'undefined'\n      && typeof process.versions === 'object'\n      && !!process.versions.electron) {\n    return true;\n  }\n\n  // Detect the user agent when the `nodeIntegration` option is set to true\n  if (typeof navigator === 'object'\n      && typeof navigator.userAgent === 'string'\n      && navigator.userAgent.indexOf('Electron') >= 0) {\n    return true;\n  }\n\n  return false;\n}\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ \"./node_modules/process/browser.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2luZGV4LmpzPzNiNWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNxQztBQUNHOztBQUV6QjtBQUNmO0FBQ0EsZUFBZSxtREFBUztBQUN4QixHQUFHO0FBQ0g7QUFDQSxlQUFlLHNEQUFTO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6Ii4vc3JjL2NsaWVudC9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vaW1wb3J0IE9hQ2xpZW50IGZyb20gJy4vb3BlbmFwaS1jbGllbnQnO1xuaW1wb3J0IElwY0NsaWVudCBmcm9tICcuL2lwYy1jbGllbnQnO1xuaW1wb3J0IFdlYkNsaWVudCBmcm9tICcuL3dlYnJwYy1jbGllbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDbGllbnQoKSB7XG4gIGlmIChpc0luRWxlY3Ryb24oKSkge1xuICAgIHJldHVybiBuZXcgSXBjQ2xpZW50KCk7XG4gIH0gZWxzZSB7XG4gICAgLy9yZXR1cm4gbmV3IE9hQ2xpZW50KCk7XG4gICAgcmV0dXJuIG5ldyBXZWJDbGllbnQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0luRWxlY3Ryb24oKSB7XG4gIC8vIFJlbmRlcmVyIHByb2Nlc3NcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAmJiB0eXBlb2Ygd2luZG93LnByb2Nlc3MgPT09ICdvYmplY3QnXG4gICAgICAmJiB3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBNYWluIHByb2Nlc3NcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgJiYgdHlwZW9mIHByb2Nlc3MudmVyc2lvbnMgPT09ICdvYmplY3QnXG4gICAgICAmJiAhIXByb2Nlc3MudmVyc2lvbnMuZWxlY3Ryb24pIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIERldGVjdCB0aGUgdXNlciBhZ2VudCB3aGVuIHRoZSBgbm9kZUludGVncmF0aW9uYCBvcHRpb24gaXMgc2V0IHRvIHRydWVcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgPT09ICdvYmplY3QnXG4gICAgICAmJiB0eXBlb2YgbmF2aWdhdG9yLnVzZXJBZ2VudCA9PT0gJ3N0cmluZydcbiAgICAgICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRWxlY3Ryb24nKSA+PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/client/index.js\n");

/***/ }),

/***/ "./src/client/ipc-client.js":
/*!**********************************!*\
  !*** ./src/client/ipc-client.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return IpcClient; });\nlet ipcRenderer;\nif (window.require) {\n  const electron = window.require('electron');\n  ipcRenderer = electron.ipcRenderer;\n}\n\nlet requestId = 0;\nconst timeoutMilSec = 30000; // 30 seconds\n\nconst channelSend = 'FunctionCall';\n\nclass IpcClient {\n  sendRequest(method, params) {\n    requestId++;\n    return new Promise((resolve, reject) => {\n      ipcRenderer.send(channelSend, method, requestId, params);\n      const listener = (event, result, error) => {\n        if (error) {\n          reject(error);\n          return;\n        }\n        resolve(result);\n      };\n      const channelRecv = `${method}_${requestId}`;\n      ipcRenderer.once(channelRecv, listener);\n      setTimeout(() => {\n        ipcRenderer.removeListener(channelRecv, listener);\n        reject({message: \"response too late\",\n                name: 'TimeOutError'});\n      }, timeoutMilSec);\n    });\n  }\n\n  getBooks() {\n    return this.sendRequest('getBooks');\n  }\n\n  getBookThumbnail(path) {\n    return this.sendRequest('getBookThumbnail', path)\n      .then(result => {\n        result.data = new Blob([result.data]);\n        return result;\n      })\n      .catch(err => {\n        return { message: err };\n      });\n  }\n\n  openBook(path) {\n    return this.sendRequest('openBook', path);\n  }\n\n  setStar(vpath, state) {\n    return this.sendRequest('setStar', [vpath, state]);\n  }\n\n  getDirectories() {\n    return this.sendRequest('getDirectories');\n  }\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2lwYy1jbGllbnQuanM/NTczYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRCQUE0Qjs7QUFFNUI7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLE9BQU8sR0FBRyxVQUFVO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixxQ0FBcUM7QUFDckMsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLGdCQUFnQjtBQUNoQixPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL3NyYy9jbGllbnQvaXBjLWNsaWVudC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBpcGNSZW5kZXJlcjtcbmlmICh3aW5kb3cucmVxdWlyZSkge1xuICBjb25zdCBlbGVjdHJvbiA9IHdpbmRvdy5yZXF1aXJlKCdlbGVjdHJvbicpO1xuICBpcGNSZW5kZXJlciA9IGVsZWN0cm9uLmlwY1JlbmRlcmVyO1xufVxuXG5sZXQgcmVxdWVzdElkID0gMDtcbmNvbnN0IHRpbWVvdXRNaWxTZWMgPSAzMDAwMDsgLy8gMzAgc2Vjb25kc1xuXG5jb25zdCBjaGFubmVsU2VuZCA9ICdGdW5jdGlvbkNhbGwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJcGNDbGllbnQge1xuICBzZW5kUmVxdWVzdChtZXRob2QsIHBhcmFtcykge1xuICAgIHJlcXVlc3RJZCsrO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKGNoYW5uZWxTZW5kLCBtZXRob2QsIHJlcXVlc3RJZCwgcGFyYW1zKTtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gKGV2ZW50LCByZXN1bHQsIGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgIH07XG4gICAgICBjb25zdCBjaGFubmVsUmVjdiA9IGAke21ldGhvZH1fJHtyZXF1ZXN0SWR9YDtcbiAgICAgIGlwY1JlbmRlcmVyLm9uY2UoY2hhbm5lbFJlY3YsIGxpc3RlbmVyKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpcGNSZW5kZXJlci5yZW1vdmVMaXN0ZW5lcihjaGFubmVsUmVjdiwgbGlzdGVuZXIpO1xuICAgICAgICByZWplY3Qoe21lc3NhZ2U6IFwicmVzcG9uc2UgdG9vIGxhdGVcIixcbiAgICAgICAgICAgICAgICBuYW1lOiAnVGltZU91dEVycm9yJ30pO1xuICAgICAgfSwgdGltZW91dE1pbFNlYyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRCb29rcygpIHtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdCgnZ2V0Qm9va3MnKTtcbiAgfVxuXG4gIGdldEJvb2tUaHVtYm5haWwocGF0aCkge1xuICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KCdnZXRCb29rVGh1bWJuYWlsJywgcGF0aClcbiAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIHJlc3VsdC5kYXRhID0gbmV3IEJsb2IoW3Jlc3VsdC5kYXRhXSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIHJldHVybiB7IG1lc3NhZ2U6IGVyciB9O1xuICAgICAgfSk7XG4gIH1cblxuICBvcGVuQm9vayhwYXRoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3QoJ29wZW5Cb29rJywgcGF0aCk7XG4gIH1cblxuICBzZXRTdGFyKHZwYXRoLCBzdGF0ZSkge1xuICAgIHJldHVybiB0aGlzLnNlbmRSZXF1ZXN0KCdzZXRTdGFyJywgW3ZwYXRoLCBzdGF0ZV0pO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3JpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlcXVlc3QoJ2dldERpcmVjdG9yaWVzJyk7XG4gIH1cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/client/ipc-client.js\n");

/***/ }),

/***/ "./src/client/webrpc-client.js":
/*!*************************************!*\
  !*** ./src/client/webrpc-client.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return WebClient; });\n\nconst BASE_URL = 'http://localhost:3333/api/v1';\n\nclass WebClient {\n  _fetch(url, param) {\n    param = param || {};\n    return fetch(url, param).then(resp => {\n      if (resp.ok) { return resp; }\n      return resp.text().then(text => { throw text; });\n    });\n  }\n\n  _get(path) {\n    const url = `${BASE_URL}${path}`;\n    return this._fetch(url);\n  }\n\n  _put(path, body) {\n    const url = `${BASE_URL}${path}`;\n    const headers = new Headers();\n    const json = JSON.stringify(body);\n    headers.append('Content-Type', 'application/json');\n    return this._fetch(url, { method: \"POST\",\n                              headers: headers,\n                              body: json\n                            });\n  }\n  \n  getBooks() {\n    const reqPath = `/books`;\n    return this._get(reqPath)\n      .then(resp => resp.json());\n  }\n\n  getBookThumbnail(vpath) {\n    vpath = encodeURIComponent(vpath);\n    const reqPath = `/books/${vpath}/thumbnail`;\n    return this._get(reqPath)\n      .then(resp => resp.blob())\n      .then(data => {\n        return {data: data};\n      });\n  }\n\n  openBook(path) {\n    return Promise.reject(\"openBook() is not implemented\");\n  }\n\n  setStar(vpath, state) {\n    vpath = encodeURIComponent(vpath);\n    const reqPath = `/books/${vpath}/star`;\n    return this._put(reqPath, {star: state})\n      .then(resp => resp.json());\n  }\n\n  getDirectories() {\n    const reqPath = `/directories`;\n    return this._get(reqPath)\n      .then(resp => resp.json());\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L3dlYnJwYy1jbGllbnQuanM/YjYxYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDLHVDQUF1QyxZQUFZLEVBQUU7QUFDckQsS0FBSztBQUNMOztBQUVBO0FBQ0EsbUJBQW1CLFNBQVMsRUFBRSxLQUFLO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsU0FBUyxFQUFFLEtBQUs7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLE1BQU07QUFDcEM7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QixNQUFNO0FBQ3BDLCtCQUErQixZQUFZO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vc3JjL2NsaWVudC93ZWJycGMtY2xpZW50LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCBCQVNFX1VSTCA9ICdodHRwOi8vbG9jYWxob3N0OjMzMzMvYXBpL3YxJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViQ2xpZW50IHtcbiAgX2ZldGNoKHVybCwgcGFyYW0pIHtcbiAgICBwYXJhbSA9IHBhcmFtIHx8IHt9O1xuICAgIHJldHVybiBmZXRjaCh1cmwsIHBhcmFtKS50aGVuKHJlc3AgPT4ge1xuICAgICAgaWYgKHJlc3Aub2spIHsgcmV0dXJuIHJlc3A7IH1cbiAgICAgIHJldHVybiByZXNwLnRleHQoKS50aGVuKHRleHQgPT4geyB0aHJvdyB0ZXh0OyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIF9nZXQocGF0aCkge1xuICAgIGNvbnN0IHVybCA9IGAke0JBU0VfVVJMfSR7cGF0aH1gO1xuICAgIHJldHVybiB0aGlzLl9mZXRjaCh1cmwpO1xuICB9XG5cbiAgX3B1dChwYXRoLCBib2R5KSB7XG4gICAgY29uc3QgdXJsID0gYCR7QkFTRV9VUkx9JHtwYXRofWA7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgIHJldHVybiB0aGlzLl9mZXRjaCh1cmwsIHsgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBqc29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cbiAgXG4gIGdldEJvb2tzKCkge1xuICAgIGNvbnN0IHJlcVBhdGggPSBgL2Jvb2tzYDtcbiAgICByZXR1cm4gdGhpcy5fZ2V0KHJlcVBhdGgpXG4gICAgICAudGhlbihyZXNwID0+IHJlc3AuanNvbigpKTtcbiAgfVxuXG4gIGdldEJvb2tUaHVtYm5haWwodnBhdGgpIHtcbiAgICB2cGF0aCA9IGVuY29kZVVSSUNvbXBvbmVudCh2cGF0aCk7XG4gICAgY29uc3QgcmVxUGF0aCA9IGAvYm9va3MvJHt2cGF0aH0vdGh1bWJuYWlsYDtcbiAgICByZXR1cm4gdGhpcy5fZ2V0KHJlcVBhdGgpXG4gICAgICAudGhlbihyZXNwID0+IHJlc3AuYmxvYigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIHJldHVybiB7ZGF0YTogZGF0YX07XG4gICAgICB9KTtcbiAgfVxuXG4gIG9wZW5Cb29rKHBhdGgpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJvcGVuQm9vaygpIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgfVxuXG4gIHNldFN0YXIodnBhdGgsIHN0YXRlKSB7XG4gICAgdnBhdGggPSBlbmNvZGVVUklDb21wb25lbnQodnBhdGgpO1xuICAgIGNvbnN0IHJlcVBhdGggPSBgL2Jvb2tzLyR7dnBhdGh9L3N0YXJgO1xuICAgIHJldHVybiB0aGlzLl9wdXQocmVxUGF0aCwge3N0YXI6IHN0YXRlfSlcbiAgICAgIC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3JpZXMoKSB7XG4gICAgY29uc3QgcmVxUGF0aCA9IGAvZGlyZWN0b3JpZXNgO1xuICAgIHJldHVybiB0aGlzLl9nZXQocmVxUGF0aClcbiAgICAgIC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/client/webrpc-client.js\n");

/***/ })

/******/ });