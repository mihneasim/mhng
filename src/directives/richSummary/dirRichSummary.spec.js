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
            images = top.find('img');
        expect(title.length).toBe(1);
        expect(title[0].innerText).toMatch(/^How Queen Embraced/);
        expect(caption[0].innerText).toMatch(/^In 1980,/);
        expect(images.length).toBe(5);
        expect(jq(images[0]).attr('src')).toBe(jq(images[1]).attr('src'));
    });

    it('should change primary image on hover', function() {
        jq(top.find('img')[3]).triggerHandler('mouseover');
        expect(jq(images[0]).attr('src')).toBe(jq(images[3]).attr('src'));
    });

});
