import View from "./View.js";

class SearchBarView extends View {
  _Element = document.querySelector("input");

  // Call a function on submitng a form by pressing enter and clear a form
  addDoOnClick(func) {
    this._Element.addEventListener("keyup", function (e) {
      let data;
      if (e.keyCode === 13) {
        e.preventDefault();

        data = this.value;
        this.value = "";

        func(data);
      }
    });
  }

  // addGetInputOnClick() {
  //   this._Element.addEventListener("keyup", function (e) {
  //     let data;
  //     if (e.keyCode === 13) {
  //       console.log(1);
  //       e.preventDefault();

  //       data = this.value;
  //       this.value = "";

  //       return data;
  //     }
  //   });
  // }
}

export default new SearchBarView();
