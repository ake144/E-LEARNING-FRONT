"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { signOut } from "next-auth/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { RxAvatar } from "react-icons/rx";
import {
    LogOut,
    Settings,
    User
} from "lucide-react"
import Link from "next/link"



export function Profile() {
     const router  =  useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push('/auth/signin');
      };
    

    const { isSignedIn, user, isLoaded } = { isSignedIn: true, user: { imageUrl: 'https://example.com/image.jpg' }, isLoaded: true }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-[2.25rem] h-[2.25rem]">
                <Avatar >
                    {/* <AvatarImage src={user?.imageUrl} alt="User Profile" /> */}                   
                    <AvatarFallback><RxAvatar className="w-[50px] h-[30px]"/></AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/account/profile">
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                {/* <SignOutButton> */}
                    <DropdownMenuItem  onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                {/* </SignOutButton> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}