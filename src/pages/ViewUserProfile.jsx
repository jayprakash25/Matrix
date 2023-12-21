import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ViewUserProfile() {
  const UserPosts = [
    {
      image:
        "https://images.pexels.com/photos/12909594/pexels-photo-12909594.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      Text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates est culpa dolorem, obcaecati, nostrum fugit doloribus velit cum delectus modi doloremque aperiam iure hic aspernatur assumenda illo corporis repudiandae? Veritatis.",
      userprofile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      image:
        "https://images.pexels.com/photos/12909594/pexels-photo-12909594.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      Text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates est culpa dolorem, obcaecati, nostrum fugit doloribus velit cum delectus modi doloremque aperiam iure hic aspernatur assumenda illo corporis repudiandae? Veritatis.",
      userprofile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      image:
        "https://images.pexels.com/photos/12909594/pexels-photo-12909594.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      Text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates est culpa dolorem, obcaecati, nostrum fugit doloribus velit cum delectus modi doloremque aperiam iure hic aspernatur assumenda illo corporis repudiandae? Veritatis.",
      userprofile:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  return (
    <main>
      <nav className="p-4">
        <div className="flex items-center w-[55vw] justify-between">
          <div>
            <Link to={"/home"}>
              <FaArrowLeft size={20} color="black" />
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold">Rahul</h1>
          </div>
        </div>
      </nav>

      <div className="flex items-start justify-center gap-5 mt-5">
        <div className="">
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
            className="object-cover rounded-full w-36 h-36"
            alt=""
          />
        </div>
        <div className="max-w-[55vw] space-y-3">
          <h1 className="text-lg font-bold">Rahul</h1>
          <p className="text-sm text-slate-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus unde
            quisquam atque, eaque recusandae ducimus perspiciatis assumenda cum
            labore fuga.
          </p>
          <button
            onClick={() => {
              setisedit(true);
            }}
            className="py-2 text-sm font-semibold text-white bg-black rounded-lg px-7"
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-10 gap-7">
        {UserPosts.map((i, index) => {
          return (
            <React.Fragment key={index}>
              <div className="border-[1px] border-gray-200 rounded-lg shadow-sm max-w-md p-4 space-y-3.5">
                <div className="flex items-center gap-5">
                  <img
                    src={i.userprofile}
                    className="object-cover w-12 h-12 rounded-full"
                    alt=""
                  />
                  <h1 className="text-lg font-semibold text-slate-800">
                    Rahul
                  </h1>
                </div>
                <div>
                  <img className="" src={i.image} alt="" />
                </div>
                <div>
                  <p className="text-sm leading-6 text-slate-800">{i.Text}</p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
}
