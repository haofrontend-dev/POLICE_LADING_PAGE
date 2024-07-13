export default defineNuxtRouteMiddleware((to, from) => {
    const authState = useState("auth");
    const token = useCookie("token"); // get token from cookies

    if (!token) {
        return navigateTo("/admin/login");
    }

    // if token exists and url is /login redirect to homepage
    if (token.value && to?.name === "/admin/login") {
        return navigateTo("/");
    }

    // if token doesn't exist redirect to log in
    if (!token.value && to?.name !== "/admin/login") {
        abortNavigation();
        return navigateTo("/admin/login");
    }
});
