const client = useSupabaseClient();

class ServiceApi {
    async createUserSeat(data_create) {
        const response = await client
            .from("user_seats")
            .insert({ ...data_create });
        return response;
    }

    async updateUserSeat(data_update) {
        const response = await client.from("user_seats").update({
            ...data_update,
        });

        return response;
    }

    async getAllUserSeated() {
        const response = await client.from("user_seats").select("*");

        return response;
    }

    async updateUser(info, data_update) {
        const response = await client
            .from("users")
            .update({
                ...data_update,
            })
            .eq("id", info?.id)
            .select("*");
        return response;
    }

    async createUser(data_create) {
        const response = await client
            .from("users")
            .insert({
                ...data_create,
            })
            .select("*");

        return response;
    }
}

export default new ServiceApi();
