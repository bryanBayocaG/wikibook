import { useAuthStore } from "@/app/store";
import { auth } from "@/utils/firebase";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@heroui/react";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

export default function UserIcon() {
    const currentOff = useAuthStore((state) => state.currentOff)
    const userImg = useAuthStore((state) => state.currentAuthImg)
    const userEmail = useAuthStore((state) => state.currentAuthEmail)
    const userName = useAuthStore((state) => state.currentAuthDisplayName)

    const HandleSignOut = async () => {
        try {
            await signOut(auth).then(() => {
                toast.success("Signed-out successfully");
            });
            currentOff()


        } catch (error) {
            console.error("Sign-out failed:", error);
        }
    }
    return (
        <div className="flex items-center gap-4">

            {/* big============= */}
            <div className="md:hidden">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            src={userImg ? userImg : "none"}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">{userEmail}</p>
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" onPress={HandleSignOut}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            {/* small============= */}
            <div className="hidden md:block">
                <Dropdown placement="bottom-start" >
                    <DropdownTrigger>
                        <User
                            as="button"
                            avatarProps={{
                                isBordered: true,
                                src: userImg ? userImg : "none"
                            }}
                            className="transition-transform"
                            description={userEmail}
                            name={userName}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-bold">Signed in as</p>
                            <p className="font-bold">{userEmail}</p>
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" onPress={HandleSignOut}>
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div >
    );
}
