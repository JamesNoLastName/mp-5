import { redirect } from 'next/navigation';
import getCollection, { URL_COLLECTION } from '@/db';

export default async function AliasPage({
                                            params,
                                        }: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;
    console.log("Alias received:", alias);
    const collection = await getCollection(URL_COLLECTION);
    const urlDoc = await collection.findOne<{ longUrl: string }>({ alias });
    console.log("Found document:", urlDoc);
    if (!urlDoc || !urlDoc.longUrl) {
        console.log("Redirecting to homepage...");
        redirect('/');
    }
    console.log("Redirecting to:", urlDoc.longUrl);
    redirect(urlDoc.longUrl);
}
