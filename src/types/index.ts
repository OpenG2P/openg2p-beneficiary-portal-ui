export interface ProfileFilter {
    id: number;
}
export interface Profile {
    id?: number;
    sub?: string;
    name?: string;
    gender?: string;
    birthdate?: string;
    birth_place?: string;
    email?: string;
    phone_number?: string;
    provider_unique_id?: string;
    provider_unique_id_type?: string;
    picture?: string;
    notification_preference?: string;
}
export interface FormFilterProps {
    id: number;
}