// import React, { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// const AuthComponent = () => {
//   const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     if (isAuthenticated) {
//       // Cuando el usuario se autentica, almacenamos sus datos en el estado
//       setUserData(user);
//     } else {
//       // Si el usuario no está autenticado, borramos los datos del estado
//       setUserData(null);
//     }
//   }, [isAuthenticated, user]);

//   // Función para realizar el cierre de sesión
//   const handleLogout = () => {
//     logout();
//     setUserData(null);
//   };

//   return (
//     <div>
//       {isAuthenticated ? (
//         <div>
//           <h1>Bienvenido, {userData.name}!</h1>
//           <p>Email: {userData.email}</p>
//           <p>Roles: {userData.roles.join(", ")}</p>
//           <button onClick={handleLogout}>Cerrar sesión</button>
//         </div>
//       ) : (
//         <button onClick={loginWithRedirect}>Iniciar sesión</button>
//       )}
//     </div>
//   );
// };

// export default AuthComponent;


import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthComponent = ({ userData }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  // Función para realizar el cierre de sesión
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Bienvenido, {userData.first_name}!</h1>
          <p>Email: {userData.email}</p>
          <p>Rol: {userData.role_id}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <button onClick={loginWithRedirect}>Iniciar sesión</button>
      )}
    </div>
  );
};

export default AuthComponent;
