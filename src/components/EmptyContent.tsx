import emptyImg from "../assets/images/no-note.png"
import { EmptyText,ImageContainer,EmptyContainer } from "../styles/emptycontent";




export default function EmptyContent() {
  return (
    <EmptyContainer>
      <EmptyText>目前無代辦事項</EmptyText>
      <ImageContainer>
        <img
          src={emptyImg}
        />
      </ImageContainer>
    </EmptyContainer>
  )
}

