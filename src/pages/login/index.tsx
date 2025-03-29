import { Container } from "../../styles/container";
import { LoginContent, FormLogin } from "../../styles/login";
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
                <a href="#">連結到註冊</a>
              </div>
            </FormLogin>
        </LoginContent>
      </Container>
    </>
  )
}
export default Login
