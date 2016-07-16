angular.module('MyApp', ['ngRoute', 'ngSanitize', 'satellizer'])
  .config(function($routeProvider, $locationProvider, $authProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        resolve: { loginRequired: loginRequired ,nbnotifications: nbnotifications , nbMessages: nbMessages}
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/account', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/forgot', {
        templateUrl: 'partials/forgot.html',
        controller: 'ForgotCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/reset/:token', {
        templateUrl: 'partials/reset.html',
        controller: 'ResetCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/monProfil', {
        templateUrl: 'partials/monProfil.html',
        controller: 'MonProfilCtrl',
        resolve: { loginRequired: loginRequired }     
      })
      .when('/modifierProfil', {
        templateUrl: 'partials/modifierProfil.html',
        controller: 'ModifierProfilCtrl',
        resolve: { loginRequired: loginRequired }      
      })
      .when('/listeAmis', {
        templateUrl: 'partials/listeAmis.html',
        controller: 'ListeAmisCtrl',
        resolve: { loginRequired: loginRequired }   
      })
        .when('/ListeMembres', {
        templateUrl: 'partials/listeMembres.html',
        controller: 'ListeMembresCtrl',
        resolve: { loginRequired: loginRequired }   
      })
      .when('/messages', {
        templateUrl: 'partials/messages.html',
        controller: 'MessagesCtrl',
        resolve: { loginRequired: loginRequired }   
      })
      .when('/chat', {
        templateUrl: 'partials/chat.html',
        controller: 'ChatCtrl',
        resolve: { loginRequired: loginRequired }   
      })
      .when('/notifications', {
        templateUrl: 'partials/notifications.html',
        controller: 'NotificationsCtrl',
        resolve: { loginRequired: loginRequired }   
      })
      .when('/profil/:id', {
        templateUrl: 'partials/unProfil.html',
        controller: 'ProfilCtrl',
        resolve: { loginRequired: loginRequired }      
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';
    $authProvider.facebook({
      url: '/auth/facebook',
      clientId: '980220002068787',
      redirectUri: 'http://localhost:3000/auth/facebook/callback'
    });

    function skipIfAuthenticated($location, $auth) {
      if ($auth.isAuthenticated()) {
        $location.path('/');
      }
    }

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
    function messages($location, $auth, Notifications) {
      if ($auth.isAuthenticated()) {
        Notifications.searchNbMessages($rootScope.currentUser._id)
      }
    }
    function nbnotifications ($location, $auth, $rootScope,$window, Notifications) {
    if ($auth.isAuthenticated()) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user)
      console.log($rootScope.currentUser)
      Notifications.searchNbNotification($rootScope.currentUser._id)
        .success(function (data) { 
          console.log(data)
           if (data.nbnotification > 0) { 
              $rootScope.nbnotification = data.nbnotification;
            }else{
              $rootScope.nbnotification = ''
            }
            console.log(data)    
          })
        .error(function (data) {
          $rootScope.nbnotification = '';
        }); 
      }
    }
    function nbMessages ($auth, $rootScope,$window, Notifications) {
      if ($auth.isAuthenticated()) {
    $rootScope.currentUser = JSON.parse($window.localStorage.user)
       return Notifications.searchNbMessages($rootScope.currentUser._id)
          .success(function (data) { 
            console.log(data)
            nbmessage = data.nbmessage
             if (nbmessage > 0) { 
                $rootScope.nbmessage = nbmessage
              }else{
                $rootScope.nbmessage = ''
              }
              console.log(data)    
            })
          .error(function (data) {
            $rootScope.nbmessage = '';
        }); 
      
    }   
  }
  })
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      console.log($window.localStorage.user)
      $rootScope.unProfilId = $window.localStorage.lastPrifilView
      console.log($rootScope.unProfilId)

      $rootScope.currentUser = JSON.parse($window.localStorage.user);
   }
 });
