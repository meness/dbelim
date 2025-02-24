import { ReactFlowProvider } from '@xyflow/react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Double Elimination Bracket',
  description: 'Sample double elimination bracket using React Flow.'
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <ReactFlowProvider>{children}</ReactFlowProvider>
      </body>
    </html>
  );
};

export default RootLayout;
