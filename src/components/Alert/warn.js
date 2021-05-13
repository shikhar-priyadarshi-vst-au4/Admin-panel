import React from "react";
import {IoWarningOutline} from 'react-icons/io5';

function WarnAlert({showModal = false, setShowModal = () => {}}) {
  return (
    <>
     {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-72 my-6 mx-auto ">
              <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative rounded-md p-5 pb-0 flex-auto bg-white">
                  <p className="my-4 h-28  text-lg leading-relaxed grid grid-cols-1 place-items-center">
                        <IoWarningOutline className="w-16 h-16 text-yellow-500"/>
                        <div className="text-gray-800 font-mulish uppercase text-base  text-center">Warning</div>
                  </p>
                </div>
                <div className="flex items-center justify-center p-2 rounded-b   cursor-pointer ">
                  <button
                    className="bg-yellow-100 text-yellow-500 background-transparent  font-bold tracking-wider uppercase px-12 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    OKAY
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}


export {WarnAlert};
