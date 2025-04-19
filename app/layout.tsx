import React from 'react';

export const metadata = {
    title: 'URL Shortener App',
    description: 'Get Shortcuts to Long URLS',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
               <div>
                 {children}
                </div>
            </body>
        </html>
    );
}
