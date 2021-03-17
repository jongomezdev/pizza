import React from 'react';
import Footer from './Footer';
import Nav from './Nav';

export default function Layout() {
  return (
    <div>
      <Nav />
      <p>I am the page content</p>
      <Footer />
    </div>
  );
}
