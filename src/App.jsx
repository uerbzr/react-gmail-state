import { render } from "react-dom";
import Header from "./components/Header";
import initialEmails from "./data/emails";

import "./styles/App.css";
import { useState } from "react";
function App() {
  // Use initialEmails for state
  //console.log(initialEmails);
  const [emails, setEmails] = useState(initialEmails);

  const [active, setActive] = useState("inbox");
  const [hideRead, setHideRead] = useState(false);
  const [filterEmailText, setFilterEmailText] = useState("");
  const handleFilterEmailText = (e) => {
    //console.log(e.target.value);
    setFilterEmailText(e.target.value);
  };
  const handleSelect = (e) => {
    let _emails = [...emails];
    let _email = _emails.find((m) => m.id == e.target.value);
    _email.selected = !_email.selected;
    setEmails(_emails);
  };
  const handleStar = (e) => {
    //console.log(e.target.value);
    let _emails = [...emails];
    let _email = _emails.find((m) => m.id == e.target.value);
    _email.starred = !_email.starred;
    setEmails(_emails);
  };

  const starred = emails.filter((email) => email.starred);
  const unread = emails.filter((email) => email.read == false);
  const text = emails.filter((email) => {
    return (
      email.title
        .toLocaleLowerCase()
        .indexOf(filterEmailText.toLocaleLowerCase()) !== -1
    );
  });

  let filtered = emails;
  if (active == "inbox") filtered = emails;
  if (active == "starred") filtered = starred;
  if (hideRead) filtered = unread;
  if (filterEmailText)
    filtered = filtered.filter((email) => email.text.includes(filterEmailText));

  console.log(filtered);

  const renderEmail = (email) => {
    return (
      <li key={email.id} className={email.read ? "email read" : "email unread"}>
        <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"
            checked={email.selected}
            value={email.id}
            onChange={handleSelect}
          />
        </div>
        <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            checked={email.starred}
            value={email.id}
            onChange={handleStar}
          />
        </div>
        <div className="sender">{email.sender}</div>
        <div className="title">{email.title}</div>
      </li>
    );
  };
  return (
    <div className="app">
      <Header handleFilterEmailText={handleFilterEmailText} />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={active === "inbox" ? "item active" : "item"}
            onClick={() => {
              setActive("inbox");
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">
              {emails.filter((x) => x.read == false).length}
            </span>
          </li>
          <li
            className={active === "starred" ? "item active" : "item"}
            onClick={() => {
              setActive("starred");
            }}
          >
            <span className="label">Starred</span>
            <span className="count">
              {emails.filter((x) => x.starred == true).length}
            </span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={() => {
                setHideRead(!hideRead);
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>{filtered.map((email, index) => renderEmail(email))}</ul>
      </main>
    </div>
  );
}

export default App;
