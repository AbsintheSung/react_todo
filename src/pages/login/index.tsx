import { Container } from "../../styles/container";
import { LoginContent, FormLogin } from "../../styles/login";
import { Link } from "react-router-dom";
function Login() {
  return (
    <>
      <Container >
        <LoginContent>
            <h2>線上代辦事項服務</h2>
            <FormLogin>
              <div>
                <label>Email</label>
                <input type="email"></input>
              </div>
              <div>
                <label>密碼</label>
                <input type="password"></input>
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
