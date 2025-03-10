export const useNavigate = () => {
    return (path) => {
      window.location.href = path;
    };
  };
  