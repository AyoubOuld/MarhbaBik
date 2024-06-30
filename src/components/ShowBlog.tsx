import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Man from "../imgs/man.png"
//@ts-ignore
import { db } from "../config/firebase";
import { Badge } from "flowbite-react";

interface Blog {
  id: string;
  documentId: string;
  title: string;
  content: string;
  categories?: string[];
  wilaya: string;
  timestamp?: { seconds: number; nanoseconds: number };
  imageUrl?: string;
}

interface User {
  uid: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

const ShowBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<{ [key: string]: User }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedWilaya, setSelectedWilaya] = useState<string>("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsCollection = collection(db, "Blogs");
        const blogsSnapshot = await getDocs(blogsCollection);
        const blogsList: Blog[] = [];

        const userPromises: Promise<void>[] = [];

        blogsSnapshot.forEach((doc) => {
          const docData = doc.data();
          if (docData.blogs) {
            for (const key in docData.blogs) {
              const blogData = docData.blogs[key];

              blogsList.push({
                id: key,
                documentId: doc.id,
                ...blogData,
                imageUrl: blogData.imageUrls
                  ? blogData.imageUrls[0]
                  : undefined,
              });

              if (!users[doc.id]) {
                userPromises.push(fetchUser(doc.id));
              }
            }
          }
        });

        await Promise.all(userPromises);

        console.log("Extracted blogs:", blogsList);
        setBlogs(blogsList);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async (userId: string) => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUsers((prevUsers) => ({
            ...prevUsers,
            [userId]: { uid: userId, ...userDocSnap.data() } as User,
          }));
        } else {
          console.warn(`User document with ID ${userId} does not exist.`);
        }
      } catch (error) {
        console.error(`Error fetching user document with ID ${userId}:`, error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    console.log("Users state:", users);
  }, [users]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleWilayaChange = (wilaya: string) => {
    setSelectedWilaya(wilaya);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const categoryMatch =
      selectedCategory === "" || blog.categories?.includes(selectedCategory);
    const wilayaMatch = selectedWilaya === "" || blog.wilaya === selectedWilaya;
    return categoryMatch && wilayaMatch;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const uniqueCategories = Array.from(
    new Set(blogs.flatMap((blog) => blog.categories || []))
  );

  const uniqueWilayas = Array.from(new Set(blogs.map((blog) => blog.wilaya)));

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center pb-4">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border border-gray-300 rounded-md p-2 mr-2"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedWilaya}
          onChange={(e) => handleWilayaChange(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="">All Wilayas</option>
          {uniqueWilayas.map((wilaya) => (
            <option key={wilaya} value={wilaya}>
              {wilaya}
            </option>
          ))}
        </select>
      </div>
      {filteredBlogs.map((blog) => (
        <div
          key={blog.id}
          className="card card-side bg-base-100 shadow-xl mb-4"
        >
          <figure className="w-1/3">
            {blog.imageUrl ? (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                src={Man}
                className="object-cover w-full h-full"
              />
            )}
          </figure>
          <div className="card-body bg-gray-50 rounded-r-xl">
            <div className="flex w-full justify-between">
              <div className="">
                {users[blog.documentId] ? (
                  <div className="flex items-center mb-4">
                    {users[blog.documentId].profilePicture ? (
                      <img
                        src={users[blog.documentId].profilePicture}
                        alt={`${users[blog.documentId].firstName} ${
                          users[blog.documentId].lastName
                        }`}
                        className="w-6 h-6 rounded-full mr-4"
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/400x300"
                        alt="Placeholder"
                        className="object-cover w-6 h-6 rounded-full mr-4"
                      />
                    )}
                    <div>
                      <p className="text-lg font-bold">{`${
                        users[blog.documentId].firstName
                      } ${users[blog.documentId].lastName}`}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-500">
                    User data not found for blog ID: {blog.id}
                  </p>
                )}
              </div>
              <div className="">
                {blog.timestamp ? (
                  <p className="text-gray-500">
                    {blog.wilaya},{" "}
                    {new Date(
                      blog.timestamp.seconds * 1000
                    ).toLocaleDateString()}
                  </p>
                ) : null}
              </div>
            </div>
            <h2 className="card-title text-black text-3xl font-bold">
              {blog.title}
            </h2>
            <p className="text-gray-700">{blog.content}</p>
            <div className="">
              {blog.categories && blog.categories.length > 0 && (
                <div className="flex flex-wrap mt-2">
                  {blog.categories.map((category, index) => (
                    <Badge key={index} className="rounded-full mx-1">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn bg-mh-blue border-0 text-white rounded-full">Read More</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowBlogs;
