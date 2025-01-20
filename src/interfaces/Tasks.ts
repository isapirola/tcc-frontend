export interface Task {
  id: string;
  title: string;
  priority: string;
  duration: number;
  notes: string;
  category: string;
  finished: boolean;
}

export interface Category {
  id: string;
  name: string;
  duration: number;
}

export interface GroupedTasks extends Category {
  tasks: Task[];
}

export interface TaskUpdatePayload {
  title?: string;
  category?: string;
  priority?: string;
  duration?: number;
  notes?: string;
  finished?: boolean;
}
