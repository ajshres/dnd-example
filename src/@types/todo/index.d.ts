type TPriorityQuadrant = 1 | 2 | 3 | 4;
type TLabelId = string;
type TListId = string;

interface BaseTodo {
    id: string;
    text: string;
    isCompleted: boolean;
    isDeleted: boolean;
    version: string;
    completedAt: string;
    updatedAt: string;
    createdAt: string;
}

interface Todo extends BaseTodo {
    labels: TLabelId[],
    priorityQuadrant: TPriorityQuadrant
    isFavorite: boolean;
    isMyDay: boolean;
    dueDate: string;
    subTasks: BaseTodo[];
    listId?: TListId;
    notes: string;
}

interface ILabel {
    id: TLabelId;
    name: string;
    color: string;
}

interface IList {
    id: TListId;
    name: string;
}

interface INotes {
    id: string;
    labels: TLabelId[];
    title: string;
    description: string;
    notes: string;
    version: string;
    completedAt: string;
    updatedAt: string;
    createdAt: string;
}