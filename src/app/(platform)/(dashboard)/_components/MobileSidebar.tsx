"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import useMobileSidebar from "@/hooks/useMobileSidebar"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"


const MobileSidebar = () => {
    const { isOpen, onOpen, onClose } = useMobileSidebar((state) => state)
    const [isMounted, setIsMounted] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        onClose()
    }, [pathname, onClose])
    if (!isMounted) {
        return null
    }
    return (
       <>
        <Button onClick={onOpen} className="block md:hidden" variant="ghost" size="sm">
            <Menu />
        </Button>
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="p-2 pt-10">
                <Sidebar storageKey="t-sidebar-mobile-state" />
            </SheetContent>
        </Sheet>
       </>
    )
}

export default MobileSidebar