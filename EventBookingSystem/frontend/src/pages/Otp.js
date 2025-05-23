import { useState } from 'react';

const URL = process.env.REACT_APP_BACKEND_URL;

const Otp = () => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false); 
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${URL}/guest/requestOtp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Failed to send OTP');
            } else {
                setOtpSent(true); 
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${URL}/guest/verifyOtp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error || 'Failed to verify OTP');
            } else {
                alert('Password updated successfully!');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="forgotPassword" onSubmit={otpSent ? handleSubmit : handleRequestOtp}>
            <h3>Forgot Password</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />

            {otpSent ? (
                <>
                    <label>OTP:</label>
                    <input
                        type="text"
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                        required
                    />

                    <label>New Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        required
                    />
                </>
            ) : (
                <button type="submit" disabled={isLoading}>
                    Request OTP
                </button>
            )}

            {otpSent && (
                <button type="submit" disabled={isLoading}>
                    Submit
                </button>
            )}

            {error && <div className="error">{error}</div>}
            {isLoading && <div className="loading">Loading...</div>}
        </form>
    );
};

export default Otp;