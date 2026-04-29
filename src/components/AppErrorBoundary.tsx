import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep console output for debugging on GitHub Pages.
    // eslint-disable-next-line no-console
    console.error('App crashed:', error, info);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div style={{ fontFamily: 'ui-sans-serif, system-ui', padding: 24 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Aplikace spadla při načítání</h1>
        <p style={{ color: '#475569', marginBottom: 12 }}>
          Otevři DevTools → Console, zkopíruj chybu a pošli mi ji sem. Nejčastěji jde o chybějící konfiguraci v
          prostředí (např. Supabase).
        </p>
        <pre
          style={{
            background: '#0b1020',
            color: '#e2e8f0',
            padding: 12,
            borderRadius: 8,
            overflow: 'auto',
            whiteSpace: 'pre-wrap',
          }}
        >
          {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
        </pre>
      </div>
    );
  }
}

