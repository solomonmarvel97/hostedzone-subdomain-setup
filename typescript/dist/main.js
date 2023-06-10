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
const createSubdomain = (domainName, subdomainName, hostedZoneId) => {
    const changeBatch = {
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
                                Value: '10.212.29.28',
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
        }
        else {
            console.log(data);
        }
    });
};
// Usage example
const domainName = 'capitalcitydev.com';
const subdomainNames = generate({ exactly: 1, wordsPerString: 2, separator: '-' });
const hostedZoneId = 'Z0584916MC302OR2Z1W3';
subdomainNames.forEach((subdomainName) => {
    createSubdomain(domainName, subdomainName, hostedZoneId);
});
