import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
//@ts-ignore
import { db } from "../config/firebase";
import { Button } from "flowbite-react";

interface Activity {
  id: string;
  name: string;
  wilaya: string;
  categories: string[];
  imageUrl: string;
}

const WilayaActivities = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const { wilayaName } = useParams<{ wilayaName: string }>();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const q = query(
          collection(db, "activities"),
          where("wilaya", "==", wilayaName)
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
  }, [wilayaName]);

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
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">{wilayaName} Activities</h2>
        <div className="flex items-center gap-4 ">
          <label htmlFor="category">Filter by Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="border-gray-300 rounded-lg"
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
      {loading ? (
        <div className="md:flex justify-around">
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {filteredActivities.length === 0 ? (
            <div className="col-span-4 text-center text-gray-500">
              No activities found.
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="border p-4 rounded-lg text-black">
                <img
                  src={activity.imageUrl}
                  alt={activity.name}
                  className="rounded-lg mb-2"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <h3 className="font-bold">{activity.name}</h3>
                <p className="text-gray-500">{activity.wilaya}</p>
                <div className="mt-2">
                  {activity.categories &&
                    activity.categories.map((category) => (
                      <span
                        key={category}
                        className="mr-2 bg-green-100 px-2 py-1 rounded-lg text-sm"
                      >
                        {category}
                      </span>
                    ))}
                </div>
                <Button
                  className="bg-mh-blue hover:bg-mh-dark font-500 mt-4"
                  pill
                  size="lg"
                  onClick={() => alert(`More details about ${activity.name}`)}
                >
                  More Details
                </Button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default WilayaActivities;
