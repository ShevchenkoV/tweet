angular.module('twitterApp.services', []).factory('twitterService', function($q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            OAuth.initialize('aMIPBnIZGRp1UCfebX7wgIt-uKQ', {
                cache: true
            });
            authorizationResult = OAuth.create("twitter");
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup("twitter", {
                cache: true
            }, function(error, result) {

                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {

                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        search: function(query) {
            var query = query || 'ukraine';
            var deferred = $q.defer();
            var url = '/1.1/search/tweets.json?q='+query+'&result_type=popular';
            var promise = authorizationResult.get(url).done(function(data) {

                deferred.resolve(data.statuses.sort(function(a, b) {
                  return a.retweet_count - b.retweet_count;
                }));
                
            }).fail(function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }
});