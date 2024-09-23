"use server";

import { revalidatePath } from "next/cache";
import { liveblocks } from "../liveblocks";
import { parseStringify } from "../utils";
import { nanoid } from "nanoid";

export const createDocument = async ({
    userId,
    email,
}: CreateDocumentParams) => {
    const roomId = nanoid();

    try {
        const metadata = {
            creatorId: userId,
            email,
            title: "Untitled",
        };

        const usersAccesses: RoomAccesses = {
            [email]: ["room:write"],
        };

        const room = await liveblocks.createRoom(roomId, {
            metadata,
            usersAccesses,
            defaultAccesses: ["room:write"],
        });

        revalidatePath("/");

        return parseStringify(room);
    } catch (error) {
        console.log(`Error happend while creating a room: ${error}`);
    }
};

export const getDocument = async ({ roomId, userId }: GetDocumentParams) => {
    try {
        const room = await liveblocks.getRoom(roomId);

        // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

        // if (!hasAccess) {
        //     throw new Error("You do not have access to this document");
        // }

        return parseStringify(room);
    } catch (error) {
        console.log("Error happened while getting the room", error);
    }
};

export const updateDocument = async (roomId: string, title: string) => {
    try {
        const updatedRoom = await liveblocks.updateRoom(roomId, {
            metadata: {
                title
            }
        })

        revalidatePath(`/documents/${roomId}`)

        return parseStringify(updatedRoom);
    } catch (error) {
        console.error("Error happend while upadating a document: ", error);
    }
};

export const getDocuments = async (email: string) => {
    try {
        const rooms = await liveblocks.getRooms({userId: email});

        return parseStringify(rooms);
    } catch (error) {
        console.log("Error happened while getting the rooms", error);
    }
};