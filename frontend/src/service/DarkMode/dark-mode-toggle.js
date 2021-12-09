import React from "react";

const Toggle = ({ darkMode, setDarkMode }) => {
    return (
        <div className="dark-mode-toggle">
            <span className="btn" style={{ border: "none" }} onClick={() => { setDarkMode(!darkMode) }}>
                <span>
                    {darkMode && localStorage.getItem('dark-mode-enabled') !== null ? (
                        <svg fill="#bdc1c6" windth="24" height="24" viewBox="0 0 24 24">
                            <path d="M12,2C9.76,2 7.78,3.05 6.5,4.68L16.31,14.5C17.94,13.21 19,11.24 19,9A7,7 0 0,0 12,2M3.28,4L2,5.27L5.04,8.3C5,8.53 5,8.76 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H14.73L18.73,22L20,20.72L3.28,4M9,20V21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9Z" />
                        </svg>
                    ) : (
                        <svg fill="currentColor" windth="24" height="24" viewBox="0 0 24 24">
                            <path d="M12,6A6,6 0 0,1 18,12C18,14.22 16.79,16.16 15,17.2V19A1,1 0 0,1 14,20H10A1,1 0 0,1 9,19V17.2C7.21,16.16 6,14.22 6,12A6,6 0 0,1 12,6M14,21V22A1,1 0 0,1 13,23H11A1,1 0 0,1 10,22V21H14M20,11H23V13H20V11M1,11H4V13H1V11M13,1V4H11V1H13M4.92,3.5L7.05,5.64L5.63,7.05L3.5,4.93L4.92,3.5M16.95,5.63L19.07,3.5L20.5,4.93L18.37,7.05L16.95,5.63Z" />
                        </svg>
                    )}
                </span>
            </span>
        </div>
    )
};

export default Toggle;
