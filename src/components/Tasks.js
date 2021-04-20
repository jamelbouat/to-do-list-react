import React from 'react';
import Task from './Task';

const Tasks = ({ tasks, onTaskUpdate, onDeleteTask }) => (
    tasks.length > 0 ?
        tasks.map(task =>
                <Task
                    key={ task.id }
                    task={ task }
                    onTaskUpdate={ onTaskUpdate }
                    onDeleteTask={ onDeleteTask }
                />
                ) :
        'No tasks !'
);

export default Tasks;
