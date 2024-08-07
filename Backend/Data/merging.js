//For Port 80 (http) :-

// const mergedResponse = {
//     hash: shodanResponse.hash,
//     banner_hashes: censysResponse.banner_hashes,
//     timestamp: shodanResponse.timestamp,
//     observed_at: censysResponse.observed_at,
//     isp: shodanResponse.isp,
//     source_ip: censysResponse.source_ip,
//     data: shodanResponse.data,
//     banner: censysResponse.banner,
//     port: shodanResponse.port,
//     hostnames: shodanResponse.hostnames,
//     location: shodanResponse.location,
//     ip: shodanResponse.ip,
//     ip_str: shodanResponse.ip_str,
//     domains: shodanResponse.domains,
//     org: shodanResponse.org,
//     os: censysResponse.software.find(software => software.part === 'o').vendor || shodanResponse.os,
//     asn: shodanResponse.asn,
//     transport: shodanResponse.transport,
//     transport_protocol: censysResponse.transport_protocol,
//     extended_service_name: censysResponse.extended_service_name,
//     software: censysResponse.software,
//     transport_fingerprint: censysResponse.transport_fingerprint || null,
//     discovery_method: censysResponse.discovery_method,
//     perspective_id: censysResponse.perspective_id,
//     truncated: censysResponse.truncated,
//     http: {
//         status: censysResponse.http.response.status_code || shodanResponse.http.status,
//         server: shodanResponse.http.server,
//         headers: censysResponse.http.response.headers,
//         body_size: censysResponse.http.response.body_size,
//         supports_http2: censysResponse.http.supports_http2,
//         request: censysResponse.http.request
//     }
// };

//------------------------------------------------------------------------------------------------------------


//For Port 445 (SMB)

// const mergedResponse = {
//     hash: shodanResponse.hash,
//     banner_hashes: censysResponse.banner_hashes,
//     timestamp: shodanResponse.timestamp,
//     observed_at: censysResponse.observed_at,
//     isp: shodanResponse.isp,
//     asn: shodanResponse.asn,
//     port: shodanResponse.port,
//     hostnames: shodanResponse.hostnames,
//     location: shodanResponse.location,
//     ip: shodanResponse.ip,
//     ip_str: shodanResponse.ip_str,
//     domains: shodanResponse.domains,
//     org: shodanResponse.org,
//     os: shodanResponse.os || censysResponse.software[0].vendor + " " + censysResponse.software[0].product,
//     _shodan: shodanResponse._shodan,
//     transport: shodanResponse.transport,
//     transport_protocol: censysResponse.transport_protocol,
//     source_ip: censysResponse.source_ip,
//     transport_fingerprint: censysResponse.transport_fingerprint,
//     smb: {
//         smb_version: {
//             major: censysResponse.smb.smb_version.major,
//             minor: censysResponse.smb.smb_version.minor,
//             version_string: censysResponse.smb.smb_version.version_string,
//             revision: censysResponse.smb.smb_version.revision
//         },
//         smb_capabilities: {
//             ...censysResponse.smb.smb_capabilities,
//             raw_mode: shodanResponse.smb.capabilities.includes("raw-mode")
//         },
//         has_ntlm: censysResponse.smb.has_ntlm,
//         negotiation_log: censysResponse.smb.negotiation_log,
//         session_setup_log: censysResponse.smb.session_setup_log,
//         smbv1_support: censysResponse.smb.smbv1_support,
//         raw: shodanResponse.smb.raw
//     }
// };


//------------------------------------------------------------------------------------------------------------


//For Port 5357:-

// const mergedResponse = {
//     hash: shodanResponse.hash,
//     banner_hashes: censysResponse.banner_hashes,
//     timestamp: shodanResponse.timestamp,
//     observed_at: censysResponse.observed_at,
//     isp: shodanResponse.isp,
//     asn: shodanResponse.asn,
//     port: shodanResponse.port,
//     hostnames: shodanResponse.hostnames,
//     location: shodanResponse.location,
//     ip: shodanResponse.ip,
//     ip_str: shodanResponse.ip_str,
//     domains: shodanResponse.domains,
//     org: shodanResponse.org,
//     os: shodanResponse.os || censysResponse.software[0].vendor + " " + censysResponse.software[0].product    ,
//     _shodan: shodanResponse._shodan,
//     transport: shodanResponse.transport,
//     transport_protocol: censysResponse.transport_protocol,
//     source_ip: censysResponse.source_ip,
//     http: {
//         status: shodanResponse.http.status,
//         title: shodanResponse.http.title,
//         server: shodanResponse.http.server,
//         headers_hash: shodanResponse.http.headers_hash,
//         host: shodanResponse.http.host,
//         html: censysResponse.http.response.body,
//         html_hash: censysResponse.http.response.body_hash,
//         location: shodanResponse.http.location,
//         components: shodanResponse.http.components,
//         response: censysResponse.http.response
//     }
// };


//------------------------------------------------------------------------------------------------------------

// For Port 8089 :- 

// const mergedResponse = {
//     hash: shodanResponse.hash,
//     banner_hashes: censysResponse.banner_hashes,
//     timestamp: shodanResponse.timestamp,
//     observed_at: censysResponse.observed_at,
//     isp: shodanResponse.isp,
//     source_ip: censysResponse.source_ip,
//     data: shodanResponse.data,
//     banner: censysResponse.banner,
//     port: shodanResponse.port,
//     hostnames: shodanResponse.hostnames,
//     location: shodanResponse.location,
//     ip: shodanResponse.ip,
//     ip_str: shodanResponse.ip_str,
//     domains: shodanResponse.domains,
//     org: shodanResponse.org,
//     os: censysResponse.transport_fingerprint.os || shodanResponse.os,
//     asn: shodanResponse.asn,
//     transport: shodanResponse.transport,
//     transport_protocol: censysResponse.transport_protocol,
//     extended_service_name: censysResponse.extended_service_name,
//     software: censysResponse.software,
//     transport_fingerprint: censysResponse.transport_fingerprint,
//     discovery_method: censysResponse.discovery_method,
//     perspective_id: censysResponse.perspective_id,
//     truncated: censysResponse.truncated
// };

//------------------------------------------------------------------------------------------------------------

