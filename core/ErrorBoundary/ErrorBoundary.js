import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.state = { error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.log({ error, errorInfo }, "error");
  }
  render() {
    if (this.state.hasError) {
      return <div>PAGE NOT FOUND</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
