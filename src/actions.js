import { saveState } from './localStorage';
import FileSaver from 'file-saver';
import showdown from 'showdown';

export const blob = (value) => new Blob([value], { type: "text/plain;charset=utf-8" })

export const updateEditorValue = (editorValue) => {
  saveState(editorValue)
  return { type: 'EDITOR_CHANGE', editorValue }
}

// TODO: implement compatibility-detection between browsers
// have a look at console.log(window.navigator.userAgent)
export const saveMarkdown = (editorValue) => {
  const fileMd = blob(editorValue)
  return async (dispatch) => {
    try {
      dispatch({ type: 'REQUEST_EDITOR_SAVE', editorValue })
      const save = await FileSaver.saveAs(fileMd, "file.md")
      if (save) {
        dispatch({ type: 'EDITOR_SAVE_SUCCESS' })
      }
    }
    catch (err) {
      dispatch({ type: 'EDITOR_SAVE_ERROR', err })
    }
  }
}

export const saveMarkdownToPDF = (editorValue) => {
  return
}

export const selectKeyMap = (value) => ({ type: 'EDITOR_SET_KEYMAP', value })
