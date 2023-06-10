import boto3

client = boto3.client('route53')

response = client.list_hosted_zones()

hosted_zones = response['HostedZones']

for zone in hosted_zones:
    print(f"Hosted Zone ID: {zone['Id']}")
    print(f"Hosted Zone Name: {zone['Name']}")
    print(f"Resource Record Set Count: {zone['ResourceRecordSetCount']}")
    print()
