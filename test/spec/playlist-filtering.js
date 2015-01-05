// jshint ignore: start
define([
    'underscore',
    'config/aac',
    'config/flv',
    'config/mp4',
    'config/playlists',
    'playlist.source',
    'playlist.track',
    'playlist.item'
], function (_, aac, flv, mp4, playlists) {

    // Since phantomjs doesn't source <video>.canPlayType(String)
    if (!jwplayer.vid) {
        jwplayer.vid = {};
    }

    if (!jwplayer.vid.canPlayType) {
        jwplayer.vid.canPlayType = function(type) {
            return _.contains(['video/mp4','audio/mp4','video/webm'],type);

        };
    }

    function sourcesMatch(arr) {
        var type;

        var match = _.all(arr, function(a) {
            type = type || a.type;
            return type === a.type;
        });

        return match ? type : undefined;
    }

    var sources = {
        flv_mp4 : [flv.tagged, mp4.tagged, flv.tagged, mp4.tagged],
        mp4_flv : [mp4.tagged, flv.tagged, mp4.tagged, flv.tagged],
        aac_mp4 : [aac.tagged, mp4.tagged, aac.tagged, mp4.tagged],
        mp4_aac : [mp4.tagged, aac.tagged, mp4.tagged, aac.tagged],
        invalid : [undefined, false, undefined],
        empty   : [],
        mixed   : [mp4.tagged, undefined, mp4.tagged]
    };

    function testSource(sourceName, desiredType, isFlash, isAndroidHls) {
        var source = sources[sourceName];

        var filtered = jwplayer.playlist.filterSources(source, isFlash, !!isAndroidHls);

        var title = isFlash ? 'Flash only with ' : 'Html5 only with ';
        equal(sourcesMatch(filtered), desiredType, title + sourceName + ' results in ' + desiredType);
    }

    module('playlist.filterSources');

    test('flash only', function() {
        testSource('flv_mp4', 'flv', true);
        testSource('mp4_flv', 'mp4', true);
        testSource('aac_mp4', 'aac', true);
        testSource('mp4_aac', 'mp4', true);
        testSource('invalid', undefined, true);
        testSource('empty', undefined, true);
        testSource('mixed', 'mp4', true);
    });

    test('html5 only', function() {
        testSource('flv_mp4', 'mp4', false);
        testSource('mp4_flv', 'mp4', false);
        testSource('aac_mp4', 'aac', false);
        testSource('mp4_aac', 'mp4', false);
        testSource('invalid', undefined, false);
        testSource('empty', undefined, false);
        testSource('mixed', 'mp4', false);
    });


    module('playlist.filterPlaylist');

    test('filterplaylist', function() {
        var pl;
        pl = jwplayer.playlist.filterPlaylist(playlists['webm_mp4']);
        equal(sourcesMatch(pl[0].sources), 'webm', 'Webm mp4 first source is webm');
        equal(sourcesMatch(pl[1].sources), 'mp4', 'Webm mp4 second source is mp4');

        pl = jwplayer.playlist.filterPlaylist(playlists['mp4_webm']);
        equal(sourcesMatch(pl[0].sources), 'mp4', 'Mp4 webm, first source is mp4');
        equal(sourcesMatch(pl[1].sources), 'webm', 'mp4 webm, second source is webm');
    });


    /*
    test('html5 with androidhls', function () {
        // We do not need this test because it is only
        //  exercising jwplayer.embed.html5CanPlay
    });
    */

});
