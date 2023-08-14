import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const POST_NEW_USER = import.meta.env.VITE_POST_NEW_USER;
const POST_NEW_USER_AUTH0 = import.meta.env.VITE_POST_NEW_USER_AUTH0

const UserSync = ({ onUserData }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && !isLoading) {
        // Enviar los datos del usuario al backend
        const userData = {
          first_name: user.given_name,
          last_name: user.family_name,
          gender: "X",
          email: user.email,
          delivery_address: "Henry City",
          mobile: 541158239020,
          role_id: "Cliente",
          user_password: "12345678",
        };

        console.log("pasando por useEffect de userSync:", userData);
        console.log("correo a consultar", userData.email, "tipo de dato:", typeof userData.email);

        // try {
        //   // Validar si el usuario existe en el backend
        //   const response = await axios.post("http://localhost:3010/users/userEmail", { email: userData.email });
        //   const { idUser, user } = response.data;
        //   console.log("solicitando data iduser:", idUser);
        //   console.log("obteniendo data local de user", JSON.stringify(user));

        //   if (idUser)
        //   {
        //     // El usuario existe, realizar las acciones necesarias según tus necesidades
        //     console.log("Usuario existente en Local:", idUser);
        //     // Puedes almacenar la información del usuario en el estado o en el contexto de tu aplicación
        //     if (typeof onUserData === "function") {
        //       onUserData(user); // Pasar los datos del usuario al componente AuthComponent
        //     }
        //   } else {
            // El usuario no existe, crearlo en el backend
            console.log("Va a crear", userData);
            await createUser(userData);
          }
    };
    fetchData();
  }, [isAuthenticated, onUserData]);
// }, [isAuthenticated, isLoading, onUserData]);

  const createUser = async (userData) => {
    try {
      if(user){
      const token = await getAccessTokenSilently()
      const response = await axios.post(`${POST_NEW_USER}?token=${token}`, userData);
      console.log("Usuario creado correctamente:", response.data);
      }
      // Realiza las acciones adicionales según tus necesidades
    } catch (error) {
      console.error("Validar Datos, usuario ya existente:");
      // Maneja los errores de creación de usuario si es necesario
                  if (typeof onUserData === "function") {
              onUserData(user); // Pasar los datos del usuario al componente AuthComponent
            }
            console.error("Enviados datos al contenedor" + JSON.stringify(userData));
    }
  };

  return null; // No renderizar nada en el componente UserSync
};

export default UserSync;


// import React, { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from "axios";

// const UserSync = ({ onUserData }) => {
//   const { isAuthenticated, isLoading, user } = useAuth0();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (isAuthenticated && !isLoading) {
//         const userData = {
//           first_name: user.given_name,
//           last_name: user.family_name,
//           gender: "X",
//           email: user.email,
//           delivery_address: "Henry City",
//           mobile: 541158239020,
//           role_id: "Cliente",
//           user_password: "12345678",
//         };

//         console.log("pasando por useEffect de userSync:", userData);
//         console.log("correo a consultar", userData.email, "tipo de dato:", typeof userData.email);

//         try {
//           // Validar si el usuario existe en el backend
//           const response = await axios.post("http://localhost:3010/users/userEmail", { email: userData.email });
//           const { idUser, user } = response.data;
//           console.log("solicitando data iduser:", idUser);
//           console.log("obteniendo data local de user", JSON.stringify(user));

//           if (idUser) {
//             // El usuario existe, realizar las acciones necesarias según tus necesidades
//             console.log("Usuario existente en Local:", idUser);
//             // Puedes almacenar la información del usuario en el estado o en el contexto de tu aplicación
//             if (typeof onUserData === "function") {
//               onUserData(user); // Pasar los datos del usuario al componente AuthComponent
//             }
//           } else {
//             // El usuario no existe, crearlo en el backend
//             console.log("Va a crear", userData);
//             await createUser(userData);
//           }
//         } catch (error) {
//           console.error("Error al consultar o crear el usuario en Local:", error);
//           // Maneja los errores de consulta o creación de usuario si es necesario
//         }
//       }
//     };

//     fetchData();
//   }, [isAuthenticated, isLoading, onUserData]);

//   const createUser = async (userData) => {
//     try {
//       const response = await axios.post("http://localhost:3010/users/create", userData);
//       console.log("Usuario creado correctamente:", response.data);
//       // Realiza las acciones adicionales según tus necesidades
//       if (typeof onUserData === "function") {
//         onUserData(userData); // Pasar los datos del usuario al componente AuthComponent
//       }
//     } catch (error) {
//       console.error("Validar Datos, usuario ya existente:", error);
//       // Maneja los errores de creación de usuario si es necesario
//       if (typeof onUserData === "function") {
//         onUserData(user); // Pasar los datos del usuario al componente AuthComponent
//       }
//       console.error("Enviados datos al contenedor" + JSON.stringify(userData));
//     }
//   };

//   return null; // No renderizar nada en el componente UserSync
// };

// export default UserSync;


