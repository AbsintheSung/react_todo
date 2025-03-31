import { Container } from "../../styles/container";
import {RegisterContent,FormRegister} from '../../styles/register'
import { Link } from "react-router-dom";
import  {z , ZodType} from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser, type RegisterRequest } from "../../utils/api/register"
import { useNavigate } from "react-router-dom";
type Form = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}


const Register = () =>{
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
    try {
      const response = await registerUser(formData)
      console.log('response',response)
      if(response?.data?.status){
        console.log('跳轉')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
    reset({
      email:"" ,
      name: "",
      password:"" ,
      confirmPassword:"" 
    })
  }

  console.log('errors',errors)

  return(
    <>
     <Container >
      <RegisterContent>
        <h2>註冊</h2>
        <FormRegister onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email</label>
            <input type="email" {...register("email")}></input>
            <p className="register-error">{errors.email?.message? errors.email.message :''}</p>
          </div>
          <div>
            <label>您的暱稱</label>
            <input type="text"  {...register("name")}></input>
            <p  className="register-error">{errors.name?.message? errors.name.message :''}</p>
          </div>
          <div>
            <label>密碼</label>
            <input type="password"  {...register("password")}></input>
            <p  className="register-error">{errors.password?.message? errors.password.message :''}</p>
          </div>
          <div>
            <label>再次確認密碼</label>
            <input type="password"  {...register("confirmPassword")}></input>
            <p  className="register-error">{errors.confirmPassword?.message? errors.confirmPassword.message :''}</p>
          </div>
          <div>
            <button>註冊</button>
            <Link to="../login">連結到登入</Link>
          </div>
        </FormRegister>
      </RegisterContent>
 
     </Container>
    </>
  )
}

export default Register;