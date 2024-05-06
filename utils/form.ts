import { defaultActions } from "@/constants/defaultActions";

export const getForm = (
  actions: typeof defaultActions,
  allChecked: boolean
) => {
  const { add, edit, save, undo, delete: _del } = actions;
  return {
    getTitle: () => {
      switch (true) {
        case add:
          return "Add Item";
        case edit:
          return "Edit Item";
        case _del:
          return "Delete Item";
        default:
          return null;
      }
    },
    getDescription: () => {
      switch (true) {
        case add:
          return "Add a new item to the list";
        case edit:
          return "Edit the item";
        case _del:
          return allChecked
            ? "Are you sure you want to delete all items?"
            : "Are you sure you want to delete this item?";
        default:
          return null;
      }
    },
  };
};
