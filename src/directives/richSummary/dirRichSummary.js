/** dirRichSummary - a nifty component displaying summary
 * of a resource containing one or more images, title, caption
 */

(function (){

    angular.module('mhng.directives.richSummary', [])
        .provider('richSummaryTemplate', SummaryTemplateProvider)
        .filter('capitalizeWords', CapitalizeWordsFilter)
        .directive('richSummary', SummaryDirective)
        .run(SummaryTemplateInstaller);

    SummaryDirective.$inject = ['richSummaryTemplate'];

    function SummaryDirective(richSummaryTemplate) {

        return {
            restrict: 'E',
            transclude: true,
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
                           '<div class="rich-summary"><h3 ng-bind="title|capitalizeWords"></h3><summary ng-bind="caption"></summary><img ng-href="images[0]" /><div class="img-thumb" ng-repeat="image in images"><img ng-href="image" /></div></div>');
    }

    function CapitalizeWordsFilter() {
        return function (input) {
            if (input) {
                return input.replace(/\w\S*/g, function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }
        };
    }
})();
