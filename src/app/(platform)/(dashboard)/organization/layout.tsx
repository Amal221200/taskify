import React from 'react'
import Sidebar from '../_components/Sidebar'

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='pt-20 md:pt-24 max-w-6xl 2xl:max-w-screen-xl mx-auto'>
            <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                    <Sidebar />
                </div>
                <div className='flex-1'>
                    {children}
                </div>
            </div>
        </main>
    )
}

export default OrganizationLayout