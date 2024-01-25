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

  const collabs = [
    {
      Tasks: [
        {
          Task: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
          Status: "Completed",
        },
        {
          Task: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
          Status: "Pending",
        },
        {
          Task: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet",
          Status: "Pending",
        },
      ],
    },
    {
      Tasks: [
        { Task: "Task 3", Status: "Pending" },
        { Task: "Task 4", Status: "Completed" },
      ],
    },
    {
      Tasks: [
        {
          Task: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
          Status: "Completed",
        },
        {
          Task: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
          Status: "Pending",
        },
        {
          Task: "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet",
          Status: "Pending",
        },
      ],
    },
  ];

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
      {isloading ? (
        <NotifyLoader collabs={true} />
      ) : (
        <section className="flex flex-col gap-5 mt-3 mb-20">
          {collabs?.map((collab, collabIndex) => (
            <div
              key={collabIndex}
              className="border-[1px] border-zinc-800 mx-2.5 py-4 px-5 rounded-lg"
            >
              <h2 className="text-lg font-semibold text-center">
                Tasks from {"Jay"}
              </h2>
              {collab?.Tasks?.map((task, taskIndex) => (
                <div className="">
                  <div
                    key={taskIndex}
                    className="flex items-center justify-around gap-10 mt-5"
                  >
                    <div className="flex items-start justify-between w-full gap-5">
                      <div>
                        <div className="space-y-2.5 text-[12px] w-48 leading-6">
                          {task?.Task}
                        </div>
                      </div>
                      <p
                        className={`space-y-2.5 text-sm ${
                          task?.Status === "Completed"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {task?.Status}
                      </p>
                    </div>
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
