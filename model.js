const app = angular.module("app", []);

app.controller('mainCtrl', function($scope, $http, $timeout) {

  $scope.searchProducts = function(str) {
    $scope.searchInProgress = true;
    $http.get('http://localhost:3000/products').success(function(data) {
      if(str === '' || str === undefined) {
        $scope.productSearchModel = "";
        $scope.availableProducts = data;
        $scope.searchInProgress = false;
        return;
      }

      var filteredProducts = [];
      data.forEach(function(product) {
        if(product.name.toLowerCase().includes(str.toLowerCase())) {
          filteredProducts.push(product);
        }
      });
      $scope.availableProducts = filteredProducts;
      $scope.searchInProgress = false;
    });

  };

  $scope.basket = [];
  $scope.addToBasket = function(item) {

    if(alreadyInBasket($scope.basket, item)) {
      $scope.basket[findIndex($scope.basket, item)].quantity++;
      return;
    }

    item.quantity = 1;
    $scope.basket.push(item);
  };

  $scope.removeFromBasket = function(item) {
    if(item.quantity > 1) {
      item.quantity--;
      return;
    }
    var index = findIndex($scope.basket, item);
    $scope.basket.splice(index, 1);
  };

  var timer;
  $scope.completePurchase = function(products) {
    $timeout.cancel(timer);
    $http.post('http://localhost:3000/buy', products).success(function(resp) {
      $scope.purchaseStatus = resp.purchaseRequestStatus;
      timer = $timeout(function() {
        $scope.purchaseStatus = null;
      }, 3000);
    });
  };

});

function findIndex(arr, item) {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i].name === item.name) {
      return i;
    }
  }
}

function alreadyInBasket(arr, item) {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i].name === item.name) {
      return true;
    }
  }
  return false;
}

