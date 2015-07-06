describe('richSummary directive', function() {

    var jq = angular.element,
        scope,
        top;

    beforeEach(module('mhng.directives.richSummary'));
    beforeEach(inject(function($compile, $rootScope) {
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
            images = top.find('img'),
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

});
