import { Container } from "../../styles/container";
import { LoginContent, FormLogin } from "../../styles/login";
import { Link } from "react-router-dom";
import  {z , ZodType} from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";

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
      resolver: zodResolver(validationSchema)
    })
  
    const onSubmit = (values:LoginForm) =>{
      console.log('成功的console',values)
      console.log('發送API，並重置表單')
      reset()
    }
  
    console.log('errors',errors)
  return (
    <>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <LoginContent>
            <h2>線上代辦事項服務</h2>
            <FormLogin>
              <div>
                <label>Email</label>
                <input type="email" {...login('email')} ></input>
                <p className="register-error">{errors.email?.message? errors.email.message :''}</p>
              </div>
              <div>
                <label>密碼</label>
                <input type="password" {...login('password')}></input>
                <p className="register-error">{errors.password?.message? errors.password.message :''}</p>
              </div>
              <div>
                <button>登入</button>
                <Link to="../register">連結到註冊</Link>
              </div>
            </FormLogin>
        </LoginContent>
      </Container>
    </>
  )
}
export default Login
