describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe('TwitterController', function(){
          var $scope, ctrl;

          beforeEach(inject(function ($rootScope, $controller) {
              $scope = $rootScope.$new();
              ctrl = $controller('TwitterController', {
                $scope: $scope 
              });
          })); 

  it('should change greeting value if name value is changed', function() {
    scope.name = "Frederik";
    scope.$digest();
    expect(scope.greeting).toBe("Greetings Frederik");
  });
});