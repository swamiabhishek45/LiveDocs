import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import React from "react";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { getDocuments } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";
import { DeleteModal } from "@/components/DeleteModal";
import Notifications from "@/components/Notifications";

const Home = async () => {
    const clerkUser = await currentUser(); // get user from clerk
    if (!clerkUser) redirect("/sign-in");

    const roomDocuments = await getDocuments(
        clerkUser.emailAddresses[0].emailAddress
    );
    // console.log("ROOMDOCUMENTS: ", roomDocuments);

    return (
        <main className="home-container">
            <Header className="sticky left-0 top-0">
                <div className="flex gap-2 items-center lg:gap-4">
                    <Notifications />
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </Header>
            {roomDocuments.data.length > 0 ? (
                <div className="document-list-container">
                    <div className="document-list-title">
                        <h3 className="text-28-semibold">All documents</h3>

                        <AddDocumentBtn
                            userId={clerkUser.id}
                            email={clerkUser.emailAddresses[0].emailAddress}
                        />
                    </div>
                    {roomDocuments.data.map(
                        ({
                            id,
                            metadata,
                            createdAt,
                            lastConnectionAt,
                        }: RoomDocumentProps) => (
                            <li
                                key={id}
                                className="document-list-item border border-transparent hover:border-blue-500 hover:shadow-glow"
                            >
                                <Link
                                    href={`/documents/${id}`}
                                    className="flex flex-1 items-center gap-4"
                                >
                                    <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                                        <Image
                                            src="/assets/icons/doc.png"
                                            width={42}
                                            height={42}
                                            alt="icon"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="line-clamp-1">
                                            {metadata.title}
                                        </p>
                                        <p className="text-xs font-light text-blue-100 ">
                                            Created about{" "}
                                            {dateConverter(createdAt)}
                                        </p>
                                        {/* // TODO : add style */}
                                        <p className="text-xs font-light text-blue-100 ">
                                            Last updated{" "}
                                            {dateConverter(lastConnectionAt)}
                                        </p>
                                    </div>
                                </Link>
                                <DeleteModal roomId={id} />
                            </li>
                        )
                    )}
                </div>
            ) : (
                <div className="document-list-empty">
                    <Image
                        src="/assets/icons/doc.png"
                        alt="document"
                        width={44}
                        height={44}
                        className="mx-auto"
                    />

                    <AddDocumentBtn
                        userId={clerkUser.id}
                        email={clerkUser.emailAddresses[0].emailAddress}
                    />
                </div>
            )}
        </main>
    );
};

export default Home;
