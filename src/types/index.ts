export interface ProfileFilter {
    id: number;
}
export interface Profile {
    id?: number;
    sub?: string;
    name?: string;
    gender?: string;
    address?: any;
    birthdate?: string;
    birth_place?: string;
    email?: string;
    phone_number?: string;
    individual_id?: string
    picture?: string;
    notification_preference?: string;
}
export interface FormFilterProps {
    id: number;
}