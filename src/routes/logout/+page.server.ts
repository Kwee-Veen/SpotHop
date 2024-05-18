export const load = async ({ cookies }) => {
    cookies.delete("spot-user", { path: "/" });
  };