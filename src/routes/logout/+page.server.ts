export const ssr = false;

export const load = async ({ cookies }) => {
    cookies.delete("spot-user", { path: "/" });
    
  };