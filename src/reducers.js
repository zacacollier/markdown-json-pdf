export const initialState = {
  editor: {
    editorValue: '',
    keyMap: 'default',
    keyMapOptions: [
      'default', 'vim', 'emacs'
    ]
  },
  Markup: {
    preview: '<div></div>',
  },
  save: {
    standBy: true,
    pending: null,
    error: null,
  }
}
export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'EDITOR_CHANGE':
      return { ...state, editor: { ...state.editor, editorValue: action.editorValue } }
    case 'EDITOR_SET_KEYMAP':
      return { ...state, editor: { ...state.editor, keyMap: action.value } }
    case 'REQUEST_EDITOR_SAVE':
      return { ...state, save:
          {
            ...state.save,
            standBy: false,
            pending: true
          }
      }
    case 'EDITOR_SAVE_SUCCESS':
      return { ...state, save:
          {
            ...state.save,
            pending: null,
            standBy: true,
          }
      }
    case 'EDITOR_SAVE_ERROR':
      return { ...state, save:
          {
            ...state.save,
            pending: null,
            standBy: true,
            error: action.error
          }
      }
    case 'REQUEST_HTML_PREVIEW':
      return { ...state, Markup:
        { ...state.Markup, preview: action.markup }
      }
    case 'RESET_EDITOR_SAVE_STATE':
      return { ...state, save: initialState.save }
    default:
      return state
  }
}
