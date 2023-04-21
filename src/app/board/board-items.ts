export interface BoardItems {
    columns: BoardColumn[]
}

export interface BoardColumn {
  tasks:	BoardItem[],
  id:	string,
  createdAt:	string,
  title:	string,
}

export interface BoardItem {
  id?:	string,
  title:	string,
  description:	string,
  columnId:	string,
}


