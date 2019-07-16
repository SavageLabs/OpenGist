import React, { Component } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.main";
import Panel from "./Panel";
import { savePaste, fetchPaste } from "../Api";

export default class View extends Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      newPaste: !id || id === null,
      language: "plaintext",
      id: id
    };
  }
  assignRef = component => {
    this.containerElement = component;
  };
  componentWillUnmount() {
    this.destroyMonaco();
  }
  destroyMonaco() {
    if (typeof this.editor !== "undefined") {
      this.editor.dispose();
    }
  }

  componentDidMount() {
    if (this.state.newPaste) {
      this.editor = monaco.editor.create(this.containerElement, {
        value: "",
        language: "plaintext",
        theme: "vs-dark",
        minimap: {
          enabled: false
        },
        automaticLayout: true,
        contextmenu: false
      });
    } else {
      fetchPaste(this.props.match.params.id).then(response => {
        const { data } = response;
        if (data.success) {
          this.editor = monaco.editor.create(this.containerElement, {
            value: data.paste.content,
            language: data.paste.language,
            theme: "vs-dark",
            minimap: {
              enabled: false
            },
            readOnly: true,
            automaticLayout: true,
            contextmenu: false
          });
        } else {
          this.props.history.push("/");
        }
      });
    }
  }
  savePaste = () => {
    const modal = this.editor.getModel();
    const text = modal.getValue();
    const language = modal.getModeId();
    if(text.length < 5) {
        return;
    }
    savePaste(language, text).then(response => {
      const { data } = response;
      if (data.success) {
        this.setState({ newPaste: false, id: data.id }, () => {
            window.history.pushState(null, "Gist", `/view/${data.id}`)
          this.editor.updateOptions({ readOnly: true });
        });
      }
    });
  };
  copyGist = () => {
        this.setState({newPaste: true, id: null, language: this.editor.getModel().getModeId()}, () => {
            window.history.pushState(null, "Gist", "/")
            this.editor.updateOptions({ readOnly: false });

        })
  }
  updateLanguage = language => {
    monaco.editor.setModelLanguage(this.editor.getModel(), language);
    this.setState({ language });
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh"
        }}
      >
        <Panel
          id={this.state.id}
          currentLanguage={this.state.language}
          savePaste={() => this.savePaste()}
          newPaste={this.state.newPaste}
          updateLanguage={language => this.updateLanguage(language)}
          copyGist={() => this.copyGist()}
        />
        <div
          ref={this.assignRef}
          style={{ width: "100%", flexGrow: "1" }}
          className="react-monaco-editor-container"
        />
      </div>
    );
  }
}
