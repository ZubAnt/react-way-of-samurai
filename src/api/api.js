import axios from "axios";

let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
})


const sdk = {

    getUsers(page, count, signal) {
        return instance.get(
            `/users?page=${page}&count=${count}`, {
                signal: signal
            }
        ).then(response => response.data)
    },

    follow(userId) {
        return instance.post(`/follow/${userId}`).then(response => response.data)
    },

    unfollow(userId) {
        return instance.delete(`/follow/${userId}`).then(response => response.data)
    },

    security: {
        get_captcha_url() {
            return instance.get('/security/get-captcha-url').then(response => response.data)
        }
    },

    auth: {
        me(signal) {
            return instance.get('/auth/me', {signal: signal}).then(response => response.data)
        },
        login(email, password, rememberMe, captcha, signal) {
            return instance.post(
                '/auth/login',
                {
                    email: email,
                    password: password,
                    rememberMe: rememberMe,
                    captcha: captcha,
                },
                {signal: signal}
            ).then(response => response.data)
        },
        logout() {
            return instance.delete('/auth/login').then(response => response.data)
        }
    },
    profile: {
        getByUserId(userId, signal) {
            return instance.get(`/profile/${userId}`, {signal: signal}).then(response => response.data)
        },
        update(userId, data) {
            data.userId = userId
            return instance.put(`/profile`, data).then(response => response.data)
        },
        status: {
            getByUserId(userId, signal) {
                return instance.get(
                    `/profile/status/${userId}`,
                    {signal: signal},
                ).then(response => response.data)
            },
            update(status) {
                return instance.put(`/profile/status/`, {status: status},).then(response => response.data)
            },
        },
        photo: {
            upload(file) {
                const formData = new FormData();
                formData.append("image", file);

                return instance.put(
                    '/profile/photo', formData,{
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
            }
        }
    }
}
export default sdk;
