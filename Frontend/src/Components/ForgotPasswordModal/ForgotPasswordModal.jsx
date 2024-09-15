import React from 'react';
import './ForgotPasswordModal.css';

function ForgotPasswordModal() {
  return (
    <div>
        <div>
            <form>
            <input
              type="email"
              placeholder="Enter Email"
              required
            />
            <button>
              Submit
            </button>

            </form>
        
        </div>

    </div>
  )
}

export default ForgotPasswordModal;