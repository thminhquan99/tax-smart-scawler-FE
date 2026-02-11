import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
    onReset?: () => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 */
export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });

        // Optional: Send to error reporting service
        // reportError(error, errorInfo);
    }

    private handleReset = () => {
        const { onReset } = this.props;

        this.setState({ hasError: false, error: null, errorInfo: null });

        if (onReset) {
            onReset();
        } else {
            window.location.reload();
        }
    };

    private handleGoHome = () => {
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-wood-deep text-parchment-light">
                    <div className="max-w-md w-full bg-wood-dark p-8 rounded-lg border-2 border-gold-dark shadow-2xl">
                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="p-4 bg-red-900/30 rounded-full border border-red-500/30">
                                <AlertTriangle className="w-12 h-12 text-red-400" />
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-2xl font-display font-bold text-gold">Something went wrong</h1>
                                <p className="text-parchment/80 font-body">
                                    Our magical scribes encountered an unexpected error while processing your request.
                                </p>
                            </div>

                            {/* Development Error Details */}
                            {import.meta.env.DEV && this.state.error && (
                                <div className="w-full text-left bg-black/30 p-4 rounded border border-white/10 overflow-auto max-h-48">
                                    <p className="font-mono text-xs text-red-300 mb-2">{this.state.error.message}</p>
                                    {this.state.errorInfo && (
                                        <pre className="font-mono text-[10px] text-gray-400 whitespace-pre-wrap">
                                            {this.state.errorInfo.componentStack}
                                        </pre>
                                    )}
                                </div>
                            )}

                            <div className="flex w-full gap-3 pt-2">
                                <button
                                    onClick={this.handleGoHome}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-wood-light/20 hover:bg-wood-light/30 border border-gold-dark/30 rounded text-gold-light transition-colors"
                                >
                                    <Home className="w-4 h-4" />
                                    <span>Go Home</span>
                                </button>
                                <button
                                    onClick={this.handleReset}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gold hover:bg-gold-light text-wood-deep font-bold rounded shadow-lg shadow-gold/10 transition-colors"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Reload Page</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * Hook-based error boundary wrapper
 * For use in functional components
 */
export function withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    fallback?: ReactNode,
) {
    return function WithErrorBoundaryWrapper(props: P) {
        return (
            <ErrorBoundary fallback={fallback}>
                <Component {...props} />
            </ErrorBoundary>
        );
    };
}
