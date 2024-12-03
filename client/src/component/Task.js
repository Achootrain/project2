import { Draggable } from "react-beautiful-dnd";
import { Select, Modal, Form, Button, DatePicker, Input, Dropdown } from "antd";
import { useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";


const Task = ({ item, index, deleteTask }) => {
  const [openTaskDetail, setOpenTaskDetail] = useState(false);

  const moreOptions = [
    {
      key: "1",
      label: (
        <button
          className="w-32 text-left"
          onClick={(e) => {
            deleteTask(item.task_id);
          }}
        >
          Delete
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          className="w-32 text-left"
          onClick={(e) => {
            setOpenTaskDetail(true);
          }}
        >
          Edit
        </button>
      ),
    },
  ];

  const getPriority = (value) => {
    if (value == 1) {
      return "bg-red-500"
    }
    else if (value == 2) {
      return "bg-yellow-400"
    }
    else if (value == 3) {
      return "bg-green-500"
    }
  }
  const getPriorityName = (value) => {
    if (value == 1) {
      return "Critical"
    }
    else if (value == 2) {
      return "Important"
    }
    else if (value == 3) {
      return "Normal"
    }
  }
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="w-64 pl-4 pt-3 rounded-lg bg-slate-200 shadow-sm cursor-pointer text-left">
            <div className="flex flex-row">
              <div className={`text-xs rounded-r-md  pl-1 w-1/3 text-white ${getPriority(item.priority)}`}>{getPriorityName(item.priority)}</div>
              <div className="ml-auto">
                <Dropdown
                  menu={{
                    items: moreOptions,
                  }}
                  className="flex justify-center px-2"
                  trigger={["click"]}
                >
                  <div

                    className=" w-10 px-2 "
                  >
                    <EllipsisOutlined className="  rounded-lg hover:bg-gray-200 cursor-pointer" />
                  </div>
                </Dropdown>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-x-4">
              {/* Text */}
              <div className="overflow-hidden text-ellipsis whitespace-nowrap flex-1 text-sm pt-1">
                <div className="font-bold">{item.name} </div>
              </div>
              {/* Button */}

            </div>
            <div className="pb-2 pr-1 flex justify-between items-center w-full">
              <div className="flex flex-col text-xs">
                <p>
                  <span className="">
                    {new Date(item.start_date).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, }).replace(',', '')}
                  </span>
                </p>
                <p>
                  <span className="">
                    {item.end_date ? (new Date(item.end_date).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, })).replace(',', '') : ""}
                  </span>
                </p>
              </div>
              <button
                className="rounded-full bg-blue-200 object-cover h-7 w-7 mr-4"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Clicked 2");
                }}
              >
                <img></img>
              </button>
            </div>
          </div>
          <Modal open={openTaskDetail}
            title={item.name}
            footer={null}
            onCancel={() => setOpenTaskDetail(false)}
            width={800} // Set width of the modal
          >
          </Modal>

        </div>
      )}
    </Draggable>

  );
}

export default Task;
