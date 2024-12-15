import { auth } from "@/utils/firebase";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    User,
} from "@nextui-org/react";
import { signOut } from "firebase/auth";

const HandleSignOut = async () => {
    try {
        await signOut(auth);
        console.log("logout");
    } catch (error) {
        console.error("Sign-out failed:", error);
    }
}

export default function UserIcon() {
    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <div>
                        <User
                            as="button"
                            avatarProps={{
                                isBordered: true,
                                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                            }}
                            className="hidden md:flex transition-transform"
                            description="@tonyreichert"
                            name="Tony Reichert"
                        />
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform md:hidden "
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">@tonyreichert</p>
                    </DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" color="danger">
                        <button onClick={HandleSignOut}>Log Out</button>

                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
