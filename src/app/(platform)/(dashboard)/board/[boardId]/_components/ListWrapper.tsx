"use client"

import { ReactNode } from "react"

interface ListWrapperProps {
    children: ReactNode
}

const ListWrapper: React.FC<ListWrapperProps> = ({ children }) => {
    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            {children}
        </li>
    )
}

export default ListWrapper