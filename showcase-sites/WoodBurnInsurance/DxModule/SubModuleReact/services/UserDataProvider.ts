import Cookies from 'js-cookie';
import { IUserList, IUser } from '../types';
import UserData from '../utils/data/User.json'

export class UserProvider {
    private static _instance: UserProvider;
    private static userList = UserData as unknown as IUser[];
    private static _data: IUserList = {};

    private constructor() {
    }

    private static isAuthenticated() {
        const isUserAuthenticated = Cookies.get('wbi_authenticated');
        return isUserAuthenticated === 'true'
    }

    public static redirectToLogin(): void {
        window.location.href = "/wps/myportal/woodburninsurance/login";
    }

    public static redirectToDashboard(): void {
        window.location.href = "/wps/myportal/woodburninsurance/dashboard";
    }

    public static requireLogin(): void {
        if (!this.isAuthenticated()) {
            this.redirectToLogin();
        }
    }

    public static redirectToDashboardWhenAuthenticated(): void {
        if (this.isAuthenticated()) {
            this.redirectToDashboard();
        }
    }

    public static getInstance(): UserProvider {
        if(!Object.values(this._data).length) {
            this.userList.forEach((user: IUser) => {
                this._data[`${user?.email.toLowerCase()}`] = {...user};
            });
        }

        return this._instance || (this._instance = new this());
    }

    public static getUserByEmail(email: string): IUser | null {
        const provider = UserProvider.getInstance();
        const user: IUser = this._data[email.toLowerCase()];

        if (user) {
            return user;
        }

        return;
    }

    public static getUserById(id: number): IUser | undefined {
        return UserData.find(element => element.id === id);
    }
}
