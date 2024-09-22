"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ActiveCollaborators from "./ActiveCollaborators";
import Loader from "./Loader";
import { Input } from "./ui/input";
import Image from "next/image";

const CollaborativeRoom = ({
    roomId,
    roomMetadata,
}: CollaborativeRoomProps) => {
    const currentUserType = "editor";

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [docTitle, setDocTitle] = useState(roomMetadata.title);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);

    const updateTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {};

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setEditing(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<Loader />}>
                <div className="collaborative-room">
                    <Header>
                        <div
                            ref={containerRef}
                            className="flex w-fit items-center justify-center gap-2"
                        >
                            {editing && !loading ? (
                                <Input
                                    type="text"
                                    ref={inputRef}
                                    value={docTitle}
                                    placeholder="Enter title"
                                    onChange={(e) =>
                                        setDocTitle(e.target.value)
                                    }
                                    onKeyDown={updateTitleHandler}
                                    disabled={!editing}
                                    className="document-title-input"
                                />
                            ) : (
                                <>
                                    <p className="document-title">{docTitle}</p>
                                </>
                            )}

                            {currentUserType === "editor" && !editing && (
                                <Image
                                    src="/assets/icons/edit.svg"
                                    alt="edit"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer"
                                    onClick={() => setEditing(true)}
                                />
                            )}

                            {currentUserType !== "editor" && !editing && (
                                <p className="view-only-tag">View Only</p>
                            )}

                            {loading && (
                                <p className="text-sm text-gray-400">
                                    saving...
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end w-full flex-1 gap-2">
                            <ActiveCollaborators />
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </Header>
                    <Editor />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    );
};

export default CollaborativeRoom;
