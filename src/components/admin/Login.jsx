import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
   email: yup.string().required().email(),
   password: yup.string().required(),
})

const Login = ({ onSubmit }) => {
   const {
      register,
      handleSubmit,
      formState,
      formState: { errors },
      setValue,
      watch,
   } = useForm({
      mode: "onTouched",
      resolver: yupResolver(schema),
   })

   const { isSubmitting } = formState

   const login = (data) => {
      onSubmit(data)
   }

   return (
      <form className="form-contact" onSubmit={handleSubmit(login)}>
         <label htmlFor="email">
            E-mail:
            <input
               id="email"
               type="email"
               className="form-control"
               {...register("email")}
            />
            {errors.email && (
               <span className="error">{errors.email.message}</span>
            )}
         </label>
         <label htmlFor="password">
            Mot de passe:
            <input
               id=""
               type="password"
               className="form-control"
               {...register("password")}
            />
            {errors.password && (
               <span className="error">{errors.password.message}</span>
            )}
         </label>
         <button type="submit" className="submit" disabled={isSubmitting}>
            Connexion
         </button>
      </form>
   )
}

export default Login
