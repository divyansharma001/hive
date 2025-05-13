import React from 'react'

function Footer() {
  return (
    <footer className="footer footer-center bg-hive-black text-hive-gray-light p-4 border-t border-hive-gray-dark text-xs">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved by Hive Social Ltd.</p>
        {/* Optional: Add links to Privacy Policy, Terms of Service */}
      </aside>
    </footer>
  )
}
export default Footer