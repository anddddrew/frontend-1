import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

function Error({ statusCode }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Error {statusCode} | HaaS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Error {statusCode}</h1>
        <h5 className={styles.subtitle}>
          Would you like to go <Link href="/">back home</Link>?
        </h5>
<<<<<<< HEAD
<<<<<<< HEAD
        <img
          src="/assets/haas-logo-256-rounded.png"
          alt="HaaS logo"
        ></img>
      </main>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
=======
        <img src="/assets/haas-logo-256-rounded.png" alt="HaaS logo"></img>
=======
        <img
          src="http://localhost:5000/assets/haas-logo-256-rounded.png"
          alt="HaaS logo"
        ></img>
>>>>>>> c0e6075 (Ran prettier on code.)
      </main>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

<<<<<<< HEAD
>>>>>>> 0e8d1eb (Catch-all error page.)
=======
export default Error;
>>>>>>> c0e6075 (Ran prettier on code.)
