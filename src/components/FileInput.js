import React, { Component,ReactDOM } from 'react'

/**
 * 读取文件内容Demo类，测试使用
 */
class FileInput extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
      event.preventDefault();
      alert(
        `Selected file - ${this.fileInput.files[0].name}`
      );
    }

    handleFiles = (ev) => {
        ev.preventDefault();
        var files = this.fileInput.files[0]; 
    
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                var airdropAddress = e.target.result.split('\n');
                 alert(
                  `Selected333 file - ${
                    airdropAddress
                  }`
                  );
            };
        })(files);
        reader.readAsText(files);
    
    
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Upload file:
            <input
              type="file"
              ref={input => {
                this.fileInput = input;
              }} onChange={this.handleFiles}
  
            />
  
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      );
    }
  }
  

  export default FileInput  