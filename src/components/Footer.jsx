import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import './style.css';


export default function Footer() {
  return (
    <MDBFooter className='bg-dark text-center text-white footer'>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>
          <MDBBtn outline color="success" target="_blank" floating className='m-1' href='https://www.instagram.com/d.iegof/' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="success" target="_blank" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="success" target="_blank" floating className='m-1' href='https://github.com/diegofernandesss' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(4, 122, 72, 0.8)' }}>
        Desenvolvedor - Diego Fernandes
      </div>
    </MDBFooter >

  );
}