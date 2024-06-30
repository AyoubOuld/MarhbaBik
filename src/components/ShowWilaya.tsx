import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { MoonLoader } from "react-spinners";

//@ts-ignore
import { db } from "../config/firebase";
import { CardBody, CardContainer, CardItem } from "../ui/CardComponents"; // Adjust the import path if necessary

interface Wilaya {
  id: string;
  wilayaID: string;
  name: string;
  description: string;
  regions: string[];
  imageUrl: string;
}

const ShowWilaya = ({ selectedRegion }: { selectedRegion: string }) => {
  const [wilayas, setWilayas] = useState<Wilaya[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWilayas = async () => {
      try {
        console.log("Fetching wilayas for region:", selectedRegion);
        const q = query(
          collection(db, "wilayas"),
          where("regions", "array-contains", selectedRegion)
        );
        const querySnapshot = await getDocs(q);
        const wilayasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Wilaya[];
        console.log("Fetched wilayas:", wilayasData);
        setWilayas(wilayasData);
        setLoading(false); // Data has been fetched, set loading to false
      } catch (error) {
        console.error("Error fetching wilayas:", error);
        setLoading(false); // Data has been fetched, set loading to false
      }
    };

    if (selectedRegion !== "") {
      fetchWilayas();
    } else {
      setWilayas([]); // Reset to empty array if no region is selected
    }
  }, [selectedRegion]);

  return (
    <>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <MoonLoader color="#36d7b7" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
            {wilayas.length === 0 ? (
              <div className="text-center text-gray-500">
                No wilayas found for the selected region.
              </div>
            ) : (
              wilayas.map((wilaya) => (
                <CardContainer
                  key={wilaya.id}
                  className="inter-var lg:max-w-72 md:max-w-[25rem] sm:w-full "
                >
                  <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto  lg:max-w-[40rem] md:w-[100rem] sm:w-full max-[1000px]:w-[20rem]  h-auto rounded-xl p-6 border">
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-neutral-600 dark:text-white text-center w-full"
                    >
                      {wilaya.name}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4">
                      <img
                        src={wilaya.imageUrl}
                        height="1000"
                        width="1000"
                        className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt={wilaya.name}
                      />
                    </CardItem>
                    <div className="flex justify-center items-center mt-3">
                      <CardItem
                        translateZ={20}
                        as={Button}
                        onClick={() => navigate(`/wilaya/${wilaya.name}`)}
                        className="px-4 py-2 rounded-full bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-blue-500"
                      >
                        Explore {wilaya.name}
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ShowWilaya;
