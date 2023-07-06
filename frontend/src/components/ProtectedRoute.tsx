import { Navigate} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const auth = useAuth();

  if (auth?.user) {
    return <>{children}</>;
  }
  return <Navigate to="/login" replace />;
}
