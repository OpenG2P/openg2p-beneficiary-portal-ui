import { NextResponse } from "next/server";
import { buildStandardPayload } from "@/shared/utils/payloadBuilder";
import { serverFetch } from "../_utils/serverFetch";

export async function POST(req: Request) {
    try {
        const { bridgeUrl, params } = await req.json();

        const payload = buildStandardPayload(params);

        const data = await serverFetch(bridgeUrl, "/disbursement/get_all_disbursements", payload);
        return NextResponse.json(data);
    } 
    catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
