export const initialState = {
  editor: {
    editorValue: '',
  },
  save: {
    standBy: true,
    pending: null,
    success: null,
    error: null,
  }
}
export const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'EDITOR_CHANGE':
      return { ...state, editor: { ...state.editor, editorValue: action.editorValue } }
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
            success: true
          }
      }
    case 'EDITOR_SAVE_ERROR':
      return { ...state, save:
          {
            ...state.save,
            pending: null,
            standBy: true,
            success: false,
            error: action.error
          }
      }
    case 'RESET_EDITOR_SAVE_STATE':
      return { ...state, save: initialState.save }
    default:
      return state
  }
}
