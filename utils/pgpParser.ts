
export interface PGPInfo {
  isValidHeader: boolean;
  headers: Record<string, string>;
  body: string;
  decodedBody: string | null;
  isJsonBody: boolean;
  fingerprint?: string;
  rawBytes: Uint8Array | null;
  format: 'standard' | 'json_wrapped' | 'invalid' | 'unknown';
}

export const SAMPLE_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Comment: User-ID:	Paul
Comment: a.k.a.:	<me@paulapplegate.com>
Comment: Created:	01/30/26, 07:39 PM
Comment: Expires:	01/29/29, 07:39 PM
Comment: Type:	Post-Quantum Hybrid (secret key available)
Comment: Usage:	Signing, Encryption, Certifying User-IDs
Comment: Fingerprint:	6C3A 77AC A562 E6EE DA6E FA3D 4F0B B85C 6EE5 7956 D392 31E4 26E7 66A7 1444 A1D4 92F5 37E8 564D 4F63 4214 FA79 95DA 45A1 983C E979 95B2 95B2 BD43 D86B 1046 D287

eyJkc2FQdWIiOiJ1MGRuTHNOcXFTZ3BGRVBuL0JBelY1ekZ5MnRQd2J1cGlBdzBkR3Q3OVlBNTVIM09BdDFpcm1hM0RjaUcxSDR1bHYvSEhoVWRHOWs0QzFqdGZuZDZqZUJoUTRWdjhLZTVBS244WWVlTHpFcXNlY25YbTB3c0cvWUFFSy9rRSsySEdhN0VxMUZOVGxZeGJJSXQ0OXFiY3MvbXUyWVdkRWJTOVBUQnBzU1VYN2tNa3NIUnZRVFNVeXFvbUtqWC9Md0lWamtJTHBjNVJ6VEQrdU1MYVhnK2R4V0pJTSt2N2x6Qkp5ZHNMem43dWRvaWllMGdZK1FnVzVkbHFLQjVxSTRVVE8vYVlpMTM2RDZhVForblJvR2I4UkNsMEY0T3NtNTZCRzBuZnF1MVNpWlZNOTYxL1o2TlFSVy9FVmNUSlhrV2VtYjhoREJmdHVFZmpyaHlseUp6Z1ZuNGthQldjUVQrOHk2OHhQMGFtSU51QlRRc1V6KzJtWll2Q1MrU0VURmVIWGVzYUJqZE5CcHp3c2hIWXZwbklTVWxheU42Z0g2bDVlTEhnWmpoSkMxMjR5OEZLRnp2b2lvUkt5S29jMTNia3htQU83bW1GalFSTUdzcEE0aEdSTzhKZ0JaaWVUUkpVOHdrTHBNenQ1QjhZTTh5bUlyZzVoQk5vRWhtRzI1bW4vMUphWTNGVXFrbllBSG5weUpwZm9RUHlub1k1eUJFK3VHZzQ3eFp0YjJzbU4xUFUyNkNlNGUyeFpJVHpZNUJmRDJwN3hVcVNiUUhUWHBES0RmdmMxQ2o4c3diejZoaCtOQTdLT2RzenhpdFh6SFZ6cmkraGVGUzA1N25wZVVZNWh6aGQ3aHcvR0Z0dERsdGtlNjdhQ3JsRXRQUkkwTTZ0T0dhYWVVWnA3WlM1UC8zN2I3NEx4NzcreHVQcmpFYVZBU2p2YlVsSHErK1FHUjFkLzNnb29McVRCY1AwSzZwRVlTKzEzMThCdG50cDFtakp0OVMwSGVoNnJCcmplTEZYYnF6Rk1QOEpOVDJoZWhNeWxCUitNNXV5TTVIckVXMVE4cWlZak9VRHRIL3BDMDlTaG9IbWkxSWMvck9KcGRrakdKVjFhUi91dHQxTEQ1ZlpibzJHR1pnaFFDZFZsbDhuRnNCbnFITm5ubXA2Y2lsSEQzbUtxRjIyTU15d1c2Vm55ZFg4Y0l4U01VYlFhb1oweHlMUi8ydThDVHFNK2tJeUQxRmQzaUdpeGo3NFVTL0JhdmtlSGg1dGQwbHdTcXRvNnQ2YzZaTERnV0t4dXVZM1dPSnM1djdvbUpIL3gwTEszdWx5cWppNlJXQUl0elZlUXRRV00zQWgreHh4a3h3YzBPYmtyZk5XUkZoKzBSOTBJOFFoWjVkYnQ4L3R1aE1XTHIveHQ3VVNrL0p5ZG5jNnNVUTBvWFhmUHRlT09oNGw2VjZITTFWWXA1cmhlN09Wc1VMOGRaRXp0ZEpvOVUyMnFiTE9ESmh1djZBaUF1QnYyRm1SWkd4dlJQcVowbWRMSG5pQnViSCttWmdKNlduWGp6Z2IxUjQrVnROUThLdEo5NlVEc0c5RUdpQTVxeXUyL3hLcTNCazYzckpVZ1N4Z09vblNUVHF4T3ZjbExDWnNubzQwSjlTdXBLOGFiSGdnbkk3dFdPVWFxUFhaRkltTG81QWF1eDIvLzFyMUVGVEZOQ0lWYXVoQTFPQjdQOEswbE92WXRWeTRIVjR2WkFYSGJ5WFZkQ1JpY05sTTVHK1ZNcjE3WWJsd2NqWW45Z24rMWJuNW1YdE9jRzF3Y3k0ZDU2S0d0d09majFreGdyaVFmbjNjMEtzWWphajFyaHJ1RGd6akNMQjV2RXRkYU96UDBLQ2cxRnR1NE1CYjBCWUZ4THE2RFVjcW9oa2tWckpFMjhIY2dRUStKcFcrQk15Yk5lMHpZL09KKzRNZFNvUGRUbzVZK3VQaHJpMDJFN1dhb2czNTdiYTlVUURZaHBNTzYyQk8vV2lRYTZjeC9wc3YwRWFyVmd6Rm4wc2JNUWVXUDlCR2tSSTIzZzdTOUp4bDdEUHFqd0NGdTlrV0l3THJyUC9xZEY0ckRnbE1yUmhFQVpoN0NJVzJzZStQQ2tWdUFLQ3NQNlVGcDRKMC93ZnhZRkcxWHAxVWZHcHNFbmh4aEJIeGtaR3dCZmxKMU01d3dObnkvcCtqLzE0THhpckFTek54c3lER1dyWEdhUCt6ZHFJY0t2UEkzY1ptNzJnWDBUcGtRSTJncGM3cCtyTUw4bDVvYzNOaWVMWjBmTGc2WkU3ckVzTmczUGs0TE5Nb1dFZ3NvWS9CdFNLWUxkRGxXcC9WT0tXOG1zMmNDRmhxQ3dOVkN5azNaZDl2ZlUzYXZSbE5IeGdhTTVyalp5VjQ1V0RvZFg1L1k0b3dvMHNwMnpGV0xyTHpuVEJ0QXNvcUIxL2p2UHN2WW5waENSSzNVRmlRQzRUYVZhMnd3a1o1YW1TTGNDZ2E1VXlDQ0VlNnRQcHNOMnhPM2JRWFNBbXVWczlnTGF4WkdhUmhZQm9Pb1RHY1g5dTZpUUVOYThFOGliNWVuRUpLWTV6d2lCT0x2RFBGRzJJZ1hObmc2bTZwSGRFc1ZnR1BSbHRtZENOQ1NyNEg1UmNGNFdOMFFXWkFONks3a01VYlFzY3pXWmx1M2VEZTcwMDc1dW0ra0s3czIzUGdMYmM2UXNDWUx5OFA0MWdEbnhtVFFiampYWUFzbkhMYWFHUGxxVkphbzBWWURqRFBWa0IvT1J3NVJOSjN0MjE2RzV0dVc4UW1VdFB3eWhCRlpqZWd3MnhZMVM5UUJPTDIrQUt4WHU3KzUyd2tRMkdjVWg2WTE3QTNEZHJSODY1QkZwbzdFbXd2NXFuUUFtVkV1VnpQQSs2THBGWUxkeU1OZmQzdFJwL1pMSURkNXZJdUdpWGptbUxQK2FxclEvOFVpRm5OS0tTb25zU3pxUUhiOFFjNVdmRG54REhoWE81Um83Y0xnZEk5Mk4yZldoYVRXMXdWbVVBTGVEanMzYmVHNXBvQXBESEMxTnZEak5mM3had1lIdG81NGUrNXBhTk9ubHdDK1lpMnNpakFWd2pHby9iMkhxOGZOd0JmYkxvR1ByeFB6SkpRdzlreEszaHhGOVBjN0J5cVkyUlRMemZReGg1WmlBMVhHb1ozSkk2OFZVYitnQ0ZYSjR3SVRRTW5rdGV0blRTTnhteDBvSGZYb3JRQmw4cVVDa2tOWU5oc0s1WWl1QXJMZWJENWUvdmYyc2w0U3lYdDdPTGxkMmRNb2xLTFFvSlZzV1ZzUHNNRXljMnZGbnQ0V0owdW1QNHhENk9iVWVFZXJkNUxLUllCZUMvVXdHWkRod2dMSmdQTU5CZ2REVVV5RHEyZnVIeGdKVVp3ejZNdXZCTUZVOU15MlZkRVMvMldQOU15Qm1jOGlqelpjcz0iLCJlZFB1YiI6InZTanh5b05EQ0Vxa0tCeUQ1UEdDbXB5K3JCcnQvVm5JT3dybDJCQTdQL1E9IiwieHdpbmdQdWIiOiJ6YUJJTGRvOC8wVW5UM0c2M2NtN1pPZ1YwL3c1RkNXSUxkcVplSldEY21rSWg3SzZ0Zm1udytncjBqRk4wL3VTSEhWQmIvR014TllqWkFxN1VtZWJ3Y2dCSnVGT0RGeFhuTXdaNjVkODBvcFpHWHpQQVdZQ244aVdXd1hJd3hoNlh4ZERvenZEZ0twdXlRc3BDdXB0YVBwN1IxQVJQRUI0U3RoMkNhc0NPUHRGd2FzVU1ib1VSNnNEQUpWUDJKT25rdWs2UGdXdXhCZ2NYK0ZmQzhObUQ2eGQ3UUNYTVNIQ1ZheFhIT1ZXR25aVlVhcC9MWllNSC9vOWQ0d2RHR3dNWS90a1EvVmZteGtWY1hBY2tuT2ZkTUlSeTlRaWMraHgyTlExSG1LYkJBQ1praGF3MEhTbncwR1ZXTXcrdzBPN0Y0d3RLU0FpN055YTl5TEpodHQ2QkJzQzN0dWhrQWQvMjRaQWZNSytLb05rem5TWU5vWWpPbWxLWEFPMTVVUXoyWldFZmlBTFVSQU5kMEtER3VBQi9oTkNERnVGODBFTjJwVitURkdVdVdnTjBwaG1vZFZ0aU1CRmVkQm04bnNLaUJ1a1M5Q0tvM0JwVENPREVmYktreGxWL2hrWitXZTl2bmNLNk9VenlxVlBldmlFUlRNSWQzRk16UmxGWm9SOVRVSEFpZ0JsUStNRWpOQTh6cG9HU2FKOEk0aDFqU0JHT3h3Z1NTc1doanhaNzJVZ3A4cEF4M0NnaUZJSVAwWTNyOENacmlTOFB6WEdYRnhFSnVxZFlRRW0vQU5RWkRjS1BuUlpCOU9tMEJDL1FZa1RQc2trc2lrVEVBWWVCb1lmWnhvWUg2UVFxb0dUdk1FcTg2eStrUnNOdEh6Q2IvY2dVYWE2NEVpcVRNZytlb0hNeStVV0hxbTZSbkpYWDRCUER0V0prY2tvWmF6QlZYQkdabVM5cDRDTWpZbElBdUhIS0xNcTBRc2dGSlFMUW54cnB6U3NHK205eWJmQXFLSE9vOGMzakZwQ3ZDSEtrTkMrSUFVdlk5dFFWY1kwQjhna1UvcUFhbnBCdmhPUmJadFRlcU5mNGpDMGcwUzRUZUpTemFkV3RsU2FWL3RhUWFSVGpySWpCaGdPY2ttdXlUVjhnb1ZnNGdGaUVacHdOcGUrZkFveGNscFlXcFROdkxncEdLczV0Q2pDTjBTcVpueDRRZ3pOb0FyQVBudVRwS0dLQW5EQ2UyQXF6QkJITTRiT1NKV25BM21lMUJRZ3FZaHBRaktQV1NSRlQzeTB0OE5ZemNBaHo5Ti9LZlZ6MzFOZC8wYWY0UEZDWmxKTFFacU9zQ3pFZjVtMWM5ZGI0THc0NmZxK3RvUlVyUU5ySmxNUk9rd2J5b0JHalVkcXlub2VjY3BaellHdjkyQUtlTm1Uc0Z1ZlpnYzNURFdJaE1XZWFGeXcwU0ZMMjFTUlhSaGtETnM5QUhFWFpVaGRjWW1SbHRiR2RYeDJvakZ5N0FnbHA0YWM5UFBNeExVTnh4ZEFDa0dwWmh0dnJIT0hXUGpBMnJoZTJLWnJyK3FTVVhvdTkyS1NhdlJvY3NLdHVWTWVCT0N2aVh4VUZJa3UvUUtPYUtXN3oyWmdxMXgzT3phakpxZ0dyNUUramZNbFJXUjdZQ016UTVjZXlRQTlwbGl6c0ZlRC9xaUE0UnhMa0d2TGRFcHEzU00xZ2RORjhGb1lINFEvaUlCWjFURUF0UUp6WTFzRE1XVEdSTnhHcVZzREV0aFFURHdmaEN5YVV4QWtMdmlMbFJPWldIay9kalV2eW50M2g3SzdHZnhacjVZbk9iUER4RFBEOFd0Z1l5SnIzSkt0ZFJhU1ZTVkdDcEVncDFCOXMxQWNCeWFsaWRzRUJmZUhvckkxRzVTU3c1TnhHcFMwOW9OK011R1l2Rll2QzVSYlFUU04zR2lPNTZNY09wb01TbG1BcWZaLzNTTlREWEFxNkVlUkplTmw4bW1qL2dLZHp5YURWdlI0TUNpb29waEdzaEN6WjdvazlxaFpPSmZmLy9CVTJkWTdhNkZpNVFqUUpMemZSQWhLWnllRmxGb2Zzd0NPM3dmczloUEEyRUNoUjl1NXNEZWcyT3llK0N3WFNMRi92eGo5NHpQOEtsaU5XZz09In0=
-----END PGP PUBLIC KEY BLOCK-----`;

export const parsePGPKey = (rawText: string): PGPInfo => {
  const cleanText = rawText.trim();
  const headerRegex = /^-----BEGIN PGP PUBLIC KEY BLOCK-----([\s\S]*?)-----END PGP PUBLIC KEY BLOCK-----$/;
  const match = cleanText.match(headerRegex);

  if (!match) {
    return {
      isValidHeader: false,
      headers: {},
      body: '',
      decodedBody: null,
      isJsonBody: false,
      rawBytes: null,
      format: 'invalid'
    };
  }

  // Extract content inside
  const content = match[1];
  // Split by newline and trim each line to handle potential carriage returns
  const lines = content.split(/\r?\n/).map(l => l.trim());
  const headers: Record<string, string> = {};
  let bodyStartLine = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === '') {
      bodyStartLine = i + 1;
      break;
    }
    const parts = line.split(': ');
    if (parts.length >= 2) {
      headers[parts[0]] = parts.slice(1).join(': ');
    }
  }

  let bodyLines: string[] = [];
  
  if (bodyStartLine !== -1) {
      bodyLines = lines.slice(bodyStartLine).filter(l => l !== '');
  } else {
      // Fallback: assuming no headers or malformed separation
      bodyLines = lines.filter(l => l !== '' && !l.includes(': '));
  }

  // Handle PGP Checksum (last line starting with =)
  if (bodyLines.length > 0) {
      const lastLine = bodyLines[bodyLines.length - 1];
      if (lastLine.startsWith('=')) {
          bodyLines.pop();
      }
  }

  const bodyContent = bodyLines.join('');

  let decodedBody: string | null = null;
  let isJsonBody = false;
  let rawBytes: Uint8Array | null = null;
  let format: PGPInfo['format'] = 'unknown';

  try {
    const binString = atob(bodyContent.trim());
    const len = binString.length;
    rawBytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      rawBytes[i] = binString.charCodeAt(i);
    }
    
    // Check if valid UTF-8 string that looks like JSON
    try {
        const textDecoder = new TextDecoder('utf-8', { fatal: true });
        const decodedString = textDecoder.decode(rawBytes);
        if (decodedString.trim().startsWith('{')) {
          JSON.parse(decodedString); // Test parse
          decodedBody = decodedString;
          isJsonBody = true;
          format = 'json_wrapped';
        } else {
            // Check for OpenPGP Packet Tags
            // Bit 7 must be set (0x80)
            if (rawBytes.length > 0 && (rawBytes[0] & 0x80)) {
                format = 'standard';
            }
        }
    } catch (e) {
        // Not a string or JSON, check binary
         if (rawBytes.length > 0 && (rawBytes[0] & 0x80)) {
            format = 'standard';
        }
    }

  } catch (e) {
    // Base64 decode failed
    format = 'invalid';
  }

  return {
    isValidHeader: true,
    headers,
    body: bodyContent,
    decodedBody,
    isJsonBody,
    rawBytes,
    format
  };
};
