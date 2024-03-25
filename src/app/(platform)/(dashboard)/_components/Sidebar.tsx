"use client"
import Link from "next/link"
import { Plus } from "lucide-react"
import { useLocalStorage } from "usehooks-ts"
import { useOrganizationList, useOrganization } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Accordion } from "@/components/ui/accordion"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import NavItem, { Organization } from "./NavItem"

interface SidebarProps {
    storageKey?: string
}

const Sidebar: React.FC<SidebarProps> = ({ storageKey = "t-sidebar-state" }) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})
    const { organization: activeOrganization, isLoaded: isLoadedOrg } = useOrganization();
    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({ userMemberships: { infinite: true } });

    const defaultAccordionValue: Array<string> = Object.keys(expanded).reduce((acc: string[], key: string) => {
        if (expanded[key]) {
            acc.push(key)
        }
        return acc
    }, [])

    const onExpand = (id: string) => {
        setExpanded((curr) => ({ ...curr, [id]: !expanded[id] }))
    }

    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <Skeleton />
        )
    }

    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className="pl-4">
                    WorkSpaces
                </span>
                <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
                    <Link href="/select-org"><Plus className="h-4 w-4" /></Link>
                </Button>
            </div>
            <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
                {userMemberships.data.map(({ organization }) => (
                    <NavItem key={organization.id} organization={organization as Organization} onExpand={onExpand} isActive={activeOrganization?.id === organization.id} isExpanded={expanded[organization.id]} />
                ))}
            </Accordion>
        </>
    )
}

export default Sidebar