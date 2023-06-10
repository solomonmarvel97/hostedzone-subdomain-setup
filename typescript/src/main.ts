import AWS from 'aws-sdk';
import { generate } from 'random-words';

const route53 = new AWS.Route53();

/**
 * Creates a subdomain in Amazon Route 53.
 *
 * @param {string} domainName - The domain name.
 * @param {string} subdomainName - The subdomain name.
 * @param {string} hostedZoneId - The hosted zone ID.
 */
const createSubdomain = (
  domainName: string,
  subdomainName: string,
  hostedZoneId: string
): void => {
  const changeBatch: AWS.Route53.ChangeResourceRecordSetsRequest = {
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: `${subdomainName}.${domainName}`,
            Type: 'A',
            TTL: 300,
            ResourceRecords: [
              {
                Value: '10.212.29.28', // your destination ip
              },
            ],
          },
        },
      ],
    },
    HostedZoneId: hostedZoneId,
  };

  route53.changeResourceRecordSets(changeBatch, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

// Usage example
const domainName = 'your-domain-name.com';
const subdomainNames = generate({ exactly: 1, wordsPerString: 2, separator: '-' });
const hostedZoneId = 'Your Hostedzone ID';

subdomainNames.forEach((subdomainName: string) => {
  createSubdomain(domainName, subdomainName, hostedZoneId);
});
