import View from "./View.js";

class SearchBarView extends View {
  _parentElement = document.querySelector("input");

  // Call a function on submitng a form by pressing enter and clear a form
  addDoOnClick(func) {
    this._parentElement.addEventListener("keyup", function (e) {
      let data;
      if (e.keyCode === 13) {
        e.preventDefault();

        data = this.value;
        this.value = "";

        func(data);
      }
    });
  }
}

export default new SearchBarView();
