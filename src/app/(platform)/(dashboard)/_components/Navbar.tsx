import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import FormPopover from "@/components/form/FormPopover"
import MobileSidebar from "./MobileSidebar"


const Navbar = () => {
    return (
        <nav className="fixed z-50 top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                <FormPopover align="start" side="bottom" sideOffset={18}>
                    <Button size={'sm'} className="rounded-sm" variant={'primary'}>
                        <span className="hidden md:block  h-auto py-1.5 px-2">Create</span>
                        <Plus className="h-4 w-4 md:hidden block" />
                    </Button>
                </FormPopover>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher hidePersonal afterCreateOrganizationUrl="/organization/:id"
                    afterSelectOrganizationUrl="/organization/:id"
                    afterLeaveOrganizationUrl="/organization/:id"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        }
                    }} />

                <UserButton afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                width: 30,
                                height: 30,
                            }
                        }
                    }} />
            </div>
        </nav>
    )
}

export default Navbar