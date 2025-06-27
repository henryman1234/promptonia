import Image from "next/image";
import Feed from "../components/Feed";


export default function Home() {

  return (
    <section className=" w-full flex items-center justify-center flex-col">
      <h1 className="mt-5 font-extrabold sm:text-6xl text-5xl leading-[1.15]text-black text-center">Discover & Share 
        <br />
        <span className="text-center bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">AI-Powered prompts</span>
      </h1>
      <span className="text-gray-600 text-lg sm:text-xl mt-5 text-center max-w-2xl">
        Promptopia is an open source-source AI Prompting tool for modern world to discover, create ans share creative prompts
      </span>

      <Feed/>

    </section>
  );
}
