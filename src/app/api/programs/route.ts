import { NextResponse } from "next/server";
import { buildStandardPayload } from "@/shared/utils/payloadBuilder";
import { serverFetch } from "../_utils/serverFetch";

export async function POST(req: Request) {
    try {
        const { pbmsUrl, params } = await req.json();

        const payload = buildStandardPayload(params);

        const data = await serverFetch(pbmsUrl, "/benefit_program/get_all_programs", payload);
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
