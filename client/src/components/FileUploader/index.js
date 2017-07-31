import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from 'react-dropzone';
import { addFileAct, uploadFileAct, loadFilesAct, removeFileAct } from "../../actions/index";
import uploadDocumentTypes from "../../constants/uploadDocumentTypes";

const requiredFields = [0, 1, 2];

class FileUploader extends Component {
    componentDidMount(){
        this.props.loadFiles();
    }

    render() {
        return (
            <div>
                <h4>File uploader...</h4>
                <section>
                    <div className="row">
                        {Object.keys(uploadDocumentTypes).map(type => {
                            return (
                                <div key={type} className="col-md-2">
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
                    </div>
                    <div className="row">
                        <h2>Added files</h2>
                        <ul>
                            { Object.keys(this.props.addedFiles).map(f => {
                                return (
                                    <li key={f}>
                                        {`${uploadDocumentTypes.getDescription(f)}: `}{this.props.addedFiles[f].name} - {this.props.addedFiles[f].size} bytes
                                    </li>
                                )
                            }) }
                        </ul>  
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Madartory documents</h2>
                            <ul className="list-group">
                                { this.props.uploadedFiles.filter(f => requiredFields.includes(f.DocumentType)).map(f => {
                                    return (
                                        <li className="list-group-item" key={f.Id}>
                                            {`${f.FileName} - ${uploadDocumentTypes.getDescription(f.DocumentType)}`}
                                            <span className="glyphicon glyphicon-remove" onClick={() => {this.props.removeFile(f.Id)}}></span>
                                        </li>
                                    )
                                })}
                            </ul>  
                        </div>

                        <div className="col-md-6">
                            <h2>Supporting Documents</h2>
                            <ul className="list-group">
                                { this.props.uploadedFiles.filter(f => !requiredFields.includes(f.DocumentType)).map(f => {
                                    return (
                                        <li className="list-group-item" key={f.Id}>
                                            {`${f.FileName} - ${uploadDocumentTypes.getDescription(f.DocumentType)}`} 
                                            <span className="glyphicon glyphicon-remove" onClick={() => {this.props.removeFile(f.Id)}}></span>
                                        </li>
                                    )
                                })}
                            </ul>  
                        </div>
                    </div>
                    
                    <button
                        className="btn btn-info"
                        onClick={() => {this.props.uploadFiles(this.props.addedFiles)}}
                    >
                        Upload {Object.keys(this.props.addedFiles).length} file{Object.keys(this.props.addedFiles).length > 1 ? 's' : ''}
                    </button>
                </section>
                
                
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
        uploadFiles: (fileObj) => dispatch(uploadFileAct(fileObj)),
        loadFiles: () => dispatch(loadFilesAct()),
        removeFile: (id) => dispatch(removeFileAct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);