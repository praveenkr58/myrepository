'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
   'ui.bootstrap',
   'ngAnimate',
   'chart.js'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/studentattendance',{
          templateUrl:'templates/studentattendance.html',
          controller:'StudentAttendanceCtrl'
	})
	$routeProvider.when('/uploadassignments',{
		templateUrl:'templates/uploadassignment.html',
		controller:'UploadAssignmentCtrl'
	})
	$routeProvider.when('/updatemarks',{
		templateUrl:'templates/updatemarks.html',
		controller:'UpdateMarksCtrl'
	})
	$routeProvider.when('/viewmarks',{
		templateUrl:'templates/viewmarks.html',
		controller:'ViewMarksCtrl'
	})
	$routeProvider.when('/updateattendance',{
		templateUrl:'templates/updateattendance.html',
		controller:'UpdateAttendanceCtrl'
	})
  $routeProvider.when('/',{
    templateUrl:'templates/loginpage.html',
    controller:'ModalDemoCtrl'
  })
  $routeProvider.when('/home',{
    templateUrl:'templates/home.html',
    controller:'HomeCtrl'
  })
  $routeProvider.when('/hometest',{
    templateUrl:'templates/hometest.html',
    controller:'HomeCtrl'
  })
  $routeProvider.when('/student-profile',{
    templateUrl:'templates/studentprofile.html',
    controller:'StudentProfileCtrl'
  })
  $routeProvider.otherwise({redirectTo: '/hometest'});
}])
.controller('StudentAttendanceCtrl',function($scope){
    

    
})
.controller('StudentProfileCtrl',function($scope){
    
$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Before IA 1', 'Before IA 2'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.labels1 = ["Before IA 1", "Before IA 2", "Before IA 3"];
  $scope.data1 = [30, 50, 80];

  $scope.assignments = [{
    assignmentname:'OOMD A1',
    status:true
  },
  {
    assignmentname:'JAVA A1',
    status:true
  },
  {
    assignmentname:'ECS A1',
    status:true
  }
  ];
    
})
.controller('HomeCtrl',function($scope){
    

    
})
.controller('ViewMarksCtrl',function($scope){

})
.controller('UpdateMarksCtrl',function($scope){

})
.controller('UploadAssignmentCtrl',function($scope){

})
.controller('UpdateAttendanceCtrl',function($scope,$http){
	  $scope.usn_list = {};
        $http.get('http://localhost:80/getusn.php?subject_code=10cs71')
          .then(function(result){
          	   //console.log(result.data);
          	   
               $scope.usn_list = result.data;
               console.log($scope.usn_list[0].usn);
          });
   $scope.usnselected = function()
   {
   	   var option = confirm("Are you sure you want to submit?");
   	   console.log(option);
   	   $scope.selected_usn = [];
   	   var k=0;
   	   
   	  for(var index = 0;index<$scope.usn_list.length;index++)
   	  {
   	  	if(document.getElementById($scope.usn_list[index].usn).checked)
              $scope.selected_usn[k++]= $scope.usn_list[index].usn;
   	  }
   	  console.log(JSON.stringify($scope.selected_usn));
   	  if(option)
   	  {
   	  $http.get('http://localhost:80/update_attendance.php?usn_list='+JSON.stringify($scope.selected_usn))
          .then(function(result){
          	   //console.log(result.data);
          	   console.log(result);
          });
      }
      else
      {

      }
   }
})
.controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'sm',
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items,$location) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $location.path('/hometest');
     $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})
