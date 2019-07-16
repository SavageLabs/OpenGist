import React, { Component } from "react";
import { withRouter } from "react-router-dom"

const langs = [
  "apex",
  "azcli",
  "bat",
  "c",
  "clojure",
  "coffeescript",
  "cpp",
  "csharp",
  "csp",
  "css",
  "dockerfile",
  "fsharp",
  "go",
  "graphql",
  "handlebars",
  "html",
  "ini",
  "java",
  "javascript",
  "json",
  "kotlin",
  "less",
  "lua",
  "markdown",
  "msdax",
  "mysql",
  "objective-c",
  "pascal",
  "perl",
  "pgsql",
  "php",
  "plaintext",
  "postiats",
  "powerquery",
  "powershell",
  "pug",
  "python",
  "r",
  "razor",
  "redis",
  "redshift",
  "ruby",
  "rust",
  "sb",
  "schene",
  "scss",
  "shell",
  "sol",
  "sql",
  "st",
  "swift",
  "tcl",
  "typescript",
  "vb",
  "xml",
  "yaml"
];
class Panel extends Component {
    state ={
        copied: "false"
    }
  render() {
    const { newPaste, currentLanguage, id } = this.props;
    const link = id && `https://${window.location.host}/view/${id}`;
    if (newPaste)
      return (
        <div className="panel-header"
        >
          <div>
            <button onClick={() => this.props.savePaste()}>SAVE</button>
          </div>
          <div>
            <select
              value={currentLanguage}
              onChange={ev => {
                this.props.updateLanguage(ev.target.value);
              }}
              class="language-picker"
            >
              {langs.map((lang, i) => (
                <option key={i} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          {id && (
            <div style={{ display: "flex" }}>
              <a href={link}>{link}</a>
              <button
                onClick={() => {
                  if (window.navigator.clipboard) {
                      window.navigator.clipboard.writeText(link).then(() => {
                        this.setState({copied: "Copied to Clipboard!"})

                      }).catch(() => {
                        this.setState({copied: "Copied to Clipboard!"})

                      })
                  } else {
                    this.setState({copied: "Cannot copy, please copy the link manually!"})

                  }
                  setTimeout(() => {
                      this.setState({copied: "false"})
                  }, 4000)
                }}
              />
              {this.state.copied !== "false" && (<p>{this.state.copied}</p>)}
            </div>
          )}
        </div>
      );
    return (
      <div
      className="panel-header" >
            <div>
                <button onClick={() => {
                    this.props.history.push("/");
                }}>New</button>
            </div>
            <div>
                <button onClick={() => {
                    this.props.copyGist()
                }}>Copy</button>
            </div>
            {id && (
            <div style={{ display: "flex" }}>
              <a href={link}>Paste Id: {id}</a>
              <button
                onClick={() => {
                  if (window.navigator.clipboard) {
                      window.navigator.clipboard.writeText(link).then(() => {
                        this.setState({copied: "Copied to Clipboard!"})

                      })
                  } else {
                    this.setState({copied: "Cannot copy, please copy the link manually!"})

                  }
                  setTimeout(() => {
                      this.setState({copied: "false"})
                  })
                }}
              >Copy link to clipboard</button>
              {this.state.copied !== "false" && (<p>{this.state.copied}</p>)}
            </div>
          )}
      </div>
    );
  }
}
export default withRouter(Panel);
