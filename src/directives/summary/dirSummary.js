/** dirSummary - nifty component displaying summary
 * of a resource containing one or more images, title, caption
 */

(function (){

    angular.module('ngmhn.directives.summary', [])
        .provider('summaryTemplate', SummaryTemplateProvider)
        .directive('summary', SummaryDirective)
        .run(SummaryTemplateInstaller);

    SummaryDirective.$inject = ['SummaryTemplate'];

    function SummaryDirective(SummaryTemplate) {

        return {
            restrict: 'E',
            scope: {
                title: '=',
                images: '=',
                caption: '='
            },
            link: LinkFunction,
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || summaryTemplate.getPath();
            }
        };

        function LinkFunction($scope, $element, attrs) {

        }

    }

    function SummaryTemplateProvider() {

        var templatePath = 'mhng.directives.summary.template';

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
        $templateCache.put('mhng.directives.summary.template',
                           '');
    }
})();
