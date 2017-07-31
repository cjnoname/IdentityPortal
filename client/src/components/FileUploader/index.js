import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from 'react-dropzone';
import { addFileAct, uploadFileAct } from "../../actions/index";
import uploadDocumentTypes from "../../constants/uploadDocumentTypes";

class FileUploader extends Component {
    render() {
        console.log(Object.keys(uploadDocumentTypes))
        console.log("addedFiles: ", this.props.addedFiles)
        console.log("::", this.props.uploadFiles)
        return (
            <div>
                <h4>File uploader...</h4>
                <section>
                    {Object.keys(uploadDocumentTypes).map(type => {
                        return (
                            <div key={type}>
                                {this.props.addedFiles[uploadDocumentTypes[type]] &&
                                    <span>{`Selected File: ${uploadDocumentTypes.getDescription(uploadDocumentTypes[type])}, ${uploadDocumentTypes[type]}`}</span>}
                                <Dropzone
                                    accept="image/jpeg, image/png"
                                    disableClick={!!this.props.addedFiles[uploadDocumentTypes[type]]}
                                    style={{width: 160, height: 60, border: "1px dashed black", marginBottom: 5}}
                                    onDrop={ (acceptedFiles, rejected) => {
                                        acceptedFiles.length > 0 && this.props.addFile(uploadDocumentTypes[type], acceptedFiles[acceptedFiles.length - 1]);
                                     }}
                                >
                                    <p>Drop your {uploadDocumentTypes.getDescription(uploadDocumentTypes[type])} here</p>
                                </Dropzone>
                            </div>
                        )
                    })}

                    <aside>
                        <h2>Added files</h2>
                        <ul>
                            { Object.keys(this.props.addedFiles).map(f => {
                                console.log(f)
                                return (
                                    <li key={f}>
                                        {`${uploadDocumentTypes.getDescription(f)}: `}{this.props.addedFiles[f].name} - {this.props.addedFiles[f].size} bytes
                                    </li>
                                )
                            }) }
                        </ul>  
                    </aside>
                    <aside>
                        <h2>Uploaded files</h2>
                        <ul>
                            { Object.keys(this.props.uploadedFiles).map(f => {
                                console.log(f)
                                return <li key={f}>{`${uploadDocumentTypes.getDescription(f)}: `}{this.props.uploadedFiles[f].name} - {this.props.uploadedFiles[f].size} bytes</li>
                            }) }
                        </ul>  
                    </aside>
                </section>
                <button
                    className="btn btn-info"
                    onClick={() => {this.props.uploadFiles(this.props.addedFiles)}}
                >
                    Upload {Object.keys(this.props.addedFiles).length} file{Object.keys(this.props.addedFiles).length > 1 ? 's' : ''}
                </button>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        addedFiles: state.file.addedFiles,
        uploadedFiles: state.file.uploadedFiles
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addFile: (fileCategory, file) => dispatch(addFileAct(fileCategory, file)),
        uploadFiles: (fileObj) => dispatch(uploadFileAct(fileObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);