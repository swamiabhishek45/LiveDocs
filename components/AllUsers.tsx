import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const AllUsers = () => {
    
    return (
        <Popover>
            <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
                <Image
                    src="/assets/icons/bell.svg"
                    alt="inbox"
                    width={24}
                    height={24}
                />
            </PopoverTrigger>
            <PopoverContent className="">All Users</PopoverContent>
        </Popover>
    );
};

export default AllUsers;
