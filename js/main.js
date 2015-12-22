var app = angular.module("MyApp", [])
.controller("Ctrl", Ctrl);

function Ctrl($scope){
  
  $scope.customers = []; // creates customer list which will store objects
  var getValues;
  
  // This function retrieves all the items in localStorage
  $scope.init = function() {
  	for(var i in window.localStorage){
    	getValues = localStorage.getItem(i);
		
    	if(getValues !== null) { 
      		$scope.customers.push(JSON.parse(getValues));
    	}
  	}
  };
  
  // This function records the data from input boxes to the localStorage itself
  $scope.set = function(username, country, balance){
    if(username && country && balance){
      
      storageLength = localStorage.length;
      
	  id = storageLength + 1;
	  
      
      for(var i = 0;i < storageLength; ++i) {
        if(parseInt(localStorage.key(i), 10) === id) {
            id = parseInt(localStorage.key(i), 10) + 1;
        }
      }
      var values = {
		  "id":id,
          "name":username,
          "country": country,
          "balance":balance
      };
	  
      localStorage.setItem(id, JSON.stringify(values));
      getValues = localStorage.getItem(id);
      $scope.customers.push(JSON.parse(getValues));
      $scope.current = {};
     }
  };
  
  // This function removes item from local storage by it's position in the view
  $scope.remove = function(id, index){
    var val = confirm("Delete an item?");
    if(val){
	  $scope.customers.splice(index, 1);
	  localStorage.removeItem(id.toString());
	}
  };

  $scope.edit = function(customer){
    $scope.current = customer;

  };
  
  $scope.save = function(customer, id){
	
	var value = localStorage.getItem(id);
	
	var newValue = JSON.parse(value); // converts the string to an object
	
	newValue["name"] = $scope.current.name;
	newValue["country"] = $scope.current.country;  // modifications are done to the object
	newValue["balance"] = $scope.current.balance;
	
	localStorage.setItem(id.toString(), JSON.stringify(newValue));  // stringifies the object and stores it back!
	
	$scope.current = {};
  };
  
    
}
