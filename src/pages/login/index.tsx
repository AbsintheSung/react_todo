import { Container } from "../../styles/container";
import { LoginContent, FormLogin,LoginError } from "../../styles/login";
import { Link } from "react-router-dom";
import  {z , ZodType} from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from '../../utils/api/auth/authLogin';
type LoginForm = {
  email: string;
  password: string;
}


function Login() {
  const validationSchema : ZodType<LoginForm> = z.object({
      email: z.string().nonempty( { message: "請輸入電子郵件" }).email({ message: "請輸入有效的電子郵件格式" }),
      password: z.string().nonempty({message:'請輸入您的密碼'}).min(6, { message: "密碼至少需要6個字符" }),
    })
  
  
    const {register:login,handleSubmit,formState:{errors},reset} = useForm<LoginForm>({
      resolver: zodResolver(validationSchema),
      defaultValues: {
        email: "",
        password: ""
      }
    })
  
    const onSubmit = async (values:LoginForm) =>{
      const response = await loginUser(values);
      if(response.status){
        console.log('成功登入',response)
      }else{
        console.log('失敗',response.message)
      }
      reset({
        email: "",
        password: ""
      })
    }
  
    console.log('errors',errors)
  return (
    <>
    <main className="login-main">
      <Container onSubmit={handleSubmit(onSubmit)}>
        <LoginContent>
            <h2>線上代辦事項服務</h2>
            <FormLogin>
              <div>
                <label>Email</label>
                <input type="email" {...login('email')} ></input>
                <LoginError $isVisible={!!errors.email?.message}>
                  <span>{errors.email?.message || ""}</span>
                </LoginError>
              </div>
              <div>
                <label>密碼</label>
                <input type="password" {...login('password')}></input>
                <LoginError $isVisible={!!errors.password?.message}>
                  <span>{errors.password?.message || ""}</span>
                </LoginError>
              </div>
              <div className="login-btn-group">
                <button className="login-btn">登入</button>
                <Link className="login-link" to="../register">註冊帳號</Link>
              </div>
            </FormLogin>
        </LoginContent>
      </Container>
    </main>
      
    </>
  )
}
export default Login
