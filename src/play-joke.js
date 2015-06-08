/**
 * Plays the joke: sets cover image, profile picture, cover name,
 * notifications count and timeline update.
 *
 * @param {object} options - Information to be posted.
 */
var playJoke = function (options) {
    var parseArguments = function (args) {
        args.notificationsCount = parseInt(args.notificationsCount);
        args.post.comments     = args.post.comments.split('|');
    };
    util.tryCatch(parseArguments,                options);
    util.tryCatch(facebot.setCoverImage,         options.coverImage);
    util.tryCatch(facebot.setProfilePicture,     options.profilePicture);
    util.tryCatch(facebot.setCoverName,          options.coverName);
    util.tryCatch(facebot.setNotificationsCount, options.notificationsCount);
    util.tryCatch(facebot.postToTimeline,        options.post);
};

// Argument values will be injected from the user interface.
playJoke({
	coverImage:        "{{coverImage}}",
	profilePicture:    "{{profilePicture}}",
	coverName:         "{{coverName}}",
	notificationsCount: "{{notificationsCount}}",
	post: {
		status:   "{{postStatus}}",
		url:      "{{postUrl}}",
		comments: "{{postComments}}"
	}
});