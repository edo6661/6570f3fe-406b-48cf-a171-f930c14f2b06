export const defaultActions = {
  add: false,
  edit: false,
  save: false,
  undo: false,
  delete: false,
}

export type EnumActions = keyof typeof defaultActions
