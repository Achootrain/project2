import React, { useState, useCallback, useEffect } from 'react';
import { Scheduler } from "@bitnoi.se/react-scheduler";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import axios from 'axios';

dayjs.extend(isBetween);

const datatask = [
  {
    start_date: "2024-11-10T09:00:00",
    end_date: "2024-11-14T13:00:00",
    task: "Team Meeting",
    description: "Discuss project updates and next steps.",
    priority: "high",
  },
  {
    start_date: "2024-11-12T14:00:00",
    end_date: "2024-11-18T18:00:00",
    task: "Design Review",
    description: "Review the new design prototypes with the team.",
    priority: "medium",
  },
  {
    start_date: "2024-11-08T10:00:00",
    end_date: "2024-11-15T14:00:00",
    task: "Client Call",
    description: "Call with the client to discuss requirements.",
    priority: "low",
  },
  {
    start_date: "2024-11-15T13:00:00",
    end_date: "2024-11-18T17:00:00",
    task: "Sprint Planning",
    description: "Plan the tasks for the next sprint.",
    priority: "high",
  },
  {
    start_date: "2024-11-07T09:00:00",
    end_date: "2024-11-13T12:00:00",
    task: "Weekly Standup",
    description: "Team standup meeting to discuss ongoing tasks.",
    priority: "medium",
  },
  {
    start_date: "2024-11-20T08:00:00",
    end_date: "2024-11-23T10:00:00",
    task: "Team Check-in",
    description: "Brief check-in with the team to ensure progress.",
    priority: "low",
  },
  {
    start_date: "2024-11-18T14:30:00",
    end_date: "2024-11-21T18:00:00",
    task: "Sprint Review",
    description: "Review the completed tasks from the sprint.",
    priority: "high",
  },
];
function Timeline({ project_id }) {
  const [tasks, setTasks] = useState([])
  const [filterButtonState, setFilterButtonState] = useState(0);
  const [data, setData] = useState([]);

  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  // fetch tasks ================================================ author: Hai
  const FetTasksHandle = async function () {
    const token = sessionStorage.getItem('token')
    try {
      const fetchTasks_res = await axios.get(`${process.env.REACT_APP_SERVER}/tasks`,
        {
          headers: { token },
          params: { project_id }
        }
      )
      const task_fetched = fetchTasks_res.data.tasks
      console.log("tasks", task_fetched)
      setTasks(task_fetched)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    FetTasksHandle()
  }, [])
  useEffect(() => {
    setData(handleScheduleData());
  }, [tasks])
  // ========================================================================

  const handleScheduleData = () => {
    if (!tasks) return [];
    const priorityOrder = {
      'high': 1,
      'medium': 2,
      'low': 3
    };

    const sortedTasks = [...tasks].sort((a, b) =>
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    const data = sortedTasks.map((item, index) => {
      return {
        id: index,
        label: {
          icon: "",
          title: `Task ${index + 1}`,
          subtitle: `${item.name}\nPriority: ${item.priority}`,
        },
        data: [
          {
            id: 1,
            startDate: new Date(item.start_date),
            endDate: new Date(item.end_date),
            title: item.name,
            subtitle: item.description,
            bgColor: item.priority === "high" ? "#f84c3b" : item.priority === "medium" ? "#ffcc00" : "#02e585",
            priority: item.priority,
          },
        ],
      };
    });
    return data;
  };

  const handleRangeChange = useCallback((range) => {
    setRange(range);
  }, []);

  handleScheduleData();
  /*
    const filteredData = SchedulerData.map((person) => ({
      ...person,
      data: person.data.filter(
        (project) =>
          dayjs(project.startDate).isBetween(range.startDate, range.endDate) ||
          dayjs(project.endDate).isBetween(range.startDate, range.endDate) ||
          (dayjs(project.startDate).isBefore(range.startDate, "day") &&
            dayjs(project.endDate).isAfter(range.endDate, "day"))
      ),
    }));
    */

  // Thêm state cho data  
  //const [data, setData] = useState(filteredData);

  // Tạo hàm xử lý filter data  
  const handleFilterData = () => {
    setFilterButtonState(1);
    setData(
      data.map((person) => ({
        ...person,
        data: person.data.filter(
          (project) =>
            (dayjs(project.endDate).isAfter(dayjs(), 'day'))
        ),
      }))
    );
  };

  // Tạo hàm xử lý clear filter  
  const handleClearFilterData = () => {
    setFilterButtonState(0);
    //setData(filteredData);
    setData(data);
  };

  return (
    <section className="h-[95%] w-full relative top-2 rounded-md border-2 border-gray-200">
      <Scheduler
        data={data} // Sử dụng state data thay vì filteredData  
        isLoading={false}
        onRangeChange={handleRangeChange}
        onFilterData={handleFilterData}
        onClearFilterData={handleClearFilterData}
        config={{
          zoom: 1,
          includeTakenHoursOnWeekendsInDayView: true,
          filterButtonState,
          defaultTheme: "light",
        }}
      />
    </section>
  );
}

export default Timeline;