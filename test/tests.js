require([
    // List all files to run tests from here
    'spec/utils',
    'spec/utils-deprecate',
    'spec/playlist',
    'spec/playlist-filtering'
], function() {
    QUnit.start();
});

