import { Container } from "../../styles/container";
import {RegisterContent,FormRegister,RegisterError} from '../../styles/register'
import { Link } from "react-router-dom";
import  {z , ZodType} from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser, } from "../../utils/api/auth/authRegister"
import { RegisterRequest,ApiError } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
type Form = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const MySwal = withReactContent(Swal);
const showToast = (message: string, icon: "success" | "error" | "warning" | "info") => {
  MySwal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 750, // 3 秒後自動消失
    timerProgressBar: false,
  });
};
const Register = () =>{
   const [isLoading,setIsLoading] =  useState<boolean>(false)
  const navigate = useNavigate();
  const validationSchema : ZodType<Form> = z.object({
    email: z.string().nonempty( { message: "請輸入電子郵件" }).email({ message: "請輸入有效的電子郵件格式" }),
    name: z.string().nonempty( { message: "請輸入您的暱稱" }),
    password: z.string().nonempty({message:'請輸入您的密碼'}).min(6, { message: "密碼至少需要6個字符" }),
    confirmPassword: z.string().nonempty({message:'請輸入您的密碼'}),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "與密碼不相符",
    path: ["confirmPassword"],
  })

  const {register,handleSubmit,formState:{errors},reset} = useForm<Form>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email:"" ,
      name: "",
      password:"" ,
      confirmPassword:"" 
    }
  })

  const onSubmit = async (values:Form) =>{
    const formData:RegisterRequest = {
      nickname: values.name,
      password: values.password,
      email: values.email
    }
    setIsLoading(true)
    const response = await registerUser(formData)
    if(response.status){
      // console.log('註冊成功',response.uid)
      showToast("註冊成功，請登入！", "success")
      navigate('/login')
    }else{
      const error =response as ApiError
      showToast(`${error.message}`, "error")
    }

    reset({
      email:"" ,
      name: "",
      password:"" ,
      confirmPassword:"" 
    })
    setIsLoading(false)
  }

  // console.log('errors',errors)

  return(
    <>
     <main className="register-main">
      <Container >
        <RegisterContent>
          <h2>註冊</h2>
          <FormRegister onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Email</label>
              <input type="email" {...register("email")}></input>
              <RegisterError $isVisible={!!errors.email?.message}>
                <span>{errors.email?.message || ""}</span>
              </RegisterError>
            </div>
            <div>
              <label>您的暱稱</label>
              <input type="text"  {...register("name")}></input>
              <RegisterError $isVisible={!!errors.name?.message}>
                <span>{errors.name?.message || ""}</span>
              </RegisterError>
            </div>
            <div>
              <label>密碼</label>
              <input type="password"  {...register("password")}></input>
              <RegisterError $isVisible={!!errors.password?.message}>
                <span>{errors.password?.message || ""}</span>
              </RegisterError>
            </div>
            <div>
              <label>再次確認密碼</label>
              <input type="password"  {...register("confirmPassword")}></input>
              <RegisterError $isVisible={!!errors.confirmPassword?.message}>
                <span>{errors.confirmPassword?.message || ""}</span>
              </RegisterError>
            </div>
            <div className="register-btn-group"> 
              <button className="register-btn" disabled={isLoading}>
                {isLoading ? (
                  <ClipLoader size={20} color="#FFD370" />
                ) : (
                  "註冊"
                )}  
              </button>
              <Link className="register-link" to="../login">登入</Link>
            </div>
          </FormRegister>
        </RegisterContent>
      </Container>
     </main>
    
    </>
  )
}

export default Register;
