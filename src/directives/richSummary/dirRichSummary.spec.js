describe('richSummary directive', function() {

    var scope,
        top;

    beforeEach(module('mhng.directives.richSummary'));
    beforeEach(inject(function($compile, $rootScope) {
        scope = $rootScope;

        scope.images = [];
        scope.title = 'How Queen embraced Disco, conquered America, then bit the dust';
        scope.caption = 'In 1980, ‘The Game’ became Queen’s biggest hit album in America, yet the record’s success ushered in a dramatic fall in popularity';

        top = angular.element('<rich-summary images=images title=title caption=caption></rich-summary>');
        $compile(top)(scope);
        scope.$apply();
        top[0].focus();

    }));

    it('should show title, caption, image', function() {
        var title = top.find('h3'),
            caption = top.find('summary'),
            images = top.find('img');
        expect(title.length).toBe(1);
        expect(title[0].text).toMatch(/^How Queen Embraced/);
        expect(caption[0].text).toMatch(/^In 1980,/);
        expect(images.length).toBe(5);
        expect(images[0].attr('src')).toBe(images[1].attr('src'));
    });

});
