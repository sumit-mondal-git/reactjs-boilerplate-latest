/**
 * Opens a URL in a new browser tab.
 *
 * @param {string} url - The URL to open.
 * @param {function} [cb] - Optional callback function to execute if the URL cannot be opened in a new tab.
 * @returns {void}
 */
export const openNewTab = (url, cb) => {
    // Attempt to open the URL in a new browser tab.
    let win = window.open(url, '_blank');
    // If the tab was successfully opened, log its window object and location.
    if (win) {
        console.log(win, win.location);
    } else {
        // If the tab could not be opened, execute the callback function or fall back to redirecting the current page.
        if (cb) {
            cb();
        } else {
            window.location.href = url;
        }
    }
};


/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} str - The string to capitalize.
 * @return {string} The string with the first letter capitalized.
 */
export const makeFirstLetterCapital = (str) => {
    // Get the first character of the string
    // and convert it to uppercase.
    const firstLetter = str.charAt(0).toUpperCase();
    // Concatenate the first letter with the
    // remainder of the string, starting from index 1.
    const capitalizedStr = firstLetter + str.slice(1);

    return capitalizedStr;
};


/**
 * Sets a value in the session storage.
 *
 * @param {string} key - The key to set the value for.
 * @param {string} value - The value to set.
 * @return {void}
 */
export const setSessionStorage = (key, value) => {
    // Check if sessionStorage is available
    if (sessionStorage) {
        // Construct the key by appending the environment prefix
        const sessionKey = `${prodMode ? '@Store_prod' : '@Store_dev'}_${key}`;

        // Set the value in the sessionStorage with the constructed key
        sessionStorage.setItem(sessionKey, value);
    }
};

/**
 * Removes a value from the session storage.
 *
 * @param {string} key - The key of the value to remove.
 * @return {void}
 */
export const removeSessionStorage = (key) => {
    // Check the environment in which the application is running.
    const prodMode = process.env.NODE_ENV === 'production';

    // Construct the session storage key by appending the environment prefix.
    const sessionKey = `${prodMode ? '@Store_prod' : '@Store_dev'}_${key}`;

    // Remove the value from the session storage using the constructed key.
    sessionStorage.removeItem(sessionKey);
};

/**
 * Retrieves a value from the session storage.
 *
 * @param {string} key - The key of the value to retrieve.
 * @param {any} defaultValue - The default value to return if the key is not found.
 * @return {any} The value associated with the key, or the defaultValue if the key is not found.
 */
export const getSessionStorage = (key, defaultValue) => {
    // Check the environment in which the application is running.
    const prodMode = process.env.NODE_ENV === 'production';

    // Construct the session storage key by appending the environment prefix.
    const sessionKey = `${prodMode ? '@Store_prod' : '@Store_dev'}_${key}`;

    // Retrieve the value from the session storage using the constructed key.
    let localData = sessionStorage.getItem(sessionKey);

    // If the key is found in the session storage, return the associated value.
    // Otherwise, return the default value.
    if (localData) {
        return localData;
    } else {
        return defaultValue;
    }
};


/**
 * Countdown class for managing a countdown timer.
 *
 * @class
 * @param {Object} options - The options for the countdown.
 * @param {number} [options.seconds=10] - The number of seconds for the countdown.
 * @param {function} [options.onUpdateStatus=function () {}] - The callback function to update the status of the countdown.
 * @param {function} [options.onCounterEnd=function () {}] - The callback function to execute when the countdown ends.
 */
export class Countdown {
    constructor(options) {
        var timer,
            instance = this,
            seconds = options.seconds || 10, // The number of seconds for the countdown.
            updateStatus = options.onUpdateStatus || function () { }, // The callback function to update the status of the countdown.
            counterEnd = options.onCounterEnd || function () { }; // The callback function to execute when the countdown ends.

        /**
         * Decrements the countdown by one second and updates the status.
         * If the countdown reaches zero, it executes the callback function and stops the countdown.
         *
         * @private
         * @return {void}
         */
        function decrementCounter() {
            updateStatus(seconds);
            if (seconds === 0) {
                counterEnd();
                instance.stop();
            }
            seconds--;
        }

        /**
         * Starts the countdown.
         *
         * @public
         * @return {void}
         */
        this.start = function () {
            clearInterval(timer);
            timer = 0;
            seconds = options.seconds;
            timer = setInterval(decrementCounter, 1000);
        };

        /**
         * Stops the countdown.
         *
         * @public
         * @return {void}
         */
        this.stop = function () {
            clearInterval(timer);
        };
    }
}


/**
 * Returns the name of the operating system.
 *
 * @return {string} The name of the operating system.
 */
export const getOsName = () => {
    // Initialize the OSName variable with an unknown OS value
    let OSName = 'Unknown OS';

    // Check the appVersion string for specific OS names and update the OSName accordingly
    if (navigator.appVersion.indexOf('Win') != -1) {
        OSName = 'Windows'; // Windows
    } else if (navigator.appVersion.indexOf('Mac') != -1) {
        OSName = 'MacOS'; // MacOS
    } else if (navigator.appVersion.indexOf('IOS') != -1) {
        OSName = 'IOS'; // IOS
    } else if (navigator.appVersion.indexOf('X11') != -1) {
        OSName = 'UNIX'; // UNIX
    } else if (navigator.appVersion.indexOf('Linux') != -1) {
        OSName = 'Linux'; // Linux
    } else if (navigator.appVersion.indexOf('Android') != -1) {
        OSName = 'Android'; // Android
    }

    // Return the OSName value
    return OSName;
};


/**
 * Converts seconds to hours, minutes and seconds.
 *
 * @param {number} d - The number of seconds to convert.
 * @return {string} The converted time in the format 'HH:MM:SS'.
 */
export const secondsToHms = (d) => {
    // Convert the input to a number
    d = Number(d);

    // Calculate the hours, minutes and seconds
    var h = Math.floor(d / 3600); // Hours
    var m = Math.floor((d % 3600) / 60); // Minutes
    var s = Math.floor((d % 3600) % 60); // Seconds

    // Format the time components
    var hDisplay = h > 0 ? getFormatedData(h) + ':' : ''; // Hours
    var mDisplay = m > 0 ? getFormatedData(m) + ':' : ''; // Minutes
    var sDisplay = s > 0 ? getFormatedData(s) : ''; // Seconds

    // Return the formatted time
    return hDisplay + mDisplay + sDisplay;
};

/**
 * Returns the current time in the specified format.
 *
 * @param {string} _format - The format of the time string. Defaults to 'YYYY-MM-DD HH:mm:ss'.
 * @return {string} The current time in the specified format.
 */
export const getCurrentTime = (_format = 'YYYY-MM-DD HH:mm:ss') => {
    // Get the current time using dayjs
    // and format it according to the specified format
    return dayjs(new Date()).format(_format);
};

/**
 * Downloads a file from a given URL.
 *
 * @param {string} remote_url - The URL of the file to download.
 * @param {string} [file_name='sample_file'] - The name to give to the downloaded file.
 */
export const downloadFromUrl = (remote_url = '', file_name = 'sample_file') => {
    // Fetch the file from the remote URL
    fetch(remote_url, {
        headers: {
            'Access-Control-Allow-Origin': '*' // Allow cross-origin requests
        }
    })
        .then((response) => {
            // Convert the response to a blob
            response.blob()
                .then((blob) => {
                    // Create a URL for the blob
                    let url = window.URL.createObjectURL(blob);

                    // Create a download link
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = file_name; // Set the file name

                    // Trigger the download
                    a.click();
                })
                .catch((error) => {
                    console.log('===>>ERROR WHILE FETCHING', error);
                });
        })
        .catch((error) => {
            console.log('===>>ERROR WHILE FETCHING', error);
        });
};

/**
 * Checks if a file is allowed based on its size in megabytes.
 *
 * @param {File | null} file - The file to check. If null, the function returns false.
 * @param {number} sizeInMb - The maximum allowed size in megabytes.
 * @returns {boolean} True if the file is allowed, false otherwise.
 */
export const isFileAllowed = (file = null, sizeInMb = 2) => {
    // If the file is not provided, return false
    if (!file) {
        return false;
    }

    // Log the file size
    console.log('fileSize', file.size);

    // Check if the file size is greater than the maximum allowed size
    if (file.size / 1024 > sizeInMb * 1024) {
        // If the file size is too large, return false
        return false;
    } else {
        // If the file size is allowed, return true
        return true;
    }
};

/**
 * Compresses an image file and returns a new compressed file.
 *
 * @param {File | null} image - The image file to compress. If null, the function returns early.
 * @param {function} callback - The callback function to execute with the compressed file.
 */
export const handleCompressedUpload = (image = null, callback) => {
    // If the image is not provided, return early
    if (!image) {
        return;
    }

    // Compress the image using the Compressor library
    new Compressor(image, {
        // Set the quality to 0.6 (recommended)
        quality: 0.6,
        // On success, create a new File object with the compressed result
        success: (compressedResult) => {
            const compressedFile = new File([compressedResult], compressedResult.name, {
                type: compressedResult.type
            });
            // Call the callback function with the compressed file
            callback(compressedFile);
        },
        // On error, log the error message
        error(err) {
            console.log(err.message);
        }
    });
};


/**
 * Returns a limited text string. If the length of the text is greater than the limit,
 * it truncates the text, removes any HTML entities, and appends an ellipsis (...) to the end.
 * If the length of the text is less than or equal to the limit, it removes any HTML entities.
 *
 * @param {string} text - The text to be limited.
 * @param {number} limit - The maximum length of the text.
 * @return {string} The limited text string.
 */
export const getLimitedText = (text, limit) => {
    // Check if the length of the text is greater than the limit
    if (text?.length > limit) {
        // Truncate the text, remove any HTML entities, and append an ellipsis (...)
        return text?.replace(/&\w+;\s*/g, '').substring(0, limit) + '...';
    } else {
        // Remove any HTML entities
        return text?.replace(/&\w+;\s*/g, '');
    }
};

export const getClientDeviceDetails = (mobile_number = 'NOT_FOUND') => {
    return {
        platform: (osName ?? 'NOT_FOUND') + ' ' + (osVersion ?? 'NOT_FOUND'),
        version: appVersion || 'NOT_FOUND',
        browser: browserName || 'NOT_FOUND',
        browser_version: fullBrowserVersion || 'NOT_FOUND',
        mobilenumber: mobile_number,
        mobilemodel: isMobile ? mobileVendor + ' ' + mobileModel : 'NOT_MOBILE',

    };
};
