export default class View {
  _data;

  DayConverter(time) {
    const date = new Date(time);
    const options = { weekday: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  renderSpinner() {
    const markup = `

                  <div class="loadingio-spinner-dual-ring-r1sfx2fv9kp"><div class="ldio-u6f916xqp4">
                  <div></div><div><div></div></div>
                  </div></div>
                  </div>

                
`;

    document
      .querySelector("#main_container")
      .insertAdjacentHTML("beforebegin", markup);
    console.log(this._parentElement);
  }

  render(data, markupPlacement = "afterbegin") {
    this._parentElement.innerHTML = "";
    this._data = data;
    const markup = this.generateMarkup();

    this._parentElement.insertAdjacentHTML(markupPlacement, markup);
  }
}
