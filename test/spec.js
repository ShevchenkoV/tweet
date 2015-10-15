
 describe('TwitterController', function(){
	var scope,twitterController;
 	beforeEach(function(){
		module('twitterApp');
	});
	beforeEach(inject(function($rootScope, $controller){
	  scope=$rootScope.$new();
	  twitterController = $controller('TwitterController', {
		$scope: scope
	  });
	}));
	it('should initialize limit', function(){
		expect(scope.limit).toBeDefined();
		expect(scope.limit).toBe(5);
	});
	it('should initialize limit', function(){
		expect(scope.limit).toBeDefined();
		expect(scope.limit).toBe(5);
	});

});
 describe('TwitterService', function(){
	var twService,httpBackend;
 	beforeEach(function(){
		module('twitterApp');
	});
	beforeEach(inject(function(_twitterService_,$httpBackend){
	  twService=_twitterService_;
	  httpBackend=$httpBackend;
	}));
	it('should be false ', function(){
		expect(twService.isReady()).toBe(false);
	});
	it('should request login http', function(){
		httpBackend.whenGET("/1.1/search/tweets.json?q=ukraine").respond({
			data:[{name:'ukraine'}]		
		});		
		twService.connectTwitter().then(function(data){
			httpBackend.flush();
			expect(data).toBe(true);
		});

	});
});
