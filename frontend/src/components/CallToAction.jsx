import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <>
      <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="flex-1 justify-center flex flex-col">
          <h2 className="text-2xl">Want to learn more about Wevdevelopment?</h2>
          <p className="text-gray-500 my-2">
            W3 school is the free website to learn React js , express.js ....
            more 50+ language
          </p>
          <Button
            gradientDuoTone="purpleToPink"
            className="rounded-tl-xl rounded-bl-none"
          >
            <a
              href="https://www.w3schools.com/react/default.asp"
              target="_blank"
              rel="noopener noreferrer"
            >
              if you want to learn React.js ? click
            </a>
          </Button>
        </div>
        <div className="p-7 flex-1">
          <img src="https://imgs.search.brave.com/7qvu_dNY6EHodkmP_bm3akDMDUiYjSxk35Bv3XuOjuA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS93aGF0aXMvaW1n/X3JlYWN0LmpwZw" />
          <span>i am Jiban </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center mt-4">
        <div className="flex-1 justify-center flex flex-col">
          <h2 className="text-2xl">
            {" "}
            Want to learn Structures and Algorithms (DSA) ?
          </h2>
          <p className="text-gray-500 my-2">
            " Apna Collage is the best place where you can learn more about Data
            Structures and Algorithms through practical questions and direct
            interaction with teachers."
          </p>
          <Button
            gradientDuoTone="purpleToPink"
            className="rounded-tl-xl rounded-bl-none"
          >
            <a
              href="https://www.apnacollege.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              if you want to learn DSA ? click
            </a>
          </Button>
        </div>
        <div className="p-7 flex-1">
          <img src="https://imgs.search.brave.com/XH5q_ehNbQ9g14IP9MOtf5jEudY8jpY6pHHk1eM_F0M/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdGFy/dHVwZm9ydGUuaW4v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MDEvU2hyYWRoYS1L/aGFwcmEtQ28tRm91/bmRlci1hbmQtRWR1/Y2F0b3ItQXBuYS1D/b2xsZWdlLS5qcGc" />
          <span>i am Jiban </span>
        </div>
      </div>
    </>
  );
}
