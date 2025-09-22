export interface Benefit {
    programName: string;
    entitlementRefNumber: string;
    awaitedFunds: number;
    receivedFunds: number;
    dateApproved: string;
}

export const benefitsData: Benefit[] = [
    {
        programName: "openg2p-safety-net-program",
        entitlementRefNumber: "983789327978",
        awaitedFunds: 45000,
        receivedFunds: 30000,
        dateApproved: "01/09/2025",
    },
    {
        programName: "PM-KISAN Farmer Support",
        entitlementRefNumber: "875643219876",
        awaitedFunds: 15000,
        receivedFunds: 15000,
        dateApproved: "15/08/2025",
    },
    {
        programName: "LPG Subsidy",
        entitlementRefNumber: "546372819045",
        awaitedFunds: 2400,
        receivedFunds: 800,
        dateApproved: "25/08/2025",
    },
    {
        programName: "Direct Benefit Transfer Scheme",
        entitlementRefNumber: "729384756102",
        awaitedFunds: 8500,
        receivedFunds: 0,
        dateApproved: "30/08/2025",
    },
    {
        programName: "Pradhan Mantri Awas Yojana",
        entitlementRefNumber: "392847561829",
        awaitedFunds: 120000,
        receivedFunds: 60000,
        dateApproved: "25/07/2025",
    },
    {
        programName: "National Rural Employment Guarantee",
        entitlementRefNumber: "928374651092",
        awaitedFunds: 30000,
        receivedFunds: 15000,
        dateApproved: "05/08/2025",
    },
    {
        programName: "Skill Development Program",
        entitlementRefNumber: "837465920384",
        awaitedFunds: 10000,
        receivedFunds: 5000,
        dateApproved: "15/07/2025",
    },
    {
        programName: "Ayushman Bharat Health Scheme",
        entitlementRefNumber: "465738291056",
        awaitedFunds: 25000,
        receivedFunds: 12000,
        dateApproved: "20/08/2025",
    },
    {
        programName: "Digital India Initiative",
        entitlementRefNumber: "102938475610",
        awaitedFunds: 5000,
        receivedFunds: 2500,
        dateApproved: "02/09/2025",
    },
    {
        programName: "Startup India Support",
        entitlementRefNumber: "112233445566",
        awaitedFunds: 12000,
        receivedFunds: 12000,
        dateApproved: "18/08/2025",
    },
    {
        programName: "Clean Ganga Mission",
        entitlementRefNumber: "121212121212",
        awaitedFunds: 8000,
        receivedFunds: 2000,
        dateApproved: "28/08/2025",
    },
    {
        programName: "Swachh Bharat Abhiyan",
        entitlementRefNumber: "131313131313",
        awaitedFunds: 15000,
        receivedFunds: 10000,
        dateApproved: "12/08/2025",
    },
    {
        programName: "National Health Mission",
        entitlementRefNumber: "141414141414",
        awaitedFunds: 20000,
        receivedFunds: 15000,
        dateApproved: "22/08/2025",
    },
    {
        programName: "Housing for All",
        entitlementRefNumber: "151515151515",
        awaitedFunds: 40000,
        receivedFunds: 25000,
        dateApproved: "28/07/2025",
    },
    {
        programName: "Rural Skill Training",
        entitlementRefNumber: "161616161616",
        awaitedFunds: 7000,
        receivedFunds: 3000,
        dateApproved: "06/08/2025",
    },
    {
        programName: "Women Empowerment Program",
        entitlementRefNumber: "171717171717",
        awaitedFunds: 10000,
        receivedFunds: 5000,
        dateApproved: "17/07/2025",
    },
];

export const getTotalAwaitedFunds = () =>
    benefitsData.reduce((sum, b) => sum + b.awaitedFunds, 0);

export const getTotalReceivedFunds = () =>
    benefitsData.reduce((sum, b) => sum + b.receivedFunds, 0);
