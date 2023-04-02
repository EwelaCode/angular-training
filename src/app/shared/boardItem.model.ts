// FIXME: status should be one of 3: 'Completed', 'In Progress', 'To Do'

export class BoardItem {
  constructor(public name: string, public description: string, public status: string,) {}
}
