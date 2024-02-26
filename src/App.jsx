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
    console.log(e.target.value);
    setFilterEmailText(e.target.value);
  };
  const handleSelect = (e) => {
    let _emails = [...emails];
    let _email = _emails.find((m) => m.id == e.target.value);
    _email.selected = !_email.selected;
    setEmails(_emails);
  };
  const handleStar = (e) => {
    console.log(e.target.value);
    let _emails = [...emails];
    let _email = _emails.find((m) => m.id == e.target.value);
    _email.starred = !_email.starred;
    setEmails(_emails);
  };
  const filteredStarred = (email) => {
    if (active == "starred") {
      if (email.starred == true) {
        return renderEmail(email);
      }
    }
  };
  const filteredRead = (email) => {
    if (active == "inbox" && hideRead == true && email.read == false) {
      return renderEmail(email);
    } else {
      if (active == "inbox" && hideRead == false) {
        return renderEmail(email);
      }
    }

    if (active == "starred" && hideRead == false && email.starred == true) {
      return renderEmail(email);
    }

    if (
      active == "starred" &&
      hideRead == true &&
      email.read == false &&
      email.starred == true
    ) {
      return renderEmail(email);
    }
    /*
    return renderEmail(email);
    if (active == "inbox") {
      if (hideRead == true && email.read == false) {
      } else {
        return renderEmail(email);
      }
    } else {
      if (
        hideRead === true &&
        active == "starred" &&
        email.read === false &&
        email.starred == true
      ) {
        return renderEmail(email);
      }

      if (hideRead === false && active == "starred" && email.starred == true) {
        return render(email);
      }
    }*/
  };
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
        {
          //let _emails = emails.filter(function(e) {  return  e.title.indexOf(filterEmailText.toLowerCase())!==-1 });
          filterEmailText !== "" ? (
            <ul>
              {emails
                .filter((email) => {
                  return (
                    email.title
                      .toLocaleLowerCase()
                      .indexOf(filterEmailText.toLocaleLowerCase()) !== -1
                  );
                })
                .map((email, index) => filteredRead(email))}
            </ul>
          ) : (
            <ul>{emails.map((email, index) => filteredRead(email))}</ul>
          )
        }
      </main>
    </div>
  );
}

export default App;
