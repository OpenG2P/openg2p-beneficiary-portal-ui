export function extractResolvedData(data: any) {
    const resolveResponse = data?.response_body?.response_payload?.resolve_response?.[0];

    if (!resolveResponse) return null;

    const { status, id, fa, status_reason_code } = resolveResponse;

    if (!fa) return { type: "unknown", status, id };

    const strategy_id = fa.strategy_id;

    switch (strategy_id) {
        case 1:
            return {
                type: "bank",
                status,
                strategy_id: fa.strategy_id,
                bankName: fa.bank_name,
                bankCode: fa.bank_code,
                branchName: fa.branch_name,
                branchCode: fa.branch_code,
                accountNumber: fa.account_number,
                statusReason: status_reason_code,
            };
        case 2:
            return {
                type: "phone",
                status,
                strategy_id: fa.strategy_id,
                mobileNumber: fa.mobile_number,
                walletProvider: fa.wallet_provider_name,
                providerCode: fa.wallet_provider_code,
                statusReason: status_reason_code,
            };
        case 3:
            return {
                type: "email",
                status,
                strategy_id: fa.strategy_id,
                emailAddress: fa.email_address,
                walletProvider: fa.wallet_provider_name,
                providerCode: fa.wallet_provider_code,
                statusReason: status_reason_code,
            };
        default:
            return { type: "unknown", status, id };
    }
}