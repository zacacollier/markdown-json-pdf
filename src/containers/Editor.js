import React from 'react'
import { connect } from 'react-redux';
import SimpleMDE from 'react-simplemde-editor';

import * as A from '../actions'

const Editor = ({
  editorValue,
  handleChange,
 }) => (
  <div>
    <SimpleMDE
      onChange={(editorValue) => handleChange(editorValue)}
      value={editorValue}
    />
  </div>
);

const mapStateToProps = (state) => ({
  editorValue: state.editor.editorValue,
})
const mapDispatchToProps = (dispatch) => ({
  handleChange: (editorValue) => dispatch(A.updateEditorValue(editorValue)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
