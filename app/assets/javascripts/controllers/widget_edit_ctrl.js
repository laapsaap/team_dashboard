app.controller("WidgetEditCtrl", ["$scope", "$compile", "dialog", "$dialog", "widget", "Widget", "EditorFormOptions", "Sources", function($scope, $compile, dialog, $dialog, widget, Widget, EditorFormOptions, Sources) {

  $scope.template = JST["templates/widgets/" + widget.kind + "/edit"];
  $scope.customFieldsTemplate = $("#templates-custom_fields-" + Sources.kindMapping(widget.kind)).html();

  $scope.widget               = widget;

  $scope.updateIntervals      = EditorFormOptions.updateIntervals;
  $scope.periods              = EditorFormOptions.periods;
  $scope.sizes                = EditorFormOptions.sizes;
  $scope.sources              = Sources.availableSources($scope.widget.kind);

  function setValidity(field, error) {
    $scope.form[field].$dirty = true;
    $scope.form[field].$setValidity(error, false);
  }

  function handleValidationErrors(response) {
    _.each(response.data, function(errors, key) {
      _.each(errors, function(e) {
        setValidity(key, e);
      });
    });
  }

  function handleSuccess(data) {
    dialog.close(true);
  }

  $scope.save = function(widget) {
    if ($scope.form.$invalid) return;

    if (widget.id) {
      widget.$update(handleSuccess, handleValidationErrors);
    } else {
      widget.$create(handleSuccess, handleValidationErrors);
    }
  };

  $scope.isSaveDisabled = function() {
    return $scope.form.$invalid;
  };

  $scope.cancel = function(widget) {
    dialog.close(false);
  };

}]);