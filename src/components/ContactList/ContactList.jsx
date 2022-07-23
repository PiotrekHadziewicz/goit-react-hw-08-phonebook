import { StyledList, StyledListButton, StyledListItem } from "./ContactList.styles";

export const ContactList = ({ contacts, filter, deleteHandler }) => {
  return (
    <StyledList>
      {{ filter } === ''
        ? contacts.items.map(contact => (
            <StyledListItem key={contact.id}>
              {contact.name}: {contact.number}
              <StyledListButton type="button" onClick={() => deleteHandler(contact.id)}>
                Delete
              </StyledListButton>
            </StyledListItem>
          ))
        : contacts.items
            .filter(contact =>
              contact.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map(contact => (
              <StyledListItem key={contact.id}>
                {contact.name}: {contact.number}
                <StyledListButton
                  type="button"
                  onClick={() => deleteHandler(contact.id)}
                >
                  Delete
                </StyledListButton>
              </StyledListItem>
            ))}
    </StyledList>
  );
};
