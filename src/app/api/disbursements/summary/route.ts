import { NextResponse } from "next/server";
import { buildStandardPayload } from "@/shared/utils/payloadBuilder";
import { serverFetch } from "../../_utils/serverFetch";

export async function POST(req: Request) {
    try {
        const { bridgeUrl, extraPayload } = await req.json();

        const payload = buildStandardPayload({ extraPayload });

        const data = await serverFetch(bridgeUrl, "/disbursement/get_disbursement_summary_till_date", payload);
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
