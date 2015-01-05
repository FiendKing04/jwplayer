define([
    'jquery',
    'underscore',
    'utils'
], function ($, _) {

    var testerGenerator = function (method) {
        return function (left, right, message) {
            strictEqual(method.apply(this, left), right, message);
        };
    };

    module('utils');

    test('utils added to jwplayer object', function () {
        expect(1);
        equal(typeof jwplayer.utils, 'object', 'jwplayer.utils is defined');
    });

    test('utils.exists', function () {
        expect(7);

        equal(typeof jwplayer.utils.exists, 'function', 'This is defined');

        var test = testerGenerator(jwplayer.utils.exists);
        test([true], true);
        test([0],    true);
        test(['ok'], true);
        test([''], false); // I don't like this
        test([null], false);
        test([undefined], false);
    });

    test('utils.getAbsolutePath', function () {
        expect(9);
        equal(typeof jwplayer.utils.getAbsolutePath, 'function', 'This is defined');

        var test = testerGenerator(jwplayer.utils.getAbsolutePath);
        test(['.',   'https://example.com/alpha/beta/gamma'], 'https://example.com/alpha/beta');
        test(['/',   'https://example.com/alpha/beta/gamma'], 'https://example.com/');
        test(['../', 'https://example.com/alpha/beta/gamma'], 'https://example.com/alpha');

        test(['./hello/', 'https://example.com/'], 'https://example.com/hello', 'Testing with adding a directory');
        test(['/',   'https://example.com/alpha/beta/gamma?x=1&y=2'], 'https://example.com/', 'Testing with GET arguments');
        test(['../../../../../', 'https://example.com/'], 'https://example.com/', 'Testing with extraneous ../');

        test(['hello.mp4', 'https://example.com/oh/hi.html'], 'https://example.com/oh/hello.mp4');
        test(['../hello.mp4', 'https://example.com/hi.html'], 'https://example.com/hello.mp4');
    });

    test('utils.extend', function () {
        expect(7);

        equal(typeof jwplayer.utils.extend, 'function', 'This is defined');

        var base = {
            a: 1,
            b: 2,
            z: 3
        };
        var result = jwplayer.utils.extend(base, {
            b: 2.5,
            c: 3,
            z: undefined
        }, {
            d: 4
        });

        strictEqual(result, base, 'Get what you give');
        equal( base.a, 1, 'Unspecified values are not modified' );
        equal( base.b, 2.5, 'Existing values are updated' );
        equal( base.c, 3, 'New values are defined' );
        equal( base.d, 4, 'New values from additional params are defined' );

        // Here's where jwplayer deviates from the standard:
        //ok( !( 'z' in base ), 'Values specified as `undefined` are removed' );
        ok( ( 'z' in base ), 'Values specified as `undefined` are NOT removed' );
    });

    test('utils.log', function () {
        expect(2);
        equal(typeof jwplayer.utils.log, 'function', 'This is defined');
        strictEqual(jwplayer.utils.log(), undefined, 'jwplayer.utils.log returns undefined');
    });

    test('utils browser tests', function () {
        expect(18);

        equal(typeof jwplayer.utils.isFF, 'function', 'This is defined');
        equal(typeof jwplayer.utils.isIETrident, 'function', 'This is defined');
        equal(typeof jwplayer.utils.isMSIE, 'function', 'This is defined');
        equal(typeof jwplayer.utils.isIE, 'function', 'This is defined');
        equal(typeof jwplayer.utils.isSafari, 'function', 'This is defined');
        equal(typeof jwplayer.utils.isIOS, 'function', 'This is defined');
        equal(typeof jwplayer.utils.isAndroidNative, 'function', 'This is defined');
        equal(typeof jwplayer.utils.isAndroid, 'function', 'This is defined');
        equal(typeof jwplayer.utils.isMobile, 'function', 'This is defined');
        
        equal(typeof jwplayer.utils.isFF(), 'boolean');
        equal(typeof jwplayer.utils.isIETrident(), 'boolean');
        equal(typeof jwplayer.utils.isMSIE(), 'boolean');
        equal(typeof jwplayer.utils.isIE(), 'boolean');
        equal(typeof jwplayer.utils.isSafari(), 'boolean');
        equal(typeof jwplayer.utils.isIOS(), 'boolean');
        equal(typeof jwplayer.utils.isAndroidNative(), 'boolean');
        equal(typeof jwplayer.utils.isAndroid(), 'boolean');
        equal(typeof jwplayer.utils.isMobile(), 'boolean');
    });

    test('Cookie tools', function() {
        expect(3);

        function deleteCookie(name) {
            document.cookie = name+'=; expires=Tue, 05 Feb 2013 21:05:35 GMT; path=/';
        }

        var resetCookies = function() {
            _.each(jwplayer.utils.getCookies(), function(val, name) {
                deleteCookie('jwplayer.' + name);
            });
        };

        resetCookies();
        var cooks = jwplayer.utils.getCookies();
        strictEqual(_.size(jwplayer.utils.getCookies()), 0, 'We start with no cookies');

        jwplayer.utils.saveCookie('alpha', 'beta');
        cooks = jwplayer.utils.getCookies();
        strictEqual(_.size(cooks), 1, 'We added 1 cookie');
        strictEqual(cooks.alpha, 'beta', 'Cookie value stored and retrieved properly');

    });

    test('utils.isInt', function() {
        expect(10);

        equal(typeof jwplayer.utils.isInt, 'function', 'This is defined');

        var test = testerGenerator(jwplayer.utils.isInt);
        test([0],       true);
        test([0x10],    true);
        test([24],      true);
        test([0.5],     false);
        test(['10.'],    true);
        test(['3.1'],   false);
        test([NaN],     false);
        test([null],    false);
        test([undefined], false);
    });

    test('utils.typeOf', function() {
        expect(9);

        equal(typeof jwplayer.utils.typeOf, 'function', 'This is defined');

        var test = testerGenerator(jwplayer.utils.typeOf);
        test([0],       'number');
        test([''],      'string');
        test([false],   'boolean');
        test([{}],      'object');
        test([[]],      'array');
        test([function(){}], 'function');
        test([undefined], 'undefined');
        // do we really need this?
        test([null],      'null');
    });

    test('utils.flashVersion', function() {
        expect(2);

        var flashVersion = jwplayer.utils.flashVersion();

        equal(typeof jwplayer.utils.flashVersion, 'function', 'flashVersion is defined');
        equal(typeof flashVersion, 'number', 'Flash version is ' + flashVersion);
    });

    test('utils.getScriptPath', function() {
        expect(2);

        equal(typeof jwplayer.utils.getScriptPath, 'function', 'This is defined');
        ok(/\S+\:\/\/.+\/$/.test(jwplayer.utils.getScriptPath('jwplayer.utils.js')));
    });

    test('utils.isYouTube', function() {
        var sampleUrls = [
            "http://www.youtube.com/watch?v=YE7VzlLtp-4",
            "http://youtu.be/YE7VzlLtp-4",
            "https://www.youtube.com/v/YE7VzlLtp-4",
            "https://youtu.be/YE7VzlLtp-4?extra=foo&extra2=bar",
            "//www.youtube.com/v/YE7VzlLtp-4",
            "//youtu.be/YE7VzlLtp-4?extra=foo&extra2=bar"
        ];

        expect(sampleUrls.length+2);
        equal(typeof jwplayer.utils.isYouTube, 'function', 'This is defined');
        _.each(sampleUrls, function(value) {
            equal(jwplayer.utils.isYouTube(value), true, "Checking utils.isYouTube for " + value);
        });
        var notYoutube = "http://www.jwplayer.com/video.mp4";
        equal(jwplayer.utils.isYouTube('value'), false, "Checking utils.isYouTube for " + notYoutube);
    });

    test('utils.youTubeID', function() {
        var ytVideoId = "YE7VzlLtp-4";

        var sampleUrls = [
            "http://www.youtube.com/watch?v="+ytVideoId,
            "http://www.youtube.com/watch#!v="+ytVideoId,
            "http://www.youtube.com/v/"+ytVideoId,
            "http://youtu.be/"+ytVideoId,
            "http://www.youtube.com/watch?v="+ytVideoId+"&extra=foo",
            "http://www.youtube.com/watch#!v="+ytVideoId+"?extra=foo&extra2=bar",
            "http://www.youtube.com/v/"+ytVideoId+"?extra=foo&extra2=bar",
            "http://youtu.be/"+ytVideoId+"?extra=foo&extra2=bar",
            "https://www.youtube.com/v/"+ytVideoId,
            "//www.youtube.com/v/"+ytVideoId,
            ytVideoId
        ];

        expect(sampleUrls.length+1);
        equal(typeof jwplayer.utils.youTubeID, 'function', 'This is defined');
        _.each(sampleUrls, function(value) {
            equal(jwplayer.utils.youTubeID(value), ytVideoId, "Checking utils.youTubeID for " + value);
        });
    });

    // TODO: 
    // isRtmp
    // foreach
    // versionCheck - jwplayer.version = '6.10.4900'
    // ajax
    // parseXML
    // between (clamp)
    // seconds

    test('utils.addClass', function () {
        expect(4);
        equal(typeof jwplayer.utils.addClass, 'function', 'This is defined');
        
        var element = document.createElement('div');
        strictEqual(element.className, '', 'Created an element with no classes');

        jwplayer.utils.addClass(element, 'class1');
        equal(element.className, 'class1', 'Added first class to element');

        jwplayer.utils.addClass(element, 'class2');
        equal(element.className, 'class1 class2', 'Added second class to element');
    });

    test('utils.removeClass', function () {
        expect(4);
        equal(typeof jwplayer.utils.removeClass, 'function', 'This is defined');
        
        var element = document.createElement('div');
        element.className = 'class1 class2';
        equal(element.className, 'class1 class2', 'Created an element with two classes');

        jwplayer.utils.removeClass(element, 'class2');
        equal(element.className, 'class1', 'Removed second to last class from element');

        jwplayer.utils.removeClass(element, 'class1');
        equal(element.className, '', 'Removed last class from element');
    });

    test('utils.indexOf', function () {
        expect(1);
        equal(typeof jwplayer.utils.indexOf, 'function', 'This is defined');
        // provided by underscore 1.6
    });

    test('utils.noop', function () {
        expect(2);
        equal(typeof jwplayer.utils.noop, 'function', 'This is defined');
        equal(jwplayer.utils.noop.toString(), 'function () {}', 'noop does nothing');
    });

    test('utils.canCast', function () {
        expect(5);
        equal(typeof jwplayer.utils.canCast, 'function', 'This is defined');

        var canCast = jwplayer.utils.canCast;
        var cast = jwplayer.cast;

        jwplayer.cast = { available: _.constant(true) };
        strictEqual(canCast(), true,  'Correct when function present');
        jwplayer.cast = { available: _.constant(false) };
        strictEqual(canCast(), false, 'Correct when function present and returns false');

        jwplayer.cast = {};
        strictEqual(canCast(), false, 'Correct when cast present but available is not');

        delete jwplayer.cast;
        strictEqual(canCast(), false, 'Correct when function is not present at all');

        jwplayer.cast = cast;
    });
});
