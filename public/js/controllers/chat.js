angular.module('MyApp')
  .controller('ChatCtrl', function($scope,$interval) {
   $interval.cancel(MajMessage)
  });