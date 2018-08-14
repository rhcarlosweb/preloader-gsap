(function ($) {
    // preloader
    // number of loaded images for preloader progress
    const $preloader = $('#preloader');
    const $images = $('img');

    let loadedCount = 0; //current number of images loaded
    let imagesToLoad = $images.length; //number of slides with .bcg container
    let loadingProgress = 0; //timeline progress - starts at 0

    $images.imagesLoaded({
        background: true
    }).progress(function (instance, image) {
        loadProgress();
    });

    function loadProgress(imgLoad, image) {
        //one more image has been loaded
        loadedCount++;

        loadingProgress = (loadedCount / imagesToLoad);

        // GSAP tween of our progress bar timeline
        TweenMax.to(progressTl, 0.2, {progress: loadingProgress, ease: Linear.easeNone});
    }

    //progress timeline
    const progressTl = new TimelineMax({
        paused: true,
        onUpdate: progressUpdate,
        onComplete: loadComplete
    });

    progressTl
    //tween the progress bar width
        .to($('.progress span'), 1, {width: 100, ease: Linear.easeNone});

    //as the progress bar width updates and grows we put the percentage loaded in the screen
    function progressUpdate() {
        //the percentage loaded based on the tween's progress
        loadingProgress = Math.round(progressTl.progress() * 100);
    }

    function loadComplete() {
        // preloader out
        const preloaderOutTl = new TimelineMax();

        preloaderOutTl
            .to($('.progress'), 0.3, {y: 100, autoAlpha: 0, ease: Back.easeIn})
            .to($('#preloader img'), 0.3, {y: 100, autoAlpha: 0, ease: Back.easeIn}, 0.1)
            .set([$('body'), $('html')], {className: '-=is-loading'})
            .to($preloader, 0.7, {autoAlpha: 0, ease: Power4.easeInOut})
            .set($preloader, {className: '+=is-hidden'});

        return preloaderOutTl;
    }
})(jQuery);