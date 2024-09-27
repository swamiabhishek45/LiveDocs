"use client";

import { useSelf } from "@liveblocks/react/suspense";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";

const ShareModal = ({
    roomId,
    collaborators,
    creatorId,
    currentUserType,
}: ShareDocumentDialogProps) => {
    const user = useSelf();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // console.log("user:  ", user);

    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState<UserType>("viewer");

    // console.log(collaborators);

    const shareDocumentHandler = async () => { setLoading(true);

    await updateDocumentAccess({
        email,
        roomId,
        userType: userType as UserType,
        updatedBy: user.info,
    });

    setLoading(false);};

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button
                    className="gradient-blue flex h-9 gap-1 px-4"
                    disabled={currentUserType !== "editor"}
                >
                    <Image
                        src="/assets/icons/share.svg"
                        alt="share"
                        width={20}
                        height={20}
                        className="min-w-4 md:size-5"
                    />
                    <p className="mr-1 hidden md:block">Share</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="shad-dialog">
                <DialogHeader>
                    <DialogTitle>Manage who can view this project</DialogTitle>
                    <DialogDescription>
                        Select which users can view and edit document
                    </DialogDescription>
                </DialogHeader>

                <Label htmlFor="email" className="mt-6 text-blue-100">
                    Email address
                </Label>
                <div className="flex items-center gap-3">
                    <div className="flex flex-1 rounded-md bg-dark-400">
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="share-input"
                        />
                        <UserTypeSelector
                            userType={userType}
                            setUserType={setUserType}
                        />
                    </div>
                    <Button
                        type="submit"
                        onClick={shareDocumentHandler}
                        className="gradient-blue flex h-9 gap-1 px-4 py-5"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Invite"}
                    </Button>
                </div>
                <div>
                    <ul>
                        {collaborators.map((collaborator) => (
                            <Collaborator
                                key={collaborator.id}
                                email={collaborator.email}
                                collaborator={collaborator}
                                user={user.info}
                                creatorId={creatorId}
                                roomId={roomId}
                            />
                        ))}
                    </ul>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShareModal;
