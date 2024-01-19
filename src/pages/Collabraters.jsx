import React, { useEffect, useState } from "react";
import { BottomBar } from "../components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import NotifyLoader from "../components/notifications/NotifyLoader";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Collabraters() {
  const jwt = localStorage.getItem("jwt");
  const [isloading, setisloading] = useState(true);
  const [Tasks, setTasks] = useState();
  const docref = doc(db, "USERS", jwt);

  // const collabs = [
  //   {
  //     Tasks: [
  //       { Task: "Task 1", Status: "Completed" },
  //       { Task: "Task 2", Status: "Pending" },
  //       { Task: "Task 2", Status: "Pending" },
  //     ],
  //   },
  //   {
  //     Tasks: [
  //       { Task: "Task 3", Status: "In Progress" },
  //       { Task: "Task 4", Status: "Completed" },
  //     ],
  //   },
  // ];

  // fetching User collabs list
  const fetchUserCollabs = async () => {
    try {
      const user = await getDoc(docref);
      const currentUserTasks = user.data()?.collabs || [];
      console.log(currentUserTasks);
      setTasks(currentUserTasks);
      setisloading(false);
    } catch (error) {
      console.error(error);
      setisloading(false);
    }
  };

  useEffect(() => {
    fetchUserCollabs();
  }, []);

  return (
    <>
      <nav className="p-4">
        <div className="flex items-center w-[56vw] justify-between">
          <div>
            <Link to={"/home"}>
              <FaArrowLeft size={20} color="white" />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold">Your Tasks</h1>
          </div>
        </div>
      </nav>
      {/* <section className="flex flex-col mt-5 ">
          {collabs.map((collab, collabIndex) => (
            <div key={collabIndex}>
              <h2>Tasks for User {collabIndex}</h2>
              {collab.Tasks.map((task, taskIndex) => (
                <div
                  key={taskIndex}
                  className="flex items-center justify-around gap-10 rounded-lg border-[1px] mx-4 p-3 border-zinc-800 shadow-lg shadow-zinc-900"
                >
                  <div className="flex items-start gap-5">
                    <div className="space-y-2.5">{task.Task}</div>
                    <p className="space-y-2.5">{task.Status}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section> */}
      {isloading ? (
        <NotifyLoader collabs={true} />
      ) : (
        <section className="flex flex-col mt-5 ">
          {Tasks?.map((collab, collabIndex) => (
            <div key={collabIndex}>
              <h2>Tasks for User {collabIndex}</h2>
              {collab?.Tasks?.map((task, taskIndex) => (
                <div
                  key={taskIndex}
                  className="flex items-center justify-around gap-10 rounded-lg border-[1px] mx-4 p-3 border-zinc-800 shadow-lg shadow-zinc-900"
                >
                  <div className="flex items-start gap-5">
                    <div className="space-y-2.5">{task?.Task}</div>
                    <p className="space-y-2.5">{task?.Status}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      <BottomBar />
    </>
  );
}
