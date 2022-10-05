const fs = require('fs');
const jose = require('jose');

const body = {
  paymentMethod: 'TRF',
  paymentTypeInformation: {
    serviceLevelCode: 'NURG',
    localInstrument: {
      code: 'CCD',
    },
  },
  requestedExecutionDate: '2022-11-11',
  debtor: {
    name: 'Test Name',
    postalAddress: {
      country: 'US',
    },
    organizationId: {
      other: [
        {
          id: '4192662001',
          schemeName: {
            proprietary: 'JPMCOID',
          },
        },
      ],
    },
  },
  debtorAccount: {
    accountNumber: '945958726',
    currency: 'USD',
  },
  debtorAgent: {
    aba: '021000021',
    country: 'US',
  },
  creditTransferTransactionInformation: {
    endToEndId: 'E2E006456',
    amount: {
      instructedAmount: {
        currency: 'USD',
        amount: 101.39,
      },
    },
    creditorAgent: {
      financialInstitutionId: {
        aba: '021000021',
        postalAddress: {
          country: 'US',
        },
      },
    },
    creditor: {
      name: 'SAMPLE CREDITOR',
      postalAddress: {
        country: 'US',
      },
    },
    creditorAccount: {
      accountNumber: '945958759',
    },
  },
};
const digitalSignatureKey = fs.readFileSync(
  'certs/treasury-services/digital-signature/key.key',
  'utf-8',
);

const header = {
  alg: 'RS256',
};

const generateJWTJose = async (req, res) => {
  const privateKey = await jose.importPKCS8(digitalSignatureKey, 'RSA-SHA256');

  const jwt = await new jose.SignJWT(body)
    .setProtectedHeader(header)
    .sign(privateKey);
  res.send(jwt);
};

module.exports = { generateJWTJose };
