'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  var checkFileExtension = function (file) {
    var fileName = file.name.toLowerCase();

    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var renderAvatar = function (file) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var fileChooserChangeHandler = function () {
    var file = fileChooser.files[0];

    if (file) {
      var matches = checkFileExtension(file);

      if (matches) {
        renderAvatar(file);
      }
    }
  };

  fileChooser.addEventListener('change', fileChooserChangeHandler);
})();
