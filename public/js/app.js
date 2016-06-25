angular.module('MyApp', ['ngRoute', 'ngSanitize', 'satellizer'])
  .config(function($routeProvider, $locationProvider, $authProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html'
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
        controllerAs:'toto',
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
      .when('/chat', {
        templateUrl: 'partials/chat.html',
        controller: 'ChatCtrl',
        resolve: { loginRequired: loginRequired }   
      })
      .when('/faq', {
        templateUrl: 'partials/faq.html',
        controller: 'FaqCtrl',
        resolve: { loginRequired: loginRequired }      
      })
      .when('/profil/:params', {
        templateUrl: 'partials/unprofil.html',
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
  })
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });