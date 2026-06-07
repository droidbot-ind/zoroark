import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { ErrorState } from "./ErrorState";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, info);
  }

  reset = () => this.setState({ hasError: false, error: undefined });

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-10">
          <ErrorState
            title="Application error"
            error={this.state.error}
            message="An unexpected error occurred. Try reloading the page."
            onRetry={() => {
              this.reset();
              window.location.reload();
            }}
          />
        </div>
      );
    }
    return this.props.children;
  }
}
