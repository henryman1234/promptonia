import "@/styles/globals.css"
import React from "react"
import type { Metadata } from "next"
import Nav from "../components/Nav"
import Provider from "../components/Provider"

type RootLayoutType = Readonly<{
  children: React.ReactNode
}>

export const metadata: Metadata = {
  title: "A Fullstack Next App",
  description: "learn and always learn"
}


export default function RootLayout (props: RootLayoutType) {
  
  const {children} = props

  return (
    <html lang="fr">
      <body>
        
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="z-10 relative flex flex-col items-center justify-center max-w-7xl px-6 mx-auto sm:px-16">
            <Nav/>
            {children}
          </main>
        </Provider>

      </body>
    </html>
  )
}
