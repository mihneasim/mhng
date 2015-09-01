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
                href: '=',
                images: '=',
                thumbnails: '=',
                caption: '='
            },
            link: LinkFunction,
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || richSummaryTemplate.getPath();
            }
        };

        function LinkFunction($scope, $element, attrs) {
            if ($scope.images && $scope.images.length) {
                $scope.poster = {src: $scope.images[0]};
            } else {
                $scope.poster = {src: ''};
            }
            $scope.negotiatedThumbnails = $scope.images || [];
            if ($scope.thumbnails && $scope.thumbnails.length === $scope.images.length) {
                $scope.negotiatedThumbnails = $scope.thumbnails;
            }
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
            '<div class="rich-summary">' +
            '<div class="poster" ng-style="{backgroundImage: \'url(\'+poster.src+\')\'}">' +
            '<a ng-href="{{ href }}"></a></div>' +
            '<div class="img-thumbs">' +
            '<div class="img-thumb" ng-style="{backgroundImage: \'url(\'+image+\')\'}"' +
            '    ng-repeat="image in negotiatedThumbnails" ng-mouseover="poster.src=images[$index]">' +
            '</div>' +
            '</div>' +
            '<h3><a ng-bind="title|capitalizeWords" ng-href="{{ href }}"></a></h3>' +
            '<summary><a ng-bind="caption" ng-href="{{ href }}"></a></summary>' +
            '</div>');
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
