import { useNavigate } from "react-router-dom";

const useRedirect = () => {
  const navigate = useNavigate();
  const convertToSlug = (Text) => {
    return Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };
  const redirectTo = (module, id = "", name = "", extra = "") =>
    navigate(
      id
        ? `/${module}?id=${id}&title=${convertToSlug(name)}${
            extra ? `&${extra}` : ""
          }`
        : `/${module}${extra ? `?${extra}` : ""}`
    );

  return { redirectTo };
};

export default useRedirect;
