import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css'; 

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
            <Image src="/images/logo.svg" alt="Logo" width={60} height={60} />
        </Link>
      </div>
      <div className={styles.links}>
        <Link href="/">
          <p className={styles.navLink}>Home</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
