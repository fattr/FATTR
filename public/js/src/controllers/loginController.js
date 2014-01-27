angular.module('fittr.controllers')

.controller('LoginController', function($scope, $state, UserService, ValidationService) {

  $scope.title = "Log In";
  $scope.user = {};

  // Form validation is handled by the ValidationSerice
  $scope.inputValid = ValidationService.inputValid;
  $scope.inputInvalid = ValidationService.inputInvalid;
  $scope.showError = ValidationService.showError;
  $scope.canSubmit = ValidationService.canSubmit;
  
  // Flash message.  Used to indicate error messages to the user
  $scope.signupLoginError = false;
  $scope.flashMessage = "";
  $scope.dismiss = function() {
    $scope.signupLoginError = false;
  };

  $scope.submit = function(ngFormController) {
    $scope.user.username = $scope.user.email;

    UserService.login($scope.user)
      .then(function(data) {

      console.log("response from /login: ", data);
      ValidationService.resetForm(ngFormController, $scope.user); 

      // save user profile data and store in mem and local storage
      UserService.save(data);

      // move to connect devices state
      $state.go('main.stream');

    }, function(reason) {
        ValidationService.resetForm(ngFormController, $scope.user);
        console.log("reason: ", reason);

        // Display a flash message indicating error
        // TODO: would be cool to send back to the user the 
        // email address they used to sign up
        $scope.flashMessage = 'Hmmm, looks like you already have an account.';  //TODO:
        $scope.signupLoginError = true;
    });
  };
});