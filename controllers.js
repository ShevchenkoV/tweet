app.controller('TwitterController', function($scope, $q, twitterService) {
    $scope.tweets = [];
    $scope.limit = 5;
    twitterService.initialize();

    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                    $scope.search();
                    $scope.connectedTwitter = true;
            }
        });
    }

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
});
