import { RootState } from "@/interfaces/interface";
import { FC, useEffect } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

interface ProtectedRourtInterface {
  type: string;
}

const ProtectedRourt: FC<ProtectedRourtInterface> = ({ type }) => {
  const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
  const user = useTypeSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.user_email === null) {
      alert('Пройдіть авторизацію');
      navigate('/auth');
    } else if (type === 'admin' && user.user_role !== 1) {
      alert('Ви не є адміном');
      navigate('/');
    }
  }, [user, type, navigate]);

  // Если пользователь авторизован и имеет доступ, возвращаем Outlet
  if (user.user_email !== null && (type === 'user' || (type === 'admin' && user.user_role === 1))) {
    return <Outlet />;
  }

  // Пока идет проверка или перенаправление, возвращаем null (или можно вернуть спиннер)
  return null;
};

export default ProtectedRourt;
