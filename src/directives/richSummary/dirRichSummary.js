/** dirRichSummary - a nifty component displaying summary
 * of a resource containing one or more images, title, caption
 */

(function (){

    angular.module('mhng.directives.richSummary', [])
        .provider('richSummaryTemplate', SummaryTemplateProvider)
        .directive('richSummary', SummaryDirective)
        .run(SummaryTemplateInstaller);

    SummaryDirective.$inject = ['richSummaryTemplate'];

    function SummaryDirective(richSummaryTemplate) {

        return {
            restrict: 'E',
            scope: {
                title: '=',
                images: '=',
                caption: '='
            },
            link: LinkFunction,
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || richSummaryTemplate.getPath();
            }
        };

        function LinkFunction($scope, $element, attrs) {

        }

    }

    function SummaryTemplateProvider() {

        var templatePath = 'mhng.directives.richSummary.template';

        this.setPath = function (path) {
            templatePath = path;
        };

        this.$get = function () {
            return {
                getPath: function () {
                    return templatePath;
                }
            };
        };

    }

    SummaryTemplateInstaller.$inject = ['$templateCache'];

    function SummaryTemplateInstaller($templateCache) {
        $templateCache.put('mhng.directives.richSummary.template',
                           '');
    }
})();
