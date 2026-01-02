import { useAuthUser, navigateTo } from "#imports";

export default defineNuxtRouteMiddleware(async () => {
  if (!process.client) return;

  const { user, fetchUser } = useAuthUser();

  if (!user.value) {
    await fetchUser();
  }

  if (!user.value) {
    return navigateTo("/");
  }
});
