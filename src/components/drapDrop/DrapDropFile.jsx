import Dropzone from "react-dropzone";
import React from "react";

class DragDropFile extends React.Component {
  constructor() {
    super();
    this.state = { files: [] };
  }

  onDrop(files) {
    this.setState({
      files
    });
    console.log("files ", files);
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            style={{
              width: "95%",
              height: "100px",
              borderWidth: "2px",
              borderColor: "#666",
              borderStyle: "dashed",
              borderRadius: "20px",
              margin: "auto",
              marginTop: "40px"
            }}
            activeStyle={{
              background: "#eee"
            }}
            onDrop={this.onDrop.bind(this)}
            onFileDialogCancel={this.onCancel.bind(this)}
          >
            <p
              style={{
                paddingTop: "10px",
                fontSize: "24px",
                textAlign: "center"
              }}
            >
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
        </div>
        <div style={{ margin: "40px" }}>
          <aside>
            <h2>Dropped files</h2>
            <ul>
              {this.state.files.map(f => (
                <li key={f.name}>
                  {f.name} - {f.size} bytes
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    );
  }
}

export default DragDropFile;
