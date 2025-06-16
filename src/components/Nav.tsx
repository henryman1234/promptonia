"use client"
import React from "react";
import {useSession, signIn, signOut, getProviders, LiteralUnion, ClientSafeProvider} from "next-auth/react"
import { useState, useEffect } from "react";
import Image from "next/image"
import Link from "next/link"
import Logo from "../../public/assets/images/logo.svg"
import { BuiltInProviderType } from "next-auth/providers/index";

type Provider = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null


const Nav = function () {

    const isUserLoggedIn = true
    const [providers, setProviders] = useState<Provider>(null)
    const [toggleDropDown, setToggleDropDown] = useState<boolean>(false)
    const {data: session} = useSession()
    console.log(session?.user)

    useEffect(function(){
        const getAllProviders = async function () {
            const response = await getProviders()
            setProviders(response)
        }
        getAllProviders()

    }, [])

    return (
      <nav className="flex items-center justify-between w-full pt-3 mb-16">
        <Link className="flex gap-2" href="/">
            <Image 
                src={Logo} 
                alt="logo de l'appli" 
                width={30}
                height={30}
            />
            <p className="text-black tracking-wide text-lg max-sm:hidden font-semibold">Promptopia</p>
        </Link>


        {/* DESKTOP NAVIGATION */}
        <div className="hidden sm:flex">
            
            {session?.user ? <div  className="flex gap-3 md:gap-5">
                <Link href="/create-prompt" className="flex bg-black justify-center items-center border border-black rounded-full transition-all text-white text-sm px-5 py-1.5 hover:bg-white hover:text-black">
                    Create Post
                </Link>
                
                <button onClick={function(){
                    signOut()
                }} className="text-sm bg-transparent border border-black flex px-5 py-1.5 justify-center items-center text-black rounded-full hover:bg-black hover:text-white transition-all">Sign Out</button>

                <Link 
                    href="/profile"
                >
                    <Image
                        width={37}
                        height={37}
                        src={session?.user.image}
                        alt="Photo de profile"
                        className="rounded-full"
                    />
                </Link>
            </div>: 
            <>
                {providers && Object.values(providers).map(function(provider){
                    return (
                        <button onClick={function(){
                             signIn(provider.id)
                        }} key={provider.name} type="button" className="text-sm bg-black border border-black  text-white rounded-full py-1.5 px-5 transition-all hover:bg-white hover:text-black flex items-center justify-center">
                            Sign In
                        </button>
                    )
                })}    
            </>
            }

        </div>

        {/* MOBILE NAVIGATION */}
        <div className="sm:hidden flex relative">
            {session?.user ? <div className="flex">
                <Image
                    width={37}
                    height={37}
                    alt="Profile"
                    src={session?.user.image}
                    className="rounded-full"
                    onClick={function () {
                        setToggleDropDown(function(prev){
                            return !prev
                        })
                    }}
                />

                {toggleDropDown ? <div className="flex flex-col gap-2  min-w-[210px] bg-white items-end justify-end p-5 mt-2 rounded-lg transition-all right-0 w-full top-full absolute">

                    <Link href="/profile" onClick={function(){
                        setToggleDropDown(false)
                    }} className="text-sm font-medium text-gray-700 hover:text-gray-500 ">
                        My Profile
                    </Link>

                    <Link href="/create-prompt" onClick={function(){
                        setToggleDropDown(false)
                    }} className="text-sm font-medium text-gray-700 hover:text-gray-500 ">
                        Create Post
                    </Link>

                    <button className=" bg-black border border-black py-1.5 px-5 text-sm text-white rounded-full flex items-center justify-center hover:bg-white transition-all hover:text-black " onClick={function(){
                        setToggleDropDown(false)
                        signOut()
                    }}>
                        Sign Out
                    </button>



                </div> : <></>}

            </div> :
            <>
                {providers && Object.values(providers).map(function(provider){
                    return (
                        <button onClick={function(){
                            signIn(provider.id)
                        }} key={provider.name} type="button" className="text-sm bg-black border border-black  text-white rounded-full py-1.5 px-5 transition-all hover:bg-white hover:text-black flex items-center justify-center">
                            Sign In
                        </button>
                    )
                })}

            </>
            }
        </div>


      </nav>
    )
}

export default Nav