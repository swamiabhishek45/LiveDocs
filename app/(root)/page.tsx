import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import React from "react";
import AddDocumentBtn from "@/components/AddDocumentBtn";

const Home = async () => {
    const clerkUser = await currentUser(); // get user from clerk
    if (!clerkUser) redirect("/sign-in");

    const documents = [];
    // console.log("CLERKUSER: ",clerkUser);
    

    return (
        <main className="home-container">
            <Header className="sticky left-0 top-0">
                <div className="flex gap-2 items-center lg:gap-4">
                    Notifications
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </Header>
            {documents.length > 0 ? (
                <div></div>
            ) : (
                <div className="document-list-empty">
                    <Image
                        src="/assets/icons/doc.png"
                        alt="documnet"
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
