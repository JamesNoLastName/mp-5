"use server";

import getCollection, { URL_COLLECTION } from "@/db";
import { PostProps } from "../types";

export default async function createNewUrl(
    longUrl: string,
    alias: string
): Promise<PostProps> {
    console.log("New URL Made");

    const p = {
        longUrl,
        alias,
    };

    const UrlCollection = await getCollection(URL_COLLECTION);

    const res = await UrlCollection.insertOne(p);

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return {
        longUrl,
        alias,
        shortUrl: `${process.env.BASE_URL}${alias}`,
        success: true,
    };
}
