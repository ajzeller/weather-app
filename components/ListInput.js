import styled, { css } from 'styled-components'
import { MdClear, MdAdd } from 'react-icons/md';

const ListItemContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 10px;
  align-items: center;
  justify-content: left;
  background-color: ${props => props.theme.theme.bg.primary};
  padding: 10px;
  border-radius: 0.5rem;
  margin: 10px 0;
  box-sizing: border-box;
  font-size: ${props => props.theme.theme.fontSizes[1]};
  input:focus, textarea:focus, select:focus{
        outline: none;
    }
`

const HoverSpan = styled.span`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;    
  }
`

const TextInput = styled.input`
  border: none;
  background-color: ${props => props.theme.theme.bg.primary};
  font-size: ${props => props.theme.theme.fontSizes[1]};
  color: ${props => props.theme.theme.text.primary};
`

const ListInput = ( props ) => (
  <ListItemContainer>
    <HoverSpan><MdClear onClick={props.handleClear} /></HoverSpan>
    <TextInput 
      type="text" 
      value={props.text} 
      onChange={props.handleChange} 
      placeholder='type new todo item here' 
      required>
    </TextInput>
    <HoverSpan><MdAdd onClick={props.handleAdd} /></HoverSpan>
  </ListItemContainer>
)

export default ListInput