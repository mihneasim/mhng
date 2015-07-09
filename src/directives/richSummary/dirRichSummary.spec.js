describe('richSummary directive', function() {

    var jq = angular.element,
        scope,
        top,
        $compile;

    beforeEach(module('mhng.directives.richSummary'));
    beforeEach(inject(function(_$compile_, $rootScope) {
        $compile = _$compile_;
        scope = $rootScope;

        scope.images = ['me1.jpg', 'me2.jpg', 'me3.png', 'me4.gif'];
        scope.title = 'How Queen embraced Disco, conquered America, then bit the dust';
        scope.caption = 'In 1980, ‘The Game’ became Queen’s biggest hit album in America, yet the record’s success ushered in a dramatic fall in popularity';

        top = jq('<rich-summary images=images title=title caption=caption></rich-summary>');
        $compile(top)(scope);
        scope.$apply();
        top[0].focus();

    }));

    it('should show title, caption, image', function() {
        var title = top.find('h3'),
            caption = top.find('summary'),
            divs = top.find('div'),
            poster = jq(divs[1]).css('backgroundImage'),
            thumbs = _(divs).filter(function (x) {
                return x.className.match(/\bimg\-thumb\b/); }).value();

        expect(title.length).toBe(1);
        expect(title[0].innerText).toMatch(/^How Queen Embraced/);
        expect(caption[0].innerText).toMatch(/^In 1980,/);
        expect(thumbs.length).toBe(4);
        expect(poster).toMatch(/url\(.*me1\.jpg\)/);
        expect(poster).toBe(jq(thumbs[0]).css('backgroundImage'));
    });

    it('should change primary image on hover', function() {
        var thumbs = _(top.find('div')).filter(function (x) {
                return x.className.match(/\bimg\-thumb\b/); }).value(),
            getPoster = function() { return jq(top.find('div')[1]).css('backgroundImage'); };

        jq(thumbs[3]).triggerHandler('mouseover');
        expect(getPoster()).toBe(jq(thumbs[3]).css('backgroundImage'));
    });

    it('should work with touch as it does with hover', function() {
        //TODO
    });

    it('should use separate thumbnails when provided', function() {
        var divs, poster, thumbs, getPoster, getThumbImg;

        scope.thumbnails = ['th1.jpg', 'th2.jpg', 'th3.jpg', 'th4.jpg'];
        top = jq('<rich-summary images=images title=title caption=caption thumbnails=thumbnails></rich-summary>');
        $compile(top)(scope);
        scope.$apply();

        divs = top.find('div');
        getPoster = function() { return jq(divs[1]).css('backgroundImage'); };
        thumbs = _(divs).filter(function (x) {
            return x.className.match(/\bimg\-thumb\b/); }).value();
        getThumbImg = function(ind) { return jq(thumbs[ind]).css('backgroundImage'); };

        expect(getPoster()).toMatch(/url\(.*me1\.jpg\)/);
        expect(getThumbImg(0)).toMatch(/url\(.*th1\.jpg\)/);

        jq(thumbs[3]).triggerHandler('mouseover');
        expect(getThumbImg(3)).toMatch(/url\(.*th4\.jpg\)/);
        expect(getPoster()).toMatch(/url\(.*me4\.gif\)/);

    });

});
