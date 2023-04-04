


export interface UserCredentials {

    email: string,
    password: string


}

export interface UserResponse {


    status: string,
    data: {
        id: string,
        type: string,
        attributes: {
            first_name: string,
            last_name: string,
            email: string
            gender: number,
            country: string,
            phone: string,
            language: number,
            date_of_birth: string,
            tier: string,
            created_at: string,
            updated_at: string,
        }
    },
    authorisation: {
        token: string,
        type: string
    }

}