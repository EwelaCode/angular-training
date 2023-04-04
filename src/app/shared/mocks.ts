import { BoardItem } from "./boardItem.model";

export const initialBoardItems = [
    new BoardItem(
      'Create Header',
      'Create header on the top of the page',
      'Completed'
    ),
    new BoardItem(
      'Create Scrum Board Component',
      'Create a component for displaying the Scrum board items',
      'In Progress'
    ),
    new BoardItem(
      'Display tasks parameters on Scrum Board',
      'Use data binding to display the item name, description, and status.',
      'To Do'
    ),
  ];
