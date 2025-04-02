import { HeaderContainer,LogoContainer,NavList } from '../styles/header'

type HeaderProps = {
  username?: string
  onSignOut?: () => void
}

export default function Header({ username = "使用者的代辦事項", onSignOut = () => {} }: HeaderProps) {
  return (
    <HeaderContainer>
      <LogoContainer>
        <div className="icon-box">
          {/* <FontAwesomeIcon icon={faCheck} /> */}
        </div>
        <h1>ONLINE TODO LIST</h1>
      </LogoContainer>

      <NavList>
        <li><p className="user-Info">{username}的代辦事項</p></li>
        <li> <button className="signout-btn" onClick={onSignOut}>登出</button></li>
      </NavList>
    </HeaderContainer>
  )
}
