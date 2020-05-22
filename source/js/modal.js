// модальное окно
var open_modal_button = document.querySelectorAll(".order-button");

var popup_wrapper = document.querySelector(".order-modal");
var popup_window = document.querySelector(".modal-wrapper__window");

var size = document.getElementsByName('size');

for (var i = 0; i < open_modal_button.length; i++) {
  open_modal_button[i].addEventListener("click", (function (evt) {
    evt.preventDefault();
    popup_wrapper.classList.add("modal-wrapper--show");
  }));
}

popup_window.addEventListener("submit", function (evt) {
  var flag = true;
  for (var i = 0; i < size.length; i++) {
    if (size[i].type == "radio" && size[i].checked) {
      flag = false;
    }
  }
  if (flag) {
    evt.preventDefault();
    popup_window.classList.remove("modal-wrapper--error");
    popup_window.offsetWidth = popup_window.offsetWidth;
    popup_window.classList.add("modal-wrapper--error");
  }

});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup_wrapper.classList.contains("modal-wrapper--show")) {
      popup_window.classList.remove("modal-wrapper--error");
      setTimeout(function() {popup_wrapper.classList.remove("modal-wrapper--show");}, 400);
    }
  }
});
