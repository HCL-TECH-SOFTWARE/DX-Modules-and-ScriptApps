export interface IPaymentHistory {
    fiscalYear: number;
    months: number[];
}

export interface IHistory {
    event: string;
    date: string;
    status: string;
}

export interface IInsurancePlans {
    id: string;
    type: string;
    name: string;
    status: string;
    category: string;
    pricePerMonth: string;
    coverage: string;
    zipcode: number;
    city: string;
    state: string;
    carModel: string;
    year: string | number;
    licenseImageSrc: string;
    licenseDateUploaded: string;
    paymentHistory: IPaymentHistory[];
    history: IHistory[];
}

export interface IInsuranceClaims {
    id: string;
    referenceNumber: string;
    category: string;
    status: string;
}

export interface IInsuranceIssues {
    id: string;
    referenceNumber: string;
    category: string;
    status: string;
    initiated: string;
    handler: string;
    location: string;
    hospitalization: string;
    injury: string;
}

export interface IUser {
    id: number;
    firstName: string;
    email: string;
    avatarUrl: string;
    isInsured: boolean;
    memberType: string;
    policyNumber: string;
    nextPaymentDue: string;
    insurancePlans: IInsurancePlans[];
    insuranceClaims: IInsuranceClaims[];
    insuranceIssues: IInsuranceIssues[];
}

export interface IUserList {
    [key: string]: IUser
}