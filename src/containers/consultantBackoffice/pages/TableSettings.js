import React from "react";

import "../../../../src/style/css/SidebarUniverstitet.css";
import "../../../style/css/SidebarUniverstitet.css";

// import "../../../../style/css/fakultet.css";
import "../../../../src/style/css/fakultet.css";
// import "../../../style/css/fakultet.css";
import "react-datepicker/dist/react-datepicker.css";

import "../../../style/css/SidebarUniverstitet.css";
import "../../../style/css/fakultet.css";

export default class DynamicTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      items: [],
    };
  }

  updateMessage(event) {
    this.setState({
      message: event.target.value,
    });
  }

  handleClick() {
    var items = this.state.items;

    items.push(this.state.message);

    this.setState({
      items: items,
      message: "",
    });
  }

  handleItemChanged(i, event) {
    var items = this.state.items;
    items[i] = event.target.value;

    this.setState({
      items: items,
    });
  }

  handleItemDeleted(i) {
    var items = this.state.items;

    items.splice(i, 1);

    this.setState({
      items: items,
    });
  }

  renderRows() {
    var context = this;

    return this.state.items.map(function (o, i) {
      return (
        <div className="switchs">
          <div className="switch_asos">
            <div className="setting-select">
              <h5>Цены за услуги компании</h5>
              <div className="staticSelect">
                <select>
                  <option value="">Университет</option>
                </select>
                <select>
                  <option value="">Бакалавр</option>
                </select>
                <select>
                  <option value="">Направление </option>
                </select>
                <select>
                  <option value="">IT </option>
                </select>
                <input></input>
              </div>
              <div className="plus-btn">
                <button>Добавить</button>
              </div>
            </div>
            <tr className="tableSett" key={"item-" + i}>
              <td>
                <input
                  type="text"
                  value={o}
                  onChange={context.handleItemChanged.bind(context, i)}
                />
              </td>
              <td>
                <button onClick={context.handleItemDeleted.bind(context, i)}>
                  Delete
                </button>
              </td>
            </tr>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {/* <div className="setting-select">
          <h5>Цены за услуги компании</h5>
          <div className="staticSelect">
            <select>
              <option value="">Университет</option>
            </select>
            <select>
              <option value="">Бакалавр</option>
            </select>
            <select>
              <option value="">Направление </option>
            </select>
            <select>
              <option value="">IT </option>
            </select>
            <input></input>
          </div>
          <div className="plus-btn">
            <button>Добавить</button>
          </div>
        </div> */}
        {/* TABLE */}
        {/* <div className="asos">
          <div className="SidebarUniverstitet">
            <div className="univerList talabalar" id="scroll_bar">
              <table>
                <thead>
                  <tr className="table-line">
                    <th className="px-3">N</th>
                    <th>Университет</th>
                    <th>Степень</th>
                    <th>Направление</th>
                    <th>Факультет</th>
                    <th>Цена</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item, i) => {
                    return (
                      <tr key={id}>
                        <td className="px-3">{i + 1}</td>
                        <td className="firstTD">
                          <td>{university}</td>
                          {first_name} {last_name}
                        </td>
                        <td>{contract_created_date}</td>
                        <td>${service_price}</td>
                        <td>{phone_number}</td>
                        <td>{manager}</td>
                        <td>{contract}</td>
                        <td>
                          я
                          <a href={invoice} download>
                            <img src={ticketDownload} alt="don=wnload" />
                          </a>
                        </td>
                        <td>
                          {invoice_confirmed == null ? (
                            "не оплачен"
                          ) : (
                            <button
                              style={
                                invoice_confirmed
                                  ? { backgroundColor: "#5EC98B" }
                                  : {
                                      backgroundColor: "#fff",
                                      border: "1px solid #5EC98B ",
                                      color: "#5EC98B",
                                    }
                              }
                              onClick={() => handleClick(item.id)}
                            >
                              {invoice_confirmed
                                ? "Платеж потвержден"
                                : "Потвердить платеж"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
        {/* <table className="">
          <thead>
            <tr>
              <th>Item</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table> */}
        <hr />
        {/* <input
        type="text"
        value={this.state.message}
        onChange={this.updateMessage.bind(this)}
        /> */}
        {/* <button onClick={this.handleClick.bind(this)}>Add Item</button> */}
      </div>
    );
  }
}
