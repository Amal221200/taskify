

import { Separator } from "@/components/ui/separator";
import Info from "./_components/Info";
import BoardList from "./_components/BoardList";
import { Suspense } from "react";


const OrganizationIdPage = async ({ params }: { params: { organizationId: string } }) => {

    return (
        <div className="w-full mb-20">
            <Info />
            <Separator className="my-4" />
            <div className="px-2 md:px-4">
                <Suspense fallback={<BoardList.Skeleton />}>
                    <BoardList />
                </Suspense>
            </div>
        </div>
    )
}

export default OrganizationIdPage