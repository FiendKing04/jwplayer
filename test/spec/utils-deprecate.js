define([
    'utils',
    'utils.strings',
    'events'
], function() {

    var testerGenerator = function(method) {
        return function(left, right, message) {
            strictEqual(method.apply(this, left), right, message);
        };
    };

    var testerGeneratorDeep = function(method) {
        return function(left, right, message) {
            deepEqual(method.apply(this, left), right, message);
        };
    };

    module('utils-deprecate');

    test('utils.styleDimension', function () {
        expect(4);

        strictEqual(typeof jwplayer.utils.styleDimension, 'function', 'This is defined');

        var test = testerGenerator(jwplayer.utils.styleDimension);
        test(['100%'],  '100%');
        test(['100'],   '100px');
        test([100],     '100px');

        // These should pass
        // test(['100px'], '100px');
        // test([0],       '0');
    });

    // can this be handled in Flash?
    test('utils.translateEventResponse', function () {
        expect(5);

        strictEqual(typeof jwplayer.utils.translateEventResponse, 'function', 'This is defined');

        var test = testerGeneratorDeep(jwplayer.utils.translateEventResponse);

        test([jwplayer.events.JWPLAYER_FULLSCREEN, {message: 'true'}],
            {fullscreen: true},
            'Fullscreen events are translated');

        test(['', {data: {a: 1}}],
            {a: 1},
            'data attributes are merged');

        test(['', {
                position: Math.PI,
                duration: 10.55555,
                offset: '10.2981297592'
            }],
            {
                position: 3.142,
                duration: 10.556,
                offset: 10.298
            },
            'Time properties are rounded to the nearest millisecond'
        );

        test(['', {
                metadata: {
                    '__dot__': 0, '__spc__': 0, '__dsh__': 0, '__default__': 0
                }
            }], {
                metadata: {'.': 0, ' ': 0, '-': 0, 'default': 0}

            },
            'Flash events are normalized'
        );

    });

    test('utils.deepReplaceKeyName', function () {
        expect(2);

        strictEqual(typeof jwplayer.utils.deepReplaceKeyName, 'function', 'This is defined');

        var test = testerGeneratorDeep(jwplayer.utils.deepReplaceKeyName);

        test([{
                no: {no: {no: {}}}
            }, ['no'], ['yes']],
            {
                yes: {yes: {yes: {}}}
            },
            'Recurse through object and replace keys'
        );
    });

    // requires utils.strings extension
    test('utils.getPluginPathType', function () {
        expect(11);

        var type = {
            ABSOLUTE: 0,
            RELATIVE: 1,
            CDN: 2
        };

        strictEqual(typeof jwplayer.utils.getPluginPathType, 'function', 'This is defined');

        var test = testerGenerator(jwplayer.utils.getPluginPathType);

        test(['http://p.jwpcdn.com/6/9/vast.js'],    type.ABSOLUTE);
        test(['http://p.jwpcdn.com/6/9/hd-1.swf'],   type.ABSOLUTE);
        test(['http://p.jwpcdn.com/6/9/hd-1.4.swf'], type.ABSOLUTE);
        test(['./vast.swf'],        type.RELATIVE);
        test(['./hd-1.swf'],        type.RELATIVE);
        test(['./hd-1.4.swf'],      type.RELATIVE);
        test(['../../googima.js'],  type.RELATIVE);
        test(['vast'],      type.CDN);
        test(['hd-1'],      type.CDN);
        test(['hd-1.4'],    type.CDN);
    });

    // TODO: 
    // getPluginName
    // getPluginVersion
    // isHTTPS
    // repo
    // serialize

});
