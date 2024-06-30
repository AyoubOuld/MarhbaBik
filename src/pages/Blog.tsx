import AddBlog from "../components/AddBlog";
import { FooterMB } from "../components/FooterMB";
import ShowBlog from "../components/ShowBlog";
import blog from "../imgs/blog.png";
import blogger from "../imgs/blogger.png";
const Blog = () => {
  return (
    <>
      <div className="bg-white pt-16">
        <h1 className="w-full py-10 mb-5 text-center text-black font-bold text-5xl">
          Check other people's <br />{" "}
          <span className="text-mh-blue"> experiences </span> with{" "}
          <span className="text-mh-blue"> MarhbaBik </span>
        </h1>
        <div className="w-full flex justify-center">
          <img className="w-2/3" src={blog} alt="" />
        </div>
        <ShowBlog />
        <div className="bg-slate-100 pb-12">
          <h1 className="w-full py-10 mb-5 text-center text-black font-bold text-5xl">
            Share your <span className="text-mh-blue"> experience </span> with
            others
          </h1>
          <div className="md:flex ">
            <div className="md:w-1/2 flex self-center">
              <img src={blogger} alt="" />
            </div>
            <div className="">
              <AddBlog />
            </div>
          </div>
        </div>
      </div>
      <FooterMB/>
    </>
  );
};

export default Blog;
