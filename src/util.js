/**
 * Provides some utility functions.
 *
 * @author  Juan Cuartas
 * @version 0.0.1, Jun 2015
 *
 * @namespace
 */
var util = {};

/**
 * Try-catch wrapper.
 *
 * @param {function} fn - The function you want to wrap in a try-catch block.
 */
util.tryCatch = function (fn) {
    try {
        fn.apply(this, Array.prototype.slice.call(arguments, 1));
    }
    catch (ex) { /* eat please */ }
};

/**
 * Indicates if the passed-in argument is a valid URL.
 *
 * @param  {string} url - URL to validate.
 * @return {boolean}
 */
util.isValidUrl = function (url) {
	 var expression = '^(http|https):\/\/[^ "]+$';

     return (typeof url === 'string') &&
            (url.length < 2083)       &&
            (new RegExp(expression).test(url));
};

/**
 * Indicates if the passed-in argument is a no-empty string
 *
 * @param  {string} str - The string to validate.
 * @return {boolean}
 */
util.isNoEmptyString = function (str) {
	 return (typeof str === 'string') && (str.length > 0);
};

/**
 * Indicates if the passed-in argument is a positive integer.
 *
 * @param  {number} num - The number to validate.
 * @return {boolean}
 */
util.isPositiveInteger = function (num) {
	 return (typeof num === 'number') && (num > 0) && (num % 1 === 0);
};