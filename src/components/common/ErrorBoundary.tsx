import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onReset?: () => void;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

/**
 * Error Boundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 * 
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error details
        console.error('Error caught by boundary:', error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });

        // TODO: Send to error reporting service (e.g., Sentry)
        // reportError(error, errorInfo);
    }

    handleReset = () => {
        const { onReset } = this.props;

        this.setState({
            hasError: false,
            error: undefined,
            errorInfo: undefined,
        });

        if (onReset) {
            onReset();
        }
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                        {/* Error Icon */}
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <AlertTriangle className="w-10 h-10 text-red-600" />
                        </div>

                        {/* Error Message */}
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Oops! Something went wrong
                        </h2>

                        <p className="text-gray-600 mb-8">
                            {process.env.NODE_ENV === 'development'
                                ? this.state.error?.message
                                : 'We encountered an unexpected error. Please try refreshing the page or go back to the homepage.'}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-center mb-6">
                            <button
                                onClick={this.handleReset}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </button>

                            <button
                                onClick={this.handleGoHome}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                            >
                                <Home className="w-4 h-4" />
                                Go Home
                            </button>
                        </div>

                        {/* Developer Details */}
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-6 text-left">
                                <summary className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                                    🔍 Error Details (Development Only)
                                </summary>
                                <div className="mt-3 space-y-3">
                                    {/* Error Message */}
                                    <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                        <p className="text-xs font-semibold text-red-800 mb-1">Error Message:</p>
                                        <p className="text-xs text-red-700">{this.state.error.message}</p>
                                    </div>

                                    {/* Stack Trace */}
                                    {this.state.error.stack && (
                                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                            <p className="text-xs font-semibold text-gray-800 mb-2">Stack Trace:</p>
                                            <pre className="text-xs text-gray-700 overflow-auto max-h-48 whitespace-pre-wrap">
                                                {this.state.error.stack}
                                            </pre>
                                        </div>
                                    )}

                                    {/* Component Stack */}
                                    {this.state.errorInfo?.componentStack && (
                                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <p className="text-xs font-semibold text-blue-800 mb-2">Component Stack:</p>
                                            <pre className="text-xs text-blue-700 overflow-auto max-h-48 whitespace-pre-wrap">
                                                {this.state.errorInfo.componentStack}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </details>
                        )}

                        {/* Help Text */}
                        <p className="mt-6 text-xs text-gray-500">
                            If this problem persists, please contact support.
                        </p>
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
