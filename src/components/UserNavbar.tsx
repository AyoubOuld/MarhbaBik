import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from "../imgs/marhbabik.png";
import { Button } from "flowbite-react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { CiBookmark } from "react-icons/ci";
import { IoMdRemoveCircle } from "react-icons/io";
//@ts-ignore
import { auth, db } from "../config/firebase";

interface WishlistItem {
  id: string;
  name: string;
  thumbnailUrl: string;
  wilaya: string;
}

export function UserNavbar() {
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPic, setUserPic] = useState("");
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const path = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData) {
              setUserEmail(userData.email);
              setUserRole(userData.role);
              setUserFirstName(userData.firstName);
              setUserLastName(userData.lastName);
              setUserPic(userData.profilePicture);

              // Fetch wishlist data
              const wishlistData = await Promise.all(
                (userData.wisheddestinations || []).map(
                  async (destination: any) => {
                    const destinationId = destination.id;
                    const destinationDocRef = doc(
                      db,
                      "destinations",
                      destinationId
                    );
                    const destinationDocSnap = await getDoc(destinationDocRef);
                    if (destinationDocSnap.exists()) {
                      const destinationData = destinationDocSnap.data();
                      return {
                        id: destinationId,
                        name: destinationData?.name || "",
                        thumbnailUrl: destinationData?.thumbnailUrl || "",
                        wilaya: destinationData?.wilaya || "",
                      };
                    } else {
                      console.error(
                        `Destination document ${destinationId} not found`
                      );
                      return null;
                    }
                  }
                )
              );

              // Filter out null values and set the wishlist state
              setWishlist(wishlistData.filter((item) => item !== null));
            } else {
              console.error("User data or email not found");
            }
          } else {
            console.error("User document not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRemoveFromWishlist = async (item: WishlistItem) => {
    try {
      if (item.id) {
        const userDocRef = doc(db, "users", auth.currentUser?.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData && userData.wisheddestinations) {
            const updatedWishlist = userData.wisheddestinations.filter(
              (destinationId: string) => destinationId !== item.id
            );
            await updateDoc(userDocRef, {
              wisheddestinations: updatedWishlist,
            });
            setWishlist(
              wishlist.filter((wishlistItem) => wishlistItem.id !== item.id)
            );
            toast.success(`${item.name} removed from wishlist!`);
          } else {
            console.error("User data or wishlist not found");
            toast.error("Failed to remove from wishlist");
          }
        } else {
          console.error("User document not found");
          toast.error("Failed to remove from wishlist");
        }
      } else {
        console.error("Wishlist item ID is undefined");
        toast.error("Failed to remove from wishlist due to missing ID");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Sign out successful!");
      navigate("/");
    } catch (e) {
      console.error(e);
      toast.error("Sign out failed");
    }
  };

  const handleDestinationClick = (destinationId: string) => {
    navigate(`/destination/${encodeURIComponent(destinationId)}`);
  };

  return (
    <>
      <ToastContainer />
      <Navbar
        fluid
        className="fixed top-0 left-0 right-0 bg-white bg-opacity-50 backdrop-blur-md shadow-md z-50"
      >
        <Navbar.Brand href="/">
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="MarhbaBik Logo" />
        </Navbar.Brand>
        <div className="flex md:order-2 items-center space-x-4">
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-white hover:bg-blue-400 rounded-full border-0"
            >
              <CiBookmark size={"30px"} color="#3F75BB" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-mh-blue bg-opacity-0 backdrop-blur-lg rounded-box text-white w-52"
            >
              {wishlist.length > 0 ? (
                wishlist.map((destination) => (
                  <li
                    key={destination.id}
                    onClick={() => handleDestinationClick(destination.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={destination.thumbnailUrl}
                        alt=""
                        className="rounded-lg w-10 h-10"
                      />
                      <div className="flex w-full justify-between">
                        <p>
                          {destination.name}, {destination.wilaya}
                        </p>
                        <button
                          onClick={() => handleRemoveFromWishlist(destination)}
                          className="hover:text-red-600"
                        >
                          <IoMdRemoveCircle />
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li>No items in wishlist</li>
              )}
            </ul>
          </div>
          <div className="relative">
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={userPic} rounded />}
            >
              <Dropdown.Header>
                <span className="flex">
                  <span className="block text-sm mr-1">{userFirstName}</span>
                  <span className="block text-sm">{userLastName}</span>
                </span>
                <span className="block text-sm">{userEmail}</span>
                <span className="block truncate text-sm font-medium">
                  {userRole}
                </span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>
                <Button color="red">Sign Out</Button>
              </Dropdown.Item>
            </Dropdown>
          </div>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={Link} to="/">
            Home
          </Navbar.Link>
          <Navbar.Link
            active={path === "/Destinations"}
            as={Link}
            to="/Destinations"
          >
            Destinations
          </Navbar.Link>
          <li>
            <details>
              <summary className="text-black">About us</summary>
              <ul className="bg-white absolute text-black rounded-lg p-2">
                <Navbar.Link active={path === "/About"} as={Link} to="/About">
                  About us
                </Navbar.Link>
                <Navbar.Link active={path === "/FAQ"} as={Link} to="/FAQ">
                  FAQ
                </Navbar.Link>
              </ul>
            </details>
          </li>
          <li>
            <li>
              <details>
                <summary className="text-black">Join us</summary>
                <ul className="bg-white absolute text-black rounded-lg p-2">
                  <Navbar.Link
                    active={path === "/Homeowner"}
                    as={Link}
                    to="/Homeowner"
                  >
                    Home owner
                  </Navbar.Link>
                  <Navbar.Link
                    active={path === "/Carowner"}
                    as={Link}
                    to="/Carowner"
                  >
                    Car owner
                  </Navbar.Link>
                  <Navbar.Link
                    active={path === "/Agency"}
                    as={Link}
                    to="/Agency"
                  >
                    Travelling agency
                  </Navbar.Link>
                </ul>
              </details>
            </li>
          </li>
          <Navbar.Link active={path === "/Blog"} as={Link} to="/Blog">
            Blog
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
