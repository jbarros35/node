'use strict';
define([
	'angular',
	'angularRoute'
], function(angular) {

	var blog = angular.module('myApp.blog', ['ngRoute']);

	blog.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/blog', {
			templateUrl: 'blog/blog.html',
			controller: 'blogCtrl'
		});
	}]);

	blog.controller('blogCtrl', ['$scope', function($scope) {
		// Home controller logic
	}]);

	// menu directive
	blog.directive("editBlog", ['$parse', '$http', '$compile', '$templateCache', function($parse, $http, $compile, $templateCache) {

		  return {
		    restrict: "A",
		    replace: true,
		    scope: false,
		    transclude: true,
		    templateUrl: "blog/editBlog.html",
		    link: function($scope, element, attrs) {
	            $scope.hideEdit = function(hide) {
	                $scope.hideTable = hide;
	            };
	            $scope.reload = function() {
	            	$scope.loadPosts();
	            };
	        },
		    controller: ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
		    	var page = 0;
				var postsByPage = 10;
				$scope.nodataFound = "No records found.";
				$scope.hideTable = false;
				// load page
				$scope.loadPosts = function() {
		    		$http.defaults.useXDomain = true;
		    		$http({method: 'GET',
						transformResponse: function (data) {
							data = angular.fromJson(data);
							if (data) {
								for (var i = 0, length = data.length; i < length; i++) {
									var blogPost = data[i];
									 if (!angular.isDate(blogPost.postdate)) {
										 blogPost.postdate = new Date(blogPost.postdate);
									 }
						    	 }
							}
							return data;
						},
							url: window.globalConfig.serviceURL+'/blognews'						
						}
					).
					success(function(data, status, headers, config) {
						if (data) {
							// update blog posts
							$scope.tabelsData = data;							
							initTable();

						} else {
							// clean blog posts var
							$scope.tabelsData = [];
						}

				   }).
					error(function(data, status, headers, config) {
					  // log error
					  console.log("Error "+data);
					});
		    	};

		    	$scope.loadPosts();
		    	// start editable table
		    	var initTable = function() {
		    		$scope.editingData = [];

		    	    for (var i = 0, length = $scope.tabelsData.length; i < length; i++) {
		    	      $scope.editingData[$scope.tabelsData[i].id] = false;
		    	    }
		    	};
		    	// open for editing
			    $scope.modify = function(tableData){
			        $scope.editingData[tableData.newid] = true;
			    };
			    // update record
			    $scope.update = function(tableData){
			        $scope.editingData[tableData.newid] = false;
			        $http.defaults.useXDomain = true;
					$http({
							url: window.globalConfig.serviceURL+'/blognews/'+tableData.newid,
							method: "PUT",
					        data: JSON.stringify(tableData),
					        headers: {'Content-Type': 'application/json'
								}
					}).
					success(function(data, status, headers, config) {
					  console.log('update'+data);
				   }).
					error(function(data, status, headers, config) {
					  // log error
					  console.log("Error "+data);
					});			       
			    };
				
				// REMOVE record
			    $scope.remove = function(index){
					var tableData = $scope.tabelsData[index];
			        $scope.editingData[tableData.newid] = false;
			        $http.defaults.useXDomain = true;
					$http({
							url: window.globalConfig.serviceURL+'/blognews/'+tableData.newid,
							method: "DELETE",
					        data: JSON.stringify(tableData),
					        headers: {'Content-Type': 'application/json'}
					}).
					success(function(data, status, headers, config) {
						$scope.tabelsData.splice(index, 1);
						console.log('delete '+tableData.newid);
				   }).
					error(function(data, status, headers, config) {
					  // log error
					  console.log("Error "+data);
					});			        
			    };
			}]
		    };
		  }]);

	// creation directive
	// new controller
	// controller of data table
	blog.directive("newPost", ['$parse', '$http', '$compile', '$templateCache', function($parse, $http, $compile, $templateCache) {
		 return {
			    restrict: "A",
			    replace: true,
			    scope: false,
			    transclude: true,
			    templateUrl: "blog/newPost.html",
			    controller: ['$scope', '$http', function ($scope, $http) {
			    	$scope.showNew = false;
					$scope.post = {};
				    $scope.showAlert = false;

					// open new edit
				    $scope.openNew = function() {
				    	$scope.showNew = true;
				    	$scope.hideEdit(true);
				    };

				    // send json post for creation
				    $scope.save = function() {
				    	tryCombineDateTime();
				    	$http.defaults.useXDomain = true;
						$http({
								url: window.globalConfig.serviceURL+'/blognews/',
								method: "POST",
						        data: JSON.stringify($scope.post),
						        headers: {'Content-Type': 'application/json'}
						}).
						success(function(data, status, headers, config) {
							 $scope.post = {};
							 $scope.sdate = null;
							 $scope.stime = null;
							 $scope.showAlert = true;
							 $scope.showNew = false;
							 $scope.successTextAlert = "Post saved";
							 $scope.reload();
							 $scope.hideEdit(false);
					   }).
						error(function(data, status, headers, config) {
						  // log error
						  console.log("Error "+data);
						});
				    };
				    //TODO DOESNT WORKS!
				    $scope.reset = function(form){
				    	event.preventDefault();
			            if(form.$setPristine){//only supported from v1.1.x
			                form.$setPristine();
			                console.log('setpristine');
			            }else{

			                /*
			                 *Underscore looping form properties, you can use for loop too like:
			                 *for(var i in form){
			                 *  var input = form[i]; ...
			                 */
			                _.each(form, function (input)
			                {
			                    if (input.$dirty) {
			                        input.$dirty = false;
			                    }
			                });
			            }
			        };

				    // switch flag
				    $scope.switchBool = function (value) {
				        $scope[value] = !$scope[value];
				    };

				    // merge date and time together
				    $scope.$watch('sdate', function() {
				       tryCombineDateTime();
				    });

				    $scope.$watch('stime', function() {
				       tryCombineDateTime();
				    });
				    // combine date and time for inserting
				    function tryCombineDateTime() {

				        if($scope.sdate && $scope.stime) {
				        	var dateParts = [$scope.sdate.getFullYear(),
				        	                 $scope.sdate.getMonth() + 1,
				        	                 $scope.sdate.getDate()
				        	                 ];
				        	var timeParts = [$scope.stime.getHours(), $scope.stime.getMinutes(), $scope.stime.getSeconds()];

				            if(dateParts && timeParts) {
				                dateParts[1] -= 1;
				                $scope.post.postdate = new Date(Date.UTC.apply(undefined,dateParts.concat(timeParts))).toISOString();
				            }
				        }
				    }

			    }]
		 };
	}]);
});

