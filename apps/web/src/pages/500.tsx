import React from 'react';
import Link from 'next/link';

export default function Custom500() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#080C14',
      color: '#FEF3C7',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '48px', margin: '0 0 10px 0', color: '#DC2626' }}>500</h1>
      <h2 style={{ fontSize: '24px', margin: '0 0 20px 0', color: '#FEF3C7' }}>Server Error</h2>
      <p style={{ color: 'rgba(254, 243, 199, 0.7)', maxWidth: '400px', marginBottom: '30px', fontSize: '14px' }}>
        An unexpected error occurred while generating the astrological calculations.
      </p>
      <Link href="/" style={{
        backgroundColor: '#D97706',
        color: '#FFFFFF',
        padding: '12px 24px',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '14px'
      }}>
        Return to Home
      </Link>
    </div>
  );
}