import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "sonner";
import React from 'react'
import CardModal from '@/components/modals/card-modal';
import QueryProvider from '@/components/providers/QueryProvider';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            <QueryProvider>
                <Toaster />
                <CardModal />
                {children}
            </QueryProvider>
        </ClerkProvider>
    )
}

export default PlatformLayout