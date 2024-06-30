import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import WilayaDestinations from "../components/WilayaDestinations";
import WilayaActivities from "../components/WilayaActivities";
import "../assets/App.css";
import { PuffLoader } from "react-spinners";
import { GiAncientRuins } from "react-icons/gi";
import { SiApplearcade } from "react-icons/si";
import { FaTree } from "react-icons/fa";
import { FaTreeCity } from "react-icons/fa6";
import { SiOpenstreetmap } from "react-icons/si";
import { FaStreetView } from "react-icons/fa6";
//@ts-ignore
import { db } from "../config/firebase"; // Adjust the import path if necessary
import { Tabs } from "flowbite-react";
import CategorisedDestinations from "../components/CategorisedDestinations";
import PlannedTrip from "../components/PlannedTrip";
import { FooterMB } from "../components/FooterMB";

const Wilaya = () => {
  const { wilayaName } = useParams<{ wilayaName: string }>();
  const [wilayaImageUrl, setWilayaImageUrl] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWilaya = async () => {
      try {
        if (wilayaName) {
          console.log(`Fetching data for wilaya: ${wilayaName}`);
          const q = query(
            collection(db, "wilayas"),
            where("name", "==", wilayaName)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const wilayaData = querySnapshot.docs[0].data();
            console.log("Wilaya Data:", wilayaData);
            setWilayaImageUrl(wilayaData.imageUrl);
            setLoading(false);
          } else {
            console.log("No wilaya found with this name");
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching wilaya:", error);
        setLoading(false);
      }
    };

    fetchWilaya();
  }, [wilayaName]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-white">
          <PuffLoader color="#36d7b7" size={150} />
        </div>
      ) : (
        <>
          <div className="bg-white pt-16">
            <div className="overflow-x-auto">
              <div
                className="parallax-mh"
                style={{ backgroundImage: `url(${wilayaImageUrl})` }}
              >
                <div className="overlay-mh">
                  <h1 className="wilaya-name">{wilayaName}</h1>
                </div>
              </div>
              <Tabs
                aria-label="Full width tabs"
                style="default"
                className="rounded-t-2xl relative bottom-2 bg-white flex justify-center"
              >
                <Tabs.Item active title="All destinations" icon={SiOpenstreetmap}>
                  <div className="p-4 w-full">
                    <h1 className="text-4xl font-bold m-12 text-mh-dark font-800 text-center">
                      Top <span className="text-mh-blue">destinations</span> in <span className="text-mh-blue">{wilayaName}</span>
                    </h1>
                    {wilayaName && <WilayaDestinations />}
                    <h1 className="text-4xl font-bold m-12 text-mh-dark font-800 text-center">
                      <span className="text-mh-blue">Activities</span> in <span className="text-mh-blue">{wilayaName}</span>
                    </h1>
                    {wilayaName && <WilayaActivities />}
                  </div>
                </Tabs.Item>
                <Tabs.Item title="Naturel" icon={FaTree}>
                  <h1 className="text-4xl font-bold m-12 text-mh-dark font-800 text-center ">
                    Top <span className="text-mh-blue">Natural</span> destinations in <span className="text-mh-blue">{wilayaName}</span>
                  </h1>
                  {wilayaName && (
                    <CategorisedDestinations
                      category="Naturel"
                      selectedWilaya={wilayaName}
                    />
                  )}
                </Tabs.Item>
                <Tabs.Item title="Arcade" icon={SiApplearcade}>
                  <h1 className="text-4xl font-bold m-12 text-mh-dark font-800 text-center">
                    Top <span className="text-mh-blue">Arcades</span> in <span className="text-mh-blue">{wilayaName}</span>
                  </h1>
                  {wilayaName && (
                    <CategorisedDestinations
                      category="Arcade"
                      selectedWilaya={wilayaName}
                    />
                  )}
                  
                </Tabs.Item>
                <Tabs.Item title="Culturel" icon={FaTreeCity}>
                  <h1 className="text-4xl font-bold m-12 text-mh-dark font-800 text-center">
                    Top <span className="text-mh-blue">Cultural</span> destinations in <span className="text-mh-blue">{wilayaName}</span>
                  </h1>
                  {wilayaName && (
                    <CategorisedDestinations
                      category="Culturel"
                      selectedWilaya={wilayaName}
                    />
                  )}
                  
                </Tabs.Item>
                <Tabs.Item title="Historique" icon={GiAncientRuins}>
                  <h1 className="text-4xl font-bold m-12 text-mh-dark font-800 text-center">
                    Top <span className="text-mh-blue">Historical</span> destinations in <span className="text-mh-blue">{wilayaName}</span>
                  </h1>
                  {wilayaName && (
                    <CategorisedDestinations
                      category="Historique"
                      selectedWilaya={wilayaName}
                    />
                  )}
                </Tabs.Item>
                <Tabs.Item title="MarhbaBik's Recommendations" icon={FaStreetView}>
                  <h1 className="text-4xl font-bold m-12 text-mh-dark font-800 text-center">
                    <span className="text-mh-blue">MarhbaBik's</span> Recommendations in <span className="text-mh-blue">{wilayaName}</span>
                  </h1>
                  {wilayaName && <PlannedTrip wilayaName={wilayaName} />}
                </Tabs.Item>
              </Tabs>
            </div>
          </div>
          <FooterMB/>
        </>
      )}
    </>
  );
};

export default Wilaya;
