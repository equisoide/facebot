/**
 * Set of functions to modify the facebook's profile.
 *
 * NOTE: Modifications won’t be for real, just visually.
 *
 * @author  Juan Cuartas
 * @version 0.0.1, Jun 2015
 *
 * @namespace
 */
var facebot = {};

/**
 * Sets the cover image in the profile page.
 *
 * @param {string} url - The URL of the image you want to set.
 */
facebot.setCoverImage = function (url) {
    if (util.isValidUrl(url)) {
        var container = document.getElementById('fbCoverImageContainer');
        var img = container.childNodes[0];
        img.src = url;
    }
};

/**
 * Sets the profile picture in the profile page.
 *
 * @param {string} url - The URL of the image you want to set.
 */
facebot.setProfilePicture = function (url) {
    if (util.isValidUrl(url)) {
        var img = document.getElementsByClassName('profilePic')[0];
        img.src = url;
    }
};

/**
 * Sets the cover name in the profile page.
 *
 * @param {string} name - The name you want to set.
 */
facebot.setCoverName = function (name) {
    if (util.isNoEmptyString(name)) {
        var span = document.getElementById('fb-timeline-cover-name');
        span.innerHTML = name;
    }
};

/**
 * Sets the number of notifications.
 *
 * @param {number} count - The number of notifications you want to set.
 */
facebot.setNotificationsCount = function (count) {
    if (util.isPositiveInteger(count)) {
        var jewel = document.getElementById('fbNotificationsJewel');
        var value = document.getElementById('notificationsCountValue');
        jewel.classList.add('hasNew');
        value.classList.remove('hidden_elem');
        value.innerHTML = count + '';
        document.title = document.title.split("(")[0] + " (" + count + ")";
    }
};

/**
 * Posts something to the profile's timeline.
 *
 * @param {{status: string, url: string: comments: string[]}} options - Object
 *    containing the information to be posted.
 */
facebot.postToTimeline = function (options) {
    var newsHeader  = document.getElementById('newsFeedHeading');
    var lastPost    = newsHeader.nextSibling;
    var newPost     = lastPost.cloneNode(true);
    var userContent = newPost.getElementsByClassName('userContent')[0];
    var commentsBox = newPost.getElementsByClassName('UFIList')[0];

    // Removes header information from the cloned post.
    var removeHeaderInformation = function () {
        var profileLink = newPost.getElementsByClassName('profileLink')[0];
        var nameBox = profileLink.parentNode.parentNode;
        var dateBox = newPost.getElementsByClassName('fsm fwn fcg')[0];
        var date = dateBox.childNodes[0].cloneNode(true);
        var name = profileLink.parentNode.cloneNode(true);
        nameBox.innerHTML = '';
        dateBox.innerHTML = '';
        nameBox.appendChild(name);
        dateBox.appendChild(date);
    };

    // Removes multimedia content from the cloned post.
    var removeMultimediaContent = function () {
        var hasMultimedia =
            userContent.nextSibling !== null &&
            userContent.nextSibling.childNodes.length &&
            userContent.nextSibling.childNodes[0].tagName !== 'FORM';
        if (hasMultimedia) {
            var multimedia = userContent.nextSibling;
            var parent     = userContent.parentNode;
            parent.removeChild(multimedia);
        }
    };

    // Removes all comments and likes from the cloned post.
    var removeCommentsAndLikes = function () {
        commentsBox.innerHTML = '';
    };

    // Sets the main content.
    var setMainContent = function () {
        var statusElement = util.isNoEmptyString(options.status) ?
            '<p>' + options.status + '</p>' : '';
        var imgElement = util.isValidUrl(options.url) ?
            '<img src="' + options.url + '" style="width:100%;height:100%" />' : '';
        userContent.innerHTML = statusElement + imgElement;
    };

    // Appends some random likes.
    var addRandomLikes = function () {
        var likes  = document.getElementsByClassName('UFILikeSentence');
        var random = Math.floor(Math.random() * likes.length);
        if (likes[random]) {
            likes = likes[random].cloneNode(true);
            commentsBox.appendChild(likes);
        }
    };

    // Appends some comments from random people.
    var addRandomComments = function () {
        if (!options.comments) {
            return;
        }
        options.comments = [].concat(options.comments);
        var comments = document.getElementsByClassName('UFIComment');
        for (var i = 0; i < options.comments.length && comments.length; i++) {
            if (!util.isNoEmptyString(options.comments[i])) {
                continue;
            }
            var random  = Math.floor(Math.random() * comments.length);
            var comment = comments[random].cloneNode(true);
            var text = comment.getElementsByClassName('UFICommentBody')[0];
            var multimedia = text.parentNode.parentNode.nextSibling;
            text.innerHTML = options.comments[i];
            commentsBox.appendChild(comment);
            if (i === 0) {
                comment.classList.add('UFIFirstCommentComponent');
            } else {
                comment.classList.remove('UFIFirstComment');
                comment.classList.remove('UFIFirstComponent');
                comment.classList.remove('UFIFirstCommentComponent');
            }
            if (multimedia && multimedia.tagName === 'DIV') {
                multimedia.parentNode.removeChild(multimedia);
            }
        }
    };

    // Appends the box to add comments.
    var addInputBox = function () {
        var inputBox = document.getElementsByClassName('UFIAddComment')[0];
        if (inputBox) {
            inputBox = inputBox.cloneNode(true);
            commentsBox.appendChild(inputBox);
        }
    };

    // Sets current date-time for all interactions in the new post.
    var setDateTime = function () {
        var elements  = newPost.getElementsByTagName('abbr');
        var isSpanish = (navigator.language === 'es');
        var dateTime  = isSpanish ? 'Hace un momento' : 'Just now';
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = dateTime;
        }
    };

    // Final step: inserts the new post into the DOM.
    var insertIntoDOM = function () {
        var hasStatus = util.isNoEmptyString(options.status);
        var hasImage  = util.isValidUrl(options.url);
        if (hasStatus || hasImage) {
            newsHeader.insertAdjacentElement('afterend', newPost);
        }
    };

    util.tryCatch(removeHeaderInformation);
    util.tryCatch(removeMultimediaContent);
    util.tryCatch(removeCommentsAndLikes);
    util.tryCatch(setMainContent);
    util.tryCatch(addRandomLikes);
    util.tryCatch(addRandomComments);
    util.tryCatch(addInputBox);
    util.tryCatch(setDateTime);
    util.tryCatch(insertIntoDOM);
};