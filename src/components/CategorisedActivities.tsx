import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { PuffLoader } from "react-spinners";
//@ts-ignore
import { db } from "../config/firebase"; // Adjust the import path if necessary
import { Badge } from "flowbite-react";

interface Activity {
  id: string;
  name: string;
  destinationName: string;
  categories: string[];
  imageUrl: string;
}

interface CategorisedActivitiesProps {
  selectedWilaya: string;
}

const CategorisedActivities: React.FC<CategorisedActivitiesProps> = ({
  selectedWilaya,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const q = query(
          collection(db, "activities"),
          where("wilaya", "==", selectedWilaya)
        );
        const querySnapshot = await getDocs(q);
        const activitiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Activity[];
        setActivities(activitiesData);
        setFilteredActivities(activitiesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setLoading(false);
      }
    };

    fetchActivities();
  }, [selectedWilaya]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredActivities(activities);
    } else {
      const filtered = activities.filter((activity) =>
        activity.categories.includes(category)
      );
      setFilteredActivities(filtered);
    }
  };

  return (
    <div className="min-h-screen p-4">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <PuffLoader color="#36d7b7" size={150} />
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">{selectedWilaya} Activities</h2>
            <div className="flex items-center gap-4">
              <label htmlFor="category">Filter by Category:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Adventure">Adventure</option>
                <option value="Cultural">Cultural</option>
                <option value="Leisure">Leisure</option>
                <option value="Sports">Sports</option>
                <option value="Family">Family</option>
              </select>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            {filteredActivities.length === 0 ? (
              <div className="col-span-4 text-center text-gray-500">
                No activities found.
              </div>
            ) : (
              filteredActivities.map((activity) => (
                <div key={activity.id} className="border p-4 rounded-lg">
                  <img
                    src={activity.imageUrl}
                    alt={activity.name}
                    className="rounded-lg mb-2"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <h3 className="font-bold">{activity.name}</h3>
                  <p className="text-gray-500">{activity.destinationName}</p>
                  <div className="mt-2  flex">
                    {activity.categories &&
                      activity.categories.map((category) => (
                        <Badge className="mx-1">{category}</Badge>
                      ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategorisedActivities;
