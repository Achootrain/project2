import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="p-4 items-start min-h-20 w-64 rounded-lg bg-gray-50 border-2 border-black">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap"
            >{item.Name}
            </div>
            
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;