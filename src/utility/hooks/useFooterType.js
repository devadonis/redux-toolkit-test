import { useDispatch, useSelector } from "react-redux";

export const useFooterType = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const store = useSelector((state) => state.layout);

  const setFooterType = (type) => {
  };

  return { setFooterType, footerType: store.footerType };
};
