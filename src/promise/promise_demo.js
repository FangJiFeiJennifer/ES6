/**
 * Created by jiffang on 8/15/18.
 */

function loadImageAsync(url) {
    return new Promise(function(resolve,reject) {
        const image = new Image();
        image.onload = function() {
            return resolve(image);
        };

        image.onerror = function() {
            return reject(new Error('Could not load image at ' + url));
        };

        image.src = url;
    })
}

export {
    loadImageAsync
}