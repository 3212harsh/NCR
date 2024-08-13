import React from 'react';

const SSLCertificateDetail = ({ ssl }) => {
  return (
    <div className="ssl-certificate-detail">
      <h2>SSL Certificate Details</h2>

      {/* Certificate Chain */}
      <section>
        <h3>Certificate Chain</h3>
        {ssl.chain.map((cert, index) => (
          <div key={index} className="certificate">
            <pre>{cert}</pre>
            <p>SHA-256 Fingerprint: {ssl.chain_sha256[index]}</p>
          </div>
        ))}
      </section>

      {/* JARM Hash */}
      <section>
        <h3>JARM Hash</h3>
        <p>{ssl.jarm}</p>
      </section>

      {/* TLS Versions */}
      <section>
        <h3>TLS Versions</h3>
        <ul>
          {ssl.versions.map((version, index) => (
            <li key={index}>{version}</li>
          ))}
        </ul>
      </section>

      {/* TLS Extensions */}
      <section>
        <h3>TLS Extensions</h3>
        <ul>
          {ssl.tlsext.map((ext, index) => (
            <li key={index}>
              ID: {ext.id} - Name: {ext.name}
            </li>
          ))}
        </ul>
      </section>

      {/* Certificate Details */}
      <section>
        <h3>Certificate Details</h3>
        <p><strong>Signature Algorithm:</strong> {ssl.cert.sig_alg}</p>
        <p><strong>Issued:</strong> {ssl.cert.issued}</p>
        <p><strong>Expires:</strong> {ssl.cert.expires}</p>
        <p><strong>Public Key:</strong> {ssl.cert.pubkey.type} ({ssl.cert.pubkey.bits} bits)</p>
        <p><strong>Version:</strong> {ssl.cert.version}</p>

        {/* Certificate Extensions */}
        <h4>Extensions</h4>
        <ul>
          {ssl.cert.extensions.map((ext, index) => (
            <li key={index}>
              <strong>Name:</strong> {ext.name} <br />
              {ext.critical && <span>(Critical)</span>} <br />
              <strong>Data:</strong> <pre>{ext.data}</pre>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SSLCertificateDetail;
