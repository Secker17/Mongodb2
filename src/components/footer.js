import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #333;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  font-family: 'Arial', sans-serif;

  @media (max-width: 600px) {
    padding: 15px 0;
    font-size: 12px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>Copyright © 2023 Secker Consulting. Alle rettigheter forbeholdt.</p>
    </FooterContainer>
  );
}

export default Footer;
