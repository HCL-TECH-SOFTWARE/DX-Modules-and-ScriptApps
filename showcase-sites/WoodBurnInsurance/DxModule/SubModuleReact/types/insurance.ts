export enum INSURANCE_TYPE {
    LIFE = 'Life Insurance',
    HOME = 'Home Insurance',
    AUTO = 'Auto Insurance',
    TRAVEL = 'Travel Insurance',
}

export interface IInsuranceType {
    type: INSURANCE_TYPE;
    id: number;
}

export interface IInsurance {
    id: number;
    zipcode: number;
    insurance: IInsuranceType[]
}

export interface IInsuranceList {
    [key: string]: IInsurance
}