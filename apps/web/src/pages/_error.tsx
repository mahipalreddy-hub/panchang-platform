import React from 'react';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

function ErrorPage({ statusCode }: ErrorProps) {
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
      <h1 style={{ fontSize: '48px', margin: '0 0 10px 0', color: '#D97706' }}>
        {statusCode || 'Error'}
      </h1>
      <h2 style={{ fontSize: '20px', margin: '0 0 20px 0', color: '#FEF3C7' }}>
        {statusCode ? `An error ${statusCode} occurred` : 'An error occurred on client'}
      </h2>
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

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;