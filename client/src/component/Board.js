import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Select, DatePicker } from "antd";
import Task from "./Task";
import { RandomCol } from "./RandomCol";
import axios from "axios";

const Board = ({ id }) => {
  const project_id = id;
  const [tasks, setTasks] = useState([]);
  const [newTaskType, setNewTaskType] = useState("To do");
  const [newTaskName, setNewTaskName] = useState("");
  const [newColumnName, setNewColumnName] = useState("");
  const [columns, setColumns] = useState({})
  const [columnsFromBackend, setColumnsFromBackend] = useState({})

  // Fetch task handle ====================================================author: Hai
  // fetch tasks and create columns -------------------------------------------------
  const fetchTaskHandle = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const res = await axios.get(`${process.env.REACT_APP_SERVER}/tasks/`,
        {
          headers: {
            token: `${token}`
          },
          params: { project_id }
        })

      const task_fetched = res.data.tasks
      console.log("tasks", task_fetched)
      setTasks(task_fetched)

      // Xử lý columns:-------------------------------------------------
      // Base columns ---------------------------
      const columnConfigs = {
        Kanban: ['To do', 'In Progress', 'Done'],
        Scrum: ['To do', 'In Progress', 'Done'],
        "Extreme Program": ['Planning', 'Design', 'Coding', 'Testing', 'Listening'],
      };

      const project_fetch = await axios.get(
        `${process.env.REACT_APP_SERVER}/projects/getone`,
        {
          headers: { token },
          params: { project_id },
        }
      );

      const model = project_fetch.data.project.model;
      const colums_be = {};

      (columnConfigs[model] || []).forEach((type) => {
        colums_be[type] = {
          title: type,
          items: [],
          bg: RandomCol(),
        };
      });
      // -----------------------------------------

      task_fetched.forEach(task => {
        const type = task.type;
        if (!colums_be[type]) {
          colums_be[type] = {
            title: type,
            items: [],
            bg: RandomCol()
          };
        }
        colums_be[type].items.push({ ...task, id: task.id.toString() });
      });
      setColumnsFromBackend(colums_be);
      // ----------------------------------------------------------------
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTaskHandle();
  }, [])
  useEffect(() => {
    setColumns({ ...columnsFromBackend })
  }, [columnsFromBackend])
  // ===============================================================================

  const addColumn = () => {
    if (!newColumnName.trim()) return; // Prevent adding columns with empty names
    if (columns[newColumnName]) {
      alert("Column already exists!");
      return;
    }

    setColumns((prevColumns) => ({
      ...prevColumns,
      [newColumnName]: {
        title: newColumnName,
        items: [],
        bg: RandomCol(), // Assign a random background color
      },
    }));
    setNewColumnName(""); // Clear the input after adding the column
  };

  // Them task mơi
  const addTask = () => {
    const newId = tasks.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
    if (newTaskName.trim() === "") return;
    const newTask = {
      id: newId,
      project_id,
      name: newTaskName,
      descriptions: "",
      start_date: "",
      end_date: "",
      status: "",
      priority: "",
      type: newTaskType,
    };
    setTasks((prevItems) => [...prevItems, newTask]);
    const targetColumn = columns[newTaskType];
    const targetItems = targetColumn.items;
    setColumns({
      ...columns,
      [newTaskType]: {
        ...targetColumn,
        items: [...targetItems, { ...newTask, id: newTask.id.toString() }],
      },
    });
  };

  // Xu ly keo tha
  const onDragEnd = (result, columns, setColumns) => {
    const { draggableId, source, destination } = result;

    if (!result.destination) return; // Neu ko trong vung tha thi thoat
    console.log("dragID: ", draggableId)
    console.log("columns: ", columns)
    //neu khac cot
    if (source.droppableId !== destination.droppableId) {
      const task = tasks.find((item) => item.id == draggableId); // task dang dc keo
      const sourceColumn = columns[source.droppableId]; // cot bi keo
      const destColumn = columns[destination.droppableId]; // cot dc tha
      const sourceItems = [...sourceColumn.items]; // cac task trong cot bi keo
      const destItems = [...destColumn.items]; // cac task trong cot dc tha

      task.type = destColumn.title; // thay doi type cua task

      const [removed] = sourceItems.splice(source.index, 1); //xoa task bi keo trong cot nguon
      destItems.splice(destination.index, 0, removed); // them task bi keo vao cot dich

      // Update lai danh sach cac cot
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      // Neu cung cot:
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <div className="flex flex-col">
      <div className="px-4 pt-2">
        <h1 className="text-xl font-bold">Kanban Board</h1>
      </div>
      {/* Tittle */}
      <div className="flex flex-row gap-2 p-4">
        <input
          type="text"
          className="rounded-md text-lg border-2 px-2"
          placeholder="Add your task name ..."
          onChange={(e) => setNewTaskName(e.target.value)}
        ></input>
        <Select
          placeholder="Select type"
          size="large"

          onChange={(e) => setNewTaskType(e)}
          options={Object.values(columns).map((column) => ({
            value: column.title,
            label: column.title,
          }))}
        />
        <button
          className=" font-bold p-2 rounded-lg  bg-gray-300  hover:bg-blue-400 hover:text-white"
          onClick={addTask}
        >
          Add Task
        </button>
        <div className="flex flex-row gap-x-2 justify-end ">
          <input
            type="text"
            className="rounded-md text-lg border-2 px-2 "
            placeholder="Add new column ..."
            onChange={(e) => setNewColumnName(e.target.value)}
          ></input>
          <button
            className=" font-bold p-2 rounded-lg  bg-gray-300  hover:bg-blue-400 hover:text-white"
            onClick={addColumn}
          >
            Add New Column
          </button>
        </div>
      </div>

      <div className="pl-4 flex flex-row gap-x-4 overflow-x-auto ">
        <DragDropContext
          onDragEnd={(result) => {
            onDragEnd(result, columns, setColumns);
          }}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div className="flex flex-col w-72 ">
                {/* Tittle column */}
                <div className={`flex justify-center text-white items-center h-10 rounded-t-md border-2 border-b-0 ${column.bg}`}>
                  <h2 className="text-xl font-bold"> {column.title}</h2>
                </div>
                {/* Task */}
                <div className="flex flex-col gap-y-2">
                  <Droppable key={columnId} droppableId={columnId}>
                    {(provided, snapshot) => (

                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="h-80 w-72 overflow-auto pt-3 flex flex-col gap-2 items-center border-2 border-t-0  rounded-b-md"
                      >
                        {column.items.map((item, index) =>
                        (
                          <Task key={item.id} item={item} index={index} />
                        )
                        )}
                        {provided.placeholder}
                      </div>

                    )}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>

      </div>

    </div>
  );
};

export default Board;
