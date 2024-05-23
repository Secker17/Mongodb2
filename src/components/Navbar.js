import React from 'react';
import styled from 'styled-components';

// Container for the entire Navbar
const NavbarContainer = styled.nav`
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  transition: box-shadow 0.3s ease-in-out;
`;

// Logo styling with hover effect
const Logo = styled.h1`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 1.8rem; // Slightly smaller for better aesthetics
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;

// Navigation links container
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; // Space between items
`;

// Individual navigation link styling
const NavLink = styled.a`
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #dfe6e9;
  }
`;

// Styled link button for calls to action
const ActionButton = styled.a`
  background-color: white;
  color: #00f2fe;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none; // Removes underline
  transition: background-color 0.3s;
  display: inline-block; // Ensures proper alignment
  &:hover {
    background-color: #4facfe;
    color: white;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>MongoDB Setup Guide</Logo>
      <NavLinks>
        <NavLink href="#features">Sponsorer</NavLink>
        <NavLink href="#pricing">Tips</NavLink>
        <NavLink href="#about">Om oss</NavLink>
        <ActionButton href="https://www.arsenal.com/">Link</ActionButton>
      </NavLinks>
    </NavbarContainer>
  );
}

export default Navbar;
