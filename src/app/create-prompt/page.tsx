"use client"
import { FormEvent, useState } from "react";
import React from "react";
import {useSession} from "next-auth/react"
import {useRouter} from "next/navigation"
import Form from "@/components/Fom";


export default function CreatePrompt  () {

    const [submitting, setSubmitting] = useState<boolean>(false)
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    })
    const router = useRouter()
    const {data: session} = useSession()
    console.log(session)

    const createPrompt = async function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    userId: session?.user?.id,
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push("/")
            }
             
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }

    }

    return (
       <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit = {createPrompt}
       />
    )
}
