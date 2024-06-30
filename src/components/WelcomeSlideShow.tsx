import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Button, Carousel } from "flowbite-react";
import { PuffLoader } from "react-spinners";
import "../assets/App.css"; // Import custom CSS for animations and fonts

interface ImageInfo {
  url: string;
  region: string;
}

interface WelcomeSlideShowProps {
  onSelectRegion: (region: string) => void;
}

const WelcomeSlideShow = ({ onSelectRegion }: WelcomeSlideShowProps) => {
  const [imageUrls, setImageUrls] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [animatedText, setAnimatedText] = useState<string>("Marhbabik");

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(storage, "regions");

    listAll(storageRef)
      .then((res) => {
        const promises = res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          const region = itemRef.name.split(".")[0];
          return { url, region };
        });
        Promise.all(promises).then((urls) => {
          // Ensure Kabylie is first
          const sortedUrls = urls.sort((a, b) => {
            if (a.region.toLowerCase() === "kabylie") return -1;
            if (b.region.toLowerCase() === "kabylie") return 1;
            return 0;
          });
          setImageUrls(sortedUrls);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });

    const expressions = ["MarhbaBik", "مرحبا بيك", "ⵎⴰⵔⵃⴱⴰⴱⵉⴽ"];
    let index = 0;

    const interval = setInterval(() => {
      setAnimatedText(expressions[index]);
      index = (index + 1) % expressions.length;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleRegionClick = (region: string) => {
    onSelectRegion(region.toLowerCase());
  };

  const getButtonLabel = (region: string) => {
    switch (region.toLowerCase()) {
      case "kabylie":
        return "Explore Kabylie";
      case "west":
        return "Explore West";
      case "east":
        return "Explore East";
      case "aures":
        return "Explore Aures";
      case "sahara":
        return "Explore Sahara";
      default:
        return "Explore Center"; // Default case for unmatched regions
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <PuffLoader color="#36d7b7" size={150} />
        </div>
      ) : (
        <div className="h-screen relative">
          <Carousel slide={false} className="h-full">
            {imageUrls.map((image, index) => (
              <div key={index} className="relative h-full">
                <img
                  src={image.url}
                  alt={`Image ${index}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-25 text-white p-4">
                  <h1 className="mb-4 text-5xl lg:text-9xl font-bold animated-text">
                    {animatedText}
                  </h1>
                  <h1 className="mb-4 text-6xl font-bold">
                    {image.region.toUpperCase()}
                  </h1>
                  <Button onClick={() => handleRegionClick(image.region)} className=" bg-mh-blue font-500 mt-4 hover:bg-blue-900" pill size="lg">
                    {getButtonLabel(image.region)}
                  </Button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default WelcomeSlideShow;
