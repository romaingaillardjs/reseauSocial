angular.module('MyApp')
.controller('FaqCtrl',['$scope', '$timeout','faqService','$log','$q','$rootScope', '$sce','$sanitize',function($scope, $timeout, faqService,$log,$q,rootScope,$sce, $sanitize) {
  

        $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };

    var that = this;

     faqService
    .loadAllFaq()
    .then( function( faq) {
            $scope.FAQ = faq;
          });




  $scope.activeButton = function(evt,arg) {
    //console.log(angular.element(evt.target).parent().parent().parent()[0]);

    //if(angular.element(evt.target).hasClass('FAQopen'))
    //{
      //var isOpen = angular.element(evt.target).hasClass('FAQopen');
      //console.log('isOpen');
    //}

 
  }  

}])
            
 
