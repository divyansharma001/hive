import React from "react";

function PeopleCard() {
  return (
    <>
      <div className="card bg-[rgb(15,16,18)] w-80 shadow-xl ml-12 text-white">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Who to follow</h2>

          <div className="flex">
            <div>
              <img
                src="https://vectorseek.com/wp-content/uploads/2023/02/OpenAI-Logo-Vector.jpg"
                alt=""
                className="size-14 rounded-full"
              />
            </div>
           
            <div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PeopleCard;
