import { Container } from "../../styles/container";
import {RegisterContent,FormRegister} from '../../styles/register'

const Register = () =>{
  return(
    <>
     <Container >
      <RegisterContent>
        <h2>註冊</h2>
        <FormRegister>
          <div>
            <label>Email</label>
            <input type="email"></input>
          </div>
          <div>
            <label>您的暱稱</label>
            <input type="text"></input>
          </div>
          <div>
            <label>密碼</label>
            <input type="password"></input>
          </div>
          <div>
            <label>再次確認密碼</label>
            <input type="password"></input>
          </div>
          <div>
            <button>註冊</button>
            <a href="#">連結到登入</a>
          </div>
        </FormRegister>
      </RegisterContent>
 
     </Container>
    </>
  )
}

export default Register;