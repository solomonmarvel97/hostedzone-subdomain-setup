import boto3

client = boto3.client('route53')

def create_subdomain(domain_name, subdomain_name, hosted_zone_id):
    change_batch = {
        'Changes': [
            {
                'Action': 'CREATE',
                'ResourceRecordSet': {
                    'Name': f'{subdomain_name}.{domain_name}',
                    'Type': 'A',
                    'TTL': 300,
                    'ResourceRecords': [
                        {
                            'Value': '10.212.29.28'
                        }
                    ]
                }
            }
        ]
    }

    response = client.change_resource_record_sets(
        HostedZoneId=hosted_zone_id,
        ChangeBatch=change_batch
    )

    print(response)

# Usage example
domain_name = 'your-domain-name.com'
subdomain_name = 'marv'
hosted_zone_id = 'Your Hostedzone ID'

create_subdomain(domain_name, subdomain_name, hosted_zone_id)
