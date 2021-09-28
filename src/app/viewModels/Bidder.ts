import { Activity } from "./activity";

export interface Bidder {
id: number,
phoneNumber: number,
firstName: string,
lastName: string,
firstNameAr: string,
lastNameAr: string,
birthDate: string,
identityCard: string,
address: string,
activityId: number,
activity: Activity,
createdAt: string,
lastUpdatedAt: string,
deleteddAt: string
}
