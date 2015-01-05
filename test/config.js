require.config({
    paths: {
        'components': 'bower_components',
        'jquery': 'bower_components/jquery/dist/jquery',
        'underscore': 'bower_components/underscore/underscore',

        'utils' : '../src/js/utils/jwplayer.utils',
        'utils.underscore': '../src/js/utils/jwplayer.underscore',
        'utils.extensionmap': '../src/js/utils/jwplayer.utils.extensionmap',
        'utils.strings': '../src/js/utils/jwplayer.utils.strings',

        'embed' : '../src/js/embed/jwplayer.embed',
        'embed.flash' : '../src/js/embed/jwplayer.embed.flash',
        'embed.html5' : '../src/js/embed/jwplayer.embed.html5',

        'events' : '../src/js/events/jwplayer.events',

        'playlist' : '../src/js/playlist/jwplayer.playlist',
        'playlist.item' : '../src/js/playlist/jwplayer.playlist.item',
        'playlist.source' : '../src/js/playlist/jwplayer.playlist.source',
        'playlist.track' : '../src/js/playlist/jwplayer.playlist.track'
    },

    // use to define dependencies
    shim: {
        'utils' : ['utils.underscore', 'events'],
        'utils.extensionmap' : ['utils'],
        'utils.strings' : ['utils'],

        'embed.flash' : ['embed', 'utils.extensionmap'],
        'embed.html5' : ['embed', 'utils.extensionmap'],

        'playlist' : ['embed.flash', 'embed.html5', 'utils.extensionmap'],
        'playlist.source' : ['playlist'],
        'playlist.track' : ['playlist'],
        'playlist.item' : ['playlist']
    }
});
