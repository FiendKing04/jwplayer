define([
    'underscore',
    'config/mp4',
    'playlist.source',
    'playlist.track',
    'playlist.item'
], function (_, mp4) {

    function isValidPlaylistItem(item) {
        return _.isObject(item) && _.isArray(item.sources) && _.isArray(item.tracks);
    }

    module('playlist');
    var playlist = jwplayer.playlist;

    test('Test initialized successfully', function() {
        expect(3);

        equal(typeof jwplayer.playlist, 'function', 'jwplayer.playlist is defined');
        equal(typeof jwplayer.playlist.item, 'function', 'jwplayer.playlist.item is defined');
        equal(typeof jwplayer.playlist.source, 'function', 'jwplayer.playlist.source is defined');
    });

    test('Test constructor with single item', function () {
        expect(3);
        var p;

        p = playlist(mp4.starscape);
        ok(isValidPlaylistItem(p[0]), 'Initialize single item');

        p = playlist(undefined);
        ok(isValidPlaylistItem(p[0]), 'Initialize with undefined item');

        // TODO: this doesn't actually work, shouldn't pass
        p = playlist(mp4.starscape.file);
        ok(isValidPlaylistItem(p[0]), 'Initialize with just file name');
    });

    test('Test constructor with array of items', function () {
        expect(3);
        var p,
            arr = [mp4.starscape, mp4.starscape, mp4.starscape];

        p = playlist(arr);
        equal(p.length, arr.length, 'Same number of items initialized');

        p = playlist([mp4.starscape]);
        ok(isValidPlaylistItem(p[0]), 'Initialize single item array');

        // TODO: inconsistent, this is the only case where it returns an empty array
        p = playlist([]);
        ok(_.isArray(p) && p.length === 0, 'Initialize with an empty array as argument');
    });

});
