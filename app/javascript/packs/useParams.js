export const useParams = () => {
    const path = window.location.pathname;
    const segments = path.split("/");
    return { username: segments[1] };
  };
  