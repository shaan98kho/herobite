// Toast.test.tsx
import { render, screen } from '@testing-library/react'
import Toast from "@/components/toast"
import userEvent from "@testing-library/user-event"

describe("Toast component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the message", () => {
    render(<Toast message="Test Message" onClose={jest.fn()} />);
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it("calls onClose after the specified duration", () => {
    const onClose = jest.fn();
    const duration = 3000;
    render(<Toast message="Test Message" duration={duration} onClose={onClose} />);
    
    // Fast-forward time
    jest.advanceTimersByTime(duration);
    
    expect(onClose).toHaveBeenCalled();
  });
});
