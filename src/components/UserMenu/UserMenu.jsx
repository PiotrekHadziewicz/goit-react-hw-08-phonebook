import { Navbar, Nav } from 'rsuite';
import { Outlet, useNavigate, useMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/Auth/actions';
import { homepageContainer, homepageItem } from './UserMenu.styles';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const home = useMatch('/');
  const contacts = useMatch('/contacts');

  const onSelect = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <Navbar appearance='subtle'>
        <Nav onSelect={onSelect} justified style={homepageContainer}>
          <Nav.Item style={homepageItem} active={!!home} eventKey="/">
            Home
          </Nav.Item>
          <Nav.Item style={homepageItem} active={!!contacts} eventKey="/contacts">
            Contacts
          </Nav.Item>
          <Nav.Item style={homepageItem} onClick={handleLogout} eventKey="/logout">
            Logout
          </Nav.Item>
        </Nav>
      </Navbar>

      <main>
        <Outlet />
      </main>
    </>
  );
};
export default UserMenu;