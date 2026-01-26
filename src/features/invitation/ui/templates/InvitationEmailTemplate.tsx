// 'use client';

import * as React from 'react';


interface EmailTemplateProps {
  email: string;
  token: string;
  inviterName?: string;
  teamName?: string;
  expiresInHours?: number;
}

export default function EmailTemplate({
  email,
  token,
  inviterName = 'Tuan Nguyen',
  teamName = 'HR Department',
  expiresInHours = 72,
}: EmailTemplateProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'localhost:3000';
  const inviteUrl = `${baseUrl.replace(/\/$/, '')}/invitation?token=${encodeURIComponent(token,)}&email=${encodeURIComponent(email)}`;

  const primaryColor = '#2563eb'; // blue-600
  const textColor = '#0f172a'; // slate-900

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: 24 }}>
      <table
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        role="presentation"
        style={{ maxWidth: 680, margin: '0 auto', background: '#ffffff', borderRadius: 8, overflow: 'hidden', fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", color: textColor }}>
        <tbody>
          <tr>
            <td style={{ padding: '28px 32px', borderBottom: '1px solid #eef2ff' }}>
              <h1 style={{ margin: 0, fontSize: 20, color: textColor }}>You're invited to join {teamName} 🎉</h1>
              <p style={{ margin: '8px 0 0', color: '#475569' }}>
                {inviterName} has invited <strong>{email}</strong> to join {teamName} on TeamHub.
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ padding: 24 }}>
              <p style={{ margin: '0 0 18px', color: '#475569' }}>
                Click the button below to accept the invitation and create your account. This link will expire in approximately {expiresInHours} hours.
              </p>
              <p style={{ textAlign: 'center', margin: '0 0 20px' }}>
                <a
                  href={inviteUrl.startsWith('http') ? inviteUrl : `http://${inviteUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  aria-label="Accept Invitation"
                  style={{
                    display: 'inline-block',
                    backgroundColor: primaryColor,
                    color: '#ffffff',
                    padding: '12px 20px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'transform 150ms ease, box-shadow 150ms ease',
                    boxShadow: '0 2px 6px rgba(37,99,235,0.12)',
                    transform: 'translateY(0)',
                    willChange: 'transform, box-shadow',
                  }}>
                  Accept Invitation
                </a>
              </p>
              <div style={{ fontSize: 13, color: '#475569', background: '#f8fafc', padding: 12, borderRadius: 6 }}>
                <p style={{ margin: '0 0 6px' }}>
                  Or copy and paste this link into your browser:
                </p>
                <p style={{ margin: 0, wordBreak: 'break-all' }}>
                  <a href={inviteUrl.startsWith('http') ? inviteUrl : `http://${inviteUrl}`} style={{ color: primaryColor }}>{inviteUrl}</a>
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '18px 24px', borderTop: '1px solid #f1f5f9', background: '#fbfbff' }}>
              <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
                If you didn't expect this invitation, you can ignore this email and the link will expire automatically.
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>
              <div>TeamHub — Built for internal teams</div>
              <div style={{ marginTop: 6 }}>Need help? Reply to this email or contact support at <a href="mailto:support@teamhub.example">support@teamhub.com</a></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}