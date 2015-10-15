app.controller('TwitterController', function($scope, $q, twitterService) {
    $scope.tweets = [];
    $scope.limit = 5;
    twitterService.initialize();

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                    $scope.search();
                    $scope.connectedTwitter = true;
            }
        });
    }

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
          twitterService.clearCache();
          $scope.tweets.length = 0;
          $scope.connectedTwitter = false
         
    }
    $scope.search = function(){
      twitterService.search($scope.searchTerm).then(function(data){
        $scope.tweets = data;
        console.log($scope.tweets);
      });
    }
	$scope.$watch('check',function(newVal){
		if(newVal){
			$scope.tweets.sort(function(a, b) {
                  return b.retweet_count - a.retweet_count;
                });		
		} else {
			$scope.tweets.sort(function(a, b) {
                  return a.retweet_count - b.retweet_count;
                });		
				
		}	
	})
    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
        $scope.connectedTwitter = true;
        $scope.search();
    }
});
