import Link from "next/link";

function Layout({ children }) {
  return (
    <>
      <header className="header">
        <h2>Soroush CRM</h2>
        <Link href="/add-customer">Add Customer</Link>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <a>ArSoroush | NextJs Course | CRM Project &copy; 2026 </a>
      </footer>
    </>
  );
}

export default Layout;
