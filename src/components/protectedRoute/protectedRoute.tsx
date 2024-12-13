import { RootState } from "@/interfaces/interface";
import { FC, useEffect } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

interface ProtectedRouteInterface {
  type: string;
  blacklist?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteInterface> = ({ type, blacklist }) => {
  const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
  const user = useTypeSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.user_email === null) {
      alert('Пройдіть авторизацію');
      navigate('/auth');
    } else if (type === 'admin' && user.user_role === 0) {
      alert('Ви не є адміном');
      navigate('/profile');
    } else if (blacklist && user.user_blocked === 1) {
      alert("Ви заблоковані !!?");
      navigate('/profile');
    }
  }, [user, type, blacklist, navigate]);

  // Если пользователь авторизован и имеет доступ, возвращаем Outlet
  if (user.user_email !== null && (type === 'user' || (type === 'admin' && user.user_role && user.user_role > 0))) {
    return <Outlet />;
  }

  return null; // возвращаем null, если ничего не соответствует
};

export default ProtectedRoute;
