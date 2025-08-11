"use client";
import { useState } from "react";

interface FormData {
  email: string;
  message: string;
}

interface FormCarryResponse {
  code: number;
  message: string;
}

export default function Fetch() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("https://formcarry.com/s/FhLkB1BfELa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ email: email, message: message } as FormData)
    })
      .then((res) => res.json())
      .then((res: FormCarryResponse) => {
        if (res.code === 200) {
          setSubmitted(true);
        } else {
          setError(res.message);
        }
      })
      .catch((error: unknown) => setError(String(error)));
  }

  // Add a little animation for the button
  function handleButtonMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.classList.add("pressed");
  }
  function handleButtonMouseUp(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.classList.remove("pressed");
  }

  if (error) {
    return (
      <div className="contact-container">
        <div className="contact-card">
          <p className="error-message">{error}</p>
        </div>
        <style jsx>{`
          .contact-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f4f6fa 0%, #e0e7ff 100%);
          }
          .contact-card {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
            padding: 2.5rem 2rem;
            max-width: 400px;
            width: 100%;
            text-align: center;
          }
          .error-message {
            color: #e53e3e;
            font-weight: 600;
            font-size: 1.1rem;
          }
          @media (prefers-color-scheme: dark) {
            .contact-container {
              background: linear-gradient(135deg, #18181b 0%, #232336 100%);
            }
            .contact-card {
              background: #232336;
              color: #f3f4f6;
            }
            .error-message {
              color: #f87171;
            }
          }
        `}</style>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="contact-container">
        <div className="contact-card">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" style={{marginBottom: '1rem'}}>
            <circle cx="12" cy="12" r="12" fill="#4ade80"/>
            <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="success-message">We&apos;ve received your message, thank you for contacting us!</p>
        </div>
        <style jsx>{`
          .contact-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f4f6fa 0%, #e0e7ff 100%);
          }
          .contact-card {
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
            padding: 2.5rem 2rem;
            max-width: 400px;
            width: 100%;
            text-align: center;
          }
          .success-message {
            color: #22c55e;
            font-weight: 600;
            font-size: 1.1rem;
          }
          @media (prefers-color-scheme: dark) {
            .contact-container {
              background: linear-gradient(135deg, #18181b 0%, #232336 100%);
            }
            .contact-card {
              background: #232336;
              color: #f3f4f6;
            }
            .success-message {
              color: #4ade80;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="contact-page-wrapper">
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-800 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              title="map"
              src="https://www.google.com/maps?q=Patna,+Bihar,+India&output=embed"
              style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
            ></iframe>
            <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                <p className="mt-1 text-gray-700">Patna, Bihar, India</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                <a className="text-gray-500 leading-relaxed">hackwithakki@gmail.com</a>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                <p className="leading-relaxed text-gray-700">+234 813 212 9497</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <form className="contact-card" onSubmit={submit} autoComplete="off">
              <h2 className="contact-title">Contact Us</h2>
              <p className="contact-desc">We&apos;d love to hear from you! Fill out the form below and we&apos;ll get back to you soon.</p>
              <div className="input-group">
                <label htmlFor="email" className="contact-label">
                  Email
                </label>
                <input
                  id="email"
                  className="contact-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>
              <div className="input-group">
                <label htmlFor="message" className="contact-label">
                  Message
                </label>
                <textarea
                  id="message"
                  className="contact-textarea"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Type your message here..."
                  rows={5}
                />
              </div>
              <button
                type="submit"
                className="contact-button"
                onMouseDown={handleButtonMouseDown}
                onMouseUp={handleButtonMouseUp}
              >
                <span>Send</span>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{marginLeft: '0.5rem'}}>
                  <path d="M3 12l18-7-7 18-2.5-7.5L3 12z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
      <style jsx>
        {`
        .contact-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f4f6fa 0%, #e0e7ff 100%);
        }
        .contact-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          padding: 2.5rem 2rem;
          max-width: 400px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .contact-title {
          font-size: 2rem;
          font-weight: 700;
          color: #3730a3;
          margin-bottom: 0.2rem;
          letter-spacing: -1px;
        }
        .contact-desc {
          color: #64748b;
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .contact-label {
          font-weight: 600;
          color: #6366f1;
          margin-bottom: 0.1rem;
        }
        .contact-input,
        .contact-textarea {
          border: 1.5px solid #e0e7ff;
          border-radius: 8px;
          padding: 0.7rem 1rem;
          font-size: 1rem;
          background: #f9fafb;
          color: #18181b;
          transition: border 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s;
          outline: none;
          resize: none;
        }
        .contact-input:focus,
        .contact-textarea:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px #6366f133;
        }
        .contact-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
          color: #fff;
          font-weight: 700;
          font-size: 1.1rem;
          border: none;
          border-radius: 8px;
          padding: 0.85rem 1.5rem;
          margin-top: 0.5rem;
          cursor: pointer;
          box-shadow: 0 2px 8px 0 rgba(99,102,241,0.08);
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
        }
        .contact-button:hover {
          background: linear-gradient(90deg, #818cf8 0%, #6366f1 100%);
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 4px 16px 0 rgba(99,102,241,0.13);
        }
        .contact-button.pressed {
          transform: scale(0.97);
          background: #6366f1;
        }
        @media (max-width: 500px) {
          .contact-card {
            padding: 1.5rem 0.7rem;
          }
        }
        @media (prefers-color-scheme: dark) {
          .contact-container {
            background: linear-gradient(135deg, #18181b 0%, #232336 100%);
          }
          .contact-card {
            background: #232336;
            color: #f3f4f6;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
          }
          .contact-title {
            color: #a5b4fc;
          }
          .contact-desc {
            color: #cbd5e1;
          }
          .contact-label {
            color: #a5b4fc;
          }
          .contact-input,
          .contact-textarea {
            background: #18181b;
            color: #f3f4f6;
            border: 1.5px solid #312e81;
          }
          .contact-input:focus,
          .contact-textarea:focus {
            border-color: #818cf8;
            box-shadow: 0 0 0 2px #818cf833;
          }
          .contact-button {
            background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
            color: #fff;
          }
          .contact-button:hover {
            background: linear-gradient(90deg, #818cf8 0%, #6366f1 100%);
          }
          .contact-button.pressed {
            background: #6366f1;
          }
        }
      `}
      </style>
    </div>
  );
}