// Cookie Configuration
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None', // Strict | Lax | None
    maxAge: 24 * 60 * 60, // 1 day
};

module.exports = cookieOptions;