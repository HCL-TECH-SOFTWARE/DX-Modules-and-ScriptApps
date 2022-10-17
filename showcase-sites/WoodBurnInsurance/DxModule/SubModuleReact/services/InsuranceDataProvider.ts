import { IInsurance, IInsuranceList, IInsuranceType, INSURANCE_TYPE } from '../types';
import InsuranceData from '../utils/data/ZipCodeInsurance.json'

export class InsuranceProvider {
    private static _instance: InsuranceProvider;
    private static zipCodeInsuranceList = InsuranceData as unknown as IInsurance[];
    private static _data: IInsuranceList = {};
    private static default: IInsuranceType[] = [
        {
            id: 1,
            type: INSURANCE_TYPE.LIFE,
        },
        {
            id: 2,
            type: INSURANCE_TYPE.HOME,
        },
        {
            id: 3,
            type: INSURANCE_TYPE.AUTO,
        },
        {
            id: 4,
            type: INSURANCE_TYPE.TRAVEL,
        }
    ];

    private constructor() {
    }

    public static getInstance(): InsuranceProvider {
        if(!Object.values(this._data).length) {
            this.zipCodeInsuranceList.forEach((insurance: IInsurance) => {
                this._data[`${insurance?.zipcode}`] = {...insurance};
            });
        }

        return this._instance || (this._instance = new this());
    }

    public static getInsuranceByZipCode(zipcode: number | string): IInsuranceType[] {
        const provider = InsuranceProvider.getInstance();
        const insurance: IInsurance = this._data[zipcode];

        if (!insurance) {
            return this.default;
        }

        return insurance.insurance;
    }
}
