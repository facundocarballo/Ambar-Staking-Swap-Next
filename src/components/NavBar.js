import React from 'react';
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Spinner } from "react-bootstrap";
import logo from '../../public/logo.png';
import navIcon1 from '../../public/assets/img/nav-icon1.svg';
import navIcon2 from '../../public/assets/img/nav-icon2.svg';
import navIcon3 from '../../public/assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { useProvider } from '../context';

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loadContractData, wallet } = useProvider();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const handleConnect = async () => {
    setLoading(true);
    await loadContractData();
    setLoading(false);
  };

  const getCleanAddress = (address) => {
    const firstPart = String(address).substring(0, 4);
    const secondPart = String(address).substring((String(address).length-5), (String(address).length-1));

    return firstPart + "..." + secondPart;
  };

  return (
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="Swap" className={activeLink === 'swap' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Swap</Nav.Link>
              <Nav.Link href="Staking" className={activeLink === 'staking' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Staking</Nav.Link>
              <Nav.Link href="Market " className={activeLink === 'market' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Market</Nav.Link>
              <Nav.Link href="https://ambarcoin.gitbook.io/ambar" className={activeLink === 'whitepaper' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('whitepaper')}>Whitepaper</Nav.Link>
            </Nav>
            <span className="navbar-text">
              {
                wallet == null ?
                  <button onClick={handleConnect} className="vvd"><span>Connect wallet</span></button>
                  : loading ? 
                  <Spinner /> 
                  : <button className="vvd"><span>{getCleanAddress(wallet)}</span></button>
              }
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Router>
  )
}
