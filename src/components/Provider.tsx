"use client"
import React, { FunctionComponent, PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

type ProviderType = PropsWithChildren

const Provider:FunctionComponent<ProviderType> = function ({children}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default Provider