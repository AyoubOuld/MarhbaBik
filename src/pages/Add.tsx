import AddActivities from "../components/AddActivities";
import AddDestination from "../components/AddDestination";
import AddPlannedTrip from "../components/AddPlannedTrip";
import AddWilaya from "../components/AddWilaya";

const Add = () => {
  return (
    <>
      <div className="flex items-center flex-col bg-white">
        <div className=" min-w-96 m-2 p-2 rounded-md bg-slate-400">
          {" "}
          <AddWilaya />
        </div>
        <div className=" w-96 m-2 p-2 rounded-md bg-green-200">
          <AddDestination />
        </div>
        <div className=" w-96 m-2 p-2 rounded-md bg-orange-300">
          <AddActivities />
        </div>
        <div className=" w-96 m-2 p-2 rounded-md bg-amber-200">
          <AddPlannedTrip />
        </div>
      </div>
    </>
  );
};

export default Add;
