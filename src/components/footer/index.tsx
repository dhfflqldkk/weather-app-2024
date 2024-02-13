import styles from './Footer.module.css'; 
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.logo}>
        <Link href="/">
            <Image src="/images/logo.svg" alt="Logo" width={60} height={60} />
        </Link>
      </div>
      <p>© {new Date().getFullYear()} CloudSight. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
