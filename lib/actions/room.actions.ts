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
            defaultAccesses: [],
        });

        revalidatePath("/");

        return parseStringify(room);
    } catch (error) {
        console.log(`Error happend while creating a room: ${error}`);
    }
};
