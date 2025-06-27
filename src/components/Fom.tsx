import Link from "next/link";
import React, { FormEvent, FunctionComponent, PropsWithChildren } from "react";

interface FormProps {
    type: string,
    post: {prompt: string, tag: string},
    setPost: React.Dispatch<React.SetStateAction<{prompt: string, tag: string}>>,
    submitting: boolean,
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const Form: FunctionComponent<PropsWithChildren<FormProps>> = function ({type, post, setPost, submitting, handleSubmit}) {
    return (
        <section className=" w-full max-w-full flex flex-col items-start justify-start">
            <h1 className="text-black text-left leading-[1.15] text-5xl sm:text-6xl font-extrabold ">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-left">{type} Post</span>
            </h1>
            <span className="text-left max-w-2xl text-gray-600 mt-5 text-lg sm:text-xl">{type} and share amazing prompts with the world, and let your imagination run wild with any AI-platform</span>

            <form onSubmit={handleSubmit} className="gap-7 mt-5 w-full max-w-2xl flex flex-col backdrop-blur p-5 rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)]">
                <label>
                    <span className="font-semibold text-base text-gray-700">Your AI Prompt</span>

                    <textarea
                        placeholder="Saisissez votre prompt ici"
                        value={post.prompt}
                        onChange={function (e){
                            setPost({...post, prompt: e.target.value})
                        }}
                        className="text-gray-500 outline-0 h-[200px] mt-2 p-3 text-base rounded-lg flex w-full bg-white"
                        required
                    />
                </label>

                 <label>
                    <span className="font-semibold text-base text-gray-700">
                        Tag{``}
                        <span> (#technology, #idea, #engineer)</span>
                    </span>

                    <input
                        placeholder="Saisissez votre tag ici"
                        value={post.tag}
                        onChange={function (e){
                            setPost({...post, tag: e.target.value})
                        }}
                        className="text-gray-500 outline-0 mt-2 p-3 text-base rounded-lg flex w-full bg-white"
                        required
                    />
                </label>

                <div className="flex items-end justify-end gap-4 ">
                    <Link href="/" className="text-gray-500 text-base">
                        Cancel
                    </Link>

                    <button type="submit" disabled={submitting}  className="px-5 py-1.5 text-base bg-orange-400 text-white rounded-full">
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>

        </section>
    )
}

export default Form