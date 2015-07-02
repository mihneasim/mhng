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
    });

});
