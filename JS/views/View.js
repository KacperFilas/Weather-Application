export default class View {
  _data;

  DayConverter(time) {
    const date = new Date(time);
    const options = { weekday: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  render(data, markupPlacement = "afterbegin") {
    this._parentElement.innerHTML = "";
    this._data = data;
    const markup = this.generateMarkup();

    this._parentElement.insertAdjacentHTML(markupPlacement, markup);
  }
}
