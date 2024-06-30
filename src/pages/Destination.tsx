import DestinationDetails from "../components/DestinatioinDetails";
import { FooterMB } from "../components/FooterMB";

const Destination = () => {
  return (
    <>
      <div className="bg-white pb-12 pt-16">
        <DestinationDetails />
      </div>
      
      <FooterMB/>
    </>
  );
};

export default Destination;
