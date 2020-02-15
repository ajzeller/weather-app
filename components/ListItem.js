import styled, { css } from 'styled-components'
import { MdCheckBoxOutlineBlank, MdCheckBox, MdDelete } from 'react-icons/md';


const ListItemContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 10px;
  align-items: center;
  justify-content: left;
  background-color: ${props => props.theme.theme.bg.primary};
  padding: 10px;
  border-radius: 0.5rem;
  margin: 0 0 10px 0;
  box-sizing: border-box;
  font-size: ${props => props.theme.theme.fontSizes[1]};
  /* text-decoration: ${ props => props.isChecked ? 'line-through' : 'none'}; */

  ${props => props.isChecked ? 
  css`
    color: grey;
    text-decoration: line-through;
  ` : 
css`text-decoration: none;`

  }
`

const HoverSpan = styled.span`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;    
  }
`

const ListItem = ( props ) => (
  <ListItemContainer isChecked={props.isChecked}>
    <HoverSpan>{props.isChecked ? 
      <MdCheckBox onClick={props.toggleChecked} /> : 
      <MdCheckBoxOutlineBlank onClick={props.toggleChecked} /> }
    </HoverSpan>
    <span>{props.text}</span>
    <HoverSpan><MdDelete onClick={props.handleDelete} /></HoverSpan>
  </ListItemContainer>
)

export default ListItem