import React  from 'react';
import { connect } from 'react-redux';

import * as A from '../actions'

const SelectKeyMap = ({
  keymap, keyMapOptions,
  handleSelectKeyMap
}) => (
  <select
    name="keyMap"
    defaultValue={keyMap}
    onChange={(e) => handleSelectKeyMap(e.target.value)}
  >
    {
      keyMapOptions.map(o => (
        <option
          key={keyMapOptions.indexOf(o)}
          value={o}
        >
          {upperFirst(o)}
        </option>
      ))
    }
  </select>
)
const mapStateToProps = (state) => ({
  keyMap: state.editor.keyMap,
  keyMapOptions: state.editor.keyMapOptions,
})
const mapDispatchToProps = (dispatch) => ({
  handleSelectKeyMap: (value) => dispatch(A.selectKeyMap(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectKeyMap)
