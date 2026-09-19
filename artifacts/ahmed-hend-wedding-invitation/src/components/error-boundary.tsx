import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  resetKey?: unknown;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.resetKey !== prevProps.resetKey) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-serif text-foreground mb-4">Something went wrong</h2>
            <p className="text-muted-foreground mb-8">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background font-sans text-xs uppercase tracking-widest hover:bg-primary transition-colors duration-300"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
