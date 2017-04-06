import React, { Component } from 'react';
import Editor from './Editor'
import { connect } from 'react-redux'
import './vendor.css'

const App = ({ value, handleChange }) => (
  <div className='container container-narrow'>

    <Editor
      onChange={(edValue) => handleChange(edValue)}
      value={value}
    />
  </div>
);

const mapStateToProps = (state) => ({
  value: state.editor.value
})
const mapDispatchToProps = (dispatch) => ({
  handleChange: (edValue) => dispatch({ type: 'EDITOR_CHANGE', edValue })
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
