angular.module('MyApp')
.controller('MonProfilCtrl',['$scope', '$timeout', 'userService','$log','$q', function($scope, $timeout, userService, $log,$q) {
  $scope.alert = '';

  var that = this;

    that.selected     = null;
    that.users        = [ ];
    that.selectUser   = selectUser;
 
    that.makeContact  = makeContact;


    // Load all registered users

    userService
          .loadAllUsers()
          .then( function( users ) {
            that.users    = [].concat(users);
            that.selected = users[0];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */


    /**
     * Select the current avatars
     * @param menuId
     */
    var selectUser = function(user) {
      // body...
      that.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedUser) {

        $mdBottomSheet.show({
          controllerAs  : "cp",
          templateUrl   : './src/users/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          
          
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $scope,$mdBottomSheet ) {
          this.user = selectedUser;
          this.actions = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          $scope.contactUser = function(action) {

        var clickedItem = actions[action];
          $mdBottomSheet.hide();
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

          };
        }
    }


}])