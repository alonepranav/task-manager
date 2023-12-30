"use client";

const { FiTrash2 } = require("react-icons/fi");

const Task = ({ title, description, status,_id, deleteTask }) => {

  return (
    <>
      <div
        className={`border border-slate-400 ${
          status === "completed" ? "bg-emerald-300" : "bg-slate-100"
        } rounded-md px-2 py-2 pr-6 mb-4 flex gap-2 flex-col`}
      >
        <p className="font-semibold underline">{title}</p>
        <div className="flex justify-between items-start">
          <p>{description}</p>
          <div>
            <FiTrash2 className="text-xl" onClick={()=>deleteTask(_id)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
