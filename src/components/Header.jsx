import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,

  MDBNavbarBrand,
} from 'mdb-react-ui-kit';

import {Container} from 'react-bootstrap'

export default function Header() {

  return (
      <MDBNavbar light dark bgColor='success' >
        <MDBContainer fluid >
          <Container>
              <MDBNavbarBrand tag="span" className=' navbar-expand-sm navbar-dark'>Cafeteria⠀<MDBIcon icon='coffee' /></MDBNavbarBrand>
          </Container>
        </MDBContainer>

      </MDBNavbar>

  );
}